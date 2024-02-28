import React from 'react'
import { Box, Button, Container, Flex, Grid, Heading, Stack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import UsersList from './component/UsersList';


const Users = ({sideBarWidth}) => {
    return (
        <Box py={8} w="auto" minH="100vh">

            <Container maxW="container.xxl" justifySelf="center">
                <Box
                    ml={{ base: 0, lg: sideBarWidth === "small" ? 14 : 60 }}
                    transition="margin 0.3s ease-in-out"
                >
                    <Heading>Employees</Heading>
                    <UsersList></UsersList>
                </Box>
            </Container >
        </Box >
    )
}

export default Users