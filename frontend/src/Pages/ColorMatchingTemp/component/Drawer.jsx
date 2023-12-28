import { Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, Text, Flex, Button, Image, IconButton } from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import { IoSave } from 'react-icons/io5';
import { MdOutlineDelete } from "react-icons/md";
import { PiPlus } from 'react-icons/pi';



const Drawers = ({ isOpen, onClose }) => {
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

    return (
        <Drawer isOpen={isOpen} onClose={onClose} placement="right" size="lg">
            <DrawerOverlay>
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Reference Images</DrawerHeader>
                    <DrawerBody>
                        <Flex direction="column">
                            <Text fontWeight="semibold" textAlign="center" my={4}>
                                Upload Reference Images
                            </Text>
                            <Button
                                onClick={handleButtonClick}
                                colorScheme='blue'
                                variant="outline"
                                leftIcon={<PiPlus/>}
                            >
                                Add Photo
                            </Button>
                            {images.length>0 &&
                                <Button
                                    my={2}
                                    colorScheme='green'
                                    leftIcon={<IoSave/>}
                                    onClick={()=>onClose()}
                                >
                                    Save
                                </Button>
                            }
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
                                        <Image src={imageUrl} boxSize="100px" loading="lazy"/>
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
                    </DrawerBody>
                </DrawerContent>
            </DrawerOverlay>
        </Drawer>
    );
};

export default Drawers;
