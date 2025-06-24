import React from 'react';
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
import { Plus, Upload, X } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface User {
  uuid: string;
  name: string;
  email: string;
}

interface Parent {
  user: User;
}

interface Class {
  uuid: string;
  name: string;
}

interface Student {
  uuid: string;
  name: string;
  status: string;
  parent: Parent;
  class: Class;
  reg_number: string;
  avatar: string;
  class_uuid: string;
  parent_uuid: string;
}

export default function StudentDialog({
  isAddDialogOpen,
  setIsAddDialogOpen,
  formData,
  setFormData,
  handleSubmit,
  handleReset,
  editUUID,
  setEditUUID,
  parents,
  classes,
  handleAvatarChange,
  removeAvatar,
}: {
  isAddDialogOpen: boolean;
  setIsAddDialogOpen: (open: boolean) => void;
  formData: {
    name: string;
    avatar: string;
    reg_number: string;
    class_uuid: string;
    parent_uuid: string;
  };
  setFormData: (data: any) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  handleReset: () => void;
  editUUID: string | null;
  setEditUUID: (uuid: string | null) => void;
  parents: Parent[];
  classes: Class[];
  handleAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeAvatar: () => void;
}) {
  return (
    <div>
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogTrigger onClick={handleReset} asChild>
          <Button size='sm'>
            <Plus className='mr-2 h-4 w-4' />
            Add Student
          </Button>
        </DialogTrigger>
        <DialogContent className='max-w-md max-h-[95vh] overflow-y-auto scroll-hidden'>
          <DialogHeader>
            <DialogTitle>
              {editUUID ? 'Edit Student' : 'Add New Student'}
            </DialogTitle>
            <DialogDescription>
              {editUUID
                ? 'Update the student details below.'
                : 'Fill in the details to add a new student.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className='space-y-4 py-4'>
            {/* Avatar Upload Section */}
            <div className='flex flex-col items-center space-y-4'>
              <div className='relative'>
                <Avatar className='h-20 w-20'>
                  <AvatarImage src={formData.avatar || '/placeholder.svg'} />
                  <AvatarFallback className='text-lg'>
                    {formData.name
                      ? formData.name.charAt(0).toUpperCase()
                      : '?'}
                  </AvatarFallback>
                </Avatar>
                {formData.avatar && (
                  <Button
                    type='button'
                    variant='destructive'
                    size='sm'
                    className='absolute -top-2 -right-2 h-6 w-6 rounded-full p-0'
                    onClick={removeAvatar}
                  >
                    <X className='h-3 w-3' />
                  </Button>
                )}
              </div>

              <div className='flex items-center space-x-2'>
                <Label htmlFor='avatar' className='cursor-pointer'>
                  <div className='flex items-center space-x-2 text-sm text-muted-foreground hover:text-foreground'>
                    <Upload className='h-4 w-4' />
                    <span>Upload Photo</span>
                  </div>
                </Label>
                <Input
                  id='avatar'
                  type='file'
                  accept='image/*'
                  className='hidden'
                  onChange={handleAvatarChange}
                />
              </div>
            </div>

            {/* Student Name */}
            <div className='space-y-2'>
              <Label htmlFor='name'>Student Name *</Label>
              <Input
                id='name'
                placeholder="Enter student's full name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            {/* Registration Number */}
            <div className='space-y-2'>
              <Label htmlFor='reg-number'>Registration Number *</Label>
              <Input
                id='reg-number'
                placeholder='Enter registration number'
                value={formData.reg_number}
                onChange={(e) =>
                  setFormData({ ...formData, reg_number: e.target.value })
                }
                required
              />
            </div>

            {/* Parent Selection */}
            <div className='space-y-2'>
              <Label htmlFor='parent'>Parent/Guardian *</Label>
              <Select
                value={formData.parent_uuid}
                onValueChange={(value) => {
                  setFormData({
                    ...formData,
                    parent_uuid: value,
                  });
                }}
                required
              >
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Select parent/guardian' />
                </SelectTrigger>
                <SelectContent>
                  {parents.map((parent) => (
                    <SelectItem key={parent.user.uuid} value={parent.user.uuid}>
                      <div className='flex flex-col'>
                        <span>{parent.user.name}</span>
                        <span className='text-xs text-muted-foreground'>
                          {parent.user.email}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Class Selection */}
            <div className='space-y-2'>
              <Label htmlFor='class'>Class *</Label>
              <Select
                value={formData.class_uuid}
                onValueChange={(value) => {
                  setFormData({
                    ...formData,
                    class_uuid: value,
                  });
                }}
                required
              >
                <SelectTrigger className='w-full'>
                  <SelectValue
                    placeholder={
                      formData.class_uuid
                        ? 'Select class'
                        : 'Select branch first'
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((cls) => (
                    <SelectItem key={cls.uuid} value={cls.uuid}>
                      {cls.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Summary Card */}
            {formData.name && formData.class_uuid && (
              <Card className='bg-muted/50'>
                <CardContent className='pt-4'>
                  <div className='text-sm space-y-1'>
                    <p>
                      <span className='font-medium'>Student:</span>{' '}
                      {formData.name}
                    </p>
                    <p>
                      <span className='font-medium'>Registration:</span>{' '}
                      {formData.reg_number}
                    </p>
                    <p>
                      <span className='font-medium'>Class:</span>{' '}
                      {
                        classes.find((c) => c.uuid === formData.class_uuid)
                          ?.name
                      }
                    </p>
                    <p>
                      <span className='font-medium'>Parent:</span>{' '}
                      {
                        parents.find(
                          (p) => p.user.uuid === formData.parent_uuid
                        )?.user.name
                      }
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            <DialogFooter className='gap-2'>
              <Button
                type='button'
                variant='outline'
                onClick={() => setIsAddDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type='submit'
                disabled={
                  !formData.name ||
                  !formData.reg_number ||
                  !formData.parent_uuid ||
                  !formData.class_uuid
                }
              >
                Save Student
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
