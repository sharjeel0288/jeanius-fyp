import { Box, Button, FormControl, FormLabel, SimpleGrid, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react'
import LineGraph from '../../../components/Graphs/LineGraph';
import { empDetails } from './graph';

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
                {/* <Box>
                    <LineGraph
                        color={empDetails.color}
                        icon={empDetails.icon}
                        title={empDetails.title}
                        dataKey1={empDetails.dataKey1}
                        dataKey2={empDetails.dataKey2}
                        chartData={empDetails.graphData}
                    />
                </Box> */}
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
                        <FormLabel>Email</FormLabel>
                        <Text
                            style={textStyles}>
                            {selectedItem.email}
                        </Text>
                    </Box>
                    <Box>
                        <FormLabel>Phone No</FormLabel>
                        <Text
                            style={textStyles}>
                            {selectedItem.phoneNo}
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