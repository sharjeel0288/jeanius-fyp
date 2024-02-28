import { Box, Button, Flex, HStack, Icon, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { BiPurchaseTag } from 'react-icons/bi';
import { FaArrowDown, FaArrowUp, FaBox } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



const LineGraph = ({
    color,
    icon,
    title,
    dataKey1,
    dataKey2,
    number,
    percentage,
    chartData,
    link
}) => {

    const bgColor = useColorModeValue("white", "gray.600");

    return (
        <Box
            bg={bgColor}
            borderRadius="lg"
            shadow="md"
            p={4}
            minH="150px"
            w="100%"
        >
            <Flex
                w="100%"
                h="100%"
                direction="column"
            >
                <Flex
                    direction="column"
                    justify="space-between"
                    align="start"
                    flex={2}

                >
                    <HStack align="center" gap={0.5}>
                        <Icon fontSize="xl" color={color} as={icon} />
                        <Text
                            fontWeight="semibold"
                        // fontSize="lg"
                        >
                            {title}
                        </Text>
                    </HStack>
                </Flex>
                <Flex
                    w="100%"
                    minH="100%"
                >
                    <ResponsiveContainer width="99%" height="100%">
                        <LineChart
                            data={chartData}
                        // width={500}
                        // height={300}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            {/* <XAxis dataKey="name" /> */}
                            {/* <YAxis /> */}
                            <Tooltip
                                contentStyle={{ background: "transparent", border: "none" }}
                                labelStyle={{ display: "none" }}
                                position={{ x: 0, y: -20 }}
                            />
                            {/* <Legend /> */}
                            <Line
                                type="monotone"
                                dataKey={dataKey1}
                                stroke={color}
                                strokeWidth={2}
                            // dot={false}
                            />
                            <Line
                                type="monotone"
                                dataKey={dataKey2}
                                stroke={color}
                                strokeWidth={2}
                            // dot={false}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                    {/* <Text
                        fontWeight="bold"
                        fontSize="lg"
                        color={percentage > 0 ? "limegreen" : "red"}

                    >
                        {percentage}%
                    </Text>
                    <HStack>
                        {percentage > 0 ?
                            <FaArrowUp color='limegreen' /> : <FaArrowDown color='red' />
                        }
                        <Text
                            fontWeight="hairline"
                            fontSize="sm"
                        >
                            this month
                        </Text>
                    </HStack> */}
                </Flex>
            </Flex>

        </Box>
    )
}

export default LineGraph