import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
    // breakpoints: {
    //   sm: '30em',
    //   md: '48em',
    //   lg: '62em',
    //   xl: '80em',
    // },
    colors: {
        brand: {
            primary: "#314e89",
            secondary: "#b5e2fa",
        },
        background: {
            main: "#DFCCFB",
            child: "#F6F5F5",
        },
    },
    button: {
        base: {
            fontSize: 'md',
            padding: '12px 24px',
        },
        lg: {
            fontSize: 'lg',
            padding: '16px 32px',
        },
    },
    styles: {
        global: {
            'html, body, p, h1, h2, h3, h4, h5, h6': {
                transition: 'all 0.3s ease-out',
            },
        },
    },
});