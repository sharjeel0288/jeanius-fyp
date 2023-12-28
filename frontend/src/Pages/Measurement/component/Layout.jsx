import React, { useRef, useState } from "react";
import { MdUpload } from "react-icons/md";
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
// import Drawers from './Drawer';
import Results from "./Results";
import { SlReload } from "react-icons/sl";
import { PiImageSquareFill } from "react-icons/pi";
import { useBgColor, usePlaceholderColor } from "../../../utils/constants";

const Layout = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [cmValue, setCmValue] = useState(1);
  const [formData, setFormData] = useState(new FormData());

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

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
  const [measurementResult, setMeasurementResult] = useState(null);
  const [btnLoading, setBtnLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isloaded, setIsLoaded] = useState(false);

  const toast = useToast();
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
      console.log("Button clicked! Start Processing...");
      setBtnLoading(true);
      setIsProcessing(true);
      setIsLoaded(false);
      const updatedFormData = new FormData();
      const blobImage = await fetch(selectedImage).then((res) => res.blob());
      updatedFormData.append("image", blobImage, "image");
      updatedFormData.append("reference_height", cmValue);
      setFormData(updatedFormData);

      console.log("payload-------------: ", formData);
      const result = await getMeasurements(updatedFormData);
      setMeasurementResult(result);
      toast({
        title: "Processing Successful",
        description: "Image measurment calculated successfully.",
        status: "success",
        duration: 5000,
        position: "top-right",
        isClosable: true,
      });
      setIsLoaded(true);
    } catch (error) {
      console.error("Error in submission:", error);
      // Check if the error response contains a message from the server
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
          bg={useBgColor}
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
          <label htmlFor="fileInput">
            <Button
              variant="solid"
              colorScheme="purple"
              onClick={handleButtonClick}
              mt={2}
              w="100%"
              leftIcon={selectedImage ? <SlReload /> : <PiImageSquareFill />}
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
              _placeholder={{ color: usePlaceholderColor }}
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
              {/* <ImageUpload /> */}
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

      {/* <Drawers isOpen={isDrawerOpen} onClose={handleDrawerClose} /> */}
    </Box>
  );
};

export default Layout;
