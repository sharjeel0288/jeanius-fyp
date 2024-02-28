import React from 'react'
import { Box, Button, Container, Flex, Grid, Heading, Stack, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import ClientsList from './component/ClientsList';
import Page from '../../components/Layout/Page';


const Clients = ({ sideBarWidth }) => {
    return (
        <Page sideBarWidth={sideBarWidth}>
            <Heading>Clients</Heading>
            <ClientsList></ClientsList>
        </Page >
    )
}

export default Clients