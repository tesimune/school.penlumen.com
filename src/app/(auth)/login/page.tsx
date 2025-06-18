'use client';

import type React from 'react';
import Cookies from 'js-cookie';
import { School } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/auth';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState<'root' | 'admin' | 'staff' | 'parent'>(
    'root'
  );

  useEffect(() => {
    const userString = Cookies.get('user');
    const user = userString ? JSON.parse(userString) : null;
    if (user) {
      router.push('/session');
    }
    const params = new URLSearchParams(window.location.search);
    const roleParam = params.get('role');
    if (
      roleParam === 'admin' ||
      roleParam === 'staff' ||
      roleParam === 'parent' ||
      roleParam === 'root'
    ) {
      setRole(roleParam);
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await login({ role, email, password });
      if (!response.success || !response.data) {
        setMessage(response.message);
        setSuccess(false);
      } else {
        setSuccess(true);
        setMessage(response.message);
        Cookies.set('token', response.data.token, {
          expires: 7,
        });
        Cookies.set('user', JSON.stringify(response.data.user), {
          expires: 7,
        });
        router.push('/session');
      }
    } catch (error: any) {
      setMessage(error.message || 'Something went wrong');
      setSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-muted p-4 sm:p-6 lg:p-8'>
      <div className='w-full max-w-sm sm:max-w-md'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='w-full'
        >
          <Card className='w-full shadow-lg'>
            <CardHeader className='space-y-3 px-4 py-3 sm:px-6'>
              {/* Logo and Brand */}
              <div className='flex items-center justify-center gap-2 pb-2'>
                <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 sm:h-12 sm:w-12'>
                  <School className='h-5 w-5 text-primary sm:h-6 sm:w-6' />
                </div>
                <span className='text-xl font-bold sm:text-2xl'>Penlumen</span>
              </div>

              {/* Message Display */}
              {message && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`rounded-lg p-3 text-center text-sm font-medium ${
                    success
                      ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                      : 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                  }`}
                >
                  {message}
                </motion.div>
              )}
            </CardHeader>

            <CardContent className='px-4 pb-2 sm:px-6'>
              <form onSubmit={handleSubmit} className='space-y-4 sm:space-y-5'>
                {/* Email Field */}
                <div className='space-y-2'>
                  <Label
                    htmlFor='email'
                    className='text-sm font-medium sm:text-base'
                  >
                    Email Address
                  </Label>
                  <Input
                    id='email'
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Enter your email'
                    className='h-10 text-sm sm:h-11 sm:text-base'
                    required
                  />
                </div>

                {/* Password Field */}
                <div className='space-y-2'>
                  <div className='flex items-center justify-between'>
                    <Label
                      htmlFor='password'
                      className='text-sm font-medium sm:text-base'
                    >
                      Password
                    </Label>
                  </div>
                  <Input
                    id='password'
                    type='password'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Enter your password'
                    className='h-10 text-sm sm:h-11 sm:text-base'
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type='submit'
                  className='h-10 w-full text-sm font-medium sm:h-11 sm:text-base'
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>
            </CardContent>

            <CardFooter className='flex flex-col space-y-4 px-4 py-2 sm:px-6'>
              {/* Role Selection Links */}
              <div className='text-center'>
                <div className='flex flex-wrap items-center justify-center gap-1 text-xs sm:text-sm'>
                  <span className='text-muted-foreground'>Continue as:</span>
                  <a
                    href='/login?role=admin'
                    className={`font-medium text-primary hover:underline ${
                      role === 'admin' ? 'underline' : ''
                    }`}
                  >
                    Admin
                  </a>
                  <span className='text-muted-foreground'>•</span>
                  <a
                    href='/login?role=staff'
                    className={`font-medium text-primary hover:underline ${
                      role === 'staff' ? 'underline' : ''
                    }`}
                  >
                    Staff
                  </a>
                  <span className='text-muted-foreground'>•</span>
                  <a
                    href='/login?role=parent'
                    className={`font-medium text-primary hover:underline ${
                      role === 'parent' ? 'underline' : ''
                    }`}
                  >
                    Parent
                  </a>
                </div>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
