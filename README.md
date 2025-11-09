# ZenithStream

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/Brajesh2022/zenithstream)

ZenithStream is a futuristic, top-tier anime streaming and information platform designed to provide a visually stunning and functionally superior user experience, akin to Netflix. The application is powered by a client-provided API, proxied through Cloudflare Workers for security and performance. The entire application features a sleek, modern dark theme, emphasizing high-quality visuals and intuitive navigation.

## ✨ Key Features

-   **Netflix-Style UI:** A modern, dark-themed, and visually stunning interface.
-   **Dynamic Homepage:** A landing page with a hero banner and horizontally-scrolling carousels for content discovery.
-   **Powerful Search:** A robust search functionality to easily find anime series and movies.
-   **Detailed Content Pages:** Comprehensive pages for series and movies, including overviews, genres, seasons, and episode lists.
-   **Immersive Player:** An integrated player view for streaming episodes and movies with server-switching capabilities.
-   **API Proxy on Cloudflare:** All external API calls are securely proxied through a Cloudflare Worker for enhanced performance and security.

## 🛠️ Technology Stack

-   **Frontend:** React, Vite, React Router, TypeScript
-   **Backend:** Hono on Cloudflare Workers
-   **Styling:** Tailwind CSS, shadcn/ui
-   **State Management:** Zustand, TanStack Query
-   **Animation:** Framer Motion
-   **Icons:** Lucide React

## 🚀 Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   [Bun](https://bun.sh/) installed on your machine.
-   [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) for Cloudflare deployment.

### Installation & Running Locally

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/zenith_stream.git
    cd zenith_stream
    ```

2.  **Install dependencies:**
    ```bash
    bun install
    ```

3.  **Run the development server:**
    This command starts the Vite frontend server and the Hono backend worker concurrently.
    ```bash
    bun dev
    ```
    The application will be available at `http://localhost:3000`.

## 🏗️ Project Structure

The project is organized into three main directories:

-   `src/`: Contains the entire React frontend application, including pages, components, hooks, and utility functions.
-   `worker/`: Contains the Hono backend application running on Cloudflare Workers. This is where API routes and proxy logic are defined.
-   `shared/`: Contains TypeScript types and interfaces that are shared between the frontend and the backend to ensure type safety.

## 💻 Development

### Backend (Worker)

-   The backend is a Hono application running on a Cloudflare Worker.
-   The entry point is `worker/index.ts`.
-   To add new API endpoints, modify the `worker/user-routes.ts` file. The worker acts as a proxy to the external API specified in the client request.

### Frontend (React)

-   The frontend is a standard Vite + React application.
-   Pages are located in `src/pages/`.
-   Reusable components, including shadcn/ui components, are in `src/components/`.
-   API calls from the frontend are managed using `@tanstack/react-query` and should point to the local worker endpoints (e.g., `/api/parse/...`).

## ☁️ Deployment

This project is designed for seamless deployment to Cloudflare Pages.

1.  **Build the project:**
    This command bundles the frontend and worker code for production.
    ```bash
    bun run build
    ```

2.  **Deploy to Cloudflare:**
    Make sure you are logged in to Wrangler (`wrangler login`). Then, run the deploy command:
    ```bash
    bun run deploy
    ```
    This will deploy your application to your Cloudflare account.

Or deploy directly with the button below:

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/Brajesh2022/zenithstream)