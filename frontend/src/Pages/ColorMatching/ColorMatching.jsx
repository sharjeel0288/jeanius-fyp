import { Box, Button, Container, Flex, Grid, Heading, Stack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import React, { useState } from 'react';
import Layout from './component/Layout';

const ColorMatching = ({ sideBarWidth }) => {

    return (
        // <Box minH="90vh" mt={10} maxW="90vw">
        <Box py={8} w="auto" minH="100vh">

            <Container maxW="container.xxl" justifySelf="center">
                <Box
                    ml={{ base: 0, lg: sideBarWidth === "small" ? 14 : 60 }}
                    transition="margin 0.3s ease-in-out"
                >
                    <Heading>Color Matching</Heading>

                    <Layout />
                </Box>
            </Container >
        </Box >
    );
};

export default ColorMatching;
