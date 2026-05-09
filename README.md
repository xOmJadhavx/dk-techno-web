# DK Techno Industries — Industrial Web Platform 🏭

[![Vite](https://img.shields.io/badge/Framework-Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/Library-React-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vercel](https://img.shields.io/badge/Deployment-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![License](https://img.shields.io/badge/Status-Production--Ready-00B4D8?style=for-the-badge)](https://github.com/xOmJadhavx/dk-techno-web)

A high-performance, premium industrial web application built for **DK Techno Industries**. This platform combines state-of-the-art UI/UX with robust manufacturing business logic, designed to showcase precision engineering capabilities to global clients.

---

## ✨ Key Features

### 💎 Cutting-Edge UI/UX
- **3D Looping Machinery Carousel:** An interactive 3D perspective gallery for showcasing heavy machinery with mouse-scroll support and page-scroll locking for an immersive experience.
- **Interactive Mesh Background:** A GPU-accelerated, drifting mesh gradient background that creates a deep, high-tech atmosphere.
- **Glassmorphism Design System:** A futuristic aesthetic using heavy blur backdrops, subtle borders, and vibrant cyan accents.
- **Custom Motion Cursor:** A lag-free, hardware-accelerated custom cursor that reacts to hover states across the entire application.

### 🛠 Technical Excellence
- **Multi-Language Engine:** Real-time language switching between English and Marathi for local and global accessibility.
- **Dynamic Preloader:** A professional, vertically-aligned brand preloader with an integrated progress bar.
- **Product Lightbox Gallery:** High-resolution modal previews for machinery and precision components.
- **SEO & Social Optimization:** Integrated JSON-LD structured data and Open Graph meta tags for premium social media previews.

### 🛡️ Production & Security
- **Production Hardened:** Built-in production console silencing, source map disabling, and global Error Boundary with auto-refresh logic.
- **Secure RFQ System:** Integrated Web3Forms contact system with environment variable protection and file upload capabilities.
- **Performance Optimized:** Achieving high Lighthouse scores through optimized asset loading and hardware-accelerated animations.

---

## 🚀 Tech Stack

- **Core:** React 18, Vite
- **Animations:** CSS3 (Transforms, Keyframes), RequestAnimationFrame
- **Icons:** Lucide-React
- **Deployment:** Vercel (CI/CD)
- **Email/Forms:** Web3Forms API

---

## 🛠️ Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/xOmJadhavx/dk-techno-web.git
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the root directory and add your Web3Forms key:
   ```env
   VITE_WEB3FORMS_KEY=your_key_here
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

---

## 🏗️ Architecture Note

The project follows a modular React architecture with a central `App.jsx` handling state management for translations and modals, supported by specialized components like `ThreeDCarousel.jsx` for complex UI logic.

Developed with ❤️ for **DK Techno Industries**.
