import React from 'react';
import ProductForm from './ProductForm';
import ProductTable from './ProductTable';
import useProducts from '../hooks/useProducts';
import { Box, Typography, Paper } from "@mui/material";

const AdminProducts = () => {
    const {
        products,
        formData,
        isEditing,
        handleChange,
        handleSubmit,
        handleEditClick,
        deleteProduct
    } = useProducts();

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                gap: 3,
                padding: 3,
                flexWrap: "wrap",
            }}
        >
            {/* Formulario */}
            <Paper sx={{ padding: 3, width: "40%", minWidth: "320px", boxShadow: 3 }}>
                <Typography variant="h5" sx={{ textAlign: "center", marginBottom: 2 }}>
                    Administrar Productos
                </Typography>
                <ProductForm
                    formData={formData}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    isEditing={isEditing}
                />
            </Paper>

            {/* Tabla con scroll interno */}
            <Paper
                sx={{
                    padding: 3,
                    width: "50%",
                    minWidth: "320px",
                    boxShadow: 3,
                    maxHeight: "500px",  // Altura máxima
                    overflowY: "auto",   // Scroll solo dentro de la tabla
                }}
            >
                <Typography variant="h6" sx={{ textAlign: "center", marginBottom: 2 }}>
                    Productos Actuales
                </Typography>
                <ProductTable
                    products={products}
                    handleEditClick={handleEditClick}
                    deleteProduct={deleteProduct}
                />
            </Paper>
        </Box>
    );
};

export default AdminProducts;
