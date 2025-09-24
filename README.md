# Next.js + Supabase + Zustand Authentication Boilerplate

A complete authentication boilerplate built with Next.js 15, Supabase, and Zustand for state management. Features server-side authentication, email confirmation, toast notifications, and a clean project structure.

## 🚀 Features

- **Server-side Authentication** with Supabase SSR
- **Email Confirmation** flow with proper redirects
- **Toast Notifications** with Sonner
- **Client-side State Management** with Zustand
- **Route Protection** with middleware
- **Clean Project Structure** with route groups
- **TypeScript** support
- **Tailwind CSS** for styling

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes
│   │   ├── login/         # Login page & actions
│   │   ├── confirm/       # Email confirmation
│   │   ├── logout/        # Logout actions
│   │   └── error/         # Error page
│   ├── (app)/             # Protected app routes
│   │   ├── profile/       # User profile
│   │   ├── practice/      # Practice page
│   │   ├── progress/      # Progress tracking
│   │   └── materials/     # Learning materials
│   ├── (marketing)/       # Public marketing pages
│   ├── Components/         # Reusable components
│   ├── utils/             # Server utilities
│   └── layout.tsx         # Root layout with auth
├── stores/                 # Zustand stores
│   ├── ui.ts              # UI state (toasts, loading)
│   ├── forms.ts           # Form state management
│   └── index.ts           # Store exports
└── middleware.ts          # Route protection
```

## 🛠️ Setup Instructions

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd nextjs-supabase-auth-boilerplate
npm install
```

### 2. Environment Variables

Create `.env.local` in your project root:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Optional: Database URL (if using direct database access)
DATABASE_URL=your_database_url
```

### 3. Supabase Setup

#### 3.1 Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Wait for the project to be ready

#### 3.2 Get Your Keys
1. Go to **Settings** → **API**
2. Copy the following:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY`

#### 3.3 Configure Authentication
1. Go to **Authentication** → **Settings**
2. Set **Site URL**: `http://localhost:3000`
3. Add **Redirect URLs**: `http://localhost:3000/profile`
4. Enable **Email** provider
5. Configure email templates (optional)

#### 3.4 Custom Redirect URLs (Optional)
You can customize where users go after email confirmation by adding a `next` parameter to the email URL:

```
http://localhost:3000/confirm?token_hash=...&type=email&next=/your-choice
```

**Examples:**
- `&next=/dashboard` - Redirect to dashboard
- `&next=/onboarding` - Redirect to onboarding flow
- `&next=/profile` - Redirect to profile (default)

**Note:** If no `next` parameter is provided, users will be redirected to `/profile` by default.

#### 3.5 Database Setup (Optional)
If you need custom user tables:

```sql
-- Create profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);
```

### 4. Run the Application

```bash
npm run dev
```

Visit `http://localhost:3000` to see your application!

## 🔐 Authentication Flow

### Sign Up Flow
1. User visits `/login`
2. Clicks "Sign up" with email/password
3. **Toast notification**: "Check your email for a confirmation link!"
4. User receives confirmation email
5. Clicks email link → `/confirm?token_hash=...&type=email`
6. **Redirects to**: `/profile` (confirmed and logged in)

### Login Flow
1. User visits `/login`
2. Enters credentials and clicks "Log in"
3. **Redirects to**: `/profile` (authenticated)

### Logout Flow
1. User clicks "Log out" in navbar
2. **Server action** signs out with Supabase
3. **Redirects to**: `/` (home page)
4. **Navbar updates** to show "Log in" link

## 🎨 Customization

### Adding New Protected Routes
1. Create page in `src/app/(app)/your-route/page.tsx`
2. Add link in navbar if needed
3. Route is automatically protected by middleware

### Adding New Public Routes
1. Create page in `src/app/(marketing)/your-route/page.tsx`
2. Accessible without authentication

### Customizing Toasts
```tsx
import { toast } from 'sonner'

// Success toast
toast.success('Operation completed!')

// Error toast
toast.error('Something went wrong!')

// Info toast
toast.info('Check your email!')
```

### Adding Form State
```tsx
import { useFormStore } from '@/stores'

const MyForm = () => {
  const { email, setField, errors } = useFormStore()
  
  return (
    <input 
      value={email}
      onChange={(e) => setField('email', e.target.value)}
    />
  )
}
```

## 🔧 Available Scripts

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Lint code
npm run lint
```

## 📦 Dependencies

### Core
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety

### Authentication
- **Supabase** - Backend and authentication
- **@supabase/ssr** - Server-side rendering support

### State Management
- **Zustand** - Client-side state management
- **Sonner** - Toast notifications

### Styling
- **Tailwind CSS** - Utility-first CSS framework

## 🚨 Troubleshooting

### Common Issues

#### 1. "Invalid API key" Error
- Check your `.env.local` file
- Ensure keys are correct from Supabase dashboard
- Restart your development server

#### 2. Email Confirmation Not Working
- Check Supabase Auth settings
- Verify redirect URLs are configured
- Check browser console for errors

#### 3. Double Toasts
- This is fixed in the boilerplate with `useRef` tracking
- If you see duplicates, check for multiple `useEffect` calls

#### 4. 404 on `/auth/confirm`
- Ensure your confirm route is at `src/app/(auth)/confirm/route.ts`
- Check that the route handler exports `GET` function

### Debug Mode
Add to your `.env.local`:
```env
NEXT_PUBLIC_DEBUG=true
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - feel free to use this boilerplate for your projects!

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Supabase](https://supabase.com/) for the backend platform
- [Zustand](https://zustand-demo.pmnd.rs/) for state management
- [Sonner](https://sonner.emilkowal.ski/) for beautiful toasts

---

**Happy coding! 🚀**