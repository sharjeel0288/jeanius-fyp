import { Box, CircularProgress, Flex, Icon, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import React from 'react'
import { useBgColor } from '../../../../utils/constants'
import { CiClock1 } from "react-icons/ci";
import { FaCheck } from 'react-icons/fa6';

import { batchItemsActive, batchItemsCompleted, batchItemsPending } from '../../../../utils/dummyData';
import BatchTable from './BatchTable';


const Layout = () => {
    return (
        <Box>
            <Tabs
                variant='soft-rounded'
                colorScheme='purple'
                // bg={useBgColor}
                isFitted
            >
                <TabList>
                    <Tab>
                        <Flex justify="center" align="center" gap={2}>
                            <Text>
                                In Progress
                            </Text>
                            <CircularProgress
                                isIndeterminate
                                color='green'
                                size="5"
                            />
                        </Flex>
                    </Tab>
                    <Tab
                        color="orange"
                    >
                        <Flex justify="center" align="center" gap={2}>
                            <Text>
                                Pending
                            </Text>
                            <Icon
                                as={CiClock1}
                            />
                        </Flex>
                    </Tab>
                    <Tab
                        color="green"
                    >
                        <Flex justify="center" align="center" gap={2}>
                            <Text>
                                Completed
                            </Text>
                            <Icon
                                as={FaCheck}
                            />
                        </Flex>
                    </Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <BatchTable items={batchItemsActive} />
                    </TabPanel>
                    <TabPanel>
                        <BatchTable items={batchItemsPending} />
                    </TabPanel>
                    <TabPanel>
                        <BatchTable items={batchItemsCompleted  } />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    )
}

export default Layout