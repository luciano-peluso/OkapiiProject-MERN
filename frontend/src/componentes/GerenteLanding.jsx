import React from 'react';
import { Box, VStack, Button, Container, Heading, useColorModeValue, Grid } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const GerenteLanding = () => {
    const navigate = useNavigate();
    return (
        <Container maxW={"container.sm"} p={10}>
            <Heading as="h1" textAlign={"center"} mb={8}>Bienvenido, Gerente</Heading>

            <Box p={10} w={"full"} shadow={"md"} bg={useColorModeValue("white","gray.700")} rounded={"lg"}>
                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                    <Button w={"full"} colorScheme='blue' onClick={() => navigate('/ver-proyectos')}>
                        Ver Proyectos
                    </Button>
                    <Button w={"full"} colorScheme='blue' onClick={() => navigate('/crear-proyecto')}>
                        Crear nuevo proyecto
                    </Button>
                </Grid>
            </Box>
        </Container>
    );
};

export default GerenteLanding;
