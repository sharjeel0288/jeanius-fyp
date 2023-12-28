import { useColorModeValue } from '@chakra-ui/react';

export const useBgColor = () => {
    const backgroundColor = useColorModeValue("purple.200", "purple.800");
    return backgroundColor;
};
export const useTextColor = () => {
    const textColor = useColorModeValue("gray.600", "gray.300");
    return textColor;
}
export const usePlaceholderColor = () => {
    const textColor = useColorModeValue("gray.900", "gray.200");
    return textColor;
}

export const BASE_URL = 'http://localhost:8000'