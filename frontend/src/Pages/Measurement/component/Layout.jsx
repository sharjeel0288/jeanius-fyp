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

  const [liveImage, setLiveImage] = useState(false);
  const [isFrontCamera, setIsFrontCamera] = useState(false);

  const liveImageRef = useRef(null);
  const mediaStreamRef = useRef(null);

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

  const startCamera = async () => {
    try {
      setLiveImage(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: isFrontCamera ? 'user' : 'environment',
        },
      });
      liveImageRef.current.srcObject = stream;
      mediaStreamRef.current = stream;
    } catch (error) {
      console.error('Error accessing the camera:', error);
    }
  }

  const takePicture = () => {
    if (!mediaStreamRef.current) {
      startCamera();
    } else {
      const canvas = document.createElement('canvas');
      canvas.width = liveImageRef.current.videoWidth;
      canvas.height = liveImageRef.current.videoHeight;
      canvas
        .getContext('2d')
        .drawImage(liveImageRef.current, 0, 0, canvas.width, canvas.height);
      const image = canvas.toDataURL('image/png');
      setSelectedImage(image)
      // setcaptureImageButton("Retake Image");
      stopMediaStream();
      setLiveImage(false);
      stopMediaStream()

      // setCurrentStep(2); // Move to the next step
    }
  };
  const stopMediaStream = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => {
        track.stop();
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
          {liveImage ? (
            <Flex
              direction="column"
              align="center"
              mb={4}
            >
              <video ref={liveImageRef} autoPlay playsInline />
              <Button
                variant="solid"
                colorScheme="green"
                onClick={takePicture}
              >
                Capture Image
              </Button>
            </Flex>

          ) : (
            null
          )}

          <Button
            variant="solid"
            colorScheme="purple"
            onClick={() => {
              setSelectedImage(null);
              setLiveImage(null)
              startCamera()
            }}
            mt={2}
            w="100%"
            leftIcon={<MdCamera />}
            isDisabled={btnLoading}
          >
            {selectedImage ? "Capture Image Again" : "Capture From Camera"}
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
        {
          isProcessing && (
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
          )
        }
      </Flex >
    </Box >
  );
};

export default Layout;
