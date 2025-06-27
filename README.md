<div align="center">

# 🗓️ Schedule Pro

</div>

<div align="center">

  Frontend for [Schedule-Pro-API](https://github.com/kaikyMoura/Schedule-Pro-API) — a SaaS web application that implements the user interface and experience layer for appointment scheduling. The system is designed to be highly scalable, user-friendly, and efficient, with a focus on performance, usability, and seamless API integration.
</div>

<div align="center">
  
![GitHub top language](https://img.shields.io/github/languages/top/kaikyMoura/Schedule-Pro)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/ce1f958181d743b98107dbc70dfac5ed)](https://app.codacy.com/gh/kaikyMoura/Schedule-Pro/?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)
![Repository size](https://img.shields.io/github/repo-size/kaikyMoura/Schedule-Pro)
![Github last commit](https://img.shields.io/github/last-commit/kaikyMoura/Schedule-Pro)
![License](https://img.shields.io/aur/license/LICENSE)
![Languages count](https://img.shields.io/github/languages/count/kaikyMoura/Schedule-Pro)

</div>

<br/>

## 1. About the Project

This project is the frontend implementation of **Schedule Pro**, a modern SaaS system for scheduling and managing appointments and services.

Built with **Next.js**, **TypeScript**, **Tailwind CSS**, **Zustand** for state management, and **Zod** for schema validation, this frontend interacts with a dedicated backend responsible for user authentication, availability management, and service bookings.

<br/>

## 2. Key Features

- Modern, responsive UI
- Authentication with JWT tokens
- Form validation with Zod
- Global notifications state management using Zustand
- Scheduling and service booking
- Availability display
- User profile and appointment history
- Styled with Tailwind CSS
- Component-based and scalable architecture
- RESTful API integration

<br/>

## 3. Technologies & Dependencies

<div display="inline-block" gap="6">
  <img alt="next-logo" width="48" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" />
  <img alt="typescript-logo" width="48" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" />
  <img alt="tailwindcss-logo" width="48" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original-wordmark.svg" />
  <img alt="react-logo" width="48" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" />
</div>

### Main Dependencies

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Zod](https://zod.dev/)

<br/>

### 4. Architecture

The project follows a **modular architecture** with a clear separation of concerns, utilizing Next.js's built-in routing and API capabilities.

#### 📂 Project Structure:
- src/
  - components/ # Reusable UI components
      - Button/
        - index.tsx
        - Button.tsx
        - Button.module.scss
          
  - app/ # Next.js routing system
    - page.tsx # Landing page
    - login/
      - page.tsx # Login page
      - page.module.scss
        
  - hooks/ # Custom React hooks

  - lib/ # Utility functions

  - services/ # API and business logic
    - index.ts # Axios instance and request handlers
      
  - context/ # Global state management
    
  - utils/ # Helper functions
    
  - types/ # TypeScript interfaces and types
    - User.ts
      
  - styles/ # Global styles
    - globals.css

<br/>
  
### 5. Installation and Setup

### Prerequisites:
Before running the project, ensure that **Node.js** is installed on your machine. If not, you can download it from the [official Node.js website](https://nodejs.org/en/) (LTS version recommended).

To verify your Node.js installation, run:

```console
node -v
npm -v
```

#### Clone the repository to your local machine:

```console
git clone https://github.com/kaikyMoura/Schedule-Pro.git
```

Navigate to the project's root directory:

```console
cd Schedule-Pro
```

### Installing dependencies:
Use npm or yarn to install the project dependencies:

```console
npm install
# or
pnpm install
# or
yarn install
```

#### Running the Application:
Once the dependencies are installed, you can start the development server with:

```console
npm run dev
# or
pnpm run dev
# or
yarn dev
```

#### The application will be available on:

```console
http://localhost:3000
```

<br/>

### 6. 🚀 Deploy
### Deployment on Vercel with Continuous Integration

The deployment of the project is done on **Vercel**, leveraging **Continuous Integration** for automatic builds and deployments. Any changes pushed to the repository on GitHub are automatically built and deployed to Vercel. 

#### Key Points:
- The project is automatically built and deployed whenever changes are pushed to the GitHub repository.
- **Environment Variables** are configured directly in the Vercel dashboard, ensuring seamless integration between build and deployment.
- **Custom Domain** can be configured for the deployed application, with automatic SSL certificate setup by Vercel.
  
The application is accessible via the unique Vercel-generated URL:

```bash
# Coming soon...
```

<br/>

### 7. Pages Documentation

|  Page |  Description |
| --- | --- |
|  `/signup`	 |  Register new user  |
|  `/login`  |	Authenticate and get token |
|  `/`  |  Authenticated user dashboard  |
|  `/appointmens`  |  View and manage appointments  |
|  `/customers`  | View and manage customers (**Admin only**)  |
|  `/services`  |  View and manage (**Admin only**) available services  |
|  `/profile`  |  User profile and account settings |

> ⚠️ **Important**
> </br> New routes will be added and documented as development continues.

<br/>

### 8. 📝 Terms of Use
- **Non-commercial** project.
- All rights related to user data and privacy are respected.
- This project aims to serve as a learning and portfolio tool.

👨‍💻 Developed by Kaiky de Moura Tupinambá
