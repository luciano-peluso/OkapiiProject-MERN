import { Box, Button, Text, VStack, FormControl, FormLabel, Input, Heading, useToast } from "@chakra-ui/react"
import React, { useState } from "react"

const Login = () => { 
    const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
            },
            body: JSON.stringify({username, password}),
          });

          if(!response.ok){
            throw new Error("Error al iniciar sesión!");
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
      <Box p={5}>
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
    );
}

export default Login