import React, { useRef, useState } from 'react'
import FullPageModal from '../../../../components/Modal/FullPageModal'
import { Box, Button, Flex, FormControl, FormLabel, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import { textStyles, useBgColor, usePlaceholderColor } from '../../../../utils/constants';
import { clientNames, employeeNames } from '../../../../utils/dummyData';
import { SlReload } from "react-icons/sl";
import { PiImageSquareFill } from "react-icons/pi";

const BatchDetails = () => {
    const [clientName, setClientName] = useState("");
    const [clientNameSearch, setClientNameSearch] = useState("");
    const clientSearchResults = clientNames?.filter((client) =>
        client.name
            .toLocaleLowerCase()
            .includes(clientNameSearch.toLocaleLowerCase())
    );
    const [userName, setUserName] = useState("");
    const [userNameSearch, setUserNameSearch] = useState("");
    const userSearchResults = employeeNames?.filter((user) =>
        user.name
            .toLocaleLowerCase()
            .includes(userNameSearch.toLocaleLowerCase())
    );

    const [cmValue, setCmValue] = useState(1);
    const [formData, setFormData] = useState(new FormData());

    // const handleDrawerOpen = () => {
    //     setIsDrawerOpen(true);
    // };

    // const handleDrawerClose = () => {
    //     setIsDrawerOpen(false);
    // };

    const [selectedImageFront, setSelectedImageFront] = useState(null);
    const [selectedImageBack, setSelectedImageBack] = useState(null);
    const fileInputRefFront = useRef(null);
    const fileInputRefBack = useRef(null);
    const [btnLoading, setBtnLoading] = useState(false);


    const handleImageChangeFront = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImageFront(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };
    const handleImageChangeBack = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImageBack(reader.result);
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
    const handleButtonClickFront = () => {
        fileInputRefFront.current.click();
    };
    const handleButtonClickBack = () => {
        fileInputRefBack.current.click();
    };
    return (
        <Box>
            <FormControl isRequired>
                <SimpleGrid
                    columns={{ base: 1, md: 2 }}
                    gap={2}
                >
                    <Box>
                        <FormLabel>Batch Name</FormLabel>
                        <Input
                            type='text'
                            style={textStyles}
                        />
                    </Box>
                    <Box>
                        <FormLabel>Batch Size</FormLabel>
                        <Input
                            type='number'
                            style={textStyles}
                        />
                    </Box>
                    <Box>
                        <FormLabel>Client Name</FormLabel>
                        <Input
                            type='text'
                            style={textStyles}
                            value={clientName?.name}
                            onChange={(e) => {
                                setClientNameSearch(e.target.value)
                                setClientName(null)
                            }}
                        />
                        {clientNameSearch && clientSearchResults.length > 0 && (
                            <VStack
                                align="start"
                                spacing={2}
                                borderWidth="1px"
                                borderColor="gray.200"
                                borderRadius="md"
                                mt={1}
                            >
                                {clientSearchResults.map((result, index) => (
                                    <Box
                                        key={index}
                                        p={2}
                                        bg={useBgColor}
                                        borderWidth="1px"
                                        borderColor="gray.200"
                                        borderRadius="md"
                                        cursor="pointer"
                                        onClick={() => {
                                            // setFormData({
                                            //     ...formData,
                                            //     sellerName: result?.firstName,
                                            // });
                                            setClientName(result); // Step 4: Set the selected customer object
                                            setClientNameSearch("");
                                        }}
                                    >
                                        {result.name}
                                    </Box>
                                ))}
                            </VStack>
                        )}
                    </Box>
                    <Box>
                        <FormLabel>Assign to Employee</FormLabel>
                        <Input
                            type='text'
                            style={textStyles}
                            value={userName?.name}
                            onChange={(e) => {
                                setUserNameSearch(e.target.value)
                                setUserName(null)
                            }}
                        />
                        {userNameSearch && userSearchResults.length > 0 && (
                            <VStack
                                align="start"
                                spacing={2}
                                borderWidth="1px"
                                borderColor="gray.200"
                                borderRadius="md"
                                mt={1}
                            >
                                {userSearchResults.map((result, index) => (
                                    <Box
                                        key={index}
                                        p={2}
                                        bg={useBgColor}
                                        borderWidth="1px"
                                        borderColor="gray.200"
                                        borderRadius="md"
                                        cursor="pointer"
                                        onClick={() => {
                                            // setFormData({
                                            //     ...formData,
                                            //     sellerName: result?.firstName,
                                            // });
                                            setUserName(result); // Step 4: Set the selected customer object
                                            setUserNameSearch("");
                                        }}
                                    >
                                        {result.name}
                                    </Box>
                                ))}
                            </VStack>
                        )}
                    </Box>
                </SimpleGrid>
            </FormControl>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={2} my={4}>
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
                        Upload Front Image To Process
                    </Text>
                    {selectedImageFront ? (
                        <Flex justify="center">
                            <Image
                                src={selectedImageFront}
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
                            onClick={handleButtonClickFront}
                            mt={2}
                            w="100%"
                            leftIcon={selectedImageFront ? <SlReload /> : <PiImageSquareFill />}
                            isDisabled={btnLoading}
                        >
                            {selectedImageFront ? "Upload Image Again" : "Upload Image"}
                        </Button>
                        <Input
                            id="fileInput"
                            type="file"
                            ref={fileInputRefFront}
                            onChange={handleImageChangeFront}
                            style={{ display: "none" }}
                        />
                    </label>
                    {selectedImageFront && (
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
                </Box>


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
                        Upload Back Image To Process
                    </Text>
                    {selectedImageBack ? (
                        <Flex justify="center">
                            <Image
                                src={selectedImageBack}
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
                            onClick={handleButtonClickBack}
                            mt={2}
                            w="100%"
                            leftIcon={selectedImageBack ? <SlReload /> : <PiImageSquareFill />}
                            isDisabled={btnLoading}
                        >
                            {selectedImageBack ? "Upload Image Again" : "Upload Image"}
                        </Button>
                        <Input
                            id="fileInput"
                            type="file"
                            ref={fileInputRefBack}
                            onChange={handleImageChangeBack}
                            style={{ display: "none" }}
                        />
                    </label>
                    {selectedImageBack && (
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

                </Box>
            </SimpleGrid>
            {selectedImageBack && selectedImageFront && (
                <Button
                    my={6}
                    variant="solid"
                    colorScheme="green"
                    w="100%"
                    // onClick={handleSubmitButtonClick}
                    isLoading={btnLoading}
                >
                    Calculate Measurements
                </Button>
            )}

        </Box>
    )
};

const NewBatch = ({ isOpen, onClose }) => {
    return (
        <FullPageModal
            title="Add New Batch"
            isOpen={isOpen}
            onClose={onClose}
        >
            <BatchDetails />
        </FullPageModal>
    )
}

export default NewBatch