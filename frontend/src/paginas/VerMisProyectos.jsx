import { Box, Button, Container, Table, Tbody, Td, Th, Thead, Tr, useToast, VStack } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../componentes/Navbar";

const VerMisProyectos = () => {
    const [proyectos, setProyectos] = useState([]);
    const [desarrolladores, setDesarrolladores] = useState([]);

    const usuario = JSON.parse(localStorage.getItem('usuario'));

    const toast = useToast();

    const obtenerProyectos = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/proyectos/ver');
            const proyectosFiltados = response.data.data.filter(proyecto => proyecto.cliente === usuario._id);
            setProyectos(proyectosFiltados);
        } catch (error) {
            console.error(error.message);
        }
    }

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

    useEffect(() => {
        obtenerProyectos();
    },[]);

    return (
        <>
        <Navbar />
        <Container maxW={"1140"}>
            <Table variant={"striped"}>
                <Thead>
                    <Th>Nombre</Th>
                    <Th>Descripcion</Th>
                    <Th>Estado</Th>
                    <Th>Desarrollador</Th>
                </Thead>
                <Tbody>
                        {proyectos.map((proyecto) => {
                            // Llamar a las funciones asíncronas para obtener los datos
                            traerNombresDevs(proyecto.desarrolladores);

                            return (
                                <Tr key={proyecto._id}>
                                    <Td>{proyecto.nombre}</Td>
                                    <Td>{proyecto.descripcion}</Td>
                                    <Td>{proyecto.estado}</Td>
                                    <Td>
                                        {proyecto.desarrolladores.length === 0 ? (
                                            "Esperando asignación"
                                        ) : (
                                            proyecto.desarrolladores
                                                .map((devId) => desarrolladores[devId] || "Cargando...")
                                                .join(", ")
                                        )} 
                                        {/* Uso de operador ternario! Bien ahí! */}
                                    </Td>
                                </Tr>
                            );
                        })}
                    </Tbody>
            </Table>
        </Container>
        </>
    )
};

export default VerMisProyectos