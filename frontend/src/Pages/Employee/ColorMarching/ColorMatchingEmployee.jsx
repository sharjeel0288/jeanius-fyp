import React from 'react'
import Page from '../../../components/Layout/Page'
import Layout from './component/Layout'
import { Heading } from '@chakra-ui/react'

const ColorMatchingEmployee = ({ sideBarWidth }) => {
    return (
        <Page sideBarWidth={sideBarWidth}>
            <Heading>Color Matching</Heading>
            <Layout />
        </Page>
    )
}

export default ColorMatchingEmployee