'use client';
import { toast } from 'sonner';
import { useUser } from '@/hooks/user';
import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function UserUpdate({
  role,
  formData,
  setFormData,
  fetchData,
  setIsLoading,
  isAddDialogOpen,
  setIsAddDialogOpen,
}: {
  role: string;
  formData: any;
  fetchData: () => void;
  setFormData: (data: any) => void;
  setIsLoading: (loading: boolean) => void;
  isAddDialogOpen: boolean;
  setIsAddDialogOpen: (open: boolean) => void;
}) {
  const { update } = useUser();
  const [positions, setPositions] = useState<string[]>([]);

  useEffect(() => {
    if (role === 'staff') {
      setPositions([
        'principal',
        'vice principal',
        'teacher',
        'administrator',
        'counselor',
        'librarian',
      ]);
    } else if (role === 'parent') {
      setPositions(['parent', 'guardian']);
    } else {
      setPositions(['student']);
    }
  }, [role]);

  const saveUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await update(formData);

      if (response.success) {
        setFormData({
          name: '',
          email: '',
          password: '',
          contact: '',
          alt_contact: '',
          position: '',
          address: '',
          role,
        });
        fetchData();
        setIsAddDialogOpen(false);
      } else {
        toast(response.message || 'Something went wrong');
      }
    } catch (error: any) {
      toast(error.message || 'Something went wrong');
    } finally {
      fetchData();
    }
  };

  return (
    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
      <DialogContent className='max-w-md max-h-[95vh] overflow-y-auto scroll-hidden'>
        <DialogHeader>
          <DialogTitle>
            Add New {role.charAt(0).toUpperCase() + role.slice(1)}
          </DialogTitle>
          <DialogDescription>Create a new {role} account</DialogDescription>
        </DialogHeader>
        <form onSubmit={saveUser} className='space-y-4 py-4'>
          <div className='space-y-2'>
            <Label htmlFor='name'>Full Name</Label>
            <Input
              id='name'
              placeholder='e.g., John Doe'
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              type='email'
              placeholder='e.g., john.doe@example.com'
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='password'>Password</Label>
            <Input
              id='password'
              type='password'
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='contact'>Contact Number</Label>
              <Input
                id='contact'
                placeholder='e.g., +1234567890'
                value={formData.contact}
                onChange={(e) =>
                  setFormData({ ...formData, contact: e.target.value })
                }
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='alt-contact'>
                Alternative Contact (Optional)
              </Label>
              <Input
                id='alt-contact'
                placeholder='e.g., +0987654321'
                value={formData.alt_contact}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    alt_contact: e.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className='space-y-2'>
            <Label htmlFor='position'>Position</Label>
            <Select
              value={formData.position}
              onValueChange={(value) =>
                setFormData({ ...formData, position: value })
              }
            >
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Select position' />
              </SelectTrigger>
              <SelectContent>
                {positions.map((position) => (
                  <SelectItem key={position} value={position}>
                    {position.charAt(0).toUpperCase() + position.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className='space-y-2'>
            <Label htmlFor='address'>Address</Label>
            <Input id='address' placeholder='e.g., 123 Main St, City' />
          </div>
          <DialogFooter>
            <Button
              onClick={() => setIsAddDialogOpen(false)}
              type='button'
              variant='outline'
            >
              Cancel
            </Button>
            <Button type='submit'>
              Save {role.charAt(0).toUpperCase() + role.slice(1)}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
