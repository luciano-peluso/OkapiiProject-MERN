import { Box, Button, Text, VStack, FormControl, FormLabel, Input, Heading, useToast, Container, useColorModeValue } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";

const Login = () => { 
  const navigate = useNavigate();

    useEffect(() => {
        // Verificar si hay un rol en localStorage
        const rol = localStorage.getItem('rol');

        // Si existe un rol, redirigir al dashboard correspondiente
        if (rol) {
            switch (rol) {
                case 'admin':
                    navigate('/admin');
                    break;
                case 'gerente':
                    navigate('/gerente');
                    break;
                case 'cliente':
                    navigate('/cliente');
                    break;
                default:
                    // Si el rol no es válido o está mal definido, puedes redirigir a una página de login
                    navigate('/login');
                    break;
            }
        }
    }, [navigate]);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', {username, password});

        // Si el login es exitoso
    if (response.data.success) {
        const { rol } = response.data.data;

        // Guardar los datos en localStorage
        localStorage.setItem('rol', rol);

        // Redirigir según el rol
        if (rol === 'admin') {
            window.location.href = '/admin';
        } else if (rol === 'gerente') {
            window.location.href = '/gerente';
        } else if (rol === 'cliente') {
            window.location.href = '/cliente';
        }
    } else {
        console.error('Error al iniciar sesión:', response.data.message);
    }

      const data = await response.json();
      toast({
        title: 'Inicio de sesión exitoso.',
        description: `Bienvenido, ${data.username}!`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error.',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }
    return(  
      <Container maxW={"container.md"} mt={"10vh"}>
      <Box maxW={"3xl"} p={10} shadow={"base"} bg={useColorModeValue("white","gray.900")} rounded={"lg"}>
      <Heading as="h1" size="xl" mb={4}>
        Iniciar sesión
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel htmlFor="username">Nombre de usuario</FormLabel>
            <Input
              id="username"
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Introduce tu nombre de usuario"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="password">Contraseña</FormLabel>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Introduce tu contraseña"
            />
          </FormControl>
          <Button colorScheme="teal" type="submit">
            Iniciar sesión
          </Button>
        </VStack>
      </form>
    </Box>
    </Container>
    );
}

export default Login