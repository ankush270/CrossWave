# Project Overview 🚀

Welcome to Project CrossWave! This README will guide you through the directory structure and best practices to keep our project clean and organized.

---

## Directory Structure 📂

Here is an explanation of the key folders and their purposes:

```
|──backend
    ├── src
    │ ├── config
    │ ├── controllers
    │ ├── middlewares
    │ ├── models
    │ ├── routes
    │ ├── utils
    │ ├── microservices
    │ │ └── demoFeature
    | ├── docs
    │ |── server.js
    │ |── app.js
    ├── node_modules
    ├── .env
    ├── .gitignore
    ├── package.json
    ├── README.md
|──frontend

```

### **Important Instructions 📝:**

- **`backend/microservices fodler`**: A dedicated folder for standalone features or experimental modules.

  - **Demo Feature**: A reference structure is provided in the `microservices/demoFeature` folder to help you set up your own features.

- **`backend/docs fodler`**:
  - Each team member should create a file named after themselves in this folder (e.g., `docs/your-name.md`).
  - Document whatever work you do in your own words here. No need to use technical language—just describe what you are doing and why.

### **Backend Folder Structure Descriptions📁**

#### `src`

The main application logic resides here. Each folder inside `src` serves a specific purpose:

- **`config`**: Contains configuration files, such as database connections, environment variable loaders, and other global settings.
- **`controllers`**: Holds logic for handling requests and sending responses.
- **`middlewares`**: Includes middleware functions for tasks like authentication, logging, and error handling.
- **`models`**: Defines database models and schemas for the application.
- **`routes`**: Organizes all API routes and their mappings to controllers.
- **`utils`**: Utility functions and helpers used throughout the application.
- **`microservices`**: A dedicated folder for standalone features or experimental modules.
  - **Demo Feature**: A reference structure is provided in the `microservices/demoFeature` folder to help you set up your own features.

#### `node_modules`

- Contains all the dependencies installed via npm. This folder is auto-generated and should not be modified manually.

#### `.env`

- Environment variables for the application should be added here. Keep all feature-specific variables here as well.
- **Important**: Do not commit this file to the repository.

#### `.gitignore`

- Lists files and folders that should not be tracked by Git. Make sure sensitive information like `.env` is included here.

#### `package.json`

- Describes the project, dependencies, scripts, and other metadata.

#### `README.md`

- This file! It provides an overview of the project and guidelines for working on it.

---

## Guidelines for Adding Standalone Features 🛠️

- Any standalone feature you are building should go into the `microservices` folder.
- Follow the directory structure provided in the `microservices/demoFeature` folder for guidance.
- Integrate with the main application once the feature is ready.

---

## Documentation Guidelines 📖

- Create a file in the `docs` folder with your name (e.g., `docs/john-doe.md`).
- Write about what you are working on in simple, clear terms. No need to be overly technical.
- This helps track progress and ensures everyone is on the same page.

---

## Setting Up the Project ⚙️

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add necessary environment variables (refer to `.env.example` if available).
4. Start the development server:
   ```bash
   npm run dev
   ```

---

Happy coding, Team BrainStorm!! 🎉
