import { Flex, Box, Heading, Button, ChakraProvider, Container } from '@chakra-ui/react';
import SideBar from './Navigation/SideBar';
import { Navigate, Route, Routes } from 'react-router-dom';
import DashBoard from './Pages/DashBoard/DashBoard';
import ColorMatching from './Pages/ColorMatching/ColorMatching';
import Measurements from './Pages/Measurement/Measurements';
import { useState } from 'react';
import Users from './Pages/users/Users';
import Login from './Pages/Login/Login';
// ... other imports

function App() {
  const userType = "admin";
  const [isLoggedIn, setIsLoggedIn] = useState(null); // Use null as initial state
  const [sideBarWidth, setSideBarWidth] = useState("small");


  const handleSidebarWidth = () => {
    setSideBarWidth(prevWidth => (prevWidth === "small" ? "large" : "small"));
  }

  // if (!isLoggedIn) {
  //   return (
  //     <ChakraProvider >
  //       <Routes>
  //         <Route path="/" element={<Login />} />
  //         <Route path="/*" element={<Login />} />
  //       </Routes>
  //     </ChakraProvider>
  //   );
  // }

  if (userType === "admin") {
    return (
      <ChakraProvider>
        <SideBar sideBarWidth={sideBarWidth} handleSidebarWidth={handleSidebarWidth} />
        <Routes>
          <Route path='/' element={<Navigate to="/sign-in" />} />
          <Route path='/sign-in' element={<Login />} />
          <Route path='/dashboard' element={<DashBoard sideBarWidth={sideBarWidth} />} />
          <Route path='/color-matching' element={<ColorMatching sideBarWidth={sideBarWidth} />} />
          <Route path='/measurements' element={<Measurements sideBarWidth={sideBarWidth} />} />
          <Route path='/users' element={<Users sideBarWidth={sideBarWidth} />} />
          <Route path='/*' element={<DashBoard />} />
        </Routes>
      </ChakraProvider>
    );
  } else {
    return (
      <ChakraProvider>
        <Box p={4} bg="gray.100" shadow="md" borderRadius="md">
          <Heading size="md">Welcome User!</Heading>
          {/* User specific content */}
          <Button colorScheme="green">User Button</Button>
        </Box>
      </ChakraProvider>
    );
  }
}

export default App;
