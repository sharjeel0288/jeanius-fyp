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
} from "@chakra-ui/react";
// import Drawers from './Drawer';
import Results from "./Results";
import { SlReload } from "react-icons/sl";
import { PiImageSquareFill } from "react-icons/pi";
import { useBgColor } from "../../../utils/constants";

const Layout = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [cmValue, setCmValue] = useState('');
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
    if (/^\d*\.?\d*$/.test(inputValue) || inputValue === '') {
      setCmValue(inputValue); // Update the state with the validated input
    }
  };

  const handleSubmitButtonClick = async () => {
    try {
      console.log('Button clicked! Start Processing...');

      const updatedFormData = new FormData();
      const blobImage = await fetch(selectedImage).then((res) => res.blob());

      // Append the image Blob to FormData
      updatedFormData.append('image', blobImage, 'image');

      // Convert cmValue to a Blob and append it to FormData
      updatedFormData.append('reference_height', cmValue);

      setFormData(updatedFormData);

      console.log("payload-------------: ", formData);

      await getMeasurements(updatedFormData);
    } catch (error) {
      console.error("Error in submission:", error);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  // const measurementsData = [
  //     {
  //         "measurements": {
  //             "class_name": "jeans",
  //             "pixel_to_cm_factor": 0.1,
  //             "top_to_bottom_height": 50.300000000000004,
  //             "left_width": 112.7,
  //             "right_width": 112.7,
  //             "max_distances": {
  //                 "top_distance": 61.773780845922005,
  //                 "bottom_distance": 61.73305435502118,
  //                 "center_distance": 61.68249346451552
  //             },
  //             "length_distances": {
  //                 "left_length": 61.64170666034482,
  //                 "right_length": 61.773780845922005
  //             },
  //             "left_diagonal_distance": 123.41547714934298,
  //             "right_diagonal_distance": 123.41547714934298,
  //             "area": 458443.0,
  //             "perimeter": 6535.561874389648
  //         }
  //     },
  //     {
  //         "measurements": {
  //             "class_name": "belt badge",
  //             "pixel_to_cm_factor": 0.1,
  //             "top_to_bottom_height": 7.2,
  //             "left_width": 4.3,
  //             "right_width": 4.3,
  //             "max_distances": {
  //                 "top_distance": 4.219004621945798,
  //                 "bottom_distance": 4.219004621945798,
  //                 "center_distance": 4.167733196834941
  //             },
  //             "length_distances": {
  //                 "left_length": 4.167733196834941,
  //                 "right_length": 4.219004621945798
  //             },
  //             "left_diagonal_distance": 8.386298349093002,
  //             "right_diagonal_distance": 8.386298349093002,
  //             "area": 3078.0,
  //             "perimeter": 227.65685415267944
  //         }
  //     },
  //     {
  //         "measurements": {
  //             "class_name": "yoke",
  //             "pixel_to_cm_factor": 0.1,
  //             "top_to_bottom_height": 42.6,
  //             "left_width": 4.3,
  //             "right_width": 4.3,
  //             "max_distances": {
  //                 "top_distance": 21.41331361559906,
  //                 "bottom_distance": 21.41331361559906,
  //                 "center_distance": 21.403270778084362
  //             },
  //             "length_distances": {
  //                 "left_length": 21.403270778084362,
  //                 "right_length": 21.41331361559906
  //             },
  //             "left_diagonal_distance": 42.816468794145095,
  //             "right_diagonal_distance": 42.816468794145095,
  //             "area": 4596.0,
  //             "perimeter": 972.1665205955505
  //         }
  //     },
  //     {
  //         "measurements": {
  //             "class_name": "backbelt loop 1",
  //             "pixel_to_cm_factor": 0.1,
  //             "top_to_bottom_height": 1.5,
  //             "left_width": 5.300000000000001,
  //             "right_width": 5.300000000000001,
  //             "max_distances": {
  //                 "top_distance": 2.816025568065745,
  //                 "bottom_distance": 2.7892651361962706,
  //                 "center_distance": 2.720294101747089
  //             },
  //             "length_distances": {
  //                 "left_length": 2.6925824035672523,
  //                 "right_length": 2.816025568065745
  //             },
  //             "left_diagonal_distance": 5.508175741568165,
  //             "right_diagonal_distance": 5.508175741568165,
  //             "area": 777.0,
  //             "perimeter": 133.65685415267944
  //         }
  //     },
  //     {
  //         "measurements": {
  //             "class_name": "backbeltwidth",
  //             "pixel_to_cm_factor": 0.1,
  //             "top_to_bottom_height": 38.1,
  //             "left_width": 3.9000000000000004,
  //             "right_width": 3.9000000000000004,
  //             "max_distances": {
  //                 "top_distance": 19.20442657305862,
  //                 "bottom_distance": 19.19426997830342,
  //                 "center_distance": 19.104973174542803
  //             },
  //             "length_distances": {
  //                 "left_length": 19.09476368012969,
  //                 "right_length": 19.20442657305862
  //             },
  //             "left_diagonal_distance": 38.29908615097755,
  //             "right_diagonal_distance": 38.29908615097755,
  //             "area": 9184.5,
  //             "perimeter": 1099.213203072548
  //         }
  //     },
  //     {
  //         "measurements": {
  //             "class_name": "back left pocket",
  //             "pixel_to_cm_factor": 0.1,
  //             "top_to_bottom_height": 16.6,
  //             "left_width": 16.6,
  //             "right_width": 16.6,
  //             "max_distances": {
  //                 "top_distance": 11.737972567696689,
  //                 "bottom_distance": 11.737972567696689,
  //                 "center_distance": 11.737972567696689
  //             },
  //             "length_distances": {
  //                 "left_length": 11.737972567696689,
  //                 "right_length": 11.737972567696689
  //             },
  //             "left_diagonal_distance": 23.475945135393378,
  //             "right_diagonal_distance": 23.475945135393378,
  //             "area": 23453.5,
  //             "perimeter": 639.9827550649643
  //         }
  //     },
  //     {
  //         "measurements": {
  //             "class_name": "backbelt loop 3",
  //             "pixel_to_cm_factor": 0.1,
  //             "top_to_bottom_height": 1.6,
  //             "left_width": 5.300000000000001,
  //             "right_width": 5.300000000000001,
  //             "max_distances": {
  //                 "top_distance": 2.816025568065745,
  //                 "bottom_distance": 2.816025568065745,
  //                 "center_distance": 2.720294101747089
  //             },
  //             "length_distances": {
  //                 "left_length": 2.720294101747089,
  //                 "right_length": 2.816025568065745
  //             },
  //             "left_diagonal_distance": 5.5362442142665635,
  //             "right_diagonal_distance": 5.5362442142665635,
  //             "area": 820.0,
  //             "perimeter": 135.65685415267944
  //         }
  //     },
  //     {
  //         "measurements": {
  //             "class_name": "back left pocket",
  //             "pixel_to_cm_factor": 0.1,
  //             "top_to_bottom_height": 16.6,
  //             "left_width": 16.6,
  //             "right_width": 16.6,
  //             "max_distances": {
  //                 "top_distance": 11.737972567696689,
  //                 "bottom_distance": 11.737972567696689,
  //                 "center_distance": 11.737972567696689
  //             },
  //             "length_distances": {
  //                 "left_length": 11.737972567696689,
  //                 "right_length": 11.737972567696689
  //             },
  //             "left_diagonal_distance": 23.475945135393378,
  //             "right_diagonal_distance": 23.475945135393378,
  //             "area": 22722.5,
  //             "perimeter": 639.9827550649643
  //         }
  //     }
  // ];

  return (
    <Box>
      <Flex justify="space-between">

      </Flex>
      <Flex
        gap={4}
        direction={{ base: "column", lg: "row" }}
        w="100%"
      >
        <Box
          bg={useBgColor}
          borderRadius="lg"
          p={4}
          minW="20%"
          maxH="400px"
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
              style={{ marginTop: '10px' }}
            />
          )}
          {selectedImage && (
            <Button my={6} variant="solid" colorScheme="green" w="100%" onClick={handleSubmitButtonClick}>
              Start Processing
            </Button>
          )}
        </Box>
        <Box
          flex={4}
        >
          {/* <ImageUpload /> */}
          <Results imgSelected={selectedImage} />
        </Box>
      </Flex>

      {/* <Drawers isOpen={isDrawerOpen} onClose={handleDrawerClose} /> */}
    </Box>
  );
};

export default Layout;
