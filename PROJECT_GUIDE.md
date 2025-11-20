# 🎓 SIGEA - Sistema de Gestión de Eventos Académicos

Plataforma moderna para la gestión de eventos académicos, inscripciones, certificados y validación. Transforma tu futuro con conocimiento innovador.

## 📋 Descripción del Proyecto

SIGEA es un sistema integral de gestión de eventos académicos diseñado especialmente para universidades e instituciones educativas. Proporciona herramientas para:

- Crear y gestionar eventos académicos (conferencias, talleres, diplomados, workshops)
- Registrar inscripciones de participantes
- Procesar pagos y validaciones
- Registrar asistencia mediante QR
- Generar y distribuir certificados
- Enviar notificaciones automáticas
- Gestionar reportes e informes

## 🎨 Diseño Visual

### Colores Institucionales

- **Azul Principal (#003366)**: Color corporativo principal
- **Celeste (#0088CC)**: Color de acentos y elementos interactivos
- **Blanco (#FFFFFF)**: Fondo principal
- **Gris (#F5F5F5)**: Fondo secundario

### Tipografía

- **Títulos**: Poppins / Montserrat Bold (700)
- **Texto**: Inter / Roboto Regular (400)
- **Fuente base**: 16px
- **Line-height**: 1.6

## 📁 Estructura del Proyecto

```
app/
├── components/              # Componentes reutilizables
│   ├── Button.tsx          # Botones (primary, secondary, outline, danger)
│   ├── Card.tsx            # Tarjetas (base del diseño)
│   ├── Navbar.tsx          # Navegación principal
│   ├── Footer.tsx          # Pie de página
│   ├── Modal.tsx           # Modal/Diálogos
│   ├── Input.tsx           # Campos de formulario
│   └── Badge.tsx           # Etiquetas de estado
├── globals.css             # Estilos globales y utilidades
├── layout.tsx              # Layout raíz con metadatos
├── page.tsx                # Landing Page
├── eventos/                # Módulo de eventos
│   ├── page.tsx            # Listado de eventos (con filtros)
│   └── [id]/
│       └── page.tsx        # Detalle del evento
├── inscripcion/            # Módulo de inscripción
│   └── [id]/
│       └── page.tsx        # Formulario de inscripción
├── participante/           # Panel del participante
│   └── dashboard/
│       └── page.tsx        # Dashboard con tabs
├── admin/                  # Módulo administrativo
│   ├── dashboard/
│   │   └── page.tsx        # Dashboard admin con widgets
│   ├── actividades/        # Gestión de eventos/actividades
│   │   └── page.tsx
│   ├── pagos/              # Gestión de pagos
│   │   └── page.tsx
│   ├── asistencia/         # Registro de asistencia
│   │   └── page.tsx
│   ├── certificados/       # Generación de certificados
│   │   └── page.tsx
│   ├── notificaciones/     # Envío de notificaciones
│   │   └── page.tsx
│   └── informes/           # Gestión de reportes
│       └── page.tsx
└── public/                 # Activos públicos
```

## 🌐 Rutas Principales

### Público

| Ruta | Descripción |
|------|-------------|
| `/` | Landing page con hero, eventos destacados y validador |
| `/eventos` | Listado de eventos con filtros |
| `/eventos/[id]` | Detalle del evento |
| `/inscripcion/[id]` | Formulario de inscripción |
| `/validador` | Validador de certificados |

### Participante

| Ruta | Descripción |
|------|-------------|
| `/participante/dashboard` | Panel del participante |
| Tabs: Inscripciones | Ver mis inscripciones activas |
| Tabs: Pagos | Historial de pagos |
| Tabs: Certificados | Descargar certificados |
| Tabs: Perfil | Ver y editar perfil |

### Administrador

| Ruta | Descripción |
|------|-------------|
| `/admin/dashboard` | Dashboard con métricas y gráficos |
| `/admin/actividades` | Crear y gestionar eventos |
| `/admin/pagos` | Validar y registrar pagos |
| `/admin/asistencia` | Registrar asistencia con QR |
| `/admin/certificados` | Emitir y distribuir certificados |
| `/admin/notificaciones` | Enviar notificaciones |
| `/admin/informes` | Gestionar reportes |

## 🎯 Flujos Principales

### Flujo 1: Inscripción a Evento

1. Usuario accede a `/eventos`
2. Selecciona un evento y ve `/eventos/[id]`
3. Haz clic en "Inscribirme"
4. Completa formulario en `/inscripcion/[id]`
5. Confirmación por email y WhatsApp
6. Acceso al panel en `/participante/dashboard`

### Flujo 2: Validación de Certificado

1. Visitante accede a `/validador`
2. Ingresa código de certificado
3. Sistema valida y muestra resultado
4. Opción de descargar o compartir

### Flujo 3: Administración de Eventos

1. Admin accede a `/admin/dashboard`
2. Navega a `/admin/actividades`
3. Crea nuevo evento con programa PDF
4. Gestiona inscritos, asistencia, certificados
5. Genera reportes finales

## 🛠️ Componentes y Utilidades

### Button Component

```tsx
<Button variant="primary" size="lg" isLoading={false}>
  Texto del botón
</Button>
```

Variantes: `primary`, `secondary`, `outline`, `danger`
Tamaños: `sm`, `md`, `lg`

### Card Component

```tsx
<Card hoverable className="custom-class">
  Contenido de la tarjeta
</Card>
```

### Input Component

```tsx
<Input
  label="Nombre"
  type="text"
  error={error}
  helpText="Texto de ayuda"
  required
/>
```

### Badge Component

```tsx
<Badge variant="success">Emitido</Badge>
```

Variantes: `success`, `warning`, `error`, `primary`, `gray`

## 📊 Características Especiales

### Dashboard Admin

- **Widgets de Métricas**: Eventos activos, inscripciones, pagos, certificados
- **Gráficos**: Barras (inscritos por día), Líneas (pagos por día)
- **Notificaciones**: Alertas y eventos importantes
- **Acceso Rápido**: Links a todos los módulos administrativos

### Panel Participante

- **Mis Inscripciones**: Estado de inscripciones activas
- **Mis Pagos**: Historial de transacciones
- **Mis Certificados**: Descargar certificados emitidos
- **Mi Perfil**: Ver y editar información personal

### Módulo de Pagos

- Registro manual de pagos (transferencia, tarjeta, Yape, Plin)
- Validación de pagos digitales
- Estadísticas: Total recaudado, pendiente, tasa de pagos
- Historial completo con estado

### Sistema de Notificaciones

- Plantillas personalizables (Email, WhatsApp, SMS)
- Envío automático basado en eventos
- Histórico de envíos
- Gestión de destinatarios

## 🎨 Microinteracciones

- **Hover Effects**: Tarjetas se elevan y amplían sombra
- **Animaciones**: Fade-in, slide-up al cargar contenido
- **Transiciones**: 0.3s cubic-bezier para cambios suaves
- **Feedback Visual**: Spinners en botones cargando
- **Toast Notifications**: Mensajes emergentes en esquina inferior derecha

## 📱 Responsividad

El proyecto es completamente responsivo utilizando Tailwind CSS:

- **Mobile**: Versión optimizada para móviles (< 640px)
- **Tablet**: Adaptación para tablets (640px - 1024px)
- **Desktop**: Experiencia completa (> 1024px)

Breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

## 🔐 Validaciones y Seguridad

### Validación de Formularios

- Email: Validación de formato
- DNI: 8 dígitos exactos
- Teléfono: 9 dígitos
- Nombres: Mínimo 2 caracteres
- Campos obligatorios: Indicados con asterisco

### Datos Sensibles

- Las contraseñas no se transmiten en texto plano
- Los datos personales se encriptan
- Validación en cliente y servidor

## 📈 Estadísticas y Reportes

### Métricas Disponibles

- Total de eventos activos
- Inscripciones por evento
- Tasa de asistencia
- Recaudación total
- Certificados generados
- Satisfacción del usuario (95%)

### Reportes

- Informe inicial (planificación)
- Informe final (resultados)
- Adjuntos de imágenes y asistentes

## 🚀 Cómo Empezar

1. **Instalar dependencias**: `npm install` o `pnpm install`
2. **Ejecutar dev**: `npm run dev`
3. **Acceder**: http://localhost:3000
4. **Explorar**: Navega por la landing page

## 🔄 Flujo de Desarrollo

1. Actualizar `/app/globals.css` para cambios de estilo
2. Crear nuevos componentes en `/app/components`
3. Agregar páginas en rutas específicas
4. Usar componentes reutilizables
5. Mantener estructura y patrones consistentes

## 📚 Librerías Utilizadas

- **Next.js 16**: Framework React
- **React 19**: Librería de UI
- **TypeScript**: Type safety
- **Tailwind CSS 4**: Estilos utilitarios
- **PostCSS**: Procesamiento de CSS

## 🎓 Estándares de Código

- Usar TypeScript para type safety
- Naming convenciones claras
- Componentes reutilizables
- Estilos consistentes
- Accesibilidad (a11y)
- Responsive design first

## 📞 Soporte

Para preguntas o problemas, contacta al equipo de desarrollo o consulta la documentación de Next.js en https://nextjs.org/docs

---

**Versión**: 1.0  
**Estado**: Producción  
**Institución**: Universidad Nacional Agraria de la Selva (UNAS)  
**Última actualización**: Marzo 2024
