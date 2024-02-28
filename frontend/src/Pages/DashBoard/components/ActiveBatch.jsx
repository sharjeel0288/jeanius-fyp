import { AbsoluteCenter, Box, Center, CircularProgress, CircularProgressLabel, Divider, Flex, HStack, Progress, SimpleGrid, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { theme } from '../../../utils/theme'
import { useBgColor, useTextColor } from '../../../utils/constants';
import { Tooltip } from 'recharts';

const ActiveBatch = ({
    title,
    batchNo,
    progressValue,
    tableItems = []
}) => {
    const backgroundColor = useColorModeValue(theme.colors.background.main, theme.colors.background.child);

    return (
        <Box
            bg={useBgColor}
            py={4}
            px={2}
            borderRadius="lg"
            shadow="lg"
        >
            <Box
                color={useTextColor}
            >
                <Text
                    fontWeight="light"
                    fontSize="xs"
                >
                    {title}
                </Text>
                <Text
                    fontWeight="semibold"
                    color={useTextColor}

                >
                    Batch #{batchNo}
                </Text>
            </Box>

            <Box my={2}>
                <SimpleGrid
                    columns={2}
                    templateColumns="3fr 1fr"
                    alignItems="center"
                >
                    <Box>
                        <Progress
                            size="sm"
                            isIndeterminate
                            borderRadius="lg"
                            colorScheme="green"
                        />
                    </Box>
                    <Center>
                        <CircularProgress value={progressValue} color='green.400'>
                            <CircularProgressLabel>{progressValue}%</CircularProgressLabel>
                        </CircularProgress>
                    </Center>
                </SimpleGrid>
                <Divider
                    my={2}
                    border="0.01px solid gray"
                />
                <Box>
                    <Text
                        fontWeight="light"
                        fontSize="xs"
                    >
                        Recent
                    </Text>
                    <TableContainer>
                        <Table
                        size="sm"
                        >
                            <Thead>
                                <Tr>
                                    <Th>btach #</Th>
                                    <Th>date</Th>
                                    <Th>Progress</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {tableItems.map((item, index) => (
                                    <Tr>
                                        <Td>{item.name}</Td>
                                        <Td>{item.date}</Td>
                                        <Td>
                                            <Progress
                                                value={item.progress}
                                                size="xs"
                                                colorScheme='green' />
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </Box >
    )
}

export default ActiveBatch