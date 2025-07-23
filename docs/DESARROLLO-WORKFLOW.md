# Desarrollo y Mantenimiento del Sitio

Este documento describe el flujo de trabajo para desarrollar y mantener el sitio web del portafolio Gestalt.

## Estructura del Proyecto

El proyecto está organizado de la siguiente manera:

```
gestalt-portfolio/
├── src/                       # Código fuente principal
│   ├── index.html             # Página principal HTML
│   ├── styles/                # Estilos CSS
│   │   └── main.css           # Archivo CSS principal con variables
│   ├── js/                    # Scripts JavaScript
│   │   └── main.js            # JavaScript principal con módulos
│   └── assets/                # Recursos estáticos
│       └── images/            # Imágenes y SVGs
├── docs/                      # Documentación
└── README.md                  # Documentación principal
```

## Flujo de Trabajo

1. **Desarrollo Local**
   - Editar archivos en el directorio `src/`
   - Probar cambios localmente abriendo `src/index.html` en el navegador

2. **Estructura de Código**
   - HTML: Usar elementos semánticos y mantener buena accesibilidad
   - CSS: Usar variables CSS definidas en `main.css`
   - JavaScript: Seguir el patrón modular establecido en `main.js`

3. **Gestión de Recursos**
   - Colocar todas las imágenes en `src/assets/images/`
   - Usar SVGs para iconos cuando sea posible
   - Optimizar imágenes para rendimiento web

## Mejores Prácticas

1. **Accesibilidad**
   - Mantener etiquetas ARIA apropiadas
   - Asegurar navegación por teclado
   - Proporcionar textos alternativos para imágenes

2. **Rendimiento**
   - Minimizar peticiones HTTP
   - Usar carga diferida (lazy loading) para imágenes e iframes
   - Mantener el código CSS y JS conciso

3. **Mantenimiento**
   - Documentar cambios significativos
   - Seguir las convenciones de código establecidas
   - Realizar pruebas cruzadas en diferentes navegadores

## Plan de Evolución

Para futuras mejoras y características, consultar el documento [Plan de Implementación y Mejora](docs/IMPLEMENTATION_AND_ENHANCEMENT_NEW.md).
