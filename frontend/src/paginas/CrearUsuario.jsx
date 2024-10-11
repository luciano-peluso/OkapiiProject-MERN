import React, { useState } from 'react';
import axios from 'axios';
import { Button, Input, VStack, Text, Container, Select, useToast } from "@chakra-ui/react";
import Navbar from '../componentes/Navbar';

const CrearUsuario = () => {
    const toast = useToast();
    const [nombre, setNombre] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rol, setRol] = useState('');

    const handleCrearUsuario = async () => {
        try {
            const nuevoUsuario = { nombre, username, password, rol };
            const response = await axios.post('http://localhost:5000/api/usuarios/crear', nuevoUsuario);
            console.log(response.data)
            if (response.data.success) {
                toast({
                    title: 'Usuario creado con éxito.',
                    description: `Nuevo usuario: ${response.data.data.username}!`,
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                  });
            }
         } catch (error) {
            console.error("Error creando usuario:", error);
            toast({
                title: 'Error creando usuario.',
                description: error.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
              });
        }
    };
    
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
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <Input 
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Select 
                    placeholder="Selecciona el rol"
                    value={rol}
                    onChange={(e) => setRol(e.target.value)}
                >
                    <option value="admin">Admin</option>
                    <option value="gerente">Gerente</option>
                    <option value="cliente">Cliente</option>
                </Select>
                
                <Button colorScheme="blue" onClick={handleCrearUsuario}>
                    Crear Usuario
                </Button>
            </VStack>
            </Container>
        </>
    );
};

export default CrearUsuario;
