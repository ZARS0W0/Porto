# 🚀 Tayef Portfolio

A modern, interactive portfolio website built with Next.js, featuring stunning animations, 3D elements, and a cosmic-themed design. This portfolio showcases my work as a versatile developer specializing in web development, embedded systems, and various programming languages.

## ✨ Features

- 🎨 **Modern UI/UX** - Beautiful, responsive design with smooth animations
- 🌌 **Interactive 3D Elements** - Spline integration for immersive 3D experiences
- 🌓 **Dark/Light Theme** - Seamless theme switching with persistent preferences
- ✨ **Animations** - Framer Motion powered smooth transitions and scroll animations
- 🎯 **Interactive Background** - Cosmic-themed WebGL background effects
- 📱 **Fully Responsive** - Optimized for all devices and screen sizes
- ⚡ **Performance Optimized** - Built with Next.js 14 for optimal performance
- 🎭 **Smooth Scrolling** - Elegant navigation with scroll-based animations

## 🛠️ Tech Stack

### Core Framework
- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library

### 3D & Graphics
- **Spline** - Interactive 3D design tool
- **Three.js** - 3D graphics library
- **WebGL** - Custom shader effects

### Deployment
- **Netlify** - Hosting and deployment
- **@netlify/plugin-nextjs** - Next.js optimization plugin

## 📦 Installation

### Prerequisites

- Node.js 18+ and npm
- Git

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/ZARS0W0/Porto.git
   cd Porto/porto
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Usage

### Development

```bash
# Navigate to the project directory
cd porto

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

### Project Structure

```
Porto/
├── porto/                  # Next.js project directory
│   ├── app/                # Next.js app directory
│   │   ├── layout.tsx     # Root layout
│   │   ├── page.tsx       # Home page
│   │   └── globals.css    # Global styles
│   ├── components/         # React components
│   │   ├── sections/       # Page sections
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Skills.tsx
│   │   │   ├── Timeline.tsx
│   │   │   ├── Interactive3D.tsx
│   │   │   └── Contact.tsx
│   │   ├── ui/             # UI components
│   │   │   ├── global-cosmic-background.tsx
│   │   │   ├── spotlight.tsx
│   │   │   └── ...
│   │   └── Navigation.tsx
│   ├── contexts/           # React contexts
│   │   └── ThemeContext.tsx
│   ├── lib/                # Utilities
│   │   └── utils.ts
│   ├── netlify.toml        # Netlify configuration
│   └── package.json
└── README.md               # This file
```

## 🌐 Deployment

This project is configured for deployment on Netlify.

### Netlify Deployment

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```

2. **Configure Netlify**
   - Connect your GitHub repository to Netlify
   - Set **Base directory** to `porto`
   - Leave **Publish directory** empty (handled by plugin)
   - Build command: `npm run build` (automatic from `netlify.toml`)

3. **Deploy**
   - Netlify will automatically build and deploy on push to main
   - The `@netlify/plugin-nextjs` plugin handles Next.js optimization

### Configuration Files

- `porto/netlify.toml` - Netlify deployment configuration
- `porto/next.config.mjs` - Next.js configuration
- `porto/tailwind.config.ts` - Tailwind CSS configuration

## 🎨 Customization

### Update Personal Information

1. **About Section** - Edit `porto/components/sections/About.tsx`
2. **Contact Information** - Update `porto/components/sections/Contact.tsx`
3. **Skills** - Modify `porto/components/sections/Skills.tsx`
4. **Timeline** - Edit `porto/components/sections/Timeline.tsx`

### Theme Colors

Customize colors in `porto/tailwind.config.ts` and `porto/app/globals.css`

### 3D Models

Replace Spline scenes in `porto/components/sections/Interactive3D.tsx`

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Important Notice - Credits & Usage

### 🔒 Copyright Notice

**This project is protected by copyright. All rights reserved.**

### ❌ What You Cannot Do

- ❌ Copy, clone, or fork this repository without proper attribution
- ❌ Use this code in your projects without crediting the original author
- ❌ Claim this work as your own
- ❌ Remove copyright notices or attribution
- ❌ Use this code for commercial purposes without explicit permission

### ✅ What You Can Do

- ✅ **Fork and learn** - Fork this repository to learn from it
- ✅ **Use with credits** - Use this code in your projects **only if** you:
  - Give proper credit to the original author (ZARS0W0 / Tayef)
  - Link back to this repository
  - Include the original copyright notice
  - Do not use it for commercial purposes without permission

### 📋 Proper Attribution

If you use any code from this project, you must include:

```markdown
Portfolio Design & Code by ZARS0W0
Original Repository: https://github.com/ZARS0W0/Porto
```

### 🤝 Commercial Use

For commercial use or licensing inquiries, please contact:
- **Email**: tayef323@gmail.com
- **GitHub**: [@ZARS0W0](https://github.com/ZARS0W0)

### 📄 License Terms

By using this code, you agree to:
1. Provide attribution to the original author
2. Not remove copyright notices
3. Not use this code for commercial purposes without explicit permission
4. Respect the intellectual property rights of the original creator

**Violation of these terms may result in legal action.**

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Spline](https://spline.design/) - 3D design tool
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Lucide](https://lucide.dev/) - Icon library
- [Radix UI](https://www.radix-ui.com/) - UI primitives

## 📧 Contact

- **Email**: tayef323@gmail.com
- **GitHub**: [@ZARS0W0](https://github.com/ZARS0W0)
- **Discord**: zartain0844

## 🌟 Show Your Support

If you like this project, please give it a ⭐ star on GitHub!

---

**Made with ❤️ by ZARS0W0 (Tayef)**


