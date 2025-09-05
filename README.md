# MERN-RnW

> A curated collection of MERN stack practice, mini-projects, tests, and task sets — plus foundational C/C++ and frontend exercises. This repo is my playground and portfolio-in-progress.

<p align="left">
  <a href="https://nodejs.org/"><img alt="Node.js" src="https://img.shields.io/badge/Node.js-16%2B-339933?logo=nodedotjs&logoColor=white"></a>
  <a href="https://react.dev/"><img alt="React" src="https://img.shields.io/badge/React-18-61dafb?logo=react&logoColor=222"></a>
  <a href="https://expressjs.com/"><img alt="Express" src="https://img.shields.io/badge/Express-4-black?logo=express&logoColor=white"></a>
  <a href="https://www.mongodb.com/atlas"><img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white"></a>
  <a href="https://github.com/Bhavu7/MERN-RnW/actions"><img alt="CI" src="https://img.shields.io/badge/CI-GitHub%20Actions-blue?logo=githubactions&logoColor=white"></a>
  <a href="LICENSE"><img alt="License" src="https://img.shields.io/badge/License-MIT-green.svg"></a>
</p>

---

## Table of Contents
- [About](#about)
- [Repo Layout](#repo-layout)
- [Featured Apps](#featured-apps)
- [Quickstart (for any MERN app here)](#quickstart-for-any-mern-app-here)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Tech Stack](#tech-stack)
- [Conventions](#conventions)
- [Troubleshooting](#troubleshooting)
- [Roadmap](#roadmap)
- [License](#license)

---

## About

This repository hosts:
- **MERN practice & mini-projects** (React + Express + MongoDB).
- **Frontend exercises** (HTML5, CSS3, Bootstrap).
- **DSA practice** (C / C++) for algorithmic fundamentals.

It’s intentionally structured as a **monorepo** so I can version everything in one place and evolve it over time.

> Portfolio links  
> • Website: https://bhavu-verse.vercel.app/  
> • GitHub: https://github.com/Bhavu7  

---

## Repo Layout

> Your folders may vary; this reflects the current structure.

```
MERN-RnW/
├─ client/                 # (optional) shared React starter or a sample app
├─ server/                 # (optional) shared Express/Mongo starter or a sample API
├─ apps/                   # multiple MERN mini-projects live here
│  ├─ job-board/           # example: full-stack app
│  ├─ auth-starter/
│  └─ ...
├─ frontend/               # HTML5/CSS3/Bootstrap practice
│  ├─ HTML5/
│  ├─ CSS3/
│  └─ Bootstrap/
├─ dsa/                    # Data Structures & Algorithms
│  ├─ C/
│  └─ C++/
├─ .vscode/
├─ .gitignore
└─ README.md
```

If you see blue arrow icons on GitHub for some folders (submodule indicators), remove any nested `.git` directories inside those folders so this repo remains a **single Git repository**.

---

## Featured Apps

| App | Stack | Live | Repo Path |
| --- | ----- | ---- | --------- |
| Opiva (Job recommendations) | React, Express, MongoDB, Tailwind | Frontend: https://opiva.netlify.app • API: https://opiva.onrender.com | `apps/opiva/` |

> If you’re adding more projects, extend this table with links and paths.

---

## Quickstart (for any MERN app here)

Assume an app lives at `apps/<app-name>` with `client/` and `server/`.

```bash
# 1) Clone
git clone https://github.com/Bhavu7/MERN-RnW.git
cd MERN-RnW/apps/<app-name>

# 2) Install deps
cd server && npm install
cd ../client && npm install

# 3) Prepare env files (see below)
# server/.env  and client/.env  (or client/.env.local)

# 4) Run backend
cd ../server
npm run dev      # or: npm start

# 5) Run frontend (new terminal)
cd ../client
npm run dev      # Vite/CRA dev server
```

## Environment Variables

### Server (`server/.env`)
```
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>/<db>?retryWrites=true&w=majority
JWT_SECRET=your_strong_secret
CORS_ORIGIN=https://opiva.netlify.app
```

## Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Atlas)
- **Auth:** JWT (access tokens), bcrypt
- **Deployment:** Netlify (frontend), Render (backend)
- **Tooling:** ESLint, Prettier, Nodemon

---

## Conventions

### Commits — Conventional Commits
Use semantic prefixes so the history reads clean:
- `feat:` new feature  
- `fix:` bug fix  
- `chore:` tooling/config/infra  
- `docs:` README or comments  
- `refactor:` code change w/o behavior change  
- `perf:` performance  
- `test:` tests only

**Examples**
```
init: consolidate 5 months of MERN stack development work
feat(auth): add JWT login/register endpoints
fix(api): correct CORS config for Netlify origin
chore: add netlify.toml and redirects for SPA
```

### Branching
- `main` → stable  
- feature branches → `feat/<feature-name>`  
- bugfix branches → `fix/<bug-name>`

---

## Troubleshooting

**CORS blocked**
- Set `CORS_ORIGIN` on the server to your frontend origin (e.g., `https://opiva.netlify.app`).
- In Express:
  ```js
  const cors = require('cors');
  app.use(cors({
    origin: process.env.CORS_ORIGIN,
    methods: ['GET','POST','PUT','DELETE','OPTIONS'],
    allowedHeaders: ['Content-Type','Authorization'],
    credentials: true
  }));
  app.options('*', cors());
  ```

**Frontend shows `Unexpected token '<'`**
- You’re likely requesting JSON but receiving HTML (404/Netlify index).  
- Ensure API calls use:
  ```js
  const API = import.meta.env.VITE_API_BASE_URL;
  fetch(`${API}/api/auth/login`, { ... });
  ```
  (Use **backticks**, not quotes with `${...}` inside.)

**Netlify SPA routes 404**
- Add `netlify.toml` in the app’s root (or the repo root for that app):
  ```toml
  [build]
    base = "client"
    publish = "dist"
    command = "npm run build"

  [[redirects]]
    from = "/*"
    to = "/index.html"
    status = 200
  ```

**Blue folder icons on GitHub**
- Those are submodules. Remove nested `.git` folders inside any subdirectory:
  - Windows PowerShell:  
    `Get-ChildItem -Recurse -Force -Directory -Filter ".git" | Remove-Item -Recurse -Force`
  - Then: `git rm --cached -r . && git add . && git commit -m "fix: remove accidental submodules"`

---

## License

This repository is licensed under the **MIT License**. See [LICENSE](LICENSE) for details.
