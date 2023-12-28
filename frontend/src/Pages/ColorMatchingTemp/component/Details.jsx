import { Box, Button, Flex, Image, Input, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import { PiImageSquareFill } from "react-icons/pi";
import { SlReload } from "react-icons/sl";
import { useBgColor } from '../../../utils/constants';

const Details = () => {
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
            <Text
                fontSize="lg"
                fontWeight="semibold"
                textAlign="center"
                my={4}
                bg={useBgColor}
            >
                Image Details
            </Text>
            <TableContainer
                bg={useBgColor}
                borderRadius="lg"
                w="100%"
            >
                <Table>
                    <Thead>
                        <Tr>
                            <Th>Reference</Th>
                            <Th>Score 1</Th>
                            <Th>Score 2</Th>
                            <Th>Score 3</Th>
                            <Th>Score 4</Th>
                            <Th>Score 5</Th>
                            <Th>Score 6</Th>
                            <Th>Score 7</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {results.map((result, index) => (
                            <Tr key={index}>
                                <Td>{result.name}</Td>
                                <Td>{result.score1}</Td>
                                <Td>{result.score2}</Td>
                                <Td>{result.score3}</Td>
                                <Td>{result.score4}</Td>
                                <Td>{result.score5}</Td>
                                <Td>{result.score6}</Td>
                                <Td>{result.score7}</Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default Details