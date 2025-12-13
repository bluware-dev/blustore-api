<h1 align="center">BluStore API</h1>
<p align="center">
  <img src="https://img.shields.io/badge/Node.js-20.x-339933?logo=node.js&logoColor=white" alt="Node.js Badge">
  <img src="https://img.shields.io/badge/Express.js-API-black?logo=express&logoColor=white" alt="Express Badge">
  <img src="https://img.shields.io/badge/Storage-JSON_Data--Driven-orange" alt="Data Driven Badge">
  <img src="https://img.shields.io/badge/License-MIT-blue?logo=open-source-initiative&logoColor=white" alt="MIT License Badge">
</p>

<p align="center">
<em>API REST minimalista y modular para autenticación y gestión de productos, persistida en archivos JSON (<b>data‑driven</b>), construida con Express y JavaScript moderno (ESM).</em>
</p>

---

<h3 align="center">Características</h3>

<p align="center">

✅ **Arquitectura limpia** Controller → Service → Model.<br>
✅ **Persistencia data‑driven** basada en JSON (sin base de datos).<br>
✅ **CRUD completo de productos** con PATCH real.<br>
✅ **Autenticación JWT** con middleware desacoplado.<br>
✅ **Manejo de errores centralizado** y códigos HTTP normalizados.<br>
✅ **Validaciones defensivas** de payloads y parámetros.<br>
✅ **Alias de paths** vía <code>jsconfig.json</code>.<br>
✅ **Tests manuales** mediante archivos <code>.http</code> y **Postman Collection**.<br>

</p>

---

<h3 align="center">📖 Instalación + Uso</h3>

```bash
# Instalación
git clone -b data-driven https://github.com/bluware-dev/blustore-api.git
cd blustore-api
pnpm install # o npm install
```

```bash
# Desarrollo
pnpm dev
# o
npm run dev
```

> **Nota**: En el deploy disponible en vercel las credenciales del usuario de demostración son: `{ username: "bob", password: "1234" }`

---

<div align="center">

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

</div>

---

<h3 align="center">🏗️ Estructura del proyecto</h3>

```
src/
 ├── index.js              # Bootstrap Express
 ├── api/
 │   ├── auth/             # Auth (controller/service/model)
 │   └── products/         # Products CRUD
 ├── middlewares/          # Auth + error handler
 ├── config/               # Globals + JWT
 └── utils/                # HTTP status + response helpers

data/
 ├── products.json         # Fuente de verdad (data‑driven)
 ├── products.backup.json
 └── users.json
```

---

<h3 align="center">💻️✍️ Filosofía</h3>

<p align="center">
<em>
Proyecto intencionalmente simple y <b>data‑driven</b>:
</br>
JSON como storage, lógica explícita, cero magia.
</br>
Inspirado en principios UNIX, KISS y Clean Code, priorizando legibilidad, separación de responsabilidades y evolución progresiva hacia DBs reales.
</em>
</p>

---

> **Nota**: Branch **data‑driven**. La persistencia en archivos es deliberada y forma parte del objetivo técnico de esta rama del proyecto.

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
