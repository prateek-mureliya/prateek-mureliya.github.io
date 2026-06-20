# Prateek Kumar | Interactive Web OS Portfolio

Explore Prateek Kumar's online portfolio — a web OS-style site to view his projects, skills, and experience in a clean, fast, and easy interface.

## 👨‍💻 Live Demo

🌐 Portfolio: [https://prateek-mureliya.github.io/](https://prateek-mureliya.github.io/)

## ✨ Features

- 🖥️ **Desktop UI Experience** – MacOS-based layout similar to an operating system
- ⚡ **Next.js (App Router)** for fast and optimized performance
- 🌙 **Dark/Light Mode Support**
- 📱 **Fully Responsive Design**
- 🎛️ Working **Control Center**
- 🧩 Multiple apps to showcase your skills and projects:
  - Finder (About Me, Skills, Experience & Education)
  - Contact Us card with Social links
  - Mail Box for Feedback
  - Terminal (interactive command line)
  - VS Code Viewer for checkout code
  - Trash Bin for old resumes

## 🚀 Getting Started

#### Prerequisites

- Node.js 24.x or higher
- npm or yarn

#### Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/prateek-mureliya/prateek-mureliya.github.io.git desktop-style-portfolio

    cd desktop-style-portfolio/
    ```

1.  Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

1.  Comment production changes for local development:

    ⚠️ Important Note

    The following changes in `next.config.ts` are only for **local development**.

    ❗ **Do NOT commit these changes to production.**

    These configurations are temporarily disabled to ensure the application runs correctly on the development server.

    [**next.config.ts**](next.config.ts)

    ```typescript
    import type { NextConfig } from 'next';

    const nextConfig: NextConfig = {
      // output: 'export',
      // basePath: '',
      // images: {
      //   unoptimized: true,
      // },
    };

    export default nextConfig;
    ```

    📌 Notes
    - ✅ Uncomment these settings only when preparing for production deployment
    - 🚫 Keep them commented during local development to avoid unexpected issues
    - 🔄 Always restart the dev server after making above changes

1.  Run the development server:

    ```bash
    npm run dev
    ```

1.  Open in browser:

    ```bash
    http://localhost:3000
    ```

## 🧹 Formatting Note

Whenever you add or modify files in the project, make sure to run the following command to maintain consistent code formatting:

```bash
npm run prettier:check

npm run prettier:write
```

This ensures all files follow the project's formatting standards and avoids linting issues.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙌 Acknowledgements

- Framework: [Next.js](https://nextjs.org/)
- Styling: [Tailwind CSS](https://tailwindcss.com/)
- UI Components: [shadcn/ui](https://ui.shadcn.com/)
- Icons: [React Icons](https://react-icons.github.io/react-icons/)
- Language: [TypeScript](https://www.typescriptlang.org/) / [JavaScript](https://www.javascript.com/)

## 📬 Contact

Feel free to reach out!

- Portfolio: [https://prateek-mureliya.github.io/](https://prateek-mureliya.github.io/)
- Email: [prateekkumar1393@gmail.com](mailto:prateekkumar1393@gmail.com)
- LinkedIn: [https://www.linkedin.com/in/prateek-mureliya/](https://www.linkedin.com/in/prateek-mureliya/)

#

⭐ If you like this project, consider giving it a star!
