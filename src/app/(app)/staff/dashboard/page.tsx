'use client';

import { motion } from 'framer-motion';
import Reports from '@/components/dashboard/reports';
import Analytics from '@/components/dashboard/analytics';
import { BookOpen, GraduationCap, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEffect, useState } from 'react';
import IsLoading from '@/components/is-loading';
import { useApp } from '@/hooks/app';
import { toast } from 'sonner';
// import Overview from '@/components/dashboard/overview';

export default function DashboardPage() {
  const { dashboard } = useApp();
  const [isLoading, setIsLoading] = useState(false);
  const [card, setCard] = useState({
    total_students: 0,
    total_parents: 0,
    total_staffs: 0,
    total_classes: 0,
  });

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await dashboard();
      if (response.success) {
        setCard(response.data);
      } else {
        toast.error(response.message || 'Something went wrong');
      }
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  if (isLoading) {
    return <IsLoading />;
  }

  return (
    <div className='grid w-full space-y-6'>
      <Tabs defaultValue='overview' className='space-y-4'>
        <TabsList>
          <TabsTrigger value='overview'>Overview</TabsTrigger>
          <TabsTrigger value='analytics'>Analytics</TabsTrigger>
          <TabsTrigger value='reports'>Reports</TabsTrigger>
        </TabsList>
        <TabsContent value='overview' className='space-y-4'>
          <motion.div
            className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'
            variants={container}
            initial='hidden'
            animate='show'
          >
            <motion.div variants={item}>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Total Parents
                  </CardTitle>
                  <Users className='h-4 w-4 text-muted-foreground' />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>{card.total_parents}</div>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={item}>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Total Staffs
                  </CardTitle>
                  <GraduationCap className='h-4 w-4 text-muted-foreground' />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>{card.total_staffs}</div>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={item}>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Total Classes
                  </CardTitle>
                  <BookOpen className='h-4 w-4 text-muted-foreground' />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>{card.total_classes}</div>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={item}>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Total Students
                  </CardTitle>
                  <Users className='h-4 w-4 text-muted-foreground' />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>
                    {card.total_students}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
          <div>{/* <Overview /> */}</div>
        </TabsContent>
        <TabsContent value='analytics' className='space-y-4'>
          <Analytics />
        </TabsContent>
        <TabsContent value='reports' className='space-y-4'>
          <Reports />
        </TabsContent>
      </Tabs>
    </div>
  );
}
