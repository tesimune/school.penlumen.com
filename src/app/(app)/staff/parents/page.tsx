'use client';

import { toast } from 'sonner';
import { useUser } from '@/hooks/user';
import { Download } from 'lucide-react';
import { useEffect, useState } from 'react';
import UserCreate from '@/components/user-create';
import UsersIndex from '@/components/users-table';
import IsLoading from '@/components/is-loading';
import { Button } from '@/components/ui/button';

interface User {
  uuid: string;
  name: string;
  email: string;
  avatar: string;
  address: string;
  contact: string;
  alt_contact: string;
  position: string;
}

interface Staff {
  user: User;
}

export default function StaffPage() {
  const { index } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [parents, setParents] = useState<Staff[] | []>([]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await index('parent');
      if (response.success) {
        setParents(response.data.user);
      } else {
        toast(response.message || 'Something went wrong');
      }
    } catch (error: any) {
      toast(error.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!parents.length) {
      fetchData();
    }
  }, []);

  if (isLoading) {
    return <IsLoading />;
  }

  return (
    <div className='space-y-6'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <div>
            <h1 className='text-3xl font-bold tracking-tight'>Parents</h1>
            <p className='text-muted-foreground'>
              Manage school parent information and accounts
            </p>
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <Button variant='outline' size='sm'>
            <Download className='mr-2 h-4 w-4' />
            Export
          </Button>
          <UserCreate
            role='parent'
            fetchData={fetchData}
            setIsLoading={setIsLoading}
          />
        </div>
      </div>

      <div>
        <UsersIndex
          role='parent'
          fetchData={fetchData}
          setIsLoading={setIsLoading}
          users={parents}
        />
      </div>
    </div>
  );
}
