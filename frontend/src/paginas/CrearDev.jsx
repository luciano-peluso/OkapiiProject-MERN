import React, { useState } from 'react';
import axios from 'axios';
import { Button, Input, VStack, Text, Container, Select, useToast } from "@chakra-ui/react";
import Navbar from '../componentes/Navbar';

const CrearDev = () => {
    const toast = useToast();
    const [nombre, setNombre] = useState('');
    const [habilidades, setHabilidades] = useState('');
    const [estado, setEstado] = useState('');

    const handleCrearDev = async () => {
        try {
            const nuevoDev = { nombre, habilidades, estado:"Disponible" };
            const response = await axios.post('http://localhost:5000/api/desarrolladores/crear', nuevoDev);
            if (response.data.success) {
                toast({
                    title: 'Desarrollador creado con éxito.',
                    description: response.data.message,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                  });
            }
         } catch (error) {
            toast({
                title: 'Error creando desarrollador.',
                description: error.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
              });
        }
        limpiarForm();
    };

    const limpiarForm = () => {
        setNombre("");
        setHabilidades("");
    }
    
    return (
        <>
            <Navbar />
            <Container maxW={"1140"}>
            <VStack spacing={4}>
                
                <Input 
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                <Input 
                    placeholder="Habilidades"
                    value={habilidades}
                    onChange={(e) => setHabilidades(e.target.value)}
                />
                <Input 
                    type="estado"
                    placeholder="Disponible"
                    value="Disponible"
                    onChange={(e) => setEstado("Disponible")}
                    disabled
                />
                
                <Button colorScheme="blue" onClick={handleCrearDev}>
                    Crear desarrollador
                </Button>
            </VStack>
            </Container>
        </>
    );
};

export default CrearDev;
