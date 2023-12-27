import React, { useState } from 'react'
import {
    Box,
    Flex,
    Button,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Text,
    useColorModeValue,
    Image,
    InputRightElement,
    IconButton,
    InputGroup,
    useToast,
    useColorMode,
} from "@chakra-ui/react";
import GradientBorder from './GradientBorder';
import logo from "../../Logo/jeans.png"
import { FaEye, FaEyeSlash } from "react-icons/fa";
import signInImage from "./bg.jpg"
import { Link } from 'react-router-dom';


const Login = () => {
    const titleColor = useColorModeValue("black", "white");
    const textColor = useColorModeValue("black", "white");
    const bgColor = useColorModeValue("gray.100", "gray.700");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [btnLoading, setButtonLoading] = useState(false);
    const { colorMode } = useColorMode();
    const toast = useToast();

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };
    return (
        <Flex position="relative" bg={bgColor}>
            <Flex
                minH="max-content"
                h={{ base: "120vh", lg: "fit-content" }}
                w="100%"
                maxW="1044px"
                mx="auto"
                pt={{ sm: "100px", md: "0px" }}
                flexDirection="column"
                me={{ base: "auto", lg: "50px", xl: "auto" }}
            >
                <Flex
                    alignItems="center"
                    justifyContent="start"
                    style={{ userSelect: "none" }}
                    mx={{ base: "auto", lg: "unset" }}
                    ms={{ base: "auto", lg: "auto" }}
                    w={{ base: "100%", md: "50%", lg: "450px" }}
                    px="50px"
                >
                    <Flex
                        direction="column"
                        w="100%"
                        background="transparent"
                        justify="center"
                        align="center"
                        // mt={{ base: "25px", md: "25px", lg: "25px", xl: "25px" }}
                        mb={{ base: "100px", md: "100px", lg: "100px", xl: "100px" }}
                    >
                        <form >
                            <Image boxSize="190px" mb={15} src={logo} />
                            <Heading color={titleColor} fontSize="32px" mb="10px">
                                Nice to see you!
                            </Heading>
                            <Text
                                mb="36px"
                                ms="4px"
                                color={textColor}
                                fontWeight="bold"
                                fontSize="14px"
                            >
                                Enter your email and password to sign in
                            </Text>
                            <FormControl>
                                <FormLabel
                                    ms="4px"
                                    fontSize="sm"
                                    fontWeight="normal"
                                    color={textColor}
                                >
                                    Email
                                </FormLabel>
                                <GradientBorder
                                    mb="24px"
                                    w={{ base: "100%", lg: "fit-content" }}
                                    borderRadius="20px"
                                >
                                    <Input
                                        color={textColor}
                                        bg={bgColor}
                                        border="transparent"
                                        borderRadius="20px"
                                        fontSize="sm"
                                        size="lg"
                                        w={{ base: "100%", md: "346px" }}
                                        maxW="100%"
                                        h="46px"
                                        placeholder="Your email address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </GradientBorder>
                            </FormControl>
                            <FormControl>
                                <FormLabel
                                    ms="4px"
                                    fontSize="sm"
                                    fontWeight="normal"
                                    color={textColor}
                                >
                                    Password
                                </FormLabel>
                                <GradientBorder
                                    mb="24px"
                                    w={{ base: "100%", lg: "fit-content" }}
                                    borderRadius="20px"
                                >
                                    <InputGroup>
                                        <Input
                                            color={textColor}
                                            bg={bgColor}
                                            border="transparent"
                                            borderRadius="20px"
                                            fontSize="sm"
                                            size="lg"
                                            w={{ base: "100%", md: "346px" }}
                                            maxW="100%"
                                            h="46px"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Your password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <InputRightElement width="4.5rem">
                                            <IconButton
                                                size="md"
                                                bg={bgColor}
                                                onClick={handleTogglePassword}
                                                icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                                            />
                                        </InputRightElement>
                                    </InputGroup>
                                </GradientBorder>
                            </FormControl>
                            <Button
                                id="sign-in-button"
                                variant="solid"
                                colorScheme="purple"
                                fontSize="md"
                                type="submit"
                                w="100%"
                                maxW="350px"
                                h="45"
                                mb="20px"
                                mt="20px"
                                // onClick={handleSubmit}
                                isLoading={btnLoading}
                                as={Link}
                                to="/dashboard"
                            >
                                SIGN IN
                            </Button>
                        </form>
                    </Flex>
                </Flex>
                <Box
                    display={{ base: "none", lg: "block" }}
                    overflowX="hidden"
                    h="100%"
                    maxW={{ md: "50vw", lg: "50vw" }}
                    minH="100vh"
                    w="960px"
                    position="absolute"
                    left="0px"
                >
                    <Box
                        bgImage={signInImage}
                        w="100%"
                        h="100%"
                        bgSize="cover"
                        bgPosition="50%"
                        position="absolute"
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                    >

                        <Text
                            textAlign="center"
                            color="white"
                            letterSpacing="8px"
                            fontSize="36px"
                            fontWeight="bold"
                            zIndex={2}
                        >
                            Jeanius Digital
                        </Text>
                        <Text
                            mt={10}
                            textAlign="center"
                            color="white"
                            letterSpacing="8px"
                            fontSize="14px"
                            fontWeight="500"
                            mb={20}
                            zIndex={2}
                        >
                            DESIGNED & DEVELOPED BY{" "}
                            <a
                                href="https://www.cognisoftlabs.com"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                COGNISOFT LABS
                            </a>
                        </Text>
                        <Box
                            w="100%"
                            h="100%"
                            bgSize="cover"
                            bgPosition="50%"
                            position="absolute"
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                            bg="purple.800"
                            opacity="0.5"
                            zIndex={1}
                        >
                        </Box>
                    </Box>
                </Box>
            </Flex>
        </Flex>
    )
}

export default Login