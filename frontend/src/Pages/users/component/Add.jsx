import { Box, Button, ButtonGroup, Flex, FormControl, FormLabel, Input, Select, SimpleGrid, useColorModeValue, useToast } from '@chakra-ui/react'
import React from 'react'

const Add = ({
    handleAddUpdateDeleteItem,
    selectedItem,
    branches,
    onClose,
}) => {
    const bgColor = useColorModeValue("gray.100", "gray.700");
    const borderColor = useColorModeValue("gray.200", "gray.600");
    const textStyles = {
        border: "1px solid grey",
        backgroundColor: "transparent",
        width: "100%",
        padding: "0.5rem",
        borderRadius: "0.5rem",
    };
    const toast = useToast();

    const roles = ["Employee", "Head"];
    const deparments = ["Color Matching", "Measurements"]
    return (
        <Box>
            <FormControl isRequired>
                <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>

                    <Box>
                        <FormLabel>First Name</FormLabel>
                        <Input
                            type='text'
                            style={textStyles}
                        />
                    </Box>
                    <Box>
                        <FormLabel>Last Name</FormLabel>
                        <Input
                            type='text'
                            style={textStyles}
                        />
                    </Box>
                    <Box>
                        <FormLabel>Username</FormLabel>
                        <Input
                            type='text'
                            style={textStyles}
                        />
                    </Box>
                    <Box>
                        <FormLabel>Password</FormLabel>
                        <Input
                            type='text'
                            style={textStyles}
                        />
                    </Box>
                    <Box>
                        <FormLabel>Department</FormLabel>
                        <Select placeholder='Select user department'>
                            {deparments.map((department, index) => (
                                <option value={department}>{department}</option>
                            ))}
                        </Select>
                    </Box>
                    <Box>
                        <FormLabel>Role</FormLabel>
                        <Select placeholder='Select user role'>
                            {roles.map((role, index) => (
                                <option value={role}>{role}</option>
                            ))}
                        </Select>
                    </Box>
                    <Box>
                        <FormLabel>Joined Date</FormLabel>
                        <Input
                            type='date'
                            style={textStyles}
                        />
                    </Box>
                </SimpleGrid>
                <ButtonGroup mt={4}>
                    <Button
                        variant="outline"
                        colorScheme="red"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="solid"
                        colorScheme="purple"
                    >
                        Add Investor
                    </Button>
                </ButtonGroup>
            </FormControl>
        </Box>
    )
}

export default Add