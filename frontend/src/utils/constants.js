import { useColorModeValue } from '@chakra-ui/react';

export const useBgColor = () => {
    const backgroundColor = useColorModeValue("#F4EEFF", "#424874");
    return backgroundColor;
};

export const useTextColor = () => {
    const textColor = useColorModeValue("black", "white");
    return textColor;
}
export const usePlaceholderColor = () => {
    const textColor = useColorModeValue("gray.900", "gray.200");
    return textColor;
}

export const textStyles = {
    border: "1px solid grey",
    backgroundColor: "transparent",
    width: "100%",
    padding: "0.5rem",
    borderRadius: "0.5rem",
};

export const role = localStorage.getItem("role");
export const BASE_URL = 'http://localhost:8000'