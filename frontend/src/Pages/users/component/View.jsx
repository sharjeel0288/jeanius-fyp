import { Box, Button, FormControl, FormLabel, SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react'

const View = ({ selectedItem, handleAddUpdateDeleteItem, branches, onClose }) => {
    const bgColor = useColorModeValue("gray.100", "gray.700");
    const borderColor = useColorModeValue("gray.200", "gray.600");
    const textStyles = {
        border: "1px solid grey",
        backgroundColor: "transparent",
        width: "100%",
        padding: "0.5rem",
        borderRadius: "0.5rem",
    };
    return (
        <Box>
            <FormControl >
                <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                    <Box>
                        <FormLabel>First Name</FormLabel>
                        <Text
                            style={textStyles}>
                            {selectedItem.fname}
                        </Text>
                    </Box>
                    <Box>
                        <FormLabel>Last Name</FormLabel>
                        <Text
                            style={textStyles}>
                            {selectedItem.lname}
                        </Text>
                    </Box>
                    <Box>
                        <FormLabel>Username</FormLabel>
                        <Text
                            style={textStyles}>
                            {selectedItem.userName}
                        </Text>
                    </Box>
                    <Box>
                        <FormLabel>Password</FormLabel>
                        <Text
                            style={textStyles}>
                            {selectedItem.password}
                        </Text>
                    </Box>
                    <Box>
                        <FormLabel>Dedpartment</FormLabel>
                        <Text
                            style={textStyles}>
                            {selectedItem.department}
                        </Text>
                    </Box>
                    <Box>
                        <FormLabel>Role</FormLabel>
                        <Text
                            style={textStyles}>
                            {selectedItem.role}
                        </Text>
                    </Box>
                    <Box>
                        <FormLabel>Joined Date</FormLabel>
                        <Text
                            style={textStyles}>
                            {selectedItem.date}
                        </Text>
                    </Box>
                </SimpleGrid>
            </FormControl>
            <Button
                onClick={onClose}
                mt={4}
                colorScheme='purple'
                >
                Close
            </Button>
        </Box>
    )
}

export default View