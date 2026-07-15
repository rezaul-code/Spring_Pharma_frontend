# SpringPharma - Pharmacy Management System

A modern, full-featured pharmacy management dashboard built with Next.js 15, TypeScript, and React Query.

## Features

- **Authentication & Authorization**: Secure login/register with role-based access control
- **Dashboard**: Real-time KPIs, sales trends, and inventory overview
- **Medicine Management**: Complete CRUD operations with search and filtering
- **Point of Sale (POS)**: Bill creation with GST calculation and invoice generation
- **Bill History**: Track all sales with filters and analytics
- **Analytics & Reports**: Sales trends, top-selling medicines, and revenue metrics
- **Staff Management**: Add/edit/delete staff with role assignment
- **Settings**: Pharmacy information, account management, and security

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with dark emerald theme
- **State Management**: React Query for server state, Context API for auth
- **Forms**: React Hook Form with Zod validation
- **API Client**: Axios with interceptors
- **UI Components**: shadcn/ui
- **Charts**: Recharts
- **Notifications**: Sonner

## Project Structure

```
app/
├── (auth)/                 # Authentication pages
│   ├── login/
│   └── register/
├── (dashboard)/            # Protected dashboard routes
│   ├── dashboard/
│   ├── medicines/
│   ├── billing/
│   ├── analytics/
│   ├── staff/
│   └── settings/
├── layout.tsx
└── page.tsx

components/
├── auth/                   # Auth components
├── dashboard/              # Dashboard widgets
├── medicine/               # Medicine module components
├── billing/                # Billing/POS components
├── staff/                  # Staff management components
├── analytics/              # Analytics components
├── common/                 # Reusable components
└── ui/                     # Base UI components

services/                   # API services
├── auth.service.ts
├── dashboard.service.ts
├── medicine.service.ts
├── billing.service.ts
└── staff.service.ts

hooks/
├── queries/                # React Query hooks
└── mutations/              # Mutation hooks

types/                      # TypeScript types
schemas/                    # Zod validation schemas
constants/                  # API constants
lib/                        # Utilities
```

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (or npm/yarn)

### Installation

```bash
# Install dependencies
pnpm install

# Create environment variables
cp .env.example .env.local

# Start dev server
pnpm dev
```

The app will be available at `http://localhost:3000`

## Environment Variables

```
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

## API Integration

The frontend connects to a Spring Boot backend API. Update the `NEXT_PUBLIC_API_URL` environment variable to point to your API server.

### Expected API Endpoints

- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `GET /dashboard/stats` - Dashboard statistics
- `GET /medicines` - List medicines
- `POST /medicines` - Create medicine
- `GET /bills` - List bills
- `POST /bills` - Create bill
- `GET /staff` - List staff
- `POST /staff` - Create staff member
- `GET /analytics` - Analytics data

## Features Overview

### Authentication

- Email-based login and registration
- JWT token-based session management
- Protected routes with automatic redirects
- Password reset functionality

### Dashboard

- Real-time KPI cards (Total Medicines, Sales, Staff, Revenue)
- Sales trend chart (7-day view)
- Stock health monitoring
- Top-selling medicines widget
- Quick action buttons

### Medicine Management

- Add/Edit/Delete medicines
- Search and filter by category
- Inventory tracking
- Low stock alerts

### Point of Sale

- Quick medicine selection with autocomplete
- Real-time price and quantity calculation
- GST calculation
- Invoice generation and printing
- Multiple payment methods

### Analytics

- Weekly revenue trends
- Top-selling medicines report
- Bill statistics
- Revenue breakdown by category

### Staff Management

- Add/edit/delete staff members
- Role assignment (Pharmacist, Cashier, Manager)
- Contact information tracking
- Join date tracking

### Settings

- Pharmacy information management
- Account profile update
- Password change
- Theme preferences

## Development

### Code Quality

- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting
- Zod for runtime validation

### Performance

- React Query for efficient data fetching
- Request deduplication and caching
- Optimistic updates
- Skeleton loading states

### Security

- HTTPS-only API communication
- JWT token storage in secure HTTP-only cookies
- CORS configuration
- Input validation and sanitization

## Deployment

The application can be deployed to Vercel, AWS, or any Node.js hosting:

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

## Support

For issues, feature requests, or contributions, please visit the GitHub repository.

## License

Proprietary - SpringPharma 2024
