import { Badge, Box, Center, Flex, HStack, Heading, Icon, Text, VStack, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { useBgColor, useTextColor } from '../../../utils/constants'
import { TbAlertTriangle } from "react-icons/tb";


const Results = ({ imgSelected,measurementsData }) => {
    console.log(measurementsData)
    return (
        <Box>
            
            {imgSelected ? (
                <Box>
                    <Text
                        fontSize="lg"
                        fontWeight="semibold"
                        textAlign="center"
                        my={4}
                        bg={useBgColor}
                    >
                        Jeans Measurments (Centimeters)
                    </Text>
                    <Flex
                        gap={4}
                        wrap="wrap"
                        justify="space-evenly"
                    >
                        {measurementsData[0]?.measurements?.map((measurement, index) => (
                            <Box
                                key={index}
                                bg={useBgColor}
                                py={4}
                                px={2}
                                borderRadius="md"
                                minW="450px"
                            >
                                <Text
                                    textTransform="capitalize"
                                    fontWeight="semibold"
                                    fontSize="lg"
                                    mb={4}
                                >
                                    {measurement?.measurements?.class_name}
                                </Text>
                               { ((measurement?.measurements?.class_name && measurement?.measurements?.class_name.includes("button")))
                                   &&(<Flex

                                    direction="column"
                                >
                                    <Flex
                                        justify="space-between"
                                    >
                                        <Text color={useTextColor}>Pixel To CM factor:</Text>
                                        <Text fontWeight="semibold">{(measurement?.measurements?.pixel_to_cm_factor)}</Text>
                                    </Flex>
                                    <Flex
                                        justify="space-between"
                                    >
                                        <Text color={useTextColor}>Radius (cm):</Text>
                                        <Text fontWeight="semibold">{(measurement?.measurements?.radius_cm)}</Text>
                                    </Flex>
                                    <Flex
                                        justify="space-between"
                                    >
                                        <Text color={useTextColor}>Diameter (cm):</Text>
                                        <Text fontWeight="semibold">{(measurement?.measurements?.diameter_cm)}</Text>
                                    </Flex>
                                    <Flex
                                        justify="space-between"
                                    >
                                        <Text color={useTextColor}>Circumference (cm):</Text>
                                        <Text fontWeight="semibold">{(measurement?.measurements?.circumference_cm)}</Text>
                                    </Flex>
                                </Flex>)
                                }
                                {
                                   (!(measurement?.measurements?.class_name && measurement?.measurements?.class_name.includes("button")))
                                   && (
                                        <Flex direction="column">
                                            <Flex
                                                justify="space-between"
                                            >
                                                <Text color={useTextColor}>Pixel To CM factor:</Text>
                                                <Text fontWeight="semibold">{(measurement?.measurements?.pixel_to_cm_factor)}</Text>
                                            </Flex>
                                            <Flex
                                                justify="space-between"
                                            >
                                                <Text color={useTextColor}>Top to Bottom Height:</Text>
                                                <Text fontWeight="semibold">{(measurement?.measurements?.top_to_bottom_height)}</Text>
                                            </Flex>
                                            <Flex justify="space-between">
                                                <Text color={useTextColor}>Left Width:</Text>
                                                <Text fontWeight="semibold">{measurement?.measurements?.left_width}</Text>

                                            </Flex>
                                            <Flex justify="space-between">
                                                <Text color={useTextColor}>Right Width:</Text>
                                                <Text fontWeight="semibold">{measurement?.measurements?.right_width}</Text>

                                            </Flex>
                                            <Flex justify="space-between">
                                                <Text color={useTextColor}>Top Distance:</Text>
                                                <Text fontWeight="semibold">{measurement?.measurements?.max_distances?.top_distance}</Text>

                                            </Flex>
                                            <Flex justify="space-between">
                                                <Text color={useTextColor}>Bottom Distance:</Text>
                                                <Text fontWeight="semibold">{measurement?.measurements?.max_distances?.bottom_distance}</Text>

                                            </Flex>
                                            <Flex justify="space-between">
                                                <Text color={useTextColor}>Center Distance:</Text>
                                                <Text fontWeight="semibold">{measurement?.measurements?.max_distances?.center_distance}</Text>

                                            </Flex>
                                            <Flex justify="space-between">
                                                <Text color={useTextColor}>Right Length:</Text>
                                                <Text fontWeight="semibold">{measurement?.measurements?.length_distances?.right_length}</Text>

                                            </Flex>
                                            <Flex justify="space-between">
                                                <Text color={useTextColor}>Left Length:</Text>
                                                <Text fontWeight="semibold">{measurement?.measurements?.length_distances?.left_length}</Text>

                                            </Flex>
                                            <Flex justify="space-between">
                                                <Text color={useTextColor}>Right Diagonal Distance:</Text>
                                                <Text fontWeight="semibold">{measurement?.measurements?.right_diagonal_distance}</Text>

                                            </Flex>
                                            <Flex justify="space-between">
                                                <Text color={useTextColor}>Left Diagonal Distance:</Text>
                                                <Text fontWeight="semibold">{measurement?.measurements?.left_diagonal_distance}</Text>

                                            </Flex>
                                            <Flex justify="space-between">
                                                <Text color={useTextColor}>Area:</Text>
                                                <Text fontWeight="semibold">{measurement?.measurements?.area}</Text>

                                            </Flex>
                                            <Flex justify="space-between">
                                                <Text color={useTextColor}>Perimeter:</Text>
                                                <Text fontWeight="semibold">{measurement?.measurements?.perimeter}</Text>

                                            </Flex>

                                        </Flex>
                                    )}
                            </Box>
                        ))}
                    </Flex>
                </Box>
            ) : (
                <Center>
                    <Flex
                        direction="column"
                        justify="center"
                        align="center"
                    >
                        <Icon as={TbAlertTriangle} fontSize="8xl" color="orange.300" />
                        <Heading>Select Image To Process</Heading>
                    </Flex>
                </Center>
            )
            }
        </Box>
    )
}

export default Results