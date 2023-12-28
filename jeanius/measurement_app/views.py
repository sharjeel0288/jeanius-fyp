# measurement_app/views.py
import base64
import cv2
from django.http import JsonResponse, HttpResponseServerError
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
import numpy as np
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .functions.jeansShadeMatch import color_match_function
from .functions.measurments import process_image
from rest_framework.parsers import MultiPartParser


@require_POST
@csrf_exempt
def measurement_view(request):
    try:
        image = cv2.imdecode(
            np.frombuffer(request.FILES["image"].read(), np.uint8), cv2.IMREAD_COLOR
        )
        reference_height = float(request.POST["reference_height"])

        # Process image and calculate measurements
        results = process_image(image, reference_height)

        return JsonResponse(results, safe=False, status=200)

    except Exception as e:
        error_response = {"error": str(e)}
        return HttpResponseServerError(JsonResponse(error_response, status=500))

@require_POST
@csrf_exempt
def color_match(request):
    try:
        # Assuming "image1" and "image2" are the expected keys for the files
        image1 = cv2.imdecode(
            np.frombuffer(request.FILES["image1"].read(), np.uint8), cv2.IMREAD_COLOR
        )
        image2 = cv2.imdecode(
            np.frombuffer(request.FILES["image2"].read(), np.uint8), cv2.IMREAD_COLOR
        )
        result = color_match_function(image1, image2)
        return JsonResponse(result, safe=False, status=200)

    except Exception as e:
        error_response = {"error": str(e)}
        print(error_response)
        return HttpResponseServerError(JsonResponse(error_response, status=500))
