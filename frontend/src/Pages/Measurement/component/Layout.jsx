import React, { useRef, useState } from "react";
import { MdCamera, MdUpload } from "react-icons/md";
import { getMeasurements } from "../../../api/measurementAPI";
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Image,
  Input,
  Skeleton,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { IoReload } from "react-icons/io5";
import Results from "./Results";


const Layout = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [cmValue, setCmValue] = useState(1);
  const [formData, setFormData] = useState(new FormData());
  const [selectedImage, setSelectedImage] = useState(null);
  const [measurementResult, setMeasurementResult] = useState(null);
  const [btnLoading, setBtnLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isloaded, setIsLoaded] = useState(false);

  const fileInputRef = useRef(null);
  const toast = useToast();

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleMeasurementChange = (event) => {
    const inputValue = event.target.value;
    if (/^\d*\.?\d*$/.test(inputValue) || inputValue === "") {
      setCmValue(inputValue); // Update the state with the validated input
    }
  };

  const captureFromCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.createElement('video');
      video.srcObject = stream;
      video.autoplay = true; // Add this line to ensure the video starts playing automatically
      video.play();
  
      // Create a container to display the camera stream
      const cameraContainer = document.createElement('div');
      cameraContainer.appendChild(video);
      document.body.appendChild(cameraContainer);
  
      // Create a button to capture an image
      const captureButton = document.createElement('button');
      captureButton.textContent = 'Capture Image';
      captureButton.addEventListener('click', () => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setSelectedImage(dataUrl);
        // Stop the video stream
        stream.getTracks().forEach(track => track.stop());
        // Remove the camera container
        cameraContainer.remove();
      });
      cameraContainer.appendChild(captureButton);
    } catch (error) {
      console.error('Error capturing image from camera:', error);
      toast({
        title: 'Error Capturing Image',
        description: 'An error occurred while capturing image from camera.',
        status: 'error',
        duration: 5000,
        position: 'top-right',
        isClosable: true,
      });
    }
  };
  

  const handleSubmitButtonClick = async () => {
    try {
      if (cmValue <= 0 || cmValue === "" || parseFloat(cmValue) <= 0) {
        toast({
          title: "Invalid Distance",
          description:
            "Please enter a valid distance between the camera and the jeans.",
          status: "error",
          duration: 5000,
          position: "top-right",
          isClosable: true,
        });
        return;
      }
      setBtnLoading(true);
      setIsProcessing(true);
      setIsLoaded(false);
      const updatedFormData = new FormData();
      const blobImage = await fetch(selectedImage).then((res) => res.blob());
      updatedFormData.append("image", blobImage, "image");
      updatedFormData.append("reference_height", cmValue);
      setFormData(updatedFormData);

      const result = await getMeasurements(updatedFormData);
      setMeasurementResult(result);
      toast({
        title: "Processing Successful",
        description: "Image measurement calculated successfully.",
        status: "success",
        duration: 5000,
        position: "top-right",
        isClosable: true,
      });
      setIsLoaded(true);
    } catch (error) {
      console.error("Error in submission:", error);
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while processing the image.";

      toast({
        title: "Error Processing Image",
        description: errorMessage,
        status: "error",
        duration: 5000,
        position: "top-right",
        isClosable: true,
      });
      setIsProcessing(false);
    } finally {
      setBtnLoading(false);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <Box>
      <Flex justify="space-between"></Flex>
      <Flex gap={4} direction={{ base: "column", lg: "row" }} w="100%">
        <Box
          borderRadius="lg"
          p={4}
          minW="20%"
          maxH="450px"
          minH="400px"
          flex={1}
        >
          <Text fontSize="lg" fontWeight="semibold">
            Upload Image To Process
          </Text>
          {selectedImage ? (
            <Flex justify="center">
              <Image
                src={selectedImage}
                alt="Uploaded Preview"
                boxSize="200px"
                loading="lazy"
                mt={2}
              />
            </Flex>
          ) : (
            <Text>No image selected</Text>
          )}
          <Button
            variant="solid"
            colorScheme="purple"
            onClick={captureFromCamera}
            mt={2}
            w="100%"
            leftIcon={<MdCamera />}
            isDisabled={btnLoading}
          >
            Capture From Camera
          </Button>
          <label htmlFor="fileInput">
            <Button
              variant="solid"
              colorScheme="purple"
              onClick={handleButtonClick}
              mt={2}
              w="100%"
              leftIcon={selectedImage ? <IoReload /> : <MdUpload />}
              isDisabled={btnLoading}
            >
              {selectedImage ? "Upload Image Again" : "Upload Image"}
            </Button>
            <Input
              id="fileInput"
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </label>
          {selectedImage && (
            <Input
              type="text"
              value={cmValue}
              onChange={handleMeasurementChange}
              placeholder="Enter length in cm"
              mt={4}
              borderColor="purple.500"
              isDisabled={btnLoading}
            />
          )}
          {selectedImage && (
            <Button
              my={6}
              variant="solid"
              colorScheme="green"
              w="100%"
              onClick={handleSubmitButtonClick}
              isLoading={btnLoading}
            >
              Start Processing
            </Button>
          )}
        </Box>
        {isProcessing && (
          <Skeleton
            isLoaded={isloaded}
            startColor="purple.200"
            endColor="purple.300"
            fadeDuration={0.6}
          >
            <Box flex={4}>
              {measurementResult && (
                <Results
                  imgSelected={selectedImage}
                  measurementsData={measurementResult}
                />
              )}
            </Box>
          </Skeleton>
        )}
      </Flex>
    </Box>
  );
};

export default Layout;
