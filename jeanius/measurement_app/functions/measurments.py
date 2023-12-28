# measurement_app\functions\measurments.py

import base64
import cv2
import numpy as np
from ultralytics import YOLO
import yaml
import os

def load_class_names(yaml_path):
    with open(yaml_path, 'r') as file:
        class_names = yaml.safe_load(file)['names']
    return class_names

def predict_on_image(model, img, conf):
    result = model(img, conf=conf)[0]

    # detection
    cls = result.boxes.cls.cpu().numpy()    # cls, (N, 1)
    probs = result.boxes.conf.cpu().numpy()  # confidence score, (N, 1)
    boxes = result.boxes.xyxy.cpu().numpy()   # box with xyxy format, (N, 4)

    # segmentation
    masks = result.masks.masks.cpu().numpy()     # masks, (N, H, W)
    masks = np.moveaxis(masks, 0, -1) # masks, (H, W, N)
    # rescale masks to the original image
    masks = scale_image(masks.shape[:2], masks, result.masks.orig_shape)
    masks = np.moveaxis(masks, -1, 0) # masks, (N, H, W)

    return boxes, masks, cls, probs



def calculate_measurements(mask, ref_height_pixels, ref_height_cm):
    # Find contours in the binary mask
    contours, _ = cv2.findContours(mask.astype(np.uint8), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    if not contours:
        raise Exception("No contours found.")

    # Combine all individual contours into a single contour
    combined_contour = np.concatenate(contours)

    # Calculate the minimum bounding rectangle of the combined contour
    rect = cv2.minAreaRect(combined_contour)
    area = cv2.contourArea(combined_contour)
    perimeter = cv2.arcLength(combined_contour, True)

    # Get the coordinates of the rectangle vertices
    box = cv2.boxPoints(rect)
    box = np.int0(box)

    # Calculate midpoints
    mid_x = int((box[0][0] + box[2][0]) / 2)
    mid_y = int((box[0][1] + box[2][1]) / 2)

    # Measure distances in different directions
    distances_pixels = [np.linalg.norm(np.array([mid_x, mid_y]) - np.array(point)) for point in box]

    # Convert pixel distances to centimeters
    pixel_to_cm_factor = ref_height_cm / ref_height_pixels
    distances_cm = [distance * pixel_to_cm_factor for distance in distances_pixels]

    # Sort distances in descending order
    sorted_distances_indices = np.argsort(distances_cm)[::-1]
    max_distances_cm = [distances_cm[i] for i in sorted_distances_indices[:3]]

    # Additional points for length measurements
    length_points = [tuple(box[0]), tuple(box[2])]
    length_distances_pixels = [np.linalg.norm(np.array([mid_x, mid_y]) - np.array(point)) for point in length_points]
    length_distances_cm = [distance * pixel_to_cm_factor for distance in length_distances_pixels]

    # Diagonal distances
    diagonal_distances_pixels = [np.linalg.norm(np.array(box[0]) - np.array(box[2])),
                                 np.linalg.norm(np.array(box[1]) - np.array(box[3]))]
    diagonal_distances_cm = [distance * pixel_to_cm_factor for distance in diagonal_distances_pixels]

    # # Visualize the measurements (you can modify this part based on your requirements)
    # visualization = np.zeros_like(mask)
    # cv2.drawContours(visualization, [box], 0, 255, 2)

    # # Display the visualization (you can use this for debugging or further analysis)
    # cv2.imshow("Visualization", visualization)
    # cv2.waitKey(0)
    # cv2.destroyAllWindows()

    return mid_x, mid_y, rect[1][0] * pixel_to_cm_factor, rect[1][1] * pixel_to_cm_factor, max_distances_cm, length_distances_cm, length_points, diagonal_distances_cm, area,perimeter

def scale_image(target_shape, image, original_shape):
    # Rescale the mask to the original image shape
    scale_factor = (original_shape[1] / target_shape[1], original_shape[0] / target_shape[0])
    return cv2.resize(image, (original_shape[1], original_shape[0]))


def process_image(image,reference_height):
    try:

        # Load the YOLO model and class names
        model = YOLO(f'assets/best.pt')
        yaml_path = f'assets/data.yaml'
        class_names = load_class_names(yaml_path)

        # Predict using YOLOv8
        boxes, masks, cls, probs = predict_on_image(model, image, conf=0.55)

        # Create a blank canvas to accumulate visualizations
        total_visualization_img = np.ones_like(image) * 255  # White background
        # Create a list to accumulate class-wise results
        class_results = []
        # Loop over all predicted boxes and measure/visualize distances for each class
        for i, (box, mask, prob) in enumerate(zip(boxes, masks, probs)):
            class_name = class_names[int(cls[i])]
            ref_height_pixels = 100  # Replace with the actual reference height in pixels
            ref_height_cm = reference_height
            mid_x, mid_y, width, height, max_distances, length_distances, length_points, diagonal_distances, area, perimeter = calculate_measurements(mask, ref_height_pixels, ref_height_cm)

            # Visualization code (drawing lines for max distances, diagonals, and height/width in different colors)
            # ... (same visualization code as provided)
            # Visualization code (drawing lines for max distances, diagonals, and height/width in different colors)
            line_color = (0, 0, 255)  # Red lines
            bullet_color = (0, 255, 0)  # Green bullet
            text_color = (0, 255, 0)  # Green text

            # Get a random color for the current instance
            mask_color = tuple(np.random.randint(0, 256, 3))
            total_visualization_img[mask > 0] = mask_color

            # Draw lines for height, width, and diagonals
            cv2.line(total_visualization_img, (int(mid_x), int(box[1])), (int(mid_x), int(box[3])), line_color, 2)  # Line for height
            cv2.line(total_visualization_img, (int(box[0]), int(mid_y)), (int(box[2]), int(mid_y)), line_color, 2)  # Line for width
            cv2.line(total_visualization_img, (int(box[0]), int(box[1])), (int(box[2]), int(box[3])), line_color, 2)  # Left diagonal
            cv2.line(total_visualization_img, (int(box[2]), int(box[1])), (int(box[0]), int(box[3])), line_color, 2)  # Right diagonal

            # Draw bullets for height, width, and diagonals
            bullet_radius = 5
            cv2.circle(total_visualization_img, (int(mid_x), int(box[1])), bullet_radius, bullet_color, -1)  # Bullet for height
            cv2.circle(total_visualization_img, (int(box[2]), int(mid_y)), bullet_radius, bullet_color, -1)  # Bullet for width

            # Draw bullets for max distance points
            for point_index, point in enumerate([(box[0], box[1]), (box[2], box[3]), (mid_x, mid_y)]):
                point_color = (255, 0, 0)  # Blue color for max distance points
                cv2.circle(total_visualization_img, (int(point[0]), int(point[1])), bullet_radius, point_color, -1)  # Bullet for max distance point
                # Display distance as text
                # cv2.putText(total_visualization_img, f"Max Dist {point_index + 1}: {max_distances[point_index]:.2f}",
                #             (int(point[0]) + 10, int(point[1]) - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, text_color, 2)

            # Draw bullets for length measurement points
            for length_point_index, length_point in enumerate(length_points):
                length_point_color = (0, 0, 255)  # Red color for length measurement points
                cv2.circle(total_visualization_img, (int(length_point[0]), int(length_point[1])), bullet_radius, length_point_color, -1)
                # Display length measurement as text
                # cv2.putText(total_visualization_img, f"Length {length_point_index + 1}: {length_distances[length_point_index]:.2f}",
                #             (int(length_point[0]) + 10, int(length_point[1]) - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, text_color, 2)

            # Draw bullets for diagonal measurement points
            for diagonal_point_index, diagonal_point in enumerate([(box[0], box[1]), (box[2], box[3])]):
                diagonal_point_color = (255, 255, 0)  # Yellow color for diagonal measurement points
                cv2.circle(total_visualization_img, (int(diagonal_point[0]), int(diagonal_point[1])), bullet_radius, diagonal_point_color, -1)
                # Display diagonal measurement as text
                # cv2.putText(total_visualization_img, f"Diagonal {diagonal_point_index + 1}: {diagonal_distances[diagonal_point_index]:.2f}",
                #             (int(diagonal_point[0]) + 10, int(diagonal_point[1]) - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, text_color, 2)

            # # Save measurements to the database
            # measurement = Measurement.objects.create(
            #     width=width,
            #     height=height,
            #     distance=diagonal_distances[0],  # You can choose any distance to save based on your requirements
            # )

            # Prepare response data
                # Convert visualization image to base64
            
            pixel_to_cm_factor = ref_height_cm / ref_height_pixels
            radius_cm = width * pixel_to_cm_factor / 2  # Radius calculated from half of the width
            diameter_cm = width * pixel_to_cm_factor  # Diameter is twice the radius
            circumference_cm = 2 * np.pi * radius_cm  # Circumference of a circle
            class_response = {
                # 'message': 'Image processed successfully.',
                # 'visualization_img': total_visualization_img.tolist(),  # Convert to a list for JSON serialization
                # 'visualization_img': img_str,
                'measurements': {
                    'class_name': class_name,
                    'pixel_to_cm_factor': pixel_to_cm_factor,
                },
            }

            # Check if the class is a rivet or button
            if 'rivet' in class_name.lower() or 'button' in class_name.lower():
                # Additional measurements for rivet or button
                class_response['measurements']['radius_cm'] = round(radius_cm,2)
                class_response['measurements']['diameter_cm'] = round(diameter_cm,2)
                class_response['measurements']['circumference_cm'] = round(circumference_cm,2)
                class_response['measurements']['area'] = round(area,2)
                class_response['measurements']['perimeter'] = round(perimeter,2)
            else:
                # Measurements for other classes (as before)
                class_response['measurements']['top_to_bottom_height'] = round(height,2)
                class_response['measurements']['left_width'] = round(width,2)
                class_response['measurements']['right_width'] = round(width,2)
                class_response['measurements']['max_distances'] = {
                    'top_distance': round(max_distances[0],2),
                    'bottom_distance': round(max_distances[1],2),
                    'center_distance': round(max_distances[2],2),
                }
                class_response['measurements']['length_distances'] = {
                    'left_length': round(length_distances[0],2),
                    'right_length': round(length_distances[1],2),
                }
                class_response['measurements']['left_diagonal_distance'] =round( diagonal_distances[0],2)
                class_response['measurements']['right_diagonal_distance'] = round(diagonal_distances[1],2)
                class_response['measurements']['area'] = round(area,2)
                class_response['measurements']['perimeter'] = round(perimeter,2)
            class_results.append(class_response)

        _, img_buffer = cv2.imencode('.png', total_visualization_img)
        img_str = base64.b64encode(img_buffer).decode('utf-8')
        return {
            'image': img_str,
            'message': 'Image processed successfully.',
            'measurements': class_results,
        }, 
    except Exception as e:
         raise {'error': str(e)}
    
