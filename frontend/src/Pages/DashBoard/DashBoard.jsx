import { Box, Container } from '@chakra-ui/react'
import React from 'react'

const DashBoard = ({ sideBarWidth }) => {
  return (
    <Box py={8} w="auto" minH="100vh">

      <Container maxW="container.xxl" justifySelf="center">
        <Box
          ml={{ base: 0, lg: sideBarWidth === "small" ? 14 : 60 }}
          transition="margin 0.3s ease"
        >
          Dashboard
        </Box>
      </Container >
    </Box >
  )
}

export default DashBoard