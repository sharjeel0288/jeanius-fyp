import React, { useRef, useState } from 'react'
import { MdUpload } from 'react-icons/md';
import { Badge, Box, Button, Container, Flex, Grid, Heading, Image, Input, SimpleGrid, Stack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack, useColorModeValue } from '@chakra-ui/react';
import Details from './Details';
import Drawers from './Drawer';
import { SlReload } from 'react-icons/sl';
import { PiImageSquareFill } from 'react-icons/pi';
import { useBgColor } from '../../../utils/constants';

const Layout = () => {

    // const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // const handleDrawerOpen = () => {
    //     setIsDrawerOpen(true);
    // };

    // const handleDrawerClose = () => {
    //     setIsDrawerOpen(false);
    // };

    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedImage2, setSelectedImage2] = useState(null);
    const fileInputRef = useRef(null);
    const fileInputRef2 = useRef(null);

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

    const colorMatchingData = {
        "color_similarity_score": 42.76,
        "color_histogram_bhattacharyya_distance": 0.11,
        "color_shade_differences": 3.16,
        "channel_mse_scores_r": 23.89,
        "channel_mse_scores_g": 24.09,
        "channel_mse_scores_b": 25.11,
        "color_balance_match_score": 0.0,
        "saturation_difference_score": 2.7,
        "average_color_deviation": 29.83,
        "luminance_difference_score": 3.14,
        "ciede2000_color_difference": 5.27,
        "bhattacharyya_distance_color_histograms": 0.11,
        "Weighted_Similarity": 0.8
    };
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
                {selectedImage && selectedImage2 && (
                    <Button my={6} variant="solid" colorScheme="green" w="100%">
                        Start Processing
                    </Button>
                )}
            </Box>
            <Box>
                <Flex>
                    <Text>Weighted Similarity:</Text>
                    <Badge>{colorMatchingData.Weighted_Similarity}</Badge>
                </Flex>

                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                    <VStack>
                        <Flex justify="space-between">
                            <Text>Color Similarity Score:</Text>
                            <Text>{colorMatchingData.color_similarity_score}</Text>
                        </Flex>
                        <Flex justify="space-between">
                            <Text>Color Histogram Bhattacharyya Distance:</Text>
                            <Text>{colorMatchingData.bhattacharyya_distance_color_histograms}</Text>
                        </Flex>
                        <Flex justify="space-between">
                            <Text>Color Shade Distance:</Text>
                            <Text>{colorMatchingData.color_shade_differences}</Text>
                        </Flex>
                        <Flex justify="space-between">
                            <Text>Channel MSE Scores (R):</Text>
                            <Text>{colorMatchingData.channel_mse_scores_r}</Text>
                        </Flex>
                        <Flex justify="space-between">
                            <Text>Channel MSE Scores (G):</Text>
                            <Text>{colorMatchingData.channel_mse_scores_g}</Text>
                        </Flex>
                        <Flex justify="space-between">
                            <Text>Channel MSE Scores (B):</Text>
                            <Text>{colorMatchingData.channel_mse_scores_b}</Text>
                        </Flex>

                    </VStack>

                    <VStack>
                        <Flex justify="space-between">
                            <Text>Color Balance Match Score:</Text>
                            <Text>{colorMatchingData.color_balance_match_score}</Text>
                        </Flex>
                        <Flex justify="space-between">
                            <Text>Saturation Difference Score:</Text>
                            <Text>{colorMatchingData.saturation_difference_score}</Text>
                        </Flex>
                        <Flex justify="space-between">
                            <Text>Average Color Deviation:</Text>
                            <Text>{colorMatchingData.average_color_deviation}</Text>
                        </Flex>
                        <Flex justify="space-between">
                            <Text>Luminance Difference Score:</Text>
                            <Text>{colorMatchingData.luminance_difference_score}</Text>
                        </Flex>
                        <Flex justify="space-between">
                            <Text>CIEDE 2000 Color Difference:</Text>
                            <Text>{colorMatchingData.ciede2000_color_difference}</Text>
                        </Flex>
                        <Flex justify="space-between">
                            <Text>Bhattacharyya Distance Color Histogram:</Text>
                            <Text>{colorMatchingData.bhattacharyya_distance_color_histograms}</Text>
                        </Flex>
                    </VStack>
                </SimpleGrid>
            </Box>



        </Box>
    )
}

export default Layout