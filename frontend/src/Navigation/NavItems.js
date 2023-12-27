import { Flex, Icon, Menu, MenuButton, Text } from '@chakra-ui/react'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const NavItems = ({ navSize, icon, title, path, }) => {
    const location = useLocation();
    const isActive = location.pathname === path;
    return (
        <Flex
            mt={10}
            ml={navSize === "large" && 4}
            direction="column"
            w="100%"
            align={navSize === "small" ? "center" : "start"}
            bg={isActive?"teal.400":"none"}
            transition="background-color 0.3s ease" 
            p={4}
            m={0}
        >
            <Menu
                placement="right"
            >
                <MenuButton
                    as={Link}
                    to={path}
                    p={2}
                    borderRadius="lg"
                    w={navSize === "large" && "100%"}
                >
                    <Flex gap={4} justify="center" align="center" color={isActive?"white":"black"}>
                        <Icon fontSize="xl">{icon}</Icon>
                        <Text display={navSize === "small" ? "none" : "flex"}>{title}</Text>
                    </Flex>
                </MenuButton>
            </Menu>

        </Flex>
    )
}

export default NavItems