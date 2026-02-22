# Auditoría técnica de componentes (Frontend-black)

## Resumen ejecutivo

El proyecto tiene una base funcional, pero presenta riesgos importantes en seguridad del cliente, mantenibilidad y escalabilidad:

1. **Riesgo alto de seguridad en frontend** por confiar en `localStorage` y validar roles en cliente.
2. **Acoplamiento fuerte al backend productivo** por URLs hardcodeadas repetidas.
3. **Arquitectura inconsistente**: parte del código usa servicios/hooks y otra parte hace llamadas HTTP directas.
4. **Errores de calidad detectados por lint** (variables no definidas, importaciones faltantes y código no usado).
5. **Escalabilidad limitada** por ausencia de patrones transversales de manejo de errores, estado y feedback UX.

---

## Hallazgos por categoría

### 1) Seguridad

- El token JWT se guarda y lee desde `localStorage`, lo que aumenta la exposición ante XSS.
- El rol se decodifica en cliente con `atob(...)` y se usa para decisiones de navegación/UI; esto sirve para UX, pero **no** para autorización real.
- En `AdminOrders` se consulta `userRole` en `localStorage`, pero no existe una escritura consistente de ese valor en el flujo de login.
- Se repiten headers de autorización manualmente en varios componentes, elevando riesgo de inconsistencias.

### 2) Hardcodeo y configuración

- La URL base de API está hardcodeada en múltiples componentes (`Login`, `Register`, `Products`, `UserOrders`, `AdminOrders`, etc.).
- Hay rutas/activos externos estáticos (imagen única en `Carousel`) sin capa de configuración.
- Falta uso sistemático de variables de entorno para dev/staging/prod.

### 3) Código repetitivo

- CRUD y manejo de errores se repiten entre componentes (mismo patrón `try/catch`, `alert`, `console.error`).
- Coexisten dos estilos de acceso a datos:
  - **Centralizado** (`api/config`, `ProductService`, `OrderService`, hooks).
  - **No centralizado** (axios directo en varios componentes).
- Esto duplica lógica de autenticación, parsing de respuesta y tratamiento de errores.

### 4) Escalabilidad y arquitectura

- `ProtectedRoute` envuelve con `Layout` pasando `children`, pero `Layout` renderiza `Outlet` (patrón mezclado). Funciona por casualidad visual dependiendo de rutas, no por diseño limpio.
- Faltan boundaries/patrones para:
  - estados de carga global,
  - manejo central de errores,
  - notificaciones uniforme,
  - normalización de datos.
- El bundle supera el umbral de 500 kB y Vite avisa sobre code-splitting pendiente.

### 5) Calidad de código (lint/runtime)

- `Navbar` usa `useLocation` sin importarlo y además no utiliza `location`.
- `AdminOrders` referencia `groupedTotals` sin definición, potencial error en runtime.
- Alto volumen de errores de ESLint (`no-unused-vars`, `react/prop-types`, `no-undef`), lo que dificulta detectar defectos reales.

---

## Hallazgos por módulo/componente

### Autenticación y contexto

- **AuthContext**: persistencia básica correcta, pero con riesgo por `localStorage` y parseo JWT en cliente.
- **Login/Register/CreateUser**: llamadas directas con URL hardcodeada; validaciones mínimas; mensajes de error poco estandarizados.

### Productos de usuario

- **Products/UserOrders**: lógica de red acoplada al componente, uso de `alert` para UX, y dependencia manual del token.
- **Carousel**: implementación estática de una sola imagen (poca extensibilidad).

### Administración de productos

- Este módulo está mejor encaminado: usa `useProducts` + `ProductService` + `api` centralizado.
- Aun así, el manejo de errores sigue siendo básico y no estandarizado.

### Administración de pedidos

- `AdminOrders` mantiene patrón antiguo (axios directo + URL hardcodeada + rol desde `localStorage`).
- Tiene además referencia a variable inexistente (`groupedTotals`), señal de deuda técnica.

### Administración de usuarios

- Usa `api` centralizado (mejor), pero tiene detalle de import path con doble slash (`../../api//config`) y ruido de código no usado (`navigate`).

---

## Priorización recomendada

### Prioridad alta (1–2 sprints)

1. Centralizar **todas** las llamadas HTTP en `api` + `services` + hooks (eliminar axios directo en componentes).
2. Mover `baseURL` a `import.meta.env` y definir `.env` por entorno.
3. Corregir errores críticos de lint/runtime (`useLocation`, `groupedTotals`, imports sin uso).
4. Estandarizar capa de errores/notificaciones (reemplazar `alert` por sistema de toast/snackbar).

### Prioridad media

1. Unificar estrategia de rutas/layout (`children` vs `Outlet`, elegir una sola).
2. Reducir tamaño de bundle con `React.lazy` en rutas administrativas.
3. Definir validación de formularios (ej. Zod/Yup + react-hook-form).

### Prioridad baja

1. Mejorar accesibilidad y consistencia visual en formularios antiguos.
2. Eliminar comentarios de “debug/cambio” y limpiar código legado.

---

## Métricas rápidas observadas

- `npm run lint`: **75 problemas** (72 errores, 3 warnings).
- `npm run build`: compila, pero con advertencia de chunk grande (≈531 kB).

---

## Conclusión

El mayor problema no es funcional, sino de **consistencia arquitectónica**: el proyecto mezcla dos generaciones de código (una más modular y otra más directa). Resolver esa brecha reducirá riesgo de seguridad frontend, permitirá escalar pantallas y hará mucho más predecible el mantenimiento.
