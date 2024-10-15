import { Button, Container, Heading, Select, Toast, useToast, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Navbar from "../componentes/Navbar";
import axios from "axios";

const AsignarDev = () => {
    const toast = useToast();

    const [proyectos, setProyectos] = useState([]);
    const [devs, setDevs] = useState([]);

    const [proyecto, setProyecto] = useState('');
    const [desarrollador, setDesarrollador] = useState('');

    const traerDevs = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/desarrolladores/ver');
            const devsFiltrados = response.data.data.filter(dev => dev.estado === 'Disponible');
            setDevs(devsFiltrados);
        } catch (error) {
            console.error(error.message);
        }
    }

    const traerProyectos = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/proyectos/ver');
            const proyectosFiltrados = response.data.data.filter(proy => proy.desarrolladores.length === 0);
            setProyectos(proyectosFiltrados);   
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        traerDevs();
        traerProyectos();
    }, []);

    const handleSubmit = async () => {
        try {
            const responseProy = await axios.put('http://localhost:5000/api/proyectos/editar/'+proyecto, {desarrolladores: desarrollador, estado:"En progreso"});
            console.log(responseProy.data);

            const responseDev = await axios.put('http://localhost:5000/api/desarrolladores/editar/'+desarrollador, {estado:"Ocupado"});
            console.log(responseDev.data);

            if(responseProy.data.success && responseDev.data.success) {
                toast({
                    title: "Éxito al asignar desarrollador.",
                    description: responseProy.data.message,
                    status:"success",
                    duration: 5000,
                    isClosable: true
                })
            } 
        } catch(error) {
            toast({
                title: "Error.",
                description: error.message,
                status:"error",
                duration: 5000,
                isClosable: true
            })
        }
        traerDevs();
        traerProyectos();
    }

    return(
        <>
            <Navbar />
            <Container>
                <VStack spacing={4}>
                    <Heading>Seleccione un proyecto: </Heading>
                    <Select
                        placeholder="Proyecto"
                        onChange={(e) => setProyecto(e.target.value)}
                        required>
                        {proyectos.map(proyecto => (
                            <option key={proyecto._id} value={proyecto._id}>{proyecto.nombre}</option>
                        ))}
                    </Select>
                    {/* 6709a38d5bd68d2f2fe8e503 */}
                    <Heading>Seleccione un desarrollador: </Heading>
                    <Select
                        placeholder="Desarrollador"
                        onChange={(e) => setDesarrollador(e.target.value)}
                        required>
                        {devs.map(dev => (
                            <option key={dev._id} value={dev._id}>{dev.nombre}</option>
                        ))}
                    </Select>
                    <Button colorScheme="blue" onClick={handleSubmit} w={'full'}>
                        Asignar desarrollador
                    </Button>
                </VStack>
            </Container>
        </>
    )
};

export default AsignarDev