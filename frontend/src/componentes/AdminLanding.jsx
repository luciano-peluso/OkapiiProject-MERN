import React from 'react';
import { Box, Button, Container, Heading, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const AdminLanding = () => {
    const navigate = useNavigate();
    return (
        <Container maxW={"container.sm"} p={10}>
            <Heading as="h1" textAlign={"center"} mb={8}>Bienvenido, Administrador</Heading>

            <Box p={10} w={"full"} shadow={"md"} bg={useColorModeValue("white","gray.700")} rounded={"lg"}>
                <VStack spacing={4}>
                    <Button 
                        w={"full"} 
                        colorScheme='blue'
                        onClick={() => navigate("/ver-usuarios")}
                    >
                        Ver Usuarios
                    </Button>
                    <Button w={"full"} colorScheme='blue' onClick={() => navigate("/crear-usuario")}>
                        Crear nuevo usuario
                    </Button>
                    <Button w={"full"} colorScheme='blue' onClick={() => navigate("/ver-desarrolladores")}>
                        Ver desarrolladores
                    </Button>
                    <Button w={"full"} colorScheme='blue' onClick={() => navigate("/crear-desarrollador")}>
                        Crear nuevo desarrollador
                    </Button>
                    <Button w={"full"} colorScheme='blue' onClick={() => navigate("/asignar-desarrollador")}>
                        Asignar desarrollador a proyecto
                    </Button>
                </VStack>
            </Box>
        </Container>
    );
};

export default AdminLanding;
