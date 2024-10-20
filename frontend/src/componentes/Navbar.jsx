import { Button, Container, Flex, HStack, useColorMode, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom"
import { IoIosLogOut } from 'react-icons/io';
import { IoMoon } from "react-icons/io5"
import { LuSun } from "react-icons/lu"

const Navbar = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    const handleLogout = () => {
        localStorage.removeItem('usuario');
        window.location.href = '/login';
    };
    
    const usuario = JSON.parse(localStorage.getItem('usuario'));

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
            <Link to={`/${usuario.rol}`}>
                Okapii 🚀
            </Link>
        </Text>
        {/* Agregar componentes específicos para cada rol. Ej: Admin -> Usuarios: desplegable - CRUD, devs: desplegable CRUD */}
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