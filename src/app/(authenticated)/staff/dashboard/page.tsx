'use client';

import { motion } from 'framer-motion';
import { BarChart3, BookOpen, GraduationCap, Users } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function DashboardPage() {
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

  return (
    <div className='grid w-full space-y-6'>
      <div>
        <h1 className='text-3xl font-bold tracking-tight'>Dashboard</h1>
        <p className='text-muted-foreground'>
          Welcome back! Here's an overview.
        </p>
      </div>

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
                    Total Students
                  </CardTitle>
                  <Users className='h-4 w-4 text-muted-foreground' />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>1,248</div>
                  <p className='text-xs text-muted-foreground'>
                    +12% from last month
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={item}>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Total Parents
                  </CardTitle>
                  <BarChart3 className='h-4 w-4 text-muted-foreground' />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>86</div>
                  <p className='text-xs text-muted-foreground'>
                    +2 new this month
                  </p>
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
                  <div className='text-2xl font-bold'>86</div>
                  <p className='text-xs text-muted-foreground'>
                    +2 new this month
                  </p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={item}>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Active Classes
                  </CardTitle>
                  <BookOpen className='h-4 w-4 text-muted-foreground' />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>42</div>
                  <p className='text-xs text-muted-foreground'>
                    Current semester
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <div className='grid gap-4 xl:grid-cols-2'>
            <motion.div
              className='xl:col-span-4'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className='h-full'>
                <CardHeader>
                  <CardTitle>Recent Activities</CardTitle>
                  <CardDescription>
                    Overview of recent school activities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className='flex items-center gap-4'>
                        <div className='h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center'>
                          <GraduationCap className='h-5 w-5 text-primary' />
                        </div>
                        <div className='space-y-1'>
                          <p className='text-sm font-medium leading-none'>
                            {i === 1
                              ? 'New student enrollment completed'
                              : i === 2
                              ? 'Teacher meeting scheduled'
                              : i === 3
                              ? 'Exam results published'
                              : i === 4
                              ? 'Parent-teacher conference'
                              : 'School event planned'}
                          </p>
                          <p className='text-xs text-muted-foreground'>{`${i} hour${
                            i === 1 ? '' : 's'
                          } ago`}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              className='xl:col-span-3'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className='h-full'>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                  <CardDescription>
                    Schedule for the next 7 days
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    {[
                      {
                        title: 'Staff Meeting',
                        date: 'Today, 2:00 PM',
                        type: 'meeting',
                      },
                      {
                        title: 'Science Fair',
                        date: 'Tomorrow, 9:00 AM',
                        type: 'event',
                      },
                      {
                        title: 'End of Term Exams',
                        date: 'Friday, All Day',
                        type: 'exam',
                      },
                      {
                        title: 'Parent-Teacher Conference',
                        date: 'Saturday, 10:00 AM',
                        type: 'meeting',
                      },
                    ].map((event, i) => (
                      <div key={i} className='flex items-center gap-4'>
                        <div
                          className={`h-2 w-2 rounded-full ${
                            event.type === 'meeting'
                              ? 'bg-blue-500'
                              : event.type === 'event'
                              ? 'bg-green-500'
                              : 'bg-red-500'
                          }`}
                        />
                        <div className='space-y-1'>
                          <p className='text-sm font-medium leading-none'>
                            {event.title}
                          </p>
                          <p className='text-xs text-muted-foreground'>
                            {event.date}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>
        <TabsContent value='analytics' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>
                View detailed analytics about your school
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='h-[300px] flex items-center justify-center border rounded-md'>
                <p className='text-muted-foreground'>
                  Analytics charts will be displayed here
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='reports' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
              <CardDescription>
                Access and download school reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='h-[300px] flex items-center justify-center border rounded-md'>
                <p className='text-muted-foreground'>
                  Reports will be displayed here
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
