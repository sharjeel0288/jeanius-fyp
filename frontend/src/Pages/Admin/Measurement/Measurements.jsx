import React from 'react'
import Page from '../../../components/Layout/Page'
import { Button, Flex, Heading, useDisclosure } from '@chakra-ui/react'
import NewBatch from './component/NewBatch'
import Layout from './component/Layout'

const Measurements = ({ sideBarWidth }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <Page sideBarWidth={sideBarWidth}>
            <Flex justify="space-between">

                <Heading>Measurements</Heading>
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
}

export default Measurements