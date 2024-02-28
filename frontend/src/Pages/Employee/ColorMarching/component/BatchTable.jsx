import { Badge, Box, Progress, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import React from 'react'

const BatchTable = ({
    items = [],
}) => {
    return (
        <Box>
            <TableContainer>
                <Table>
                    <Thead>
                        <Tr>
                            <Th>batch #</Th>
                            <Th>Total Jeans</Th>
                            <Th>Allocated Jeans</Th>
                            <Th>Deadline</Th>
                            <Th>Status</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {items?.map((item, index) => (
                            <Tr>
                                <Td>{item.batchNo}</Td>
                                <Td>{item.totalJeans}</Td>
                                <Td>{item.allocatedJeans}</Td>
                                <Td>{item.deadline}</Td>
                                <Td>
                                    {item.progressValue === 0 ? (
                                        <Badge variant="subtle" colorScheme="orange" px={2}>
                                            Pending
                                        </Badge>

                                    ) : item.progressValue < 100 ? (
                                        <Progress
                                            value={item.progressValue}
                                            borderRadius="lg"
                                            size="sm"
                                            colorScheme="green"
                                            hasStripe
                                            isAnimated
                                        />
                                    ) : (
                                        <Badge variant="subtle" colorScheme="green" px={2}>
                                            Completed
                                        </Badge>
                                    )}
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Box >
    )
}

export default BatchTable