# measurement_app\functions\jeansShadeMatch.py
import base64
from matplotlib import colors
import matplotlib.pyplot as plt

import pandas as pd
import numpy as np
import cv2
from skimage.metrics import structural_similarity as ssim
from sklearn.cluster import KMeans
from PIL import Image
import os
from distutils.version import StrictVersion
import tensorflow as tf
from termcolor import colored
from skimage.feature import match_template
from skimage.color import rgb2lab, deltaE_cie76, deltaE_ciede2000
from object_detection.utils import ops as utils_ops


def color_match_function(image1, image2):
    # Ensure TensorFlow version compatibility
    if StrictVersion(tf.__version__) < StrictVersion("1.12.0"):
        raise ImportError("Please upgrade your TensorFlow installation to v1.12.*.")

    # Load object detection graph f'assets/data.yaml'
    PATH_TO_FROZEN_GRAPH = f"measurement_app/assets/frozen_inference_graph.pb"
    detection_graph = tf.Graph()

    with detection_graph.as_default():
        od_graph_def = tf.compat.v1.GraphDef()
        with tf.io.gfile.GFile(PATH_TO_FROZEN_GRAPH, "rb") as fid:
            serialized_graph = fid.read()
            od_graph_def.ParseFromString(serialized_graph)
            tf.import_graph_def(od_graph_def, name="")

    # Function to load image into numpy array
    def load_image_into_numpy_array(image):
        (im_width, im_height) = image.size
        return (
            np.array(image.getdata()).reshape((im_height, im_width, 3)).astype(np.uint8)
        )

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

    def extract_roi(image, bounding_box):
        x, y, w, h = bounding_box
        roi = image[y : y + h, x : x + w]  # Extract the ROI from the bounding box

        return roi

    def load_image(image_path):
        try:
            image = cv2.imread(image_path)
            if image is not None:
                return image
            else:
                raise FileNotFoundError(f"Image not found at path: {image_path}")
        except Exception as e:
            raise Exception(f"Error loading image: {str(e)}")

    def resize_image(image, target_size=(100, 100)):
        return cv2.resize(image, target_size, interpolation=cv2.INTER_AREA)

    def quantize_image(image, num_colors=64):
        # Convert the image to the LAB color space
        lab_image = cv2.cvtColor(image, cv2.COLOR_BGR2LAB)
        # Reshape the image to be a list of pixels
        reshaped_image = lab_image.reshape((-1, 3))
        # Apply k-means clustering to find 'num_colors' dominant colors
        kmeans = KMeans(n_clusters=num_colors)
        labels = kmeans.fit_predict(reshaped_image)
        # Replace pixel values with their corresponding cluster centers
        quantized_image_lab = kmeans.cluster_centers_.astype(np.uint8)[labels]
        # Reshape the quantized image back to the original shape in LAB color space
        quantized_image_lab = quantized_image_lab.reshape(lab_image.shape)
        # Convert quantized LAB image back to BGR color space
        quantized_image = cv2.cvtColor(quantized_image_lab, cv2.COLOR_LAB2BGR)

        return quantized_image

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
            # Resize the image
            resized_image = cv2.resize(
                image, (target_width, target_height), interpolation=cv2.INTER_AREA
            )
            return resized_image, (pad_height, pad_width)

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
            print(f"Error: {str(e)}")
            return 0  # Return 0 in case of an error

    def extract_color_histogram(image):
        # Convert the image to the HSV color space
        hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)

        # Calculate the histogram of the HSV image
        hist = cv2.calcHist([hsv], [0, 1], None, [12, 8], [0, 180, 0, 256])

        # Normalize the histogram
        hist = cv2.normalize(hist, hist).flatten()

        return hist

    def compare_color_histograms(
        resized_jeans_roi_1, resized_jeans_roi_2, threshold=0.7
    ):
        hist_1 = extract_color_histogram(resized_jeans_roi_1)
        hist_2 = extract_color_histogram(resized_jeans_roi_2)
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
            print(f"Error: {str(e)}")
            return False

    def jeans_color_matching_roi(roi1, roi2):
        try:
            # Calculate color correlations
            corr_r, corr_g, corr_b = calculate_correlation_roi(roi1, roi2)

            # Calculate overall color similarity as the average of individual channel correlations
            overall_similarity = (corr_r + corr_g + corr_b) / 3

            # Threshold for considering ROIs as color-matched
            threshold_similarity = 0.8

            # Perform color matching based on the overall color similarity
            return overall_similarity
            # if overall_similarity >= threshold_similarity:
            #     return "Jeans color matched!"
            # else:
            #     return "Jeans color not matched."

        except Exception as e:
            print(f"Error: {str(e)}")
            return "Error in color matching."

    # Function to calculate color correlations for ROIs
    def calculate_correlation_roi(roi1, roi2):
        try:
            # Calculate histograms for each channel (R, G, B) for the ROIs
            hist_roi1_r = cv2.calcHist([roi1], [0], None, [256], [0, 256])
            hist_roi1_g = cv2.calcHist([roi1], [1], None, [256], [0, 256])
            hist_roi1_b = cv2.calcHist([roi1], [2], None, [256], [0, 256])

            hist_roi2_r = cv2.calcHist([roi2], [0], None, [256], [0, 256])
            hist_roi2_g = cv2.calcHist([roi2], [1], None, [256], [0, 256])
            hist_roi2_b = cv2.calcHist([roi2], [2], None, [256], [0, 256])

            # Normalize histograms
            hist_roi1_r /= hist_roi1_r.sum()
            hist_roi1_g /= hist_roi1_g.sum()
            hist_roi1_b /= hist_roi1_b.sum()

            hist_roi2_r /= hist_roi2_r.sum()
            hist_roi2_g /= hist_roi2_g.sum()
            hist_roi2_b /= hist_roi2_b.sum()

            # Calculate color correlations
            corr_r = cv2.compareHist(hist_roi1_r, hist_roi2_r, cv2.HISTCMP_CORREL)
            corr_g = cv2.compareHist(hist_roi1_g, hist_roi2_g, cv2.HISTCMP_CORREL)
            corr_b = cv2.compareHist(hist_roi1_b, hist_roi2_b, cv2.HISTCMP_CORREL)

            return corr_r, corr_g, corr_b

        except Exception as e:
            print(f"Error: {str(e)}")
            return 0.0, 0.0, 0.0

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

    def calculate_edge_similarity(image1, image2):
        # Convert images to grayscale
        gray_image1 = cv2.cvtColor(image1, cv2.COLOR_BGR2GRAY)
        gray_image2 = cv2.cvtColor(image2, cv2.COLOR_BGR2GRAY)

        # Apply Canny edge detector
        edges1 = cv2.Canny(gray_image1, 50, 150)
        edges2 = cv2.Canny(gray_image2, 50, 150)

        # Calculate edge similarity using SSIM
        edge_ssim, _ = ssim(edges1, edges2, full=True)

        return edge_ssim

    def calculate_euclidean_distance_lab(image_lab_1, image_lab_2):
        # Flatten the LAB images
        flat_lab_1 = image_lab_1.reshape((-1,))
        flat_lab_2 = image_lab_2.reshape((-1,))

        # Ensure both flattened arrays have the same shape
        if flat_lab_1.shape != flat_lab_2.shape:
            raise ValueError("Flattened LAB arrays have different shapes.")

        # Calculate Euclidean distance
        euclidean_distance = np.linalg.norm(flat_lab_1 - flat_lab_2)

        return euclidean_distance

    def calculate_ciede2000_color_difference(image_lab_1, image_lab_2):
        # Ensure both LAB images have the same shape
        if image_lab_1.shape != image_lab_2.shape:
            raise ValueError("LAB images have different shapes.")

        # Calculate CIEDE2000 color difference
        ciede2000_color_difference = deltaE_ciede2000(image_lab_1, image_lab_2)

        return np.mean(ciede2000_color_difference)

    def calculate_bhattacharyya_distance(hist_1, hist_2):
        return cv2.compareHist(hist_1, hist_2, cv2.HISTCMP_BHATTACHARYYA)

    def overall_correlation(corr_r, corr_g, corr_b):
        return (corr_r + corr_g + corr_b) / 3

    def calculate_color_delta_lab(color_lab1, color_lab2):
        delta_lab = np.linalg.norm(color_lab1 - color_lab2)
        return delta_lab

    # image_1_np = cv2.imread(image1)
    # image_1_np = cv2.imread(image1)
    image_1_np = image1
    image_2_np = image2

    boxes_1, classes_1 = detect_objects(image_1_np, detection_graph)
    boxes_2, classes_2 = detect_objects(image_2_np, detection_graph)
    print("-----------------------------------------------")
    print(classes_1)
    x1, y1, width1, height1 = boxes_1[0]
    x2, y2, width2, height2 = boxes_2[0]
    jeans_roi_1 = extract_roi(
        image_1_np,
        (x1, y1, width1, height1),
    )
    jeans_roi_2 = extract_roi(
        image_2_np,
        (x2, y2, width2, height2),
    )

    # boxes_1, classes_1 = detect_objects(image_path_1, detection_graph)
    # x1, y1, width1, height1 = boxes_1[0]
    # image_1 = load_image(image_path_1)
    # jeans_roi_1 = extract_roi(image_1, (x1, y1, width1, height1),detection_graph)

    # boxes_2, classes_2 = detect_objects(image_path_2, detection_graph)
    # x2, y2, width2, height2 = boxes_2[0]
    # image_2 = load_image(image_path_2)
    # jeans_roi_2 = extract_roi(image_2, (x2, y2, width2, height2),detection_graph)

    resized_jeans_roi_1, (pad_height_1, pad_width_1) = resize_or_pad_image(jeans_roi_1)
    resized_jeans_roi_2, (pad_height_2, pad_width_2) = resize_or_pad_image(jeans_roi_2)

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
    jeans_color_matching_result = jeans_color_matching_roi(
        resized_jeans_roi_1, resized_jeans_roi_2
    )
    channel_mse_scores = calculate_channel_mse(resized_jeans_roi_1, resized_jeans_roi_2)
    color_balance_match_score = calculate_color_balance_match_score(
        resized_jeans_roi_1, resized_jeans_roi_2
    )
    saturation_difference_score = calculate_saturation_difference(
        convert_to_lab(jeans_roi_1), convert_to_lab(jeans_roi_2)
    )
    euclidean_distance_lab = calculate_euclidean_distance_lab(
        convert_to_lab(resized_jeans_roi_1), convert_to_lab(resized_jeans_roi_2)
    )
    average_color_deviation = calculate_average_color_deviation(
        resized_jeans_roi_1, resized_jeans_roi_2
    )
    luminance_difference_score = calculate_luminance_difference(
        convert_to_lab(jeans_roi_1), convert_to_lab(jeans_roi_2)
    )
    ciede2000_color_difference = calculate_ciede2000_color_difference(
        convert_to_lab(resized_jeans_roi_1), convert_to_lab(resized_jeans_roi_2)
    )
    bhattacharyya_distance_color_histograms = calculate_bhattacharyya_distance(
        extract_color_histogram(resized_jeans_roi_1),
        extract_color_histogram(resized_jeans_roi_2),
    )
    corr_r, corr_g, corr_b = calculate_correlation_roi(
        resized_jeans_roi_1, resized_jeans_roi_2
    )
    overall_correlation_score = overall_correlation(
        *calculate_correlation_roi(resized_jeans_roi_1, resized_jeans_roi_2)
    )
    color_delta_lab = calculate_color_delta_lab(
        convert_to_lab(resized_jeans_roi_1).mean(axis=(0, 1)),
        convert_to_lab(resized_jeans_roi_2).mean(axis=(0, 1)),
    )
    # # Print the results with informative hints
    # image1_base64 = base64.b64encode(image1.tobytes()).decode('utf-8')
    # image2_base64 = base64.b64encode(image2.tobytes()).decode('utf-8')
    # with open('image_data.txt', 'w') as file:
    #     file.write(f"Image 1 Base64:\n{image1_base64}\n\n")
    #     file.write(f"Image 2 Base64:\n{image2_base64}\n\n")
    return {
        'color_similarity_score': color_similarity_score,
        'color_histogram_bhattacharyya_distance': color_histogram_bhattacharyya_distance,
        'color_shade_differences': color_shade_differences,
        'channel_mse_scores': channel_mse_scores,
        'saturation_difference_score': saturation_difference_score,
        'euclidean_distance_lab': euclidean_distance_lab,
        'average_color_deviation': average_color_deviation,
        'luminance_difference_score': luminance_difference_score,
        'ciede2000_color_difference': ciede2000_color_difference,
        'bhattacharyya_distance_color_histograms': bhattacharyya_distance_color_histograms,
        'corr_r': corr_r,
        'corr_g': corr_g,
        'corr_b': corr_b,
        'overall_correlation_score': overall_correlation_score,
        'color_delta_lab': color_delta_lab,
    }
