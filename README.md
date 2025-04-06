# NBDAStore E-Commerce Platform

A modern, full-featured e-commerce platform built with Next.js 15, TypeScript, PostgreSQL, Prisma, and more.

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

## Accessing Different Parts of the Application

### Customer Interface
- **Homepage**: http://localhost:3000/
- **Product Categories**: http://localhost:3000/category/[category-id]
- **Product Details**: http://localhost:3000/product/[product-id]
- **Cart**: http://localhost:3000/cart
- **Checkout**: http://localhost:3000/checkout
- **User Account**: http://localhost:3000/account

### Admin Dashboard
1. Register a new user through the application
2. Update the user's role to "ADMIN" in the database:
   ```sql
   UPDATE "User" SET role = 'ADMIN' WHERE email = 'your-email@example.com';
   ```
3. Log in with your admin account
4. Access the admin dashboard at: http://localhost:3000/admin

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
