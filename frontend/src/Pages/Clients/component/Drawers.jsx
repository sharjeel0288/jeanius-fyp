import React from "react";
import {
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    Button,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import Add from "./Add";
import View from "./View";
import Edit from "./Edit";


const Drawers = ({
    isOpen,
    onClose,
    drawerType,
    data,
    handleAddUpdateDeleteItem, // Renamed function
}) => {
    console.log("Data", data);
    const renderDrawer = () => {
        switch (drawerType) {
            case "addNew":
                return (
                    <Add onClose={onClose} handleAddUpdateDeleteItem={handleAddUpdateDeleteItem} />
                )
            case "show":
                return <View selectedItem={data} onClose={onClose} handleAddUpdateDeleteItem={handleAddUpdateDeleteItem} />;
            case "edit":
                return (
                    <Edit
                        selectedItem={data}
                        onClose={onClose}
                        handleAddUpdateDeleteItem={handleAddUpdateDeleteItem} // Renamed function
                    />
                );
            default:
                return null;
        }
    };

    return (
        <Drawer isOpen={isOpen} placement="right" size="lg" onClose={onClose}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerHeader>
                    <Button
                        leftIcon={<ArrowBackIcon />}
                        onClick={onClose}
                        variant="ghost"
                        alignItems="center"
                        justifyContent="center"
                    />
                    {drawerType === "addNew" && "Add New User"} {/* Updated text */}
                    {drawerType === "show" && "Show User Details"} {/* Updated text */}
                    {drawerType === "edit" && "Edit User Details"} {/* Updated text */}
                </DrawerHeader>
                <DrawerBody>{renderDrawer()}</DrawerBody>
            </DrawerContent>
        </Drawer>
    );
};

export default Drawers;
