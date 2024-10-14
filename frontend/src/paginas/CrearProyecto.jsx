import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Button, Box, Input, VStack, Text, Container, Select, useColorModeValue, useToast } from "@chakra-ui/react";
import Navbar from "../componentes/Navbar";
import ClientePage from "./ClientePage";


const CrearProyecto = () => {
    const toast = useToast();

    /* Estos son los arrays que se usan para traer los correspondientes para el desplegable */
    const [devs, setDevs] = useState([]);
    const [clientes, setClientes] = useState([]);

    /* Y estos son los campos para llenar un proyecto */
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [estado, setEstado] = useState('Esperando aprobación');
    const [clienteSeleccionado, setClienteSeleccionado] = useState('');
    const [desarrollador, setDesarrollador] = useState('');

    const handleCrearProyecto = async () => {
        try {
            const nuevoProyecto = { nombre, descripcion, estado, cliente: clienteSeleccionado, desarrollador }
            const response = await axios.post('http://localhost:5000/api/proyectos/crear', nuevoProyecto);
            if(response.data.data.success){
                toast({
                    title: "Proyecto creado con exito",
                    description: "Nuevo proyecto: " + response.data.data.nombre,
                    status: 'success',
                    duration: 5000,
                    isClosable: true
                });

                const responseDev = await axios.put('http://localhost:5000/api/desarrolladores/editar/'+ desarrollador, {estado: "Ocupado"});
                console.log("Response Dev: ", responseDev)
                /*if (responseDev.data.success) {
                    toast({
                        title: "Estado del desarrollador actualizado",
                        description: "El estado del desarrollador ha sido cambiado a 'Ocupado'.",
                        status: 'success',
                        duration: 5000,
                        isClosable: true
                    });
                } else {
                    toast({
                        title: "Error al actualizar el estado del desarrollador.",
                        description: responseDev.data.message,
                        status: "error",
                        duration: 5000,
                        isClosable: true
                    });
                }*/
            }
            limpiarForm();
        } catch(error) {
            console.error(error);
            toast({
                title: "Error.",
                description: error.message,
                status:"error",
                duration: 5000,
                isClosable: true
            })
        }
    }

    const traerDevs = async () => {
        try{
            const response = await axios.get("http://localhost:5000/api/desarrolladores/ver");
            const devsFiltrados = response.data.data.filter(dev => dev.estado === 'Disponible');
            setDevs(devsFiltrados);
        } catch (error) {
            console.error(error.message);
        }
    }

    const traerClientes = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/usuarios/ver");
            
            const clientesFiltrados = response.data.data.filter(usuario => usuario.rol === 'cliente');
            setClientes(clientesFiltrados);
        } catch (error) {
            console.error("Error al traer los clientes:", error.message);
        }
    };

    const limpiarForm = () => {
        setNombre('');
        setDescripcion('');
        setClienteSeleccionado('');
        setDesarrollador('');
    }

    useEffect(() => {
        traerClientes();
        traerDevs();
    }, []);
    
    return (
        <>
        <Navbar />
        <Container>
            <Box p={10} w={"full"} shadow={"md"} bg={useColorModeValue("white","gray.700")} rounded={"lg"}>
                <VStack spacing={4}>
                    <Input 
                        placeholder="Nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                    <Input 
                        placeholder="Descripcion"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                    />
                    <Select 
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                        disabled
                    >
                        <option value="Esperando aprobación">Esperando aprobación</option>
                    </Select>

                    <Select
                            placeholder="Seleccione un cliente"
                            value={clienteSeleccionado}
                            onChange={(e) => setClienteSeleccionado(e.target.value)}
                        >
                            {clientes.map(cliente => (
                                <option key={cliente._id} value={cliente._id}>{cliente.nombre}</option>
                            ))}
                    </Select>

                    <Select 
                            placeholder="Seleccione un desarrollador"
                            value={desarrollador}
                            onChange={(e) => setDesarrollador(e.target.value)}
                        >
                            {devs.map(dev => (
                                <option key={dev._id} value={dev._id}>{dev.nombre}</option>
                            ))}
                    </Select>

                    <Button colorScheme="blue" onClick={handleCrearProyecto} w={'full'}>
                        Crear Proyecto
                    </Button>
                </VStack>
            </Box>
        </Container>
        </>
    )
};

export default CrearProyecto