'use client';

import { Button } from '@/components/atoms/button';
import FormCard from '@/components/atoms/formCard';
import { Input } from '@/components/atoms/input';
import { Label } from '@/components/atoms/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Lock, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { loginSchema, LoginValues } from '@/lib/schemas/login-schema';

export default function AuthPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const loginForm = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: '', password: '', remember: false },
  });

  const getNextPath = () => {
    return typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search).get('next') || '/dashboard'
      : '/dashboard';
  };

  const onLogin = async () => {
    router.push(getNextPath());
  };

  return (
    <main className="flex-1 w-full bg-zinc-100 dark:bg-zinc-900 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 w-full">
        <div className="grid place-items-center p-6 py-16">
          <FormCard maxWidth="lg" className="w-full">
            <div className="p-8">
              <div className="flex flex-col items-center text-center mb-6">
                <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-zinc-100">
                  Admin Panel
                </h1>
                <p className="mt-1 text-sm text-gray-500 dark:text-zinc-400">
                  Sign in to access the system
                </p>
              </div>

              <form
                onSubmit={loginForm.handleSubmit(onLogin)}
                className="space-y-5"
              >
                <div>
                  <Label className="mb-1 block">Username</Label>
                  <div className="relative">
                    <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Enter your username"
                      className="pl-9"
                      {...loginForm.register('username')}
                    />
                  </div>
                  {loginForm.formState.errors.username && (
                    <p className="mt-1 text-xs text-red-600">
                      {loginForm.formState.errors.username.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label className="mb-1 block">Password</Label>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      className="pl-9 pr-9"
                      {...loginForm.register('password')}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-zinc-300"
                      aria-label={
                        showPassword ? 'Hide password' : 'Show password'
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {loginForm.formState.errors.password && (
                    <p className="mt-1 text-xs text-red-600">
                      {loginForm.formState.errors.password.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-gray-600 dark:text-zinc-400">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      {...loginForm.register('remember')}
                    />
                    Remember me
                  </label>
                  <a className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400">
                    Forgot your password?
                  </a>
                </div>

                <Button
                  type="submit"
                  disabled={loginForm.formState.isSubmitting}
                  className="w-full"
                >
                  {loginForm.formState.isSubmitting ? 'Signing in...' : 'Sign in'}
                </Button>
              </form>

              <div className="mt-6 border-t border-gray-100 pt-4 text-center text-xs text-gray-400 dark:border-zinc-800 dark:text-zinc-500">
                © {new Date().getFullYear()} Admin System. All rights
                reserved.
              </div>
            </div>
          </FormCard>
        </div>
      </div>
    </main>
  );
}
