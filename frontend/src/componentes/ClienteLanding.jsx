import React from 'react';
import { Box, Heading, Button, Container, VStack, useColorModeValue } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const ClienteLanding = () => {
    const navigate = useNavigate();
    return (
        <Container maxW={"container.sm"} p={10}>
            <Heading as="h1" textAlign={"center"} mb={8}>Bienvenido, Cliente</Heading>

            <Box p={10} w={"full"} shadow={"md"} bg={useColorModeValue("white","gray.700")} rounded={"lg"}>
                <VStack spacing={4}>
                    <Button w={"full"} colorScheme='blue' onClick={() => navigate('/ver-mis-proyectos')}>
                        Ver mis proyectos
                    </Button>
                </VStack>
            </Box>
    </Container>
    );
};

export default ClienteLanding;
