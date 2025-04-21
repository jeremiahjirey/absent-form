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

## Penggunaan

- Klik tombol "Add Student" untuk menambahkan siswa baru
- Gunakan ikon edit pada setiap baris untuk mengubah data siswa
- Gunakan ikon hapus untuk mengeluarkan siswa dari daftar

## Kontribusi

Kontribusi selalu dipersilakan! Silakan buat *pull request* atau laporkan *issues*.

## Lisensi

Proyek ini dilisensikan di bawah MIT License.
