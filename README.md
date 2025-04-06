# NBDAStore E-Commerce Platform

A modern, full-featured e-commerce platform built with Next.js 15, TypeScript, PostgreSQL, Prisma, and more.

## Live Demo

Visit the live demo of NBDAStore: [https://cloth-ecommerce-mu.vercel.app/](https://cloth-ecommerce-mu.vercel.app/)

## Features

- **User Authentication**: Email/password login and OAuth providers (Google, GitHub)
- **Product Catalog**: Browse products by categories
- **Shopping Cart**: Add, remove, and manage items
- **Wishlist**: Save products for later
- **Checkout**: Complete purchase flow
- **User Profiles**: Manage account information and view order history
- **Admin Dashboard**: Comprehensive admin panel for store management
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Tech Stack

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS, Shadcn/ui
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js
- **Payment Processing**: Stripe
- **File Uploads**: Uploadthing
- **Charts**: Recharts
- **Email**: Resend

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or later)
- npm or yarn or pnpm
- PostgreSQL database

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/nbda-store.git
   cd nbda-store
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   DATABASE_URL="postgresql://username:password@localhost:5432/nbda_store"
   
   # NextAuth
   AUTH_SECRET="your-auth-secret"
   NEXTAUTH_URL="http://localhost:3000"
   
   # OAuth Providers (optional)
   GITHUB_CLIENT_ID=""
   GITHUB_CLIENT_SECRET=""
   GOOGLE_CLIENT_ID=""
   GOOGLE_CLIENT_SECRET=""
   
   # Stripe (optional for payments)
   STRIPE_API_KEY=""
   STRIPE_WEBHOOK_SECRET=""
   
   # Uploadthing (optional for file uploads)
   UPLOADTHING_SECRET=""
   UPLOADTHING_APP_ID=""
   
   # Resend (optional for emails)
   RESEND_API_KEY=""
   ```

4. Initialize the database:
   ```bash
   npx prisma migrate dev
   ```

5. Seed the database with sample data:
   ```bash
   npx prisma db seed
   ```

## Running the Application

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Deployment

The application is deployed on Vercel. You can deploy your own version by:

1. Fork this repository
2. Sign up for a [Vercel account](https://vercel.com/signup)
3. Import your GitHub repository into Vercel
4. Configure environment variables in the Vercel dashboard
5. Deploy your application

The site will be deployed to a URL like `https://your-project-name.vercel.app`

## Accessing Different Parts of the Application

### Customer Interface
- **Homepage**: 
  - Local: http://localhost:3000/
  - Live: https://cloth-ecommerce-mu.vercel.app/
- **Product Categories**: 
  - Local: http://localhost:3000/category/[category-id]
  - Live: https://cloth-ecommerce-mu.vercel.app/category/[category-id]
- **Product Details**: 
  - Local: http://localhost:3000/product/[product-id]
  - Live: https://cloth-ecommerce-mu.vercel.app/product/[product-id]
- **Cart**: 
  - Local: http://localhost:3000/cart
  - Live: https://cloth-ecommerce-mu.vercel.app/cart
- **Checkout**: 
  - Local: http://localhost:3000/checkout
  - Live: https://cloth-ecommerce-mu.vercel.app/checkout
- **User Account**: 
  - Local: http://localhost:3000/account
  - Live: https://cloth-ecommerce-mu.vercel.app/account

### Admin Dashboard
1. Register a new user through the application
2. Update the user's role to "ADMIN" in the database:
   ```sql
   UPDATE "User" SET role = 'ADMIN' WHERE email = 'your-email@example.com';
   ```
3. Log in with your admin account
4. Access the admin dashboard at: 
   - Local development: http://localhost:3000/admin
   - Live site: https://cloth-ecommerce-mu.vercel.app/admin

## Project Structure

```
cloth-ecommerce/
├── app/                    # Next.js app router
│   ├── (home)/             # Home page routes
│   ├── account/            # User account routes
│   ├── admin/              # Admin dashboard routes
│   ├── api/                # API routes
│   ├── category/           # Category pages
│   ├── checkout/           # Checkout flow
│   ├── product/            # Product pages
│   └── ...                 # Other app routes
├── components/             # React components
│   ├── admin/              # Admin-specific components
│   ├── home/               # Homepage components
│   ├── layout/             # Layout components
│   ├── ui/                 # UI components
│   └── ...                 # Other components
├── lib/                    # Utility functions and shared code
├── prisma/                 # Prisma schema and migrations
│   ├── schema.prisma       # Database schema
│   └── seed.ts             # Seed script
├── public/                 # Static assets
└── ...                     # Configuration files
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
