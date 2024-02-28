import { Box, Button, Container, Flex, Grid, Heading, Stack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react';
import Layout from './component/Layout';
import ActiveBatch from '../DashBoard/components/ActiveBatch';
import { colorMatchingActive, measurementsActive } from '../../utils/dummyData';
import { Link } from 'react-router-dom';
import Page from '../../components/Layout/Page';
import NewBatch from './component/NewBatch';

const ColorMatching = ({ sideBarWidth }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        // <Box minH="90vh" mt={10} maxW="90vw">
        <Page sideBarWidth={sideBarWidth}>
            <Flex justify="space-between">
                <Heading>Color Matching</Heading>
                <Button
                    onClick={onOpen}
                    variant="solid"
                    colorScheme='purple'
                >
                    New Batch
                </Button>
            </Flex>

            <Layout />
            {isOpen && <NewBatch isOpen={isOpen} onClose={onClose} />}
        </Page>
    )
};

export default ColorMatching;
