import React from 'react';
import { Box, VStack, Button, Container, Heading, useColorModeValue } from '@chakra-ui/react';

const GerenteLanding = () => {
    return (
        <Container maxW={"container.sm"} p={10}>
            <Heading as="h1" textAlign={"center"} mb={8}>Bienvenido, Gerente</Heading>

            <Box p={10} w={"full"} shadow={"md"} bg={useColorModeValue("white","gray.700")} rounded={"lg"}>
                <VStack spacing={4}>
                    <Button w={"full"} colorScheme='blue'>
                        Ver Proyectos
                    </Button>
                    <Button w={"full"} colorScheme='blue'>
                        Crear nuevo proyecto
                    </Button>
                </VStack>
            </Box>
        </Container>
    );
};

export default GerenteLanding;
