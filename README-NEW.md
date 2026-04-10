# Online Learning Management System (OLMS)

A comprehensive learning management system built with React, Node.js, Express, and MongoDB.

## 🚀 Features

- **User Authentication**: Secure login/logout with JWT tokens
- **Role-Based Access**: Admin, Teacher, and Student roles
- **Course Management**: Create, edit, delete courses
- **Module Management**: Organize course content into modules
- **Learning Materials**: Upload and manage course content
- **Assignments**: Create, submit, and grade assignments
- **Quizzes**: Create, take, and evaluate quizzes
- **Responsive Design**: Works on desktop and mobile devices

## 📋 Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher
- **MongoDB** database (local or Atlas)
- **Git** for version control

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/seth-3/OLMS.git
cd OLMS
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
