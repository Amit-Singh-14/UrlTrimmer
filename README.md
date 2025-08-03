# Trimrr - Modern URL Shortener

A modern, feature-rich URL shortener built with React, Vite, and Supabase. Transform long URLs into clean, memorable short links with detailed analytics.

## ✨ Features

-   **Smart URL Shortening**: Create clean, memorable short links instantly
-   **Detailed Analytics**: Track clicks, locations, devices, and performance metrics
-   **Custom URLs**: Create branded short links with custom aliases
-   **QR Code Generation**: Automatic QR code generation for each short link
-   **Modern UI**: Beautiful, responsive design with dark mode support
-   **Demo Account**: Try the app instantly with pre-configured demo credentials

## 🚀 Demo

**Try it now with demo credentials:**

-   Email: `demo@trimrr.com`
-   Password: `demo123`

## 🛠️ Tech Stack

-   **Frontend**: React 18, Vite
-   **Styling**: Tailwind CSS, Radix UI
-   **Backend**: Supabase (Database, Auth, Storage)
-   **Charts**: Recharts
-   **Icons**: Lucide React
-   **Routing**: React Router DOM

## 📦 Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd urlShortener
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env` file in the root directory with your Supabase credentials:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_BASE_URL=http://localhost:5173
```

4. Start the development server:

```bash
npm run dev
```

## 🗄️ Database Setup

### Demo User Setup

To set up the demo user in your Supabase database:

1. Go to your Supabase dashboard
2. Navigate to Authentication > Users
3. Create a new user with:
    - Email: `demo@trimrr.com`
    - Password: `demo123`
    - User Metadata: `{"name": "Demo User"}`

### Database Schema

The app requires the following tables in Supabase:

-   `urls` - Store shortened URLs
-   `clicks` - Track click analytics

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Quick Deploy**:

    - Push your code to GitHub
    - Go to [vercel.com](https://vercel.com) and import your repository
    - Set environment variables in Vercel dashboard
    - Deploy automatically!

2. **CLI Deploy**:

    ```bash
    npm i -g vercel
    vercel
    ```

3. **Environment Variables** (set in Vercel dashboard):
    - `VITE_SUPABASE_URL`: Your Supabase project URL
    - `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key
    - `VITE_BASE_URL`: Your Vercel app URL (e.g., https://your-app.vercel.app)

### Alternative: Deploy to Netlify

1. Connect your GitHub repository to Netlify
2. Build settings:
    - **Build command**: `npm run build`
    - **Publish directory**: `dist`
3. Set environment variables in Netlify dashboard

## 📱 Features Overview

### URL Management

-   Create short URLs with custom aliases
-   Bulk URL management
-   Search and filter functionality
-   QR code generation

### Analytics Dashboard

-   Click tracking and analytics
-   Geographic location data
-   Device and browser statistics
-   Time-based performance metrics

### User Experience

-   Responsive design for all devices
-   Dark/light mode support
-   Intuitive navigation
-   Fast loading times

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

-   Built with [Vite](https://vitejs.dev/)
-   UI components from [Radix UI](https://www.radix-ui.com/)
-   Styled with [Tailwind CSS](https://tailwindcss.com/)
-   Backend powered by [Supabase](https://supabase.com/)
