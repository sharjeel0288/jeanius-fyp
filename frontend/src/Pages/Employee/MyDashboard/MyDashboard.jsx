import React from 'react'
import Page from '../../../components/Layout/Page'
import { Center, Heading } from '@chakra-ui/react'

const MyDashboard = ({ sideBarWidth }) => {
    return (
        <Page sideBarWidth={sideBarWidth}>
            <Center>
                <Heading>
                    Coming Soon...
                </Heading>
            </Center>
        </Page>
    )
}

export default MyDashboard