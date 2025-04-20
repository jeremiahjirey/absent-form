# Attendance Form Demo

A simple attendance form demo application built using React, TypeScript, and AWS Lambda.

## Technologies Used

### Frontend
- React 18.3.1
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui (UI components)
- React Router DOM
- React Query
- React Hook Form
- Zod (validation)

### Folder Structure

```
src/
├── components/
│   └── ui/          # UI components from shadcn
├── hooks/           # Custom React hooks
├── lib/            # Utilities and helper functions
├── pages/          # Application pages
└── main.tsx        # Application entry point
```

## Features

- Attendance form with validation
- Responsive and modern UI using Tailwind CSS
- Routing with React Router
- State management with React Query
- Reusable UI components with shadcn/ui

## Local Development

To run the application locally:

1. Clone the repository:
```bash
git clone https://github.com/jeremiahjirey/absent-form-demo.git
cd absent-form-demo
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will run at `http://localhost:8080`

## Component Usage Guide

### UI Components

The application uses shadcn/ui which provides various customizable components:

- Button
- Form
- Input
- Dialog
- Alert
- Toast
- and more.

### Form Handling

Forms use a combination of React Hook Form and Zod for validation:

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
```

## Deployment

This application can be deployed using various hosting platforms. The default configuration uses Vite as the build tool.

To build the application:

```bash
npm run build
```

## License

[MIT License](LICENSE)

## Contributions

Contributions are always welcome! Please create a pull request for improvements or feature additions.

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Create a Pull Request