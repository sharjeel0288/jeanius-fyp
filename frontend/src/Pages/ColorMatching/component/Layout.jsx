import React, { useRef, useState } from 'react'
import { MdUpload } from 'react-icons/md';
import { Box, Button, Container, Flex, Grid, Heading, Image, Input, Stack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue, useDisclosure } from '@chakra-ui/react';
import Details from './Details';
import Drawers from './Drawer';
import { SlReload } from 'react-icons/sl';
import { PiImageSquareFill } from 'react-icons/pi';
import { useBgColor } from '../../../utils/constants';
import NewBatch from './NewBatch';
import BatchCard from './BatchCard';
import { batchDetails, colorMatchingActive } from '../../../utils/dummyData';
import ActiveBatch from '../../DashBoard/components/ActiveBatch';

const Layout = () => {
    const results = [
        {
            name: "reference image 1",
            score1: 15.0,
            score2: 1.0,
            score3: 25.0,
            score4: 55.0,
            score5: 95.0,
            score6: 5.0,
            score7: 65.0,
        },
        {
            name: "reference image 2",
            score1: 10.0,
            score2: 2.0,
            score3: 30.0,
            score4: 60.0,
            score5: 90.0,
            score6: 10.0,
            score7: 70.0,
        },
        {
            name: "reference image 3",
            score1: 12.0,
            score2: 3.0,
            score3: 28.0,
            score4: 50.0,
            score5: 85.0,
            score6: 8.0,
            score7: 62.0,
        },
        {
            name: "reference image 4",
            score1: 18.0,
            score2: 1.5,
            score3: 20.0,
            score4: 57.0,
            score5: 92.0,
            score6: 6.0,
            score7: 68.0,
        },
        {
            name: "reference image 5",
            score1: 14.0,
            score2: 2.5,
            score3: 22.0,
            score4: 53.0,
            score5: 88.0,
            score6: 7.0,
            score7: 60.0,
        },
    ];
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };
    return (
        <Box>
            <ActiveBatch {...colorMatchingActive} />
            <Flex
                my={4}
                gap={2}
                wrap="wrap"
            >

                {batchDetails.map((item, index) => (
                    <BatchCard {...item} />
                ))}
            </Flex>

            <Flex
                gap={4}
                direction={{ base: "column", lg: "row" }}
                w="100%"
            >
                {/* <Box
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
                    {selectedImage && (
                        <Button my={6} variant="solid" colorScheme="green" w="100%">
                            Start Processing
                        </Button>
                    )}
                </Box> */}
                <Box
                    flex={4}
                >
                    <Details />    

                </Box>
            </Flex>



        </Box>
    )
}

export default Layout