import { Button, Container, Flex, HStack, useColorMode, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom"
import { IoIosLogOut } from 'react-icons/io';
import { IoMoon } from "react-icons/io5"
import { LuSun } from "react-icons/lu"

const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    const handleLogout = () => {
        localStorage.removeItem('rol');
        window.location.href = '/login';
    };
    
    const rol = localStorage.getItem('rol');

    return(
        <Container maxW={"1140px"} px={4}>
            <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base:"column",
          sm:"row"
        }}
        >
        <Text fontSize={{base:"22", sm:"28"}} fontWeight={"bold"} textAlign={"center"}
          bgGradient={'linear(to-r, cyan.400, blue.500)'} bgClip='text'>
            <Link to={`/${rol}`}>
                Okapii 🚀
            </Link>
        </Text>

        <HStack spacing={2} alignItems={"center"}>
            <Button onClick={handleLogout}>
                <IoIosLogOut />
            </Button> 

          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <IoMoon /> : <LuSun size="20"/> }
          </Button>
        </HStack>
        </Flex>
        </Container>
    );
}

export default Navbar