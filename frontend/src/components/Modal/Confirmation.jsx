// src\components\common\Confirmation.jsx
import React from 'react';
import {
    Button,
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
} from '@chakra-ui/react';

function Confirmation({ isOpen, onClose, onConfirm, confirmBtnText, HeaderText, BodyText }) {
    return (
        <AlertDialog isOpen={isOpen} leastDestructiveRef={undefined} onClose={onClose} isCentered>
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        {HeaderText}
                    </AlertDialogHeader>

                    <AlertDialogBody whiteSpace="pre-line">
                        {BodyText}
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button colorScheme="red" onClick={onConfirm} ml={3}>
                            {confirmBtnText}
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
}

export default Confirmation;
