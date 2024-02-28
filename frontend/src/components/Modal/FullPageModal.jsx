import { CloseIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, IconButton, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text } from '@chakra-ui/react';
import React, { useState } from 'react'
import Confirmation from './Confirmation';

const FullPageModal = ({ title, children, isOpen, onClose }) => {
    const [isConfirmationOpen, setConfirmationOpen] = useState(false);

    return (
        <Box>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                size="full"
                closeOnEsc={false}
                closeOnOverlayClick={false}
                onEsc={() => setConfirmationOpen(true)}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        <Flex
                            justify="space-between"
                        >
                            <Text>
                                {title}
                            </Text>
                            <IconButton
                                icon={<CloseIcon />}
                                variant="unstyled"
                                onClick={() => setConfirmationOpen(true)}
                            />
                        </Flex>
                    </ModalHeader>
                    <ModalBody>
                        {children}
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            variant="outline"
                            colorScheme='red'
                            mr={3}
                            onClick={() => setConfirmationOpen(true)}
                        >
                            Close
                        </Button>
                        <Button
                            variant='solid'
                            colorScheme='purple'
                            onClick={onClose}
                        >
                            Add Batch
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Confirmation
                isOpen={isConfirmationOpen}
                onClose={() => setConfirmationOpen(false)}
                onConfirm={() => {
                    setConfirmationOpen(false)
                    onClose()
                }}
                confirmBtnText="Exit"
                HeaderText="Cancel Batch Add"
                BodyText={`Are you sure you want to exit.
        All details for the batch will be lost.`}
            />
        </Box>
    )
}

export default FullPageModal