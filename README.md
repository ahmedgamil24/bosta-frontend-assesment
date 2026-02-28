# Bosta Frontend Assessment - React Fake Store

![React](https://img.shields.io/badge/React-19.2.0-blue?logo=react&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.2.1-blue?logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.3.1-green?logo=vite&logoColor=white)

A React application demonstrating component architecture, API integration, state management, and styling using the [Fake Store API](https://fakestoreapi.com/).

**Live Demo:** [https://bosta-frontend-assesment.vercel.app](https://bosta-frontend-assesment.vercel.app)

---

## Table of Contents

- [Features](#features)
  - [Product Listing Page](#product-listing-page)
  - [Product Details Page](#product-details-page)
  - [Create Product Page](#create-product-page)
- [Technologies Used](#technologies-used)
- [Setup & Installation](#setup--installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Future Improvements](#future-improvements)

---

## Features

### Product Listing Page
- Fetches and displays a list of products from `/products`.
- Shows product image, name, price, and category.
- "View Details" button navigates to Product Details Page.
- Sorting options:
  - Price: low to high / high to low
  - Category
- Pagination (10 products per page)
- UX Enhancements:
  - Loading skeletons while fetching data
  - Error handling with toast notifications
  - Empty state message when no products are found

### Product Details Page
- Displays product information: image, title, description, category, price.
- "Back to Products" button.
- Skeleton loading indicator and error handling via `EmptyState` component.

### Create Product Page
- Form to create a new product with:
  - Title (text input)
  - Description (textarea)
  - Price (number input)
  - Category (dropdown fetched from `/products/categories`)
  - Image URL (text input)
- Validation:
  - Required fields
  - Positive number validation for price
- Submit form via POST request to `/products`.
- UX Enhancements:
  - Skeleton form while fetching categories
  - Toast notifications for success/error
  - Submit button disabled while submitting

---

## Technologies Used

- **React 19.2** – Frontend framework
- **Vite 7.3** – Development tooling
- **TailwindCSS 4.2 & DaisyUI** – Styling
- **Axios 1.13** – API calls
- **React Hook Form 7.71 & Zod 4.3** – Form handling & validation
- **React Router 7.13** – Routing
- **Lucide React & React Icons** – Icons
- **ESLint** – Code linting

---

## Setup & Installation

1. Clone the repository:
git clone https://github.com/yourusername/bosta-frontend-assesment.git

2. Navigate into the project folder:
cd bosta-frontend-assesment

3. Install dependencies:
npm install

4. Start the development server:
npm run dev

5. Open http://localhost:5173
 in your browser.

Usage

1. Browse products on the Product Listing Page.

2. Click View Details to see detailed product info.

3. Add a new product via the Create Product Page.

4. Sort and paginate products.

5. Toasts and skeletons improve UX during loading and errors.

6. EmptyState components handle no data or API errors. 

## Project Structure
src/
 ├─ api/axiosInstance.js      # Axios setup
 ├─ components/
 │   ├─ ProductCard.jsx
 │   ├─ SkeletonCard.jsx
 │   ├─ SkeletonForm.jsx
 │   ├─ EmptyState.jsx
 │   ├─ ErrorToast.jsx
 │   └─ BackButton.jsx
 ├─ pages/
 │   ├─ Products.jsx
 │   ├─ ProductDetails.jsx
 │   └─ CreateProduct.jsx
 ├─ App.jsx
 └─ main.jsx
 