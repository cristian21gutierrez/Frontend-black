import React from 'react';
import { TextField, Button, Container, Typography, Paper, Grid } from '@mui/material';

const ProductForm = ({ formData, handleChange, handleSubmit, isEditing }) => {
    return (
        <Container maxWidth="sm">
            <Paper 
                elevation={1} 
                sx={{ padding: 4, borderRadius: 4, backgroundColor: "#f9f9f9" }}
            >
                <Typography 
                    variant="h5" 
                    align="center" 
                    gutterBottom 
                    sx={{ fontWeight: 600, color: "#333" }}
                >
                    {isEditing ? 'Editar Producto' : 'Crear Producto'}
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Nombre"
                                name="nombre"
                                value={formData.nombre}
                                onChange={handleChange}
                                variant="standard"
                                required
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Precio"
                                name="precio"
                                type="number"
                                value={formData.precio}
                                onChange={handleChange}
                                variant="standard"
                                required
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label="Stock"
                                name="stock"
                                type="number"
                                value={formData.stock}
                                onChange={handleChange}
                                variant="standard"
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Descripción"
                                name="descripcion"
                                value={formData.descripcion}
                                onChange={handleChange}
                                variant="standard"
                                multiline
                                rows={3}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Categoría"
                                name="categoria"
                                value={formData.categoria}
                                onChange={handleChange}
                                variant="standard"
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                sx={{ 
                                    bgcolor: "#333", 
                                    color: "white",
                                    "&:hover": { bgcolor: "#555" },
                                    borderRadius: 2,
                                    padding: "10px 20px",
                                    fontSize: "16px"
                                }}
                                type="submit"
                                fullWidth
                                size="large"
                            >
                                {isEditing ? 'Actualizar' : 'Agregar'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default ProductForm;
