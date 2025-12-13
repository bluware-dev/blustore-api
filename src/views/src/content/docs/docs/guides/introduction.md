---
title: Introducción
description: Breve introducción a la BluStore API.
---

**BluStore API** es una API REST minimalista para autenticación y gestión de productos, diseñada con foco en **arquitectura clara**, **separación de responsabilidades** y **evolución progresiva** del storage.

El proyecto prioriza decisiones explícitas por sobre abstracciones innecesarias:  
endpoints previsibles, flujo MVC simple y lógica de dominio contenida en servicios.

## Usando la API

Probá los endpoints en el [Postman Workspace público](<https://bluware-dev-6264346.postman.co/workspace/Elian-Jofre-(Blu)'s-Workspace~f9c0837a-fdc0-402f-8bf8-64772ee0b914/collection/50668572-f6b2889c-ae09-4f75-992e-3f102be2655f?action=share&creator=50668572&active-environment=50668572-0dc42c52-0a7b-4796-9faf-56b50a867b54>).

**Incluye**:

- Variables de colección dinámicas preconfiguradas
- Tests básicos de validación
- Conexión directa a producción

## Objetivos técnicos

- Exponer una API REST coherente y fácil de consumir.
- Aplicar principios **KISS**, **Clean Code** y estilo **UNIX**.
- Mantener Controllers agnósticos de la persistencia.
- Permitir transición de storage sin refactors estructurales.

## Enfoque de persistencia

La API cuenta con dos enfoques bien definidos:

- **Data-driven (JSON)**: persistencia local para aprendizaje y testing.
- **Firebase Firestore**: persistencia documental real, serverless y escalable.

Ambos enfoques respetan la misma interfaz lógica desde Services, garantizando estabilidad en Controllers y rutas.

## Alcance

- Autenticación JWT (login / registro).
- CRUD completo de productos.
- Manejo de errores centralizado.
- Testing manual con Postman y `.http`.

## Filosofía

_Proyecto intencionalmente simple, hecho con fines de aprendizaje._

_Util como plantilla base para futuros desarrollos._
