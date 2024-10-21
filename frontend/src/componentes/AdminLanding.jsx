import React from 'react';
import { Box, Button, Container, Grid, Heading, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const AdminLanding = () => {
    const navigate = useNavigate();
    return (
        <Container maxW={"container.sm"} p={10}>
            <Heading as="h1" textAlign={"center"} mb={8}>Bienvenido, Administrador</Heading>

            <Box p={10} w={"full"} shadow={"md"} bg={useColorModeValue("white", "gray.700")} rounded={"lg"}>
                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                    <Button 
                        w={"full"} 
                        colorScheme='blue'
                        onClick={() => navigate("/ver-usuarios")}
                    >
                        Ver Usuarios
                    </Button>
                    <Button 
                        w={"full"} 
                        colorScheme='blue' 
                        onClick={() => navigate("/crear-usuario")}
                    >
                        Crear nuevo usuario
                    </Button>
                    <Button 
                        w={"full"} 
                        colorScheme='blue' 
                        onClick={() => navigate("/ver-desarrolladores")}
                    >
                        Ver desarrolladores
                    </Button>
                    <Button 
                        w={"full"} 
                        colorScheme='blue' 
                        onClick={() => navigate("/crear-desarrollador")}
                    >
                        Crear nuevo desarrollador
                    </Button>
                </Grid>
                    <Button 
                        w={"full"} 
                        colorScheme='blue' 
                        onClick={() => navigate("/asignar-desarrollador")}
                        mt={4}
                    >
                        Asignar desarrollador a proyecto
                    </Button>
            </Box>
        </Container>
    );
};

export default AdminLanding;
