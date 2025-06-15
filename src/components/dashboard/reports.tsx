import React from 'react';
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from '../ui/card';

export default function Reports() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reports</CardTitle>
        <CardDescription>Access and download school reports</CardDescription>
      </CardHeader>
      <CardContent>
        <div className='h-[300px] flex items-center justify-center border rounded-md'>
          <p className='text-muted-foreground'>
            Reports will be displayed here
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
