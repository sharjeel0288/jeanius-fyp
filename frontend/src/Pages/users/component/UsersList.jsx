import React, { useEffect, useState } from "react";
import {
    Box,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    IconButton,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Text,
    useColorModeValue,
    Button,
    InputGroup,
    InputLeftElement,
    Select,
    Flex,
    Input,
    useToast,
    Badge,
    ButtonGroup,
    Skeleton, // Add this import
} from "@chakra-ui/react";
import Drawers from "./Drawers";
// import DeleteAlert from "../../../components/DeleteAlert";

import { FiEdit, FiTrash2 } from "react-icons/fi";
import { HiDotsVertical } from "react-icons/hi";
import {
    BiSearch,
    BiChevronLeft,
    BiChevronRight,
    BiShow,
} from "react-icons/bi";
import { Link } from "react-router-dom";
import { BsFiletypePdf } from "react-icons/bs";
import DeleteAlert from "../../../components/DeleteAlert";
import { employees } from "../../../utils/dummyData";
import { useBgColor } from "../../../utils/constants";


const UsersList = ({ branchNameSearch }) => {
    const borderColor = useColorModeValue("gray.200", "gray.600");
    const [searchTerm, setSearchTerm] = useState("");
    const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedDrawerType, setSelectedDrawerType] = useState("");
    const [selectedItemData, setSelectedItemData] = useState(null);
    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);

    const [InvestorName, setInvestorName] = useState("");

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handleSearchChange = (event) => {
        const searchText = event.target.value?.toLowerCase();
        setSearchTerm(searchText);
    };

    const toast = useToast(); // Initialize useToast
    //   const [users, setusers] = useState([]);

    const filteredItems = employees.filter(
        (item) =>
            (item.fname + " " + item.lname)?.toLowerCase().includes(searchTerm) ||
            item.userName?.toLowerCase().includes(searchTerm) ||
            item.department?.toLowerCase().includes(searchTerm)
        // (selectedBranch === "" || item.branchName === selectedBranch)
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
    const [isLoaded, setIsLoaded] = useState(false);

    const openDrawer = (drawerType, itemData) => {
        setSelectedDrawerType(drawerType);
        setSelectedItemData(itemData);
        setIsDrawerOpen(true);
    };

    const closeDrawer = () => {
        setIsDrawerOpen(false);
        setSelectedDrawerType("");
        setSelectedItemData(null);
    };

    const handleDeleteClick = (item) => {
        setSelectedItemId(item.InvestorId);
        setInvestorName(item.fname + " " + item.lname);
        setIsDeleteAlertOpen(true);
    };

    // Handle confirmation of item deletion
    const handleConfirmDelete = async () => {
        try {
            // Call the API function to delete the Investor with selectedItemId
            //   await deleteInvestorById(selectedItemId);

            // Handle the update or removal of the Investor in your state or data source
            // Example:
            //   fetchusers();

            // Display a success message using useToast
            toast({
                title: "Investor Deleted",
                description: `All data for ${InvestorName} has been deleted.`,
                status: "success",
                position: "top-right",
                duration: 3000,
                isClosable: true,
            });

            // Close the delete confirmation dialog
            setIsDeleteAlertOpen(false);
        } catch (error) {
            // Handle any errors that may occur during deletion
            console.error("Error deleting Investor:", error);

            // Display an error message using useToast
            toast({
                title: "Error",
                description: "Error deleting Investor",
                status: "error",
                duration: 3000,
                position: "top-right",
                isClosable: true,
            });
        }
    };

    return (

        <Box
            bg={useBgColor}
            borderWidth="1px"
            borderColor={borderColor}
            borderRadius="md"
            p={4}
            shadow="md"
            // width="100%"
            // maxW="1500px"
            mx="auto"
        >

            <Flex align="center" mb={4} justify="space-between">
                <Flex align="center" w="50%">
                    <InputGroup w="100%" size={"sm"}>
                        <InputLeftElement
                            pointerEvents="none"
                            color="gray.400"
                            fontSize="1.2em"
                            ml={2}
                        >
                            <BiSearch />
                        </InputLeftElement>
                        <Input
                            placeholder="Search by name, description, or Purchased From"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            borderRadius="0.3rem"
                            py={2}
                            pl={10}
                            pr={3}
                            fontSize="md"
                            mr={4}
                            _placeholder={{ color: "gray.400" }}
                        />
                    </InputGroup>
                </Flex>
                <Flex align="center">
                    <ButtonGroup>
                        {/* <Button
                            variant="outline"
                            colorScheme="blue"
                            leftIcon={<BsFiletypePdf />}
                            // trial balance pdf generation
                            onClick={() => handlePdfDownload()}
                            isDisabled={filteredItems.length > 0 ? false : true}
                        >
                            Trial Balance
                        </Button> */}
                        <Button
                            variant="solid"
                            colorScheme="purple"
                            onClick={() => openDrawer("addNew")}
                        >
                            New Employee
                        </Button>
                    </ButtonGroup>
                </Flex>
            </Flex>

            <Box overflowX="auto">
                <Table variant="simple" size={"sm"}>
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            {/* <Th>address</Th> */}
                            <Th>user name</Th>
                            <Th>role</Th>
                            <Th>department</Th>
                            <Th>joined date</Th>

                            <Th>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {currentItems.map((item) => (
                            <Tr key={item.id}>
                                <Td>{item.fname + " " + item.lname}</Td>
                                {/* <Td>{item.address}</Td> */}
                                <Td>{item.userName}</Td>
                                <Td>{item.role}</Td>
                                <Td>{item.department}</Td>
                                <Td>{item.date}</Td>

                                <Td>
                                    <Menu>
                                        <MenuButton
                                            as={IconButton}
                                            icon={<HiDotsVertical />}
                                            variant="ghost"
                                            size="sm"
                                        />
                                        <MenuList>
                                            <MenuItem
                                                icon={<BiShow />}
                                                onClick={() => openDrawer("show", item)}
                                            >
                                                Show
                                            </MenuItem>
                                            <MenuItem
                                                icon={<FiEdit />}
                                                onClick={() => openDrawer("edit", item)}
                                            >
                                                Edit
                                            </MenuItem>
                                            <MenuItem
                                                icon={<FiTrash2 />}
                                                onClick={() => handleDeleteClick(item)}
                                            >
                                                Delete
                                            </MenuItem>
                                        </MenuList>
                                    </Menu>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </Box>
            <Flex justify="space-between" mt={4} align="center">
                <Box>
                    <IconButton
                        icon={<BiChevronLeft />}
                        isDisabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                        aria-label="Previous Page"
                    />
                    <IconButton
                        icon={<BiChevronRight />}
                        isDisabled={indexOfLastItem >= filteredItems.length}
                        onClick={() => handlePageChange(currentPage + 1)}
                        ml={2}
                        aria-label="Next Page"
                    />
                </Box>
                <Text fontSize="smaller">
                    Page {currentPage} of {Math.ceil(filteredItems.length / itemsPerPage)}
                </Text>
            </Flex>
            <Drawers
                isOpen={isDrawerOpen}
                onClose={closeDrawer}
                drawerType={selectedDrawerType}
                data={selectedItemData}
            //   handleAddUpdateDeleteItem={fetchusers}
            />
            <DeleteAlert
                isOpen={isDeleteAlertOpen}
                onClose={() => setIsDeleteAlertOpen(false)}
                onConfirmDelete={handleConfirmDelete}
                HeaderText={"Delete User"}
                BodyText={`Are you sure you want to delete this ${InvestorName}?`}
            />

        </Box >
    );
};

export default UsersList;
