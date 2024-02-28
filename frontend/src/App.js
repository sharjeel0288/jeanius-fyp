import { Flex, Box, Heading, Button, ChakraProvider, Container, Center, Spinner } from '@chakra-ui/react';
import SideBar from './Navigation/SideBar';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import DashBoard from './Pages/DashBoard/DashBoard';
import ColorMatching from './Pages/ColorMatching/ColorMatching';
import Measurements from './Pages/Measurement/Measurements';
import { useEffect, useState } from 'react';
import Users from './Pages/users/Users';
import Login from './Pages/Login/Login';
import ColorMatchingTemp from './Pages/ColorMatchingTemp/ColorMatchingTemp';
// ... other imports
import CryptoJS from 'crypto-js';
import Clients from './Pages/Clients/Clients';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null); // Use null as initial state
  const location = useLocation();

  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "isUserLoggedIn") {
        setIsLoggedIn(event.newValue === "true");
      }
    };
    window.addEventListener("storage", handleStorageChange);
    const userIsLoggedIn = localStorage.getItem("isUserLoggedIn");
    setIsLoggedIn(userIsLoggedIn === "true");
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const allowedPaths = [
    "/dashboard",
    "/color-matching-future",
    "color-matching",
    "measurements",
    "/users",
    "/*",
    // Add more allowed paths as needed
  ];

  // const showHeaderFooter = allowedPaths.includes(location.pathname);
  const [sideBarWidth, setSideBarWidth] = useState("large");

  const handleSidebarWidth = () => {
    setSideBarWidth(prevWidth => (prevWidth === "small" ? "large" : "small"));
  }
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === "isUserLoggedIn") {
        setIsLoggedIn(event.newValue === "true");
      }
    };
    window.addEventListener("storage", handleStorageChange);
    const userIsLoggedIn = localStorage.getItem("isUserLoggedIn");
    setIsLoggedIn(userIsLoggedIn === "true");
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const encryptedData = localStorage.getItem("encryptedData");
  const Name = localStorage.getItem("Name");
  const secretKey = "sT#9yX^pQ&$mK!2wF@8zL7vA"; // Replace with your own secret key

  let department = ""; // Initialize the department variable

  if (encryptedData) {
    try {
      // Decrypt the data
      const decryptedData = CryptoJS.AES.decrypt(
        encryptedData,
        secretKey
      ).toString(CryptoJS.enc.Utf8);

      if (decryptedData) {
        // Data successfully decrypted, assign it to the department variable
        department = decryptedData;
      } else {
        // Handle the case where decryption resulted in empty data
        console.error("Decryption resulted in empty data");
      }
    } catch (error) {
      // Handle decryption errors
      console.error("Decryption error:", error);
    }
  } else {
    // Handle the case where 'encryptedData' is not found in local storage
    console.error("Item not found in local storage");
  }


  if (isLoggedIn === null) {
    // Still checking the login status, show a loading spinner or any loading indicator
    return (
      <Center>
        <Spinner

          thickness='4px'
          speed='0.65s'

          emptyColor='gray.200'
          color='blue.500'
          size='xl'
        />
      </Center>
    );
  }
  if (!isLoggedIn) {
    return (
      <ChakraProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/*" element={<Login />} />
        </Routes>
      </ChakraProvider>
    );
  }
  return (
    <ChakraProvider>
      {isLoggedIn && (
        <>
          {<SideBar sideBarWidth={sideBarWidth} handleSidebarWidth={handleSidebarWidth} />}
          <Routes>
            {department === "admin" && (
              <>
                <Route path='/' element={<Navigate to="/dashboard" />} />
                {/* <Route path='/sign-in' element={<Login />} /> */}
                <Route path='/dashboard' element={<DashBoard sideBarWidth={sideBarWidth} />} />
                {/* <Route path='/color-matching-future' element={<ColorMatching sideBarWidth={sideBarWidth} />} /> */}
                <Route path='/color-matching' element={<ColorMatching sideBarWidth={sideBarWidth} />} />
                {/* <Route path='/color-matching' element={<ColorMatchingTemp sideBarWidth={sideBarWidth} />} /> */}
                <Route path='/measurements' element={<Measurements sideBarWidth={sideBarWidth} />} />
                <Route path='/users' element={<Users sideBarWidth={sideBarWidth} />} />
                <Route path='/clients' element={<Clients sideBarWidth={sideBarWidth} />} />
                <Route path='/*' element={<DashBoard />} />
              </>
            )}
            {department === "employee" && (
              <>
                <Route path='/' element={<Navigate to="/dashboard" />} />
                {/* <Route path='/sign-in' element={<Login />} /> */}
                <Route path='/dashboard' element={<DashBoard sideBarWidth={sideBarWidth} />} />
                <Route path='/color-matching-future' element={<ColorMatching sideBarWidth={sideBarWidth} />} />
                {/* <Route path='/color-matching' element={<ColorMatchingTemp sideBarWidth={sideBarWidth} />} /> */}
                {/* <Route path='/measurements' element={<Measurements sideBarWidth={sideBarWidth} />} /> */}
                {/* <Route path='/users' element={<Users sideBarWidth={sideBarWidth} />} /> */}
                <Route path='/*' element={<DashBoard />} />
              </>
            )}
          </Routes>
        </>
      )}
    </ChakraProvider>
  );


}

export default App;
