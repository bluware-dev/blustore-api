<h1 align="center">BluStore API</h1>
<p align="center">
  <img src="https://img.shields.io/badge/Node.js-20.x-339933?logo=node.js&logoColor=white" alt="Node.js Badge">
  <img src="https://img.shields.io/badge/Express.js-API-black?logo=express&logoColor=white" alt="Express Badge">
  <img src="https://img.shields.io/badge/Storage-Firebase-orange" alt="Firebase Badge">
  <img src="https://img.shields.io/badge/Astro-Starlight-magenta" alt="Astro Badge">
  <img src="https://img.shields.io/badge/License-MIT-blue?logo=open-source-initiative&logoColor=white" alt="MIT License Badge">
</p>

<p align="center">
<em>API REST minimalista y modular para autenticación y gestión de productos, persistida en <b>Firebase Firestore</b>, construida con Express y JavaScript moderno (ESM).</em>
</p>

---

<h3 align="center">Características</h3>

<p align="center">

✅ **Arquitectura limpia** Controller → Service → Model.<br>
✅ **Persistencia en Firebase** (Auth + Products).<br>
✅ **CRUD completo de productos** con PATCH real.<br>
✅ **Autenticación JWT** con middleware desacoplado.<br>
✅ **Manejo de errores centralizado** y códigos HTTP normalizados.<br>
✅ **Validaciones defensivas** de payloads y parámetros.<br>
✅ **Alias de paths** vía <code>jsconfig.json</code>.<br>
✅ **Tests manuales** mediante archivos <code>.http</code> y Postman Collection.<br>
✅ **Rate limiting vía Vercel WAF** `[10req/min]`<br>
🟪 **Documentación Frontend 'MVC'** mediante Astro Starlight (MD, MDX) y Starlight OpenAPI. `[En desarrollo temprano]`
<br>

</p>

---

<h3 align="center">📖 Instalación + Uso</h3>

```bash
# Instalación
git clone https://github.com/bluware-dev/blustore-api.git
cd blustore-api
pnpm install # o npm install
```

```bash
# Desarrollo
pnpm dev
# o
npm run dev
```

> **API base**: [https://blustore-api.vercel.app/api](https://blustore-api.vercel.app/api)

> **Astro Starlight OpenAPI**: [https://blustore-api.vercel.app/docs](https://blustore-api.vercel.app/docs) [En desarrollo]

> [**Postman Workspace Público**](<https://bluware-dev-6264346.postman.co/workspace/Elian-Jofre-(Blu)'s-Workspace~f9c0837a-fdc0-402f-8bf8-64772ee0b914/collection/50668572-f6b2889c-ae09-4f75-992e-3f102be2655f?action=share&creator=50668572&active-environment=50668572-0dc42c52-0a7b-4796-9faf-56b50a867b54>)

---

<h3 align="center">📜 Endpoints</h3>

| Método | Endpoint             | Descripción                 | Auth |
| ------ | -------------------- | --------------------------- | ---- |
| POST   | /api/auth/register   | Registrar usuario           | ❌   |
| POST   | /api/auth/login      | Login + JWT                 | ❌   |
| GET    | /api/products        | Listar productos            | ❌   |
| GET    | /api/products/:id    | Obtener producto por ID     | ❌   |
| POST   | /api/products/create | Crear producto              | ✅   |
| PATCH  | /api/products/update | Actualizar producto (PATCH) | ✅   |
| DELETE | /api/products/:id    | Eliminar producto           | ✅   |

---

<h3 align="center">🏗️ Estructura del proyecto</h3>

```
src/
 ├── index.js              # Bootstrap Express
 ├── api/
 │   ├── auth/             # Auth (controller/service/model) -> Firebase
 │   └── products/         # Products CRUD -> Firebase
 ├── middlewares/          # Auth + error handler
 ├── config/               # Globals + JWT + Firebase
 ├── utils/                # HTTP status + response helpers
 └── views/                # Astro Starlight + OpenAPI
```

---

<h3 align="center">💻 Filosofía</h3>

<p align="center">
<em>
Proyecto intencionalmente minimalista y modular:
</br>
Firebase como storage, lógica documentada vía referencias oficiales.
</br>
Inspirado en principios UNIX, KISS y Clean Code, priorizando legibilidad, SRP y escalabilidad.
</em>
</p>

> **Aclaración**: Este proyecto fue desarrollado íntegramente por mí (Elian “Blu” Jofré) [bluware-dev]. ChatGPT se utilizó solo con fines académicos y de consulta: discusión de diseño, arquitectura, criterios técnicos, validación conceptual, revisión de errores y documentación, además de snippets mínimos ilustrativos.

> El código fue escrito y decidido manualmente; no se usó generación automática ni copy/paste asistido, ni herramientas como Copilot, CodeAI CLIs, Cursor/Windsurf o MCPs.

---

<h3 align="center">Autor</h3>

<table align="center">
	<tr>
		<td align="center">
			<a href="https://github.com/bluware-dev"><img src="https://github.com/bluware-dev.png" width="125px;"/><br /><b>Elian (Blu)</b></a><br/>Software Developer
		</td>
	</tr>
</table>

---

<h3 align="center">
	<a href="LICENSE">Licencia MIT ✍️</a>
</h3>
