import { Box, Container, SimpleGrid } from '@chakra-ui/react'
import React from 'react'
import Page from '../../components/Layout/Page'
import ActiveBatch from './components/ActiveBatch'
import { colorMatchingActive, measurementsActive } from '../../utils/dummyData'

const DashBoard = ({ sideBarWidth }) => {
  return (
    <Page sideBarWidth={sideBarWidth}>
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        gap={4}
      >
        <ActiveBatch
          {...colorMatchingActive}
        />
        <ActiveBatch
          {...measurementsActive}
        />
      </SimpleGrid>
    </Page>
  )
}

export default DashBoard