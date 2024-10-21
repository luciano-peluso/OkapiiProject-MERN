import React, { useEffect, useState } from "react";
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import axios from "axios"
import { Table, Tbody, Th, Thead, Tr, Td, Container, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, IconButton, useDisclosure, useToast, FormControl, FormLabel, Input, Select } from "@chakra-ui/react";
import Navbar from "../componentes/Navbar";

const VerUsuariosPage = () => {
    const toast = useToast();
    const [usuarios, setUsuarios] = useState([])
    

    useEffect(() => {
        traerUsuarios();
    }, []);

    const handleBorrarUsuario = async (idUsuario) => {
        try {
            const data = await axios.delete('http://localhost:5000/api/usuarios/borrar/'+idUsuario);
            toast({
                title: "Usuario eliminado con exito",
                description: "Se eliminó el usuario correctamente",
                status: "success",
                duration: 5000,
                isClosable: true
            })
        } catch (error) {
            toast({
                title: 'Error.',
                description: 'Error:' + error.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            })
        }
        traerUsuarios();    
    }
    const traerUsuarios = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/usuarios/ver");
            setUsuarios(response.data.data);
        } catch (error) {
            console.error(error.message);
        }
    }

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedUser, setSelectedUser] = useState(null);
    const [formData, setFormData] = useState({
        nombre: '',
        username: '',
        rol: ''
    });

    const handleEditClick = (usuario) => {
        setSelectedUser(usuario);
        setFormData({
            nombre: usuario.nombre,
            username: usuario.username,
            rol: usuario.rol
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

    const handleSaveChanges = async () => {
        try {
            const { nombre, username, rol } = formData;
            const response = await axios.put(`http://localhost:5000/api/usuarios/editar/${selectedUser._id}`, { nombre, username, rol });
            console.log("Usuario actualizado:", response.data);
            onClose(); 
            toast({
                title: "Usuario actualizado con éxito",
                description: "Usuario actualizado: " + response.data.data.username,
                status: "success",
                duration: 5000,
                isClosable: true
            })
        } catch (error) {
            console.error("Error al actualizar el usuario", error.message);
            toast({
                title: "Error al actualizar el usuario",
                description: "Error " + error.message,
                status: "error",
                duration: 5000,
                isClosable: true
            })
        }
        traerUsuarios();
    };

    return (
        <>
        <Navbar />
        <Container maxW={"1140"}>
            <Table variant="striped">
                <Thead>
                    <Tr>
                        <Th textAlign={"center"}>ID</Th>
                        <Th>Nombre</Th>
                        <Th>Username</Th>
                        <Th>Rol</Th>
                        <Th>Acciones</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {usuarios.map((usuario) => (
                        <Tr key={usuario._id}>
                            <Td>{usuario._id}</Td>
                            <Td>{usuario.nombre}</Td>
                            <Td>{usuario.username}</Td>
                            <Td>{usuario.rol}</Td>
                            <Td>
                                <IconButton icon={<EditIcon />} mr={3} onClick={() => handleEditClick(usuario)} colorScheme="green"/> 
                                <IconButton icon={<DeleteIcon />} onClick={() => handleBorrarUsuario(usuario._id)} colorScheme="red" />
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            {/* Modal para editar un usuario */}
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
                            <FormLabel>Username</FormLabel>
                            <Input name="username" value={formData.username} onChange={handleInputChange} />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Rol</FormLabel>
                            <Select name="rol" value={formData.rol} onChange={handleInputChange}>
                                <option value="admin">Admin</option>
                                <option value="gerente">Gerente</option>
                                <option value="cliente">Cliente</option>
                            </Select>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleSaveChanges}>
                            Guardar Cambios
                        </Button>
                        <Button variant="ghost" onClick={onClose}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Container></>
    );
};

export default VerUsuariosPage