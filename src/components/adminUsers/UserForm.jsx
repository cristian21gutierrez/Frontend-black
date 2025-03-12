const UserForm = ({ formData, handleChange, handleSubmit, isEditing }) => {
    return (
      <form className="user-form" onSubmit={handleSubmit}>
        {['nombre', 'apellido', 'correo', 'usuario', 'contraseña'].map((field) => (
          <div key={field}>
            <label>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
            <input
              type={field === 'correo' ? 'email' : field === 'contraseña' ? 'password' : 'text'}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit" className="btn-submit">{isEditing ? 'Editar Usuario' : 'Crear Usuario'}</button>
      </form>
    );
  };
  
  export default UserForm;
  