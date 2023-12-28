import React, { useRef, useState } from 'react'
import { MdInfoOutline, MdUpload } from 'react-icons/md';
import { Badge, Box, Button, Container, Flex, Grid, Heading, Image, Input, SimpleGrid, Stack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tooltip, Tr, VStack, useColorModeValue } from '@chakra-ui/react';
import Details from './Details';
import Drawers from './Drawer';
import { SlReload } from 'react-icons/sl';
import { PiImageSquareFill } from 'react-icons/pi';
import { useBgColor, useTextColor } from '../../../utils/constants';
import { IoIosInformationCircleOutline } from "react-icons/io";
import { calculateImageSimilarity } from '../../../api/colorMatchAPI';


const Layout = () => {
  // const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // const handleDrawerOpen = () => {
  //     setIsDrawerOpen(true);
  // };

  // const handleDrawerClose = () => {
  //     setIsDrawerOpen(false);
  // };

  const [selectedImage1, setSelectedImage] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const fileInputRef = useRef(null);
  const fileInputRef2 = useRef(null);

  const handleImageChange1 = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };
  const handleImageChange2 = (event) => {
    const selectedFile2 = event.target.files[0];
    if (selectedFile2) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage2(reader.result);
      };
      reader.readAsDataURL(selectedFile2);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const handleButtonClick2 = () => {
    fileInputRef2.current.click();
  };

  // const colorMatchingData?? = {
  //     "color_similarity_score": 42.76,
  //     "color_histogram_bhattacharyya_distance": 0.11,
  //     "color_shade_differences": 3.16,
  //     "channel_mse_scores_r": 23.89,
  //     "channel_mse_scores_g": 24.09,
  //     "channel_mse_scores_b": 25.11,
  //     "color_balance_match_score": 0.0,
  //     "saturation_difference_score": 2.7,
  //     "average_color_deviation": 29.83,
  //     "luminance_difference_score": 3.14,
  //     "ciede2000_color_difference": 5.27,
  //     "bhattacharyya_distance_color_histograms": 0.11,
  //     "Weighted_Similarity": 0.8
  // };
  const [loading, setLoading] = useState(false);
  const [colorMatchingData, setcolorMatchingData] = useState(null);
  const handleStartProcessing = async () => {
    try {
      setLoading(true); // Set loading to true before making the API call

      console.log("---------------------");
      const blobImage1 = await fetch(selectedImage1).then((res) => res.blob());
      const blobImage2 = await fetch(selectedImage2).then((res) => res.blob());

      const result = await calculateImageSimilarity(blobImage1, blobImage2);

      console.log("API Result:", result);
      setcolorMatchingData(result);
      // Update state or perform any other actions with the result
    } catch (error) {
      // Handle errors
    } finally {
      setLoading(false); // Set loading back to false after the API call is complete
    }
  };

    // const colorMatchingData? = {
    //     "color_similarity_score": 42.76,
    //     "color_histogram_bhattacharyya_distance": 0.11,
    //     "color_shade_differences": 3.16,
    //     "channel_mse_scores_r": 23.89,
    //     "channel_mse_scores_g": 24.09,
    //     "channel_mse_scores_b": 25.11,
    //     "color_balance_match_score": 0.0,
    //     "saturation_difference_score": 2.7,
    //     "average_color_deviation": 29.83,
    //     "luminance_difference_score": 3.14,
    //     "ciede2000_color_difference": 5.27,
    //     "bhattacharyya_distance_color_histograms": 0.11,
    //     "Weighted_Similarity": 0.8
    // };
    const tooltipInfo = [
        "0.5 indicates a baseline similarity",
        "Closer to 0 is more similar",
        "Lower values indicate closer shades",
        "Lower values indicate a closer match",
        "Lower values indicate a closer match",
        "Lower values indicate a closer match",
        "Greater values indicate a better match",
        "Lower values indicate closer saturation",
        "Lower values indicate a closer match",
        "Closer to 0 indicates similarity",
        "Closer to 0 indicates similarity",
        "Closer to 0 is more similar",
    ];
    return (
        <Box>


            <SimpleGrid
                columns={{ base: 1, lg: 2 }}
                spacing={2}
            >
                <Box
                    bg={useBgColor}
                    borderRadius="lg"
                    p={4}
                    minW="20%"
                    maxH="400px"
                    flex={1}
                >
                    <Text fontSize="lg" fontWeight="semibold">
                        Upload Image To Process
                    </Text>
                    {selectedImage1 ? (
                        <Flex justify="center">
                            <Image
                                src={selectedImage1}
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
                            leftIcon={selectedImage1 ? <SlReload /> : <PiImageSquareFill />}
                        >
                            {selectedImage1 ? "Upload Image Again" : "Upload Image"}
                        </Button>
                        <Input
                            id="fileInput"
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageChange1}
                            style={{ display: "none" }}
                        />
                    </label>

                </Box>
                <Box
                    bg={useBgColor}
                    borderRadius="lg"
                    p={4}
                    minW="20%"
                    maxH="400px"
                    flex={1}
                >
                    <Text fontSize="lg" fontWeight="semibold">
                        Upload Image To Process
                    </Text>
                    {selectedImage2 ? (
                        <Flex justify="center">
                            <Image
                                src={selectedImage2}
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
                            onClick={handleButtonClick2}
                            mt={2}
                            w="100%"
                            leftIcon={selectedImage2 ? <SlReload /> : <PiImageSquareFill />}
                        >
                            {selectedImage2 ? "Upload Image Again" : "Upload Image"}
                        </Button>
                        <Input
                            id="fileInput"
                            type="file"
                            ref={fileInputRef2}
                            onChange={handleImageChange2}
                            style={{ display: "none" }}
                        />
                    </label>
                </Box>
            </SimpleGrid>
            <Box>
                {selectedImage1 && selectedImage2 && (
                    <Button my={6} variant="solid" colorScheme="green" w="100%" onClick={handleStartProcessing } isLoading={loading}>
                        Start Processing
                    </Button>
                )}
            </Box>
            <Box
                bg={useBgColor}
                p={4}
                my={4}
                borderRadius="lg"
            >
                <Flex my={6} gap={2}>
                    <Text
                        fontWeight="semibold"
                        fontSize="2xl"
                    >
                        Weighted Similarity:
                    </Text>
                    <Badge
                        fontSize="2xl"
                        p={1}
                        px={2}
                        variant="outline"
                        borderRadius="lg"
                        colorScheme={colorMatchingData?.Weighted_Similarity >= 0.8 ? "green" : "yellow"}
                    >
                        {colorMatchingData?.Weighted_Similarity}
                    </Badge>
                </Flex>

                <SimpleGrid
                    columns={{ base: 1, md: 2 }}
                    spacing={{ base: 2, md: 10 }}
                >
                    <Flex
                        direction="column"
                        gap={2}
                    >
                        <Flex justify="space-between">
                            <Flex align="center" gap={1}>
                                <Text color={useTextColor}>Color Similarity Score:</Text>
                                <Tooltip label={tooltipInfo[0]} hasArrow bg="purple.600">
                                    <Box>
                                        <MdInfoOutline />
                                    </Box>
                                </Tooltip>
                            </Flex>
                            <Text fontWeight="semibold">{colorMatchingData?.color_similarity_score}</Text>
                        </Flex>

                        <Flex justify="space-between">
                            <Flex align="center" gap={1}>
                                <Text color={useTextColor}>Color Histogram Bhattacharyya Distance:</Text>
                                <Tooltip label={tooltipInfo[1]} hasArrow bg="purple.600">
                                    <Box>
                                        <MdInfoOutline />
                                    </Box>
                                </Tooltip>
                            </Flex>
                            <Text fontWeight="semibold">{colorMatchingData?.bhattacharyya_distance_color_histograms}</Text>
                        </Flex>

                        <Flex justify="space-between">
                            <Flex align="center" gap={1}>
                                <Text color={useTextColor}>Color Shade Distance:</Text>
                                <Tooltip label={tooltipInfo[2]} hasArrow bg="purple.600">
                                    <Box>
                                        <MdInfoOutline />
                                    </Box>
                                </Tooltip>
                            </Flex>
                            <Text fontWeight="semibold">{colorMatchingData?.color_shade_differences}</Text>
                        </Flex>

                        <Flex justify="space-between">
                            <Flex align="center" gap={1}>
                                <Text color={useTextColor}>Channel MSE Scores (R):</Text>
                                <Tooltip label={tooltipInfo[3]} hasArrow bg="purple.600">
                                    <Box>
                                        <MdInfoOutline />
                                    </Box>
                                </Tooltip>
                            </Flex>
                            <Text fontWeight="semibold">{colorMatchingData?.channel_mse_scores_r}</Text>
                        </Flex>

                        <Flex justify="space-between">
                            <Flex align="center" gap={1}>
                                <Text color={useTextColor}>Channel MSE Scores (G):</Text>
                                <Tooltip label={tooltipInfo[4]} hasArrow bg="purple.600">
                                    <Box>
                                        <MdInfoOutline />
                                    </Box>
                                </Tooltip>
                            </Flex>
                            <Text fontWeight="semibold">{colorMatchingData?.channel_mse_scores_g}</Text>
                        </Flex>

                        <Flex justify="space-between">
                            <Flex align="center" gap={1}>
                                <Text color={useTextColor}>Channel MSE Scores (B):</Text>
                                <Tooltip label={tooltipInfo[5]} hasArrow bg="purple.600">
                                    <Box>
                                        <MdInfoOutline />
                                    </Box>
                                </Tooltip>
                            </Flex>
                            <Text fontWeight="semibold">{colorMatchingData?.channel_mse_scores_b}</Text>
                        </Flex>

                    </Flex>

                    <Flex
                        direction="column"
                        gap={2}
                    >
                        <Flex justify="space-between">
                            <Flex align="center" gap={1}>
                                <Text color={useTextColor}>Color Balance Match Score:</Text>
                                <Tooltip label={tooltipInfo[6]} hasArrow bg="purple.600">
                                    <Box>
                                        <MdInfoOutline />
                                    </Box>
                                </Tooltip>
                            </Flex>
                            <Text fontWeight="semibold">{colorMatchingData?.color_balance_match_score}</Text>
                        </Flex>

                        <Flex justify="space-between">
                            <Flex align="center" gap={1}>
                                <Text color={useTextColor}>Saturation Difference Score:</Text>
                                <Tooltip label={tooltipInfo[7]} hasArrow bg="purple.600">
                                    <Box>
                                        <MdInfoOutline />
                                    </Box>
                                </Tooltip>
                            </Flex>
                            <Text fontWeight="semibold">{colorMatchingData?.saturation_difference_score}</Text>
                        </Flex>
                        <Flex justify="space-between">
                            <Flex align="center" gap={1}>
                                <Text color={useTextColor}>Average Color Deviation:</Text>
                                <Tooltip label={tooltipInfo[8]} hasArrow bg="purple.600">
                                    <Box>
                                        <MdInfoOutline />
                                    </Box>
                                </Tooltip>
                            </Flex>
                            <Text fontWeight="semibold">{colorMatchingData?.average_color_deviation}</Text>
                        </Flex>
                        <Flex justify="space-between">
                            <Flex align="center" gap={1}>
                                <Text color={useTextColor}>Luminance Difference Score:</Text>
                                <Tooltip label={tooltipInfo[9]} hasArrow bg="purple.600">
                                    <Box>
                                        <MdInfoOutline />
                                    </Box>
                                </Tooltip>
                            </Flex>
                            <Text fontWeight="semibold">{colorMatchingData?.luminance_difference_score}</Text>
                        </Flex>
                        <Flex justify="space-between">
                            <Flex align="center" gap={1}>
                                <Text color={useTextColor}>CIEDE 2000 Color Difference:</Text>
                                <Tooltip label={tooltipInfo[10]} hasArrow bg="purple.600">
                                    <Box>
                                        <MdInfoOutline />
                                    </Box>
                                </Tooltip>
                            </Flex>
                            <Text fontWeight="semibold">{colorMatchingData?.ciede2000_color_difference}</Text>
                        </Flex>
                        <Flex justify="space-between">
                            <Flex align="center" gap={1}>
                                <Text color={useTextColor}>Bhattacharyya Distance Color Histogram:</Text>
                                <Tooltip label={tooltipInfo[11]} hasArrow bg="purple.600">
                                    <Box>
                                        <MdInfoOutline />
                                    </Box>
                                </Tooltip>
                            </Flex>
                            <Text fontWeight="semibold">{colorMatchingData?.bhattacharyya_distance_color_histograms}</Text>
                        </Flex>
                    </Flex>
                </SimpleGrid>
            </Box>



        </Box >
    )
}


export default Layout;
