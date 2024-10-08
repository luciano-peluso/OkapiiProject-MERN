import React, { useEffect, useState } from "react";
import axios from "axios"
import { Table, Tbody, Th, Thead, Tr, Td, Container } from "@chakra-ui/react";
import Navbar from "../componentes/Navbar";

const VerUsuariosPage = () => {
    const [usuarios, setUsuarios] = useState([])
    const traerUsuarios = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/usuarios/ver");
            setUsuarios(response.data.data);
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        traerUsuarios();
    }, []);

    return (
        <>
        <Navbar />
        <Container maxW={"1140"}>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>Nombre</Th>
                        <Th>Username</Th>
                        <Th>Rol</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {usuarios.map((usuario) => (
                        <Tr key={usuario._id}>
                            <Td>{usuario._id}</Td>
                            <Td>{usuario.nombre}</Td>
                            <Td>{usuario.username}</Td>
                            <Td>{usuario.rol}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Container></>
    );
};

export default VerUsuariosPage