import React, { useState } from "react";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Image,
  Tooltip,
  useColorMode,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
} from "react-icons/fi";
import { IconType } from "react-icons";
import { IoHomeOutline } from "react-icons/io5";
import { TbRulerMeasure, TbColorSwatch } from "react-icons/tb";
import { Link, useLocation } from "react-router-dom";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import { FaUserPlus } from "react-icons/fa6";

import logo from "../Logo/jeans.png";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const LinkItems = [
  { name: "DashBoard", icon: IoHomeOutline, to: "/" },
  { name: "Color Matching", icon: TbColorSwatch, to: "/color-matching" },
  { name: "Measurements", icon: TbRulerMeasure, to: "/measurements" },
  { name: "Users", icon: FaUserPlus, to: "/users" },
  // { name: 'Favourites', icon: FiStar },
  // { name: 'Settings', icon: FiSettings },
];

const SidebarContent = ({
  sideBarWidth,
  handleSidebarWidth,
  onClose,
  ...rest
}) => {
  return (
    <Box
      transition=".3s ease-in-out"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={sideBarWidth === "small" ? "60px" : { base: "full", lg: 60 }}
      pos="fixed"
      h="full"
      overflowY="scroll"
      css={{
        "&::-webkit-scrollbar": {
          display: "none", // Hide scrollbar for WebKit-based browsers
        },
        scrollbarWidth: "none", // Hide scrollbar for Firefox
        "-ms-overflow-style": "none", // Hide scrollbar for IE and Edge
      }}
      overflowX="hidden"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx={2} justifyContent="space-between">
        <IconButton
          icon={
            sideBarWidth === "small" ? (
              <GoSidebarCollapse />
            ) : (
              <GoSidebarExpand />
            )
          }
          variant="ghost"
          colorScheme="purple"
          display={{ base: "none", lg: "flex" }}
          onClick={handleSidebarWidth}
        />
        <Image
          src={logo}
          boxSize="44px"
          loading="lazy"
          display={sideBarWidth === "small" ? "none" : "block"}
        />
        <CloseButton display={{ base: "flex", lg: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <Link to={link.to}>
          <NavItem
            key={link.name}
            to={link.to}
            sideBarWidth={sideBarWidth}
            icon={link.icon}
          >
            {link.name}
          </NavItem>
        </Link>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, to, sideBarWidth, ...rest }) => {
  const location = useLocation(); // Get the current location

  // Determine if the current link matches the current route
  const isActive = location.pathname === to;
  return (
    <Box
      as="a"
      href="#"
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        // mx="4"
        ml={2}
        borderRadius="lg"
        role="group"
        cursor="pointer"
        bg={isActive ? "purple.500" : "none"}
        color={isActive ? "white" : "inherit"}
        _hover={{
          bg: "purple.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Tooltip
            hasArrow
            shouldWrapChildren
            label={children}
            placement="right"
            bg="purple.600"
            display={sideBarWidth === "small" ? "flex" : "none"}
          >
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: "white",
              }}
              as={icon}
            />
          </Tooltip>
        )}
        <Box display={sideBarWidth === "small" ? "none" : "block"}>
          {children}
        </Box>
      </Flex>
    </Box>
  );
};

const MobileNav = ({
  onOpen,
  sideBarWidth,
  handleColorModeToggle,
  ...rest
}) => {
  const { colorMode } = useColorMode();
  // const logo = colorMode === "light" ? LogoBlack : LogoWhite;

  return (
    <Flex
      // ml={{ base: 0, lg: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      // justifyContent={{ base: 'space-between', lg: 'flex-end' }}
      justifyContent={{ base: "space-between", lg: "space-between" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", lg: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Flex>
        <Image
          src={logo}
          boxSize="44px"
          // w={150}
          loading="lazy"
          ml={sideBarWidth === "large" ? "250px" : "70px"}
          display={{
            base: "none",
            lg: sideBarWidth === "small" ? "flex" : "none",
          }}
          transition={"margin 0.3s ease-in-out"}
        />
      </Flex>

      <HStack spacing={{ base: "0", md: "6" }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <IconButton
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          onClick={handleColorModeToggle}
          aria-label="Toggle color mode"
          style={
            colorMode === "light"
              ? { backgroundColor: "#fff" }
              : { backgroundColor: "#fff0" }
          }
        />
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar size={"sm"} name="admin" src={""} />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">Admin</Text>
                  <Text fontSize="xs" color="gray.600">
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

const SideBar = ({ sideBarWidth, handleSidebarWidth }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { toggleColorMode } = useColorMode(); // Fetch color mode and its toggle function

  const handleColorModeToggle = () => {
    // Toggle color mode based on the current colorMode
    toggleColorMode();
  };
  return (
    <Box bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        sideBarWidth={sideBarWidth}
        handleSidebarWidth={handleSidebarWidth}
        onClose={() => onClose}
        display={{ base: "none", md: "none", lg: "block" }}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="sm"
      >
        <DrawerContent>
          <SidebarContent
            sideBarWidth="large"
            onClose={onClose}
            onClick={onClose}
          />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav
        sideBarWidth={sideBarWidth}
        onOpen={onOpen}
        handleColorModeToggle={handleColorModeToggle}
        onClose={onClose}
      />
    </Box>
  );
};

export default SideBar;
