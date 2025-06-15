'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, School } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFoundPage() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center bg-muted p-4'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='text-center'
      >
        <div className='mb-6 flex items-center justify-center gap-2'>
          <School className='h-8 w-8 text-primary' />
          <span className='text-2xl font-bold'>EduManage</span>
        </div>

        <motion.h1
          className='mb-2 text-6xl font-bold'
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
        >
          404
        </motion.h1>

        <h2 className='mb-4 text-2xl font-semibold'>Page Not Found</h2>

        <p className='mb-8 max-w-md text-muted-foreground'>
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button asChild size='lg'>
            <Link href='/'>
              <ArrowLeft className='mr-2 h-4 w-4' />
              Back to Home
            </Link>
          </Button>
        </motion.div>
      </motion.div>

      <div className='mt-16 flex flex-col items-center'>
        <div className='mb-4 h-px w-16 bg-border' />
        <p className='text-sm text-muted-foreground'>
          Need help?{' '}
          <Link href='/contact' className='text-primary hover:underline'>
            Contact Support
          </Link>
        </p>
      </div>
    </div>
  );
}
