# FocusFlow

A mobile study-planner app with task management, Pomodoro timers, and study-group graphs.

## Table of Contents

- [Project Overview](#project-overview)  
- [Tech Stack](#tech-stack)  
- [Features](#features)  
- [Prerequisites](#prerequisites)  
- [Installation](#installation)  
  - [1. Clone the repo](#1-clone-the-repo)  
  - [2. Server setup](#2-server-setup)  
  - [3. Client setup](#3-client-setup)  
- [Environment Variables](#environment-variables)  
- [Running Locally](#running-locally)  
- [Folder Structure](#folder-structure)  
- [Contributing](#contributing)  
- [License](#license)  

---

## Project Overview

FocusFlow helps students and professionals plan study sessions by combining:

- **Task Management** (create/read/update/delete tasks)  
- **Pomodoro-style Timers** (with Redis-backed scheduling and push notifications)  
- **Study-Group Graphs** (visualize connections in Neo4j)

---

## Tech Stack

- **Client:** React Native (or Expo)  
- **API:** Python 3.10+, FastAPI, Uvicorn  
- **Database:** Neo4j (Graph storage)  
- **Cache & Scheduler:** Redis  
- **Auth & Data:** Firebase Auth & Firestore  
- **Deployment:** Docker, GitHub Actions

---

## Features

1. **User auth** (email/password via Firebase)  
2. **Task CRUD** (Firestore-backed)  
3. **Pomodoro timer** (schedule via Redis, notify via FCM)  
4. **Graph view** (Neo4j visualizations)  
5. **CI/CD** (Lint & test on every PR)

---

## Prerequisites

- **Git**  
- **Node.js v16+ & npm**  
- **Python 3.10+ & pip**  
- **Redis** (local or cloud URL)  
- **Neo4j** (local server or AuraDB instance)  
- **Firebase project** (Auth + Firestore enabled)

---

## Installation

### 1. Clone the repo

```bash
git clone git@github.com:<YOUR-ORG>/FocusFlow.git
cd FocusFlowr
