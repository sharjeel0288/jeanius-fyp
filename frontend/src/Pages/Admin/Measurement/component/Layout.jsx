import { Box, Flex } from '@chakra-ui/react'
import React from 'react'
import ActiveBatch from '../../../DashBoard/components/ActiveBatch'
import { batchDetails, measurementsActive } from '../../../../utils/dummyData'
import BatchCard from '../../../ColorMatching/component/BatchCard'

const Layout = () => {
    return (
        <Box>
            <ActiveBatch {...measurementsActive} />
            <Flex
                my={4}
                gap={2}
                wrap="wrap"
            >

                {batchDetails.map((item, index) => (
                    <BatchCard {...item} />
                ))}
            </Flex>
        </Box>
    )
}

export default Layout