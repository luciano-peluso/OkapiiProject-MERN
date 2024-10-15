import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../componentes/Navbar";
import { Button, Container, Table, Tbody, Td, Th, Thead, Tr, useToast } from "@chakra-ui/react";

const VerProyectos = () => {
    const toast = useToast();
    const [proyectos, setProyectos] = useState([]);
    const [clientes, setClientes] = useState({});
    const [desarrolladores, setDesarrolladores] = useState({});

    // Función para traer todos los proyectos
    const traerProyectos = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/proyectos/ver");
            setProyectos(response.data.data);
        } catch (error) {
            console.error(error.message);
        }
    };

    // Función para traer el nombre del cliente por su ID
    const traerNombreCliente = async (idCliente) => {
        try {
            if (!clientes[idCliente]) {
                const response = await axios.get(`http://localhost:5000/api/usuarios/traerUnUsuario/${idCliente}`);
                setClientes((prev) => ({ ...prev, [idCliente]: response.data.data.nombre }));
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    // Función para traer los nombres de los desarrolladores
    const traerNombresDevs = async (idDevs) => {
        try {
            await Promise.all(
                idDevs.map(async (idDev) => {
                    if (!desarrolladores[idDev]) {
                        const response = await axios.get(`http://localhost:5000/api/desarrolladores/traerUnDev/${idDev}`);
                        setDesarrolladores((prev) => ({ ...prev, [idDev]: response.data.data.nombre }));
                    }
                })
            );
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleFinalizar = async (id, devs) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/proyectos/editar/${id}`, { estado: "Finalizado" });
            console.log(response);
    
            for (const dev of devs) {
                const responseDev = await axios.put(`http://localhost:5000/api/desarrolladores/editar/${dev}`, { estado: "Disponible" });
                console.log(responseDev);
            }
        } catch (error) {
            console.log(error.message);
        }
        traerProyectos();
    };

    const handleBorrar = async (id, devs) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/proyectos/borrar/${id}`);
            console.log(response);
            for (const dev of devs) {
                const responseDev = await axios.put(`http://localhost:5000/api/desarrolladores/editar/${dev}`, { estado: "Disponible" });
                console.log(responseDev);
            }
            toast({
                title: "Exito al borrar el proyecto",
                description: "El proyecto se borró con éxito",
                status:"success",
                duration: 5000,
                isClosable: true
            })
        } catch (error) {
            console.log(error.message);
        }
        traerProyectos();
    }

    useEffect(() => {
        traerProyectos();
    }, []);

    return (
        <>
            <Navbar />
            <Container maxW={"1140"}>
                <Table variant={"striped"}>
                    <Thead>
                        <Tr>
                            <Th>ID</Th>
                            <Th>Nombre</Th>
                            <Th>Descripción</Th>
                            <Th>Estado</Th>
                            <Th>Cliente</Th>
                            <Th>Desarrollador/es</Th>
                            <Th>Acciones</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {proyectos.map((proyecto) => {
                            // Llamar a las funciones asíncronas para obtener los datos
                            traerNombreCliente(proyecto.cliente);
                            traerNombresDevs(proyecto.desarrolladores);

                            return (
                                <Tr key={proyecto._id}>
                                    <Td>{proyecto._id}</Td>
                                    <Td>{proyecto.nombre}</Td>
                                    <Td>{proyecto.descripcion}</Td>
                                    <Td>{proyecto.estado}</Td>
                                    <Td>{clientes[proyecto.cliente] || "Cargando..."}</Td> 
                                    <Td>
                                        {proyecto.desarrolladores
                                            .map((devId) => desarrolladores[devId] || "Cargando...")
                                            .join(", ")}
                                    </Td>
                                    <Td>
                                        {proyecto.estado === "En progreso" && (
                                            <Button colorScheme="green" onClick={() => handleFinalizar(proyecto._id, proyecto.desarrolladores)}>
                                                Finalizar
                                            </Button>
                                        )}
                                        <Button colorScheme="red" onClick={() => handleBorrar(proyecto._id, proyecto.desarrolladores)}>
                                            Borrar
                                        </Button>
                                    </Td>
                                </Tr>
                            );
                        })}
                    </Tbody>
                </Table>
            </Container>
        </>
    );
};

export default VerProyectos;
