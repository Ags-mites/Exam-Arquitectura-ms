# Optimizador de Portafolio

Examen final Arquitectura de Software

## Dependencias

### Backend
- Node.js 20+
- pnpm
- NestJS
- TypeScript

### Frontend
- Node.js 20+
- pnpm
- React 19
- Vite
- Tailwind CSS
- shadcn/ui

## Instalación y Despliegue

### Uso de Docker
```bash
# Construir y ejecutar
docker-compose up --build

# Frontend: http://localhost:8080
# Backend: http://localhost:3000
# API Docs: http://localhost:3000/docs
```

## Ejemplos de Uso

### Caso 1: Fondos de Inversión
**Entrada:**
```json
{
  "capacidad": 10000,
  "objetos": [
    {"nombre": "Fondo_A", "peso": 2000, "ganancia": 1500},
    {"nombre": "Fondo_B", "peso": 4000, "ganancia": 3500},
    {"nombre": "Fondo_C", "peso": 5000, "ganancia": 4000},
    {"nombre": "Fondo_D", "peso": 3000, "ganancia": 2500},
    {"nombre": "Fondo_E", "peso": 1500, "ganancia": 1800}
  ]
}
```

**Salida:**
```json
{
  "seleccionados": ["Fondo_B", "Fondo_C", "Fondo_E"],
  "ganancia_total": 9300,
  "peso_total": 10500
}
```

### Caso 2: Acciones y Bonos
**Entrada:**
```json
{
  "capacidad": 8000,
  "objetos": [
    {"nombre": "Acción_X", "peso": 1000, "ganancia": 800},
    {"nombre": "Acción_Y", "peso": 2500, "ganancia": 2200},
    {"nombre": "Acción_Z", "peso": 3000, "ganancia": 2800},
    {"nombre": "Bono_P", "peso": 4000, "ganancia": 3000},
    {"nombre": "Bono_Q", "peso": 1500, "ganancia": 1200}
  ]
}
```

**Salida:**
```json
{
  "seleccionados": ["Acción_Y", "Acción_Z", "Bono_Q"],
  "ganancia_total": 6200,
  "peso_total": 7000
}
```

## Especificación de API
### Endpoint: POST /optimizar
**URL:** `http://localhost:3000/optimizar`
**Body:**
```json
{
  "capacidad": number,    
  "objetos": [
    {
      "nombre": string,   
      "peso": number,     
      "ganancia": number  
    }
  ]
}
```
**Swagger UI:** http://localhost:3000/docs 