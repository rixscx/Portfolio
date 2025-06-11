# MyPortfolio

[![Live Site](https://img.shields.io/badge/Live%20Site-rixscx.vercel.app-blue?style=for-the-badge)](https://rixscx.vercel.app)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)

My portfolio showcases my projects and skills, built with **Next.js 15**, **Tailwind CSS**, and **TypeScript**. Deployed on **Vercel** with support for **GitHub Pages**.

## 🌟 Features

- 📱 Works on mobile, tablet, and desktop
- ⚡ Fast loading with Next.js
- ✅ Type-safe code using TypeScript
- 🎨 Clean, modern design with Tailwind CSS
- 🔍 SEO-friendly for better visibility
- 🌙 Dark mode toggle for user comfort
- 📂 Deployable to Vercel or GitHub Pages

## 🚀 Live Demo

🔗 [rixscx.vercel.app](https://rixscx.vercel.app)

## 🛠️ Tech Stack

- **Framework**: Next.js 15
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Deployment**: Vercel, GitHub Pages
- **Icons**: Lucide, Heroicons
- **Package Manager**: PNPM (or NPM/Yarn)

## 📁 Project Structure

```
├── app/                  # Pages and layouts
├── components/           # Reusable UI components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── public/               # Images and static files
├── styles/               # Global styles
├── docs/                 # Static export for GitHub Pages
├── .gitignore
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## ⚙️ Prerequisites

- **Node.js**: Version 18+
- **PNPM**: Install with `npm install -g pnpm` (or use NPM/Yarn)
- **Git**: For cloning

## 💻 Getting Started

1. **Clone the repo**:
   ```bash
   git clone https://github.com/rixscx/rixscx-portfolio.git
   cd rixscx-portfolio
   ```

2. **Install dependencies**:
   ```bash
   pnpm install
   ```

3. **Run locally**:
   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## 📦 Build for Production

1. **Create a build**:
   ```bash
   pnpm build
   ```

2. **Export to static HTML**:
   ```bash
   pnpm export
   ```

   Files go to the `docs/` folder.

## 🌐 GitHub Pages Setup

1. Push the `docs/` folder to your repo.
2. Go to repo → **Settings** → **Pages** → **Source** → Select `/docs`.
3. Site will be live at `https://rixscx.github.io/rixscx-portfolio`.

## 🐞 Using GitHub Issues

GitHub Issues helps track tasks and bugs. Use it to manage your project and share feedback.

### How to Use

1. **Check Issues**:
   - Go to `https://github.com/rixscx/rixscx-portfolio` → **Settings** → **Features**.
   - Ensure “Issues” is enabled (default).

2. **Create an Issue**:
   - Go to **Issues** → **New issue**.
   - Example:
     ```
     **Title**: Add contact form API
     **Description**: Add a contact form for feedback.
     **Steps**:
     - Create `app/api/contact/route.ts`.
     - Validate inputs with TypeScript.
     - Test with a mock email service.
     **Priority**: Medium
     **Deadline**: [e.g., June 20, 2025]
     ```
   - Click **Submit new issue**.

3. **Organize**:
   - **Labels**: Use `bug`, `enhancement`, or `coursework`.
   - **Assignees**: Assign to `rixscx` or others.
   - **Milestones**: Group by deadlines (e.g., “Coursework”).
   - **Projects**: Use a Kanban board for tracking.

4. **Collaborate**:
   - Share issue links via email or other platforms.
   - Ask for feedback in comments, e.g., “Is my API secure?”
   - Close issues when done.

5. **Tips**:
   - Write clear titles/descriptions.
   - Use Markdown for lists or code.
   - Link issues/pull requests (e.g., `Resolves #5`).

### Resources
- [GitHub Docs: Issues](https://docs.github.com/en/issues)

## 🖼️ Screenshots

| Homepage | Projects |
|----------|----------|
| ![Homepage] | ![Projects] |



## ❓ FAQ

**Q: Can I use this as a template?**  
A: Yes, it’s MIT-licensed. Customize it freely.

**Q: Why PNPM?**  
A: It’s fast. Use NPM/Yarn if preferred (`npm install`, `npm run dev`).

**Q: How to add projects?**  
A: Update `app/projects/` or `components/`.

## 📬 Contact

Have questions? Reach out:  
- [GitHub Issues](https://github.com/rixscx/rixscx-portfolio/issues)  
- [LinkedIn](https://www.linkedin.com/in/rixscx)  

## 🙋‍♀️ Contributors

- [Manish P](https://github.com/rixscx)  
**Under the guidance of [Dr. Agughasi Victor Ikechukwu](https://github.com/Victor-Ikechukwu)**  
❤️ **Thanks for checking out my portfolio!**  
I’m excited to share my work. Let me know what you think!

## 📝 License

This project is licensed under the [MIT License](LICENSE).
