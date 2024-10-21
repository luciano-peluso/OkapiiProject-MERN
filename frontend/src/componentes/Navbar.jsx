import { Button, Container, Flex, HStack, useColorMode, Text, Link as ChakraLink, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom"
import { IoIosLogOut } from 'react-icons/io';
import { IoMoon } from "react-icons/io5"
import { ChevronDownIcon } from "@chakra-ui/icons";
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
        {/* Mostrar links según el rol */}
        <HStack spacing={4}   >
        {usuario.rol === 'admin' && (
          <>
              <Menu>
                  <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                      Usuarios
                  </MenuButton>
                  <MenuList>
                      <MenuItem as={Link} to="/ver-usuarios">
                          Ver Usuarios
                      </MenuItem>
                      <MenuItem as={Link} to="/crear-usuario">
                          Crear Usuario
                      </MenuItem>
                  </MenuList>
              </Menu>
              <Menu>
                  <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                      Desarrolladores
                  </MenuButton>
                  <MenuList>
                      <MenuItem as={Link} to="/ver-desarrolladores">
                          Ver desarrolladores
                      </MenuItem>
                      <MenuItem as={Link} to="/crear-desarrollador">
                          Crear desarrollador
                      </MenuItem>
                      <MenuItem as={Link} to="/asignar-desarrollador">
                          Asignar desarrollador
                      </MenuItem>
                  </MenuList>
              </Menu>
          </>
      )}
                    {usuario.rol === 'gerente' && (
                        <>
                        <Menu>
                          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                            Proyectos
                          </MenuButton>
                          <MenuList>
                            <MenuItem as={Link} to="/ver-proyectos">
                              Ver Proyectos
                            </MenuItem>
                            <MenuItem as={Link} to="/crear-proyecto">
                                Crear Proyectos
                            </MenuItem>
                          </MenuList>
                        </Menu>
                        </>
                    )}
                    {usuario.rol === 'cliente' && (
                      <>
                        <Menu>
                          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                            Proyectos
                          </MenuButton>
                          <MenuList>
                            <MenuItem as={Link} to="/ver-mis-proyectos">
                              Ver MIS Proyectos
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </>
                    )}
                </HStack>

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