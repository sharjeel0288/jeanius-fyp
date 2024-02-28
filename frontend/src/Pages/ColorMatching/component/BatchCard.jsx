import { Box, Divider, Progress, Stat, StatLabel, Text } from '@chakra-ui/react'
import React from 'react'
import { useBgColor } from '../../../utils/constants'

const BatchCard = ({
    batchNo = null,
    client = '',
    employee = "",
    progressValue = 0,
}) => {
    return (
        <Box
            bg={useBgColor}
            px={2}
            py={4}
            borderRadius="lg"
            minW="250px"
            maxW="250px"
        >
            <Text
                fontWeight="semibold"
            >
                Batch #{batchNo}
            </Text>
            <Divider my={2} border="1px solid gray" />
            <Box my={4}>

                <Box>
                    <Text
                        fontSize="2xs"
                        fontWeight="light"
                        mb={-1}
                    >
                        CLIENT
                    </Text>
                    <Text

                    >
                        {client}
                    </Text>
                </Box>
                <Box>
                    <Text
                        fontSize="2xs"
                        fontWeight="light"
                        mb={-1}
                    >
                        EMPLOYEE
                    </Text>
                    <Text

                    >
                        {employee}
                    </Text>
                </Box>
            </Box>

            <Progress
                borderRadius="lg"
                my={2}
                hasStripe
                isAnimated={progressValue < 100 ? true : false}
                value={progressValue}
            />
        </Box>
    )
}

export default BatchCard