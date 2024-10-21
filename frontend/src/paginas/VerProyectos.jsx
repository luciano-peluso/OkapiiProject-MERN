import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../componentes/Navbar";
import { Button, Container, HStack, IconButton, Table, Tbody, Td, Th, Thead, Tr, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, useToast, useDisclosure, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

const VerProyectos = () => {
    const toast = useToast();
    const [proyectos, setProyectos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [nombreClientes, setNombreClientes] = useState({});
    const [desarrolladores, setDesarrolladores] = useState({});
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedProyecto, setSelectedProyecto] = useState(null);
    const [formData, setFormData] = useState({
        nombre: "",
        descripcion: "",
        cliente: "",
    })

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
            if (!nombreClientes[idCliente]) {
                const response = await axios.get(`http://localhost:5000/api/usuarios/traerUnUsuario/${idCliente}`);
                setNombreClientes((prev) => ({ ...prev, [idCliente]: response.data.data.nombre }));
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    const traerTodosLosClientes = async () => {
        try { 
            const response = await axios.get('http://localhost:5000/api/usuarios/ver');
            const clientesFiltrados = response.data.data.filter(usuario => usuario.rol === 'cliente');
            setClientes(clientesFiltrados);
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

    // Función para marcar omo finalizado el proyecto
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

    // Función para borrar un proyecto (que también marca como disponibles a los devs)
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

    // Carga con la información del proyecto y abre el form de la ventana modal 
    const handleEditClick = (proyecto) => {
        setSelectedProyecto(proyecto);
        setFormData({
            nombre: proyecto.nombre,
            descripcion: proyecto.descripcion,
            cliente: proyecto.cliente
        });
        onOpen(); // Abre el modal
    };

    // Cuando cambia el valor del form lo actualiza.
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleEditar = async () => {
        try {
            const { nombre, descripcion, cliente } = formData;
            const response = await axios.put('http://localhost:5000/api/proyectos/editar/'+selectedProyecto._id, {nombre, descripcion, cliente});
            toast({
                title: "Exito al editar el proyecto",
                description: response.message,
                status: "success",
                duration: 5000,
                isClosable: true
            })
        } catch (error) { 
            toast({
                title: "Error",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true
            });
        }
        onClose();
        traerProyectos();
    }

    useEffect(() => {
        traerProyectos();
        traerTodosLosClientes();
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
                            traerNombreCliente(proyecto.cliente);
                            traerNombresDevs(proyecto.desarrolladores);

                            return (
                                <Tr key={proyecto._id}>
                                    <Td>{proyecto._id}</Td>
                                    <Td>{proyecto.nombre}</Td>
                                    <Td>{proyecto.descripcion}</Td>
                                    <Td>{proyecto.estado}</Td>
                                    <Td>{nombreClientes[proyecto.cliente] || "Cargando..."}</Td> 
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
                                        <HStack spacing={2}>
                                            <IconButton icon={<EditIcon />} onClick={() => handleEditClick(proyecto)} colorScheme="green"/>
                                            <IconButton icon={<DeleteIcon />} onClick={() => handleBorrar(proyecto._id, proyecto.desarrolladores)} colorScheme="red"/>
                                        </HStack>
                                    </Td>
                                </Tr>
                            );
                        })}
                    </Tbody>
                </Table>
                <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Editar Proyecto</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Nombre</FormLabel>
                            <Input name="nombre" value={formData.nombre} onChange={handleInputChange} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Descripcion</FormLabel>
                            <Input name="descripcion" value={formData.descripcion} onChange={handleInputChange} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Cliente</FormLabel>
                            <Select 
                                name="cliente" 
                                value={formData.cliente} 
                                onChange={handleInputChange}
                                required
                                placeholder="Seleccione un cliente"
                            >
                                {clientes.map((cliente) => (
                                    <option key={cliente._id} value={cliente._id}>
                                        {cliente.nombre}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleEditar}>
                            Guardar Cambios
                        </Button>
                        <Button variant="ghost" onClick={onClose}>Cancelar</Button>
                    </ModalFooter>
            </ModalContent>
        </Modal>
            </Container>
        </>
    );
};

export default VerProyectos;
