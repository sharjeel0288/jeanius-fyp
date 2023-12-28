import { Badge, Box, Center, Flex, HStack, Heading, Icon, Text, VStack, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { useBgColor, useTextColor } from '../../../utils/constants'
import { TbAlertTriangle } from "react-icons/tb";


const Results = ({ imgSelected,measurementsData }) => {
    console.log(measurementsData)
    // const measurements?Data = [
    //     {
    //         "measurements?": {
    //             "class_name": "jeans",
    //             "pixel_to_cm_factor": 0.1,
    //             "top_to_bottom_height": 140.1999755859375,
    //             "left_width": 58.599987792968754,
    //             "right_width": 58.599987792968754,
    //             "max_distances": {
    //                 "top_distance": 75.97697019492158,
    //                 "bottom_distance": 75.97697019492158,
    //                 "center_distance": 75.88471519350917
    //             },
    //             "length_distances": {
    //                 "left_length": 75.97697019492158,
    //                 "right_length": 75.88471519350917
    //             },
    //             "left_diagonal_distance": 151.8616804858948,
    //             "right_diagonal_distance": 151.8616804858948,
    //             "area": 481212.0,
    //             "perimeter": 7636.32445704937
    //         }
    //     },
    //     {
    //         "measurements?": {
    //             "class_name": "front beltwidth",
    //             "pixel_to_cm_factor": 0.1,
    //             "top_to_bottom_height": 9.8,
    //             "left_width": 45.7,
    //             "right_width": 45.7,
    //             "max_distances": {
    //                 "top_distance": 23.418368858654524,
    //                 "bottom_distance": 23.418368858654524,
    //                 "center_distance": 23.320591759215716
    //             },
    //             "length_distances": {
    //                 "left_length": 23.320591759215716,
    //                 "right_length": 23.418368858654524
    //             },
    //             "left_diagonal_distance": 46.738955914739904,
    //             "right_diagonal_distance": 46.738955914739904,
    //             "area": 29070.0,
    //             "perimeter": 1964.0400462150574
    //         }
    //     },
    //     {
    //         "measurements?": {
    //             "class_name": "front fly j",
    //             "pixel_to_cm_factor": 0.1,
    //             "top_to_bottom_height": 3.9000000000000004,
    //             "left_width": 18.8,
    //             "right_width": 18.8,
    //             "max_distances": {
    //                 "top_distance": 9.610411021387172,
    //                 "bottom_distance": 9.610411021387172,
    //                 "center_distance": 9.590099061010788
    //             },
    //             "length_distances": {
    //                 "left_length": 9.590099061010788,
    //                 "right_length": 9.610411021387172
    //             },
    //             "left_diagonal_distance": 19.200260414900626,
    //             "right_diagonal_distance": 19.200260414900626,
    //             "area": 6743.5,
    //             "perimeter": 446.3847759962082
    //         }
    //     },
    //     {
    //         "measurements?": {
    //             "class_name": "front left pocket",
    //             "pixel_to_cm_factor": 0.1,
    //             "top_to_bottom_height": 13.599996948242188,
    //             "left_width": 12.899996948242189,
    //             "right_width": 12.899996948242189,
    //             "max_distances": {
    //                 "top_distance": 9.406912352095134,
    //                 "bottom_distance": 9.406912352095134,
    //                 "center_distance": 9.338094023943002
    //             },
    //             "length_distances": {
    //                 "left_length": 9.338094023943002,
    //                 "right_length": 9.406912352095134
    //             },
    //             "left_diagonal_distance": 18.744865963777922,
    //             "right_diagonal_distance": 18.744865963777922,
    //             "area": 14003.0,
    //             "perimeter": 512.911687374115
    //         }
    //     },
    //     {
    //         "measurements?": {
    //             "class_name": "front right pocket",
    //             "pixel_to_cm_factor": 0.1,
    //             "top_to_bottom_height": 13.293658447265626,
    //             "left_width": 11.943256378173828,
    //             "right_width": 11.943256378173828,
    //             "max_distances": {
    //                 "top_distance": 8.937561188601732,
    //                 "bottom_distance": 8.930845424706444,
    //                 "center_distance": 8.87299273075325
    //             },
    //             "length_distances": {
    //                 "left_length": 8.84816365128946,
    //                 "right_length": 8.930845424706444
    //             },
    //             "left_diagonal_distance": 17.778920102188433,
    //             "right_diagonal_distance": 17.81039022593273,
    //             "area": 12304.0,
    //             "perimeter": 488.911687374115
    //         }
    //     },
    //     {
    //         "measurements?": {
    //             "class_name": "left coin pocket",
    //             "pixel_to_cm_factor": 0.1,
    //             "top_to_bottom_height": 8.200000000000001,
    //             "left_width": 7.5,
    //             "right_width": 7.5,
    //             "max_distances": {
    //                 "top_distance": 5.5901699437494745,
    //                 "bottom_distance": 5.5901699437494745,
    //                 "center_distance": 5.522680508593631
    //             },
    //             "length_distances": {
    //                 "left_length": 5.522680508593631,
    //                 "right_length": 5.5901699437494745
    //             },
    //             "left_diagonal_distance": 11.112605455067682,
    //             "right_diagonal_distance": 11.112605455067682,
    //             "area": 5671.0,
    //             "perimeter": 305.79898953437805
    //         }
    //     },
    //     {
    //         "measurements?": {
    //             "class_name": "front belt loop 1",
    //             "pixel_to_cm_factor": 0.1,
    //             "top_to_bottom_height": 1.8,
    //             "left_width": 8.6,
    //             "right_width": 8.6,
    //             "max_distances": {
    //                 "top_distance": 4.39317652729776,
    //                 "bottom_distance": 4.39317652729776,
    //                 "center_distance": 4.39317652729776
    //             },
    //             "length_distances": {
    //                 "left_length": 4.39317652729776,
    //                 "right_length": 4.39317652729776
    //             },
    //             "left_diagonal_distance": 8.78635305459552,
    //             "right_diagonal_distance": 8.78635305459552,
    //             "area": 964.5,
    //             "perimeter": 202.72792184352875
    //         }
    //     },
    //     {
    //         "measurements?": {
    //             "class_name": "main button",
    //             "pixel_to_cm_factor": 0.1,
    //             "radius_cm": 0.08000000000000002,
    //             "diameter_cm": 0.16000000000000003,
    //             "circumference_cm": 0.5026548245743669
    //         }
    //     },
    //     {
    //         "measurements?": {
    //             "class_name": "front belt loop 2",
    //             "pixel_to_cm_factor": 0.1,
    //             "top_to_bottom_height": 1.8,
    //             "left_width": 7.5,
    //             "right_width": 7.5,
    //             "max_distances": {
    //                 "top_distance": 3.905124837953327,
    //                 "bottom_distance": 3.905124837953327,
    //                 "center_distance": 3.8078865529319543
    //             },
    //             "length_distances": {
    //                 "left_length": 3.8078865529319543,
    //                 "right_length": 3.905124837953327
    //             },
    //             "left_diagonal_distance": 7.712976079309465,
    //             "right_diagonal_distance": 7.712976079309465,
    //             "area": 956.0,
    //             "perimeter": 181.3137083053589
    //         }
    //     }
    // ];

    const summaryData = {
        "overallAccuracy": 88.25,
    }
    return (
        <Box>
            {/* <Flex direction="column">
                <Flex gap={4}>
                    <Text
                        fontSize="2xl"
                        fontWeight="bold"
                    >
                        Status:
                    </Text>
                    <Badge
                        fontSize="xl"
                        variant="outline"
                        colorScheme={summaryData.overallAccuracy > 85 ? "green" : "red"}
                        borderRadius="lg"
                        p={2}
                    >
                        {summaryData.overallAccuracy > 85 ? "PASS" : "REJECTED"}
                    </Badge>
                </Flex>
                <Flex gap={4}>
                    <Text
                        fontSize="2xl"
                        fontWeight="bold"
                    >
                        Overall Accuracy:
                    </Text>
                    <Badge
                        fontSize="xl"
                        variant="outline"
                        colorScheme={summaryData.overallAccuracy > 85 ? "green" : "red"}
                        borderRadius="lg"
                        p={2}
                    >
                        {summaryData.overallAccuracy}%
                    </Badge>
                </Flex>
            </Flex> */}
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
                        {measurementsData[0]?.measurements.map((measurement, index) => (
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
                                    {measurement.measurements?.class_name}
                                </Text>
                               { ((measurement.measurements?.class_name && measurement?.measurements?.class_name.includes("button")))
                                   &&(<Flex

                                    direction="column"
                                >
                                    <Flex
                                        justify="space-between"
                                    >
                                        <Text color={useTextColor}>Pixel To CM factor:</Text>
                                        <Text fontWeight="semibold">{(measurement.measurements?.pixel_to_cm_factor)}</Text>
                                    </Flex>
                                    <Flex
                                        justify="space-between"
                                    >
                                        <Text color={useTextColor}>Radius (cm):</Text>
                                        <Text fontWeight="semibold">{(measurement.measurements?.radius_cm)}</Text>
                                    </Flex>
                                    <Flex
                                        justify="space-between"
                                    >
                                        <Text color={useTextColor}>Diameter (cm):</Text>
                                        <Text fontWeight="semibold">{(measurement.measurements?.diameter_cm)}</Text>
                                    </Flex>
                                    <Flex
                                        justify="space-between"
                                    >
                                        <Text color={useTextColor}>Circumference (cm):</Text>
                                        <Text fontWeight="semibold">{(measurement.measurements?.circumference_cm)}</Text>
                                    </Flex>
                                </Flex>)
                                }
                                {
                                   (!(measurement.measurements?.class_name && measurement?.measurements?.class_name.includes("button")))
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