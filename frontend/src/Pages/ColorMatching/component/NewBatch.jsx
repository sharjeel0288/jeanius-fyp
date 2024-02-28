import React, { useRef, useState } from 'react'
import Page from '../../../components/Layout/Page'
import { Box, Button, Flex, FormControl, FormLabel, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import Confirmation from '../../../components/Modal/Confirmation';
import { CloseIcon } from '@chakra-ui/icons';
import { IoSave } from 'react-icons/io5';
import { MdOutlineDelete } from "react-icons/md";
import { PiPlus } from 'react-icons/pi';
import { textStyles, useBgColor } from '../../../utils/constants';
import { clientNames, employeeNames } from '../../../utils/dummyData';
import FullPageModal from '../../../components/Modal/FullPageModal';

const BatchDetails = () => {
    const [images, setImages] = useState([]);
    const inputRef = useRef(null);

    const handleImageChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        const selectedImages = selectedFiles.map((file) => URL.createObjectURL(file));
        setImages([...images, ...selectedImages]);
    };

    const handleButtonClick = () => {
        inputRef.current.click();
    };

    const handleRemoveImage = (index) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
    };

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
            <Flex direction="column">
                <Text fontWeight="semibold" textAlign="center" my={4}>
                    Upload Reference Images
                </Text>
                <Button
                    onClick={handleButtonClick}
                    colorScheme='blue'
                    variant="outline"
                    leftIcon={<PiPlus />}
                >
                    Add Photo
                </Button>
                {/* {images.length > 0 &&
                <Button
                my={2}
                colorScheme='green'
                leftIcon={<IoSave />}
                // onClick={() => onClose()}
                >
                Save
                </Button>
            } */}
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                />
                <Flex wrap="wrap" mt={4}>
                    {images.map((imageUrl, index) => (
                        <Flex key={index} m={2} position="relative">
                            <Image src={imageUrl} boxSize="100px" loading="lazy" />
                            <IconButton
                                icon={<MdOutlineDelete />}
                                aria-label="Remove Image"
                                size="sm"
                                colorScheme="red"
                                onClick={() => handleRemoveImage(index)}
                                position="absolute"
                                top={-2}
                                right={-2}
                            />
                        </Flex>
                    ))}
                </Flex>
            </Flex>
        </Box>
    )
}


const NewBatch = ({ isOpen, onClose }) => {
    const [isConfirmationOpen, setConfirmationOpen] = useState(false);
    return (
        <FullPageModal
            title="New batch"
            isOpen={isOpen}
            onClose={onClose}
            >
            <BatchDetails />
        </FullPageModal>
    )
}

export default NewBatch