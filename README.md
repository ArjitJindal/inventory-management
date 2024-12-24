# Inventory Management Dashboard

This is an **Inventory Management Dashboard** built with [Next.js](https://nextjs.org), [React](https://reactjs.org), [Tailwind CSS](https://tailwindcss.com), and TypeScript. It allows users to manage and view product inventories with distinct admin and user functionalities.

## Features

### Admin View

- **Manage Products**:
  - Edit product details (price, quantity, etc.).
  - Delete products from the inventory.
  - Disable products to make them unavailable.
- **Real-Time Inventory Stats**:
  - Total products.
  - Total store value.
  - Out-of-stock products.
  - Number of product categories.

### User View

- View-only mode for products.
- Action buttons (Edit, Delete, Disable) are disabled.

### Additional Features

- **Logged Out Screen**: Users are redirected to a login screen when not authenticated.
- Responsive and user-friendly interface.
- Clean and modern icons using the **Lucide Icons** library.

<details>
<summary>Tech Stack</summary>

- **Framework**: [Next.js](https://nextjs.org)
- **Frontend**: [React](https://reactjs.org)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **Icons**: [Lucide Icons](https://lucide.dev)
- **Data Fetching**: [SWR](https://swr.vercel.app)
- **State Management**: React Context
- **Language**: TypeScript

</details>

## Live Demo

Check out the deployed application here: [Inventory Management Dashboard](https://inventory-management-virid-seven.vercel.app/login)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.

### Installation

```bash
# Clone the repository
git clone https://github.com/ArjitJindal/inventory-management.git
cd inventory-management

# Install dependencies
npm install

# Run the development server
npm run dev
```
