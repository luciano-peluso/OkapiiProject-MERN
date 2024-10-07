import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

const AdminLanding = () => {
    return (
        <Box p={5}>
            <Heading as="h1">Bienvenido, Administrador</Heading>
            <Text mt={4}>Aquí puedes gestionar usuarios, ver estadísticas, y más.</Text>
        </Box>
    );
};

export default AdminLanding;
