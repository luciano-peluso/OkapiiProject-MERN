import { useEffect, useState } from "react"
import axios from "axios";
import { Button, Container, FormControl, FormLabel, IconButton, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, Table, Tbody, Td, Th, Thead, Tr, useDisclosure, useToast } from "@chakra-ui/react";
import Navbar from "../componentes/Navbar";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";


const VerDevs = () => {
    const [devs, setDevs] = useState([]);
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedDev, setSelectedDev] = useState(null);
    const [formData, setFormData] = useState({
        nombre: "",
        habilidades: "",
        estado: "",
    })

    useEffect(() => {
        traerDevs();
    },[]);

    const traerDevs = async () => {
        try { 
            const response = await axios.get("http://localhost:5000/api/desarrolladores/ver");
            setDevs(response.data.data);
        } catch (error) {
            console.error(error.message);
        }
    }

    const handleBorrar = async (idDev) => {
        try {
            const response = await axios.delete('http://localhost:5000/api/desarrolladores/borrar/'+idDev);
            toast({
                title:"Se eliminó con éxito",
                description: response.message,
                status: "success",
                duration: 5000,
                isClosable: true
            });
        } catch (error) {
            console.error(error.message);
            toast({
                title:"No se pudo borrar el dev",
                description: "Error al borrar el dev: " + error.message,
                status: "error",
                duration: 5000,
                isClosable: true
            });
        }
        traerDevs();
    }

    const handleEditClick = (dev) => {
        setSelectedDev(dev);
        setFormData({
            nombre: dev.nombre,
            habilidades: dev.habilidades,
            estado: dev.estado
        });
        onOpen(); // Abre el modal
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleEditar = async () => {
        try {
            const { nombre, habilidades, estado} = formData;
            const response = await axios.put('http://localhost:5000/api/desarrolladores/editar/'+selectedDev._id, {nombre, habilidades, estado});
            toast({
                title: "Exito al editar el dev",
                description: response.message,
                status: "success",
                duration: 5000,
                isClosable: true
            })
        } catch (error){ 
            toast({
                title: "Error",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true
            })
        }
        onClose();
        traerDevs();
    }

    return (
        <>
        <Navbar />
        <Container maxW="1140">
            <Table>
                <Thead>
                    <Tr>
                        <Th>Id</Th>
                        <Th>Nombre</Th>
                        <Th>Habilidades</Th>
                        <Th>Estado</Th>
                        <Th>Acciones</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {(devs).map((dev) => (
                        <Tr key={dev._id}>
                            <Td>{dev._id}</Td>
                            <Td>{dev.nombre}</Td>
                            <Td>{dev.habilidades}</Td>
                            <Td>{dev.estado}</Td>
                            <Td>
                                <IconButton icon={<EditIcon />} onClick={() => handleEditClick(dev)} colorScheme="green"/>
                                <IconButton icon={<DeleteIcon />} onClick={() => handleBorrar(dev._id)} colorScheme="red" />
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Editar Usuario</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <FormLabel>Nombre</FormLabel>
                            <Input name="nombre" value={formData.nombre} onChange={handleInputChange} />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Habilidades</FormLabel>
                            <Input name="habilidades" value={formData.habilidades} onChange={handleInputChange} />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Estado</FormLabel>
                            <Input name="estado" value={formData.estado} onChange={handleInputChange} disabled/>
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
    )
}

export default VerDevs