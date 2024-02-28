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

export const BASE_URL = 'http://localhost:8000'