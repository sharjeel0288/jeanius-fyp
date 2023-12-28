# measurement_app\functions\jeansShadeMatch.py
import numpy as np
import cv2
from skimage.metrics import structural_similarity as ssim
from skimage.color import deltaE_cie76, deltaE_ciede2000
import numpy as np
import cv2
from PIL import Image
from distutils.version import StrictVersion
import tensorflow as tf
from skimage.color import deltaE_cie76, deltaE_ciede2000


def color_match_function(image1, image2):
    # Ensure TensorFlow version compatibility
    if StrictVersion(tf.__version__) < StrictVersion("1.12.0"):
        raise ImportError("Please upgrade your TensorFlow installation to v1.12.*.")

    # Load object detection graph
    PATH_TO_FROZEN_GRAPH = f'assets/frozen_inference_graph.pb'
    detection_graph = tf.Graph()

    with detection_graph.as_default():
        od_graph_def = tf.compat.v1.GraphDef()
        with tf.io.gfile.GFile(PATH_TO_FROZEN_GRAPH, "rb") as fid:
            serialized_graph = fid.read()
            od_graph_def.ParseFromString(serialized_graph)
            tf.import_graph_def(od_graph_def, name="")

    def detect_objects(image_np, detection_graph):
        # Convert the NumPy array to a PIL Image object
        image = Image.fromarray(image_np)

        with detection_graph.as_default():
            with tf.compat.v1.Session() as sess:
                # Get handles to input and output tensors
                ops = tf.compat.v1.get_default_graph().get_operations()
                all_tensor_names = {output.name for op in ops for output in op.outputs}
                tensor_dict = {}
                for key in [
                    "num_detections",
                    "detection_boxes",
                    "detection_scores",
                    "detection_classes",
                    "detection_masks",
                ]:
                    tensor_name = key + ":0"
                    if tensor_name in all_tensor_names:
                        tensor_dict[
                            key
                        ] = tf.compat.v1.get_default_graph().get_tensor_by_name(
                            tensor_name
                        )

                image_tensor = tf.compat.v1.get_default_graph().get_tensor_by_name(
                    "image_tensor:0"
                )  # Define image_tensor

                # Run inference
                output_dict = sess.run(
                    tensor_dict, feed_dict={image_tensor: np.expand_dims(image_np, 0)}
                )

                # Extract bounding boxes
                boxes = output_dict["detection_boxes"]
                classes = output_dict["detection_classes"]
                scores = output_dict["detection_scores"]
                threshold = 0.5  # You can adjust the confidence threshold as needed

                # Filter out detections with confidence scores lower than the threshold
                boxes = boxes[scores > threshold]
                classes = classes[scores > threshold]

                # Convert normalized coordinates to actual image coordinates
                im_width, im_height = image.size
                boxes = np.multiply(boxes, [im_height, im_width, im_height, im_width])
                boxes = boxes.astype(np.int32)

                return boxes, classes

    def calculate_color_similarity(image1, image2):
        quantized_image1 = image1
        quantized_image2 = image2
        gray_image1 = cv2.cvtColor(quantized_image1, cv2.COLOR_BGR2GRAY)
        gray_image2 = cv2.cvtColor(quantized_image2, cv2.COLOR_BGR2GRAY)

        # Calculate the window size for SSIM calculation
        height1, width1 = gray_image1.shape[:2]
        height2, width2 = gray_image2.shape[:2]

        # Ensure the window size is between 3x3 and the minimum of image dimensions
        win_size = min(height1, width1, height2, width2, 7)
        win_size = max(win_size, 3)  # Ensure win_size is at least 3x3
        # Make sure win_size is odd
        win_size = win_size + 1 if win_size % 2 == 0 else win_size

        try:
            # Compute SSIM index of the grayscale images
            ssim_index, _ = ssim(gray_image1, gray_image2, full=True, win_size=win_size)

            # Normalize SSIM index to the range [0, 1]
            normalized_ssim_index = (ssim_index + 1) / 2.0

            # Calculate histogram intersection
            hist_intersection = cv2.compareHist(
                cv2.calcHist(
                    [quantized_image1],
                    [0, 1, 2],
                    None,
                    [64, 64, 64],
                    [0, 256, 0, 256, 0, 256],
                ),
                cv2.calcHist(
                    [quantized_image2],
                    [0, 1, 2],
                    None,
                    [64, 64, 64],
                    [0, 256, 0, 256, 0, 256],
                ),
                cv2.HISTCMP_INTERSECT,
            )

            # Normalize histogram intersection to the range [0, 1]
            normalized_hist_intersection = hist_intersection / (
                cv2.norm(quantized_image1) * cv2.norm(quantized_image2)
            )

            # Calculate similarity percentage
            similarity_percentage = (
                (normalized_ssim_index + normalized_hist_intersection) / 2 * 100
            )

            return similarity_percentage
        except Exception as e:
            raise Exception(f"Error: {str(e)}")
           

    def extract_color_histogram(image):
        # Convert the image to the HSV color space
        hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)

        # Calculate the histogram of the HSV image
        hist = cv2.calcHist([hsv], [0, 1], None, [12, 8], [0, 180, 0, 256])

        # Normalize the histogram
        hist = cv2.normalize(hist, hist).flatten()

        return hist

    def compare_color_histograms(process_image1, process_image2, threshold=0.7):
        hist_1 = extract_color_histogram(process_image1)
        hist_2 = extract_color_histogram(process_image2)
        # Compute the Bhattacharyya distance between the histograms
        bhattacharyya_distance = cv2.compareHist(
            hist_1, hist_2, cv2.HISTCMP_BHATTACHARYYA
        )
        return bhattacharyya_distance

    def convert_to_lab(image):
        if image.shape[2] == 4:  # Check if the image has 4 channels (RGBA format)
            # Remove the alpha channel, keeping only the RGB channels
            image = image[:, :, :3]
        return cv2.cvtColor(image, cv2.COLOR_BGR2LAB)

    def calculate_color_difference(image_lab_1, image_lab_2):
        # Extract L*a*b* channels
        l_1, a_1, b_1 = cv2.split(image_lab_1)
        l_2, a_2, b_2 = cv2.split(image_lab_2)

        # Calculate deltaE_cie76
        delta_e = deltaE_cie76(
            (l_1.mean(), a_1.mean(), b_1.mean()), (l_2.mean(), a_2.mean(), b_2.mean())
        )

        return delta_e

    def compare_color_shades(jeans_roi_1, jeans_roi_2, threshold=5):
        try:
            jeans_lab_1 = convert_to_lab(jeans_roi_1)
            jeans_lab_2 = convert_to_lab(jeans_roi_2)

            # Calculate color difference for each pair of LAB pixels and compare them
            color_differences = calculate_color_difference(jeans_lab_1, jeans_lab_2)

            return color_differences
        except Exception as e:
            raise Exception(f"Error: {str(e)}")
         

    # Function to calculate color correlations for ROIs

    def calculate_channel_mse(image1, image2):
        mse_r = np.mean((image1[:, :, 0] - image2[:, :, 0]) ** 2)
        mse_g = np.mean((image1[:, :, 1] - image2[:, :, 1]) ** 2)
        mse_b = np.mean((image1[:, :, 2] - image2[:, :, 2]) ** 2)
        return mse_r, mse_g, mse_b

    def calculate_color_balance_match_score(image1, image2):
        def calculate_color_balance(image):
            # Calculate the standard deviation of color channels
            std_dev_r = np.std(image[:, :, 0])
            std_dev_g = np.std(image[:, :, 1])
            std_dev_b = np.std(image[:, :, 2])

            # A lower standard deviation indicates a more balanced color distribution
            return 1 / (
                std_dev_r + std_dev_g + std_dev_b + 1e-6
            )  # Avoid division by zero

        # Calculate color balance for each image
        color_balance_score_1 = calculate_color_balance(image1)
        color_balance_score_2 = calculate_color_balance(image2)

        # Calculate the matching score based on color balance
        matching_score = min(color_balance_score_1, color_balance_score_2)

        return matching_score

    def calculate_luminance_difference(image_lab_1, image_lab_2):
        # Extract L* channel
        l_1 = image_lab_1[:, :, 0]
        l_2 = image_lab_2[:, :, 0]

        # Calculate luminance difference
        delta_luminance = np.abs(l_1.mean() - l_2.mean())

        return delta_luminance

    def calculate_saturation_difference(image_lab_1, image_lab_2):
        # Resize images to have the same dimensions if necessary
        min_height = min(image_lab_1.shape[0], image_lab_2.shape[0])
        min_width = min(image_lab_1.shape[1], image_lab_2.shape[1])

        image_lab_1 = cv2.resize(image_lab_1, (min_width, min_height))
        image_lab_2 = cv2.resize(image_lab_2, (min_width, min_height))

        # Extract a* and b* channels
        a_1 = image_lab_1[:, :, 1]
        b_1 = image_lab_1[:, :, 2]
        a_2 = image_lab_2[:, :, 1]
        b_2 = image_lab_2[:, :, 2]

        # Calculate saturation difference
        delta_saturation = np.sqrt(np.mean((a_1 - a_2) ** 2 + (b_1 - b_2) ** 2))

        return delta_saturation

    def calculate_average_color_deviation(image1, image2):
        # Convert the images to LAB color space
        lab_image1 = convert_to_lab(image1)
        lab_image2 = convert_to_lab(image2)

        # Calculate color deviation for each channel
        delta_l = np.abs(lab_image1[:, :, 0] - lab_image2[:, :, 0])
        delta_a = np.abs(lab_image1[:, :, 1] - lab_image2[:, :, 1])
        delta_b = np.abs(lab_image1[:, :, 2] - lab_image2[:, :, 2])

        # Calculate average color deviation
        avg_color_deviation = np.mean(delta_l + delta_a + delta_b)

        return avg_color_deviation

    def calculate_ciede2000_color_difference(image_lab_1, image_lab_2):
        # Ensure both LAB images have the same shape
        if image_lab_1.shape != image_lab_2.shape:
            raise ValueError("LAB images have different shapes.")

        # Calculate CIEDE2000 color difference
        ciede2000_color_difference = deltaE_ciede2000(image_lab_1, image_lab_2)

        return np.mean(ciede2000_color_difference)

    def calculate_bhattacharyya_distance(hist_1, hist_2):
        return cv2.compareHist(hist_1, hist_2, cv2.HISTCMP_BHATTACHARYYA)

    def calculate_color_delta_lab(color_lab1, color_lab2):
        delta_lab = np.linalg.norm(color_lab1 - color_lab2)
        return delta_lab

    def process_image(img):
        # Read the image
        original = img.copy()

        # Convert the image to the LAB color space
        lab = cv2.cvtColor(img, cv2.COLOR_BGR2LAB)

        # Extract the L channel (lightness) to separate color information from intensity
        l_channel = lab[:, :, 0]

        # Apply GaussianBlur to the L channel to reduce noise
        blurred = cv2.GaussianBlur(l_channel, (5, 5), 0)

        # Use adaptive thresholding to create a binary mask
        _, mask = cv2.threshold(blurred, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

        # Invert the mask to get the foreground
        mask = cv2.bitwise_not(mask)

        # Bitwise AND to keep the region of interest
        result = cv2.bitwise_and(original, original, mask=mask)

        # Check if the image has an alpha channel
        if result.shape[2] == 4:
            # If the alpha channel exists, split it
            alpha_channel = cv2.split(result)[3]
        else:
            # If the alpha channel doesn't exist, create one with full opacity
            alpha_channel = np.ones_like(mask) * 255
        return result

    def resize_or_pad_image(image, target_size=(100, 100)):
        # Get the original image dimensions
        height, width = image.shape[:2]

        # Ensure target size is a valid positive value
        target_height, target_width = max(1, target_size[0]), max(1, target_size[1])

        # Calculate padding or resizing dimensions
        pad_height = max(0, target_height - height)
        pad_width = max(0, target_width - width)

        # Pad the image with zeros or resize the image
        if height < target_height or width < target_width:
            # Pad the image with zeros
            padded_image = np.zeros((target_height, target_width, 3), dtype=np.uint8)
            padded_image[:height, :width, :] = image
            return padded_image, (pad_height, pad_width)
        else:
            # Resize the image without blurring
            resized_image = cv2.resize(
                image, (target_width, target_height), interpolation=cv2.INTER_NEAREST
            )
            return resized_image, (pad_height, pad_width)

    # image_1_np = cv2.imread(image1)
    # image_1_np = cv2.imread(image1)
    # Example usage
    

    img1 = image1
    img2 =image2
    boxes_1, classes_1 = detect_objects(img1, detection_graph)
    boxes_2, classes_2 = detect_objects(img2, detection_graph)

    if len(boxes_2) == 0 or len(boxes_2) == 0:
        raise  Exception("Error Jeans not Found")

    process_image1 = process_image(img1)
    process_image2 = process_image(img2)
    resized_jeans_roi_1, (pad_height_1, pad_width_1) = resize_or_pad_image(
        process_image1
    )
    resized_jeans_roi_2, (pad_height_2, pad_width_2) = resize_or_pad_image(
        process_image2
    )

    # cv2.namedWindow('Result Image with Transparency', cv2.WINDOW_NORMAL)
    # cv2.resizeWindow('Result Image with Transparency', 800, 600)  # Adjust the size as needed

    # cv2.imshow('Result Image with Transparency', resized_jeans_roi_2)
    # cv2.waitKey(0)
    # cv2.destroyAllWindows()
    # Calculate various similarity scores
    color_similarity_score = calculate_color_similarity(
        resized_jeans_roi_1, resized_jeans_roi_2
    )
    color_histogram_bhattacharyya_distance = compare_color_histograms(
        resized_jeans_roi_1, resized_jeans_roi_2
    )
    color_shade_differences = compare_color_shades(
        resized_jeans_roi_1, resized_jeans_roi_2
    )

    channel_mse_scores = calculate_channel_mse(resized_jeans_roi_1, resized_jeans_roi_2)
    color_balance_match_score = calculate_color_balance_match_score(
        resized_jeans_roi_1, resized_jeans_roi_2
    )
    saturation_difference_score = calculate_saturation_difference(
        convert_to_lab(resized_jeans_roi_1), convert_to_lab(resized_jeans_roi_2)
    )

    average_color_deviation = calculate_average_color_deviation(
        resized_jeans_roi_1, resized_jeans_roi_2
    )
    luminance_difference_score = calculate_luminance_difference(
        convert_to_lab(resized_jeans_roi_1), convert_to_lab(resized_jeans_roi_2)
    )
    ciede2000_color_difference = calculate_ciede2000_color_difference(
        convert_to_lab(resized_jeans_roi_1), convert_to_lab(resized_jeans_roi_2)
    )
    bhattacharyya_distance_color_histograms = calculate_bhattacharyya_distance(
        extract_color_histogram(resized_jeans_roi_1),
        extract_color_histogram(resized_jeans_roi_2),
    )

    color_delta_lab = calculate_color_delta_lab(
        convert_to_lab(resized_jeans_roi_1).mean(axis=(0, 1)),
        convert_to_lab(resized_jeans_roi_2).mean(axis=(0, 1)),
    )

    # NORMALIZING

    # MAX VALUE
    max_color_similarity_score = 50.00180667 + 10
    max_color_histogram_bhattacharyya_distance = 0.543439368 + 10
    max_color_shade_differences = 23.5395651 + 10
    max_channel_mse_scores = 38.8839 + 10
    max_color_balance_match_score = 0.007575396 + 10
    max_saturation_difference_score = 7.095273074 + 10
    max_average_color_deviation = 65.6327 + 10
    max_luminance_difference_score = 23.1958 + 10
    max_ciede2000_color_difference = 20.81719644 + 10
    max_bhattacharyya_distance_color_histograms = 0.543439368 + 10

    # MIN VALUES
    min_color_similarity_score = 38.87341442
    min_color_histogram_bhattacharyya_distance = 0
    min_color_shade_differences = 0
    min_channel_mse_scores = 0
    min_color_balance_match_score = 0.004562184
    min_saturation_difference_score = 0
    min_average_color_deviation = 0
    min_luminance_difference_score = 0
    min_ciede2000_color_difference = 0
    min_bhattacharyya_distance_color_histograms = 0

    def normalize_score(score, min_val, max_val):
        # Ensure max_val is not equal to min_val to avoid division by zero
        if max_val == min_val:
            return 0.0
        return (score - min_val) / (max_val - min_val)

    normalized_color_similarity_score = normalize_score(
        color_similarity_score, min_color_similarity_score, max_color_similarity_score
    )
    normalized_color_histogram_bhattacharyya_distance = normalize_score(
        color_histogram_bhattacharyya_distance,
        min_color_histogram_bhattacharyya_distance,
        max_color_histogram_bhattacharyya_distance,
    )
    normalized_color_shade_differences = normalize_score(
        color_shade_differences,
        min_color_shade_differences,
        max_color_shade_differences,
    )
    normalized_channel_mse_scores = normalize_score(
        np.mean(channel_mse_scores[:3]), min_channel_mse_scores, max_channel_mse_scores
    )
    normalized_color_balance_match_score = normalize_score(
        color_balance_match_score,
        min_color_balance_match_score,
        max_color_balance_match_score,
    )
    normalized_saturation_difference_score = normalize_score(
        saturation_difference_score,
        min_saturation_difference_score,
        max_saturation_difference_score,
    )
    normalized_average_color_deviation = normalize_score(
        average_color_deviation,
        min_average_color_deviation,
        max_average_color_deviation,
    )
    normalized_luminance_difference_score = normalize_score(
        luminance_difference_score,
        min_luminance_difference_score,
        max_luminance_difference_score,
    )
    normalized_ciede2000_color_difference = normalize_score(
        ciede2000_color_difference,
        min_ciede2000_color_difference,
        max_ciede2000_color_difference,
    )
    normalized_bhattacharyya_distance_color_histograms = normalize_score(
        bhattacharyya_distance_color_histograms,
        min_bhattacharyya_distance_color_histograms,
        max_bhattacharyya_distance_color_histograms,
    )

    def calculate_weighted_similarity(normalized_metrics, weights):
        # Ensure the number of metrics and weights match
        if len(normalized_metrics) != len(weights):
            raise ValueError("Number of metrics and weights must be the same.")

        # Calculate the weighted similarity
        weighted_similarity = sum(
            normalized_metric * weight
            for normalized_metric, weight in zip(normalized_metrics, weights)
        )

        return weighted_similarity

    weights = [0.05, 0.1, 0.1, 0.2, 0.05, 0.1, 0.1, 0.1, 0.1, 0.1]

    weighted_similarity = calculate_weighted_similarity(
        [
            normalized_color_similarity_score,
            normalized_color_histogram_bhattacharyya_distance,
            normalized_color_shade_differences,
            normalized_channel_mse_scores,
            normalized_color_balance_match_score,
            normalized_saturation_difference_score,
            normalized_average_color_deviation,
            normalized_luminance_difference_score,
            normalized_ciede2000_color_difference,
            normalized_bhattacharyya_distance_color_histograms,
        ],
        weights,
    )

    return {
        "color_similarity_score": round(normalized_color_similarity_score, 2),
        "color_histogram_bhattacharyya_distance": round(
            normalized_color_histogram_bhattacharyya_distance, 2
        ),
        "color_shade_differences": round(normalized_color_shade_differences, 2),
        "channel_mse_scores_r": round(channel_mse_scores[0], 2),
        "channel_mse_scores_g": round(channel_mse_scores[1], 2),
        "channel_mse_scores_b": round(channel_mse_scores[2], 2),
        "color_balance_match_score": round(normalized_color_balance_match_score, 2),
        "saturation_difference_score": round(normalized_saturation_difference_score, 2),
        "average_color_deviation": round(normalized_average_color_deviation, 2),
        "luminance_difference_score": round(normalized_luminance_difference_score, 2),
        "ciede2000_color_difference": round(normalized_ciede2000_color_difference, 2),
        "bhattacharyya_distance_color_histograms": round(
            bhattacharyya_distance_color_histograms, 2
        ),
        "Weighted_Similarity": round(1 - weighted_similarity, 2),
    }
