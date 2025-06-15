import React from 'react';
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from '../ui/card';

export default function Analytics() {
  return (
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
  );
}
