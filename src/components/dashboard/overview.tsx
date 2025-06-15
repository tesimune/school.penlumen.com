import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap } from 'lucide-react';
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from '../ui/card';

export default function Overview() {
  return (
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
            <CardDescription>Schedule for the next 7 days</CardDescription>
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
  );
}
