'use client';

import type React from 'react';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Download,
  MenuSquareIcon,
  Plus,
  Search,
  Users,
  GraduationCap,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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

export default function ClassesPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    capacity: 0,
    teacher_uuid: '',
  });

  const teachers = [
    { uuid: 'teacher-1', name: 'Mrs Aisha' },
    { uuid: 'teacher-2', name: 'Mr Ibrahim' },
    { uuid: 'teacher-3', name: 'Suleiman Ibn' },
    { uuid: 'teacher-4', name: 'Mrs Khadijah' },
  ];

  const classes = [
    {
      uuid: 'class-1',
      name: 'Class 1A',
      teacher_uuid: 'teacher-1',
      studentCount: 30,
      capacity: 30,
      status: 'active',
      schedule: 'Morning',
    },
    {
      uuid: 'class-2',
      name: 'Class 1B',
      teacher_uuid: 'teacher-1',
      studentCount: 25,
      capacity: 30,
      status: 'active',
      schedule: 'Morning',
    },
    {
      uuid: 'class-3',
      name: 'Class 2A',
      teacher_uuid: 'teacher-1',
      studentCount: 30,
      capacity: 30,
      status: 'active',
      schedule: 'Afternoon',
    },
    {
      uuid: 'class-4',
      name: 'Class 2B',
      teacher_uuid: 'teacher-2',
      studentCount: 22,
      capacity: 30,
      status: 'active',
      schedule: 'Morning',
    },
    {
      uuid: 'class-5',
      name: 'Class 3A',
      teacher_uuid: 'teacher-2',
      studentCount: 30,
      capacity: 30,
      status: 'active',
      schedule: 'Afternoon',
    },
    {
      uuid: 'class-7',
      name: 'Class 3B',
      teacher_uuid: 'teacher-3',
      studentCount: 27,
      capacity: 30,
      status: 'active',
      schedule: 'Morning',
    },
    {
      uuid: 'class-8',
      name: 'Class 4A',
      teacher_uuid: 'teacher-4',
      studentCount: 24,
      capacity: 30,
      status: 'active',
      schedule: 'Afternoon',
    },
    {
      uuid: 'class-6',
      name: 'Class 2020',
      teacher_uuid: 'teacher-3',
      studentCount: 29,
      capacity: 30,
      status: 'inactive',
      schedule: 'Morning',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('New class data:', formData);

    // Reset form and close modal
    setFormData({
      name: '',
      capacity: 0,
      teacher_uuid: '',
    });
    setIsAddDialogOpen(false);
  };

  // Filter classes based on search query
  const filteredClasses = classes.filter(
    (classItem) =>
      classItem.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teachers
        .find((t) => t.uuid === classItem.teacher_uuid)
        ?.name.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      classItem.schedule.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get teacher name by uuid
  const getTeacherName = (teacher_uuid: string) => {
    const teacher = teachers.find((teacher) => teacher.uuid === teacher_uuid);
    return teacher ? teacher.name : '';
  };

  return (
    <div className='space-y-6'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Classes</h1>
          <p className='text-muted-foreground'>
            Manage class schedules and assignments
          </p>
        </div>
        <div className='flex items-center gap-2'>
          <Button variant='outline' size='sm'>
            <Download className='mr-2 h-4 w-4' />
            Export
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size='sm'>
                <Plus className='mr-2 h-4 w-4' />
                Add Class
              </Button>
            </DialogTrigger>
            <DialogContent className='max-w-md max-h-[95vh] overflow-y-auto scroll-hidden'>
              <DialogHeader>
                <DialogTitle>Add New Class</DialogTitle>
                <DialogDescription>
                  Create a new class and assign it to a branch.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className='space-y-4 py-4'>
                {/* Class Name */}
                <div className='space-y-2'>
                  <Label htmlFor='name'>Class Name *</Label>
                  <Input
                    id='name'
                    placeholder='e.g., Grade 1A, Mathematics 101'
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                  <p className='text-xs text-muted-foreground'>
                    Enter a descriptive name for the class
                  </p>
                </div>

                {/* Teacher Selection */}
                <div className='space-y-2'>
                  <Label htmlFor='branch'>Class Teacher *</Label>
                  <Select
                    value={formData.teacher_uuid}
                    onValueChange={(value) => {
                      setFormData({
                        ...formData,
                        teacher_uuid: value,
                      });
                    }}
                    required
                  >
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Select teacher' />
                    </SelectTrigger>
                    <SelectContent>
                      {teachers.map((teacher) => (
                        <SelectItem key={teacher.uuid} value={teacher.uuid}>
                          <div className='flex flex-col'>
                            <span>{teacher.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='name'>Max Capacity *</Label>
                  <Input
                    id='name'
                    type='number'
                    placeholder='30'
                    value={formData.capacity}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        capacity: Number(e.target.value),
                      })
                    }
                    required
                  />
                </div>

                {/* Summary Card */}
                {formData.name && formData.teacher_uuid && (
                  <Card className='bg-muted/50'>
                    <CardContent className='pt-4'>
                      <div className='text-sm space-y-1'>
                        <p>
                          <span className='font-medium'>Class:</span>{' '}
                          {formData.name}
                        </p>
                        <p>
                          <span className='font-medium'>Teacher:</span>{' '}
                          {getTeacherName(formData.teacher_uuid)}
                        </p>
                        <p>
                          <span className='font-medium'>Capacity:</span>{' '}
                          {formData.capacity}
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
                  <Button type='submit' disabled={!formData.name}>
                    Create Class
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
            <div>
              <CardTitle>All Classes ({filteredClasses.length})</CardTitle>
              <CardDescription>
                Manage classes across all branches
              </CardDescription>
            </div>
            <div className='relative w-full sm:w-64'>
              <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
              <Input
                placeholder='Search classes...'
                className='pl-8'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Class Name</TableHead>
                  <TableHead>Class Teacher</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className='text-right'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClasses.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className='h-24 text-center'>
                      {searchQuery
                        ? 'No classes found matching your search.'
                        : 'No classes found.'}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredClasses.map((classItem) => (
                    <TableRow key={classItem.uuid}>
                      <TableCell className='font-medium'>
                        <div className='flex items-center gap-3'>
                          <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10'>
                            <GraduationCap className='h-4 w-4 text-primary' />
                          </div>
                          <div>
                            <div className='font-medium'>{classItem.name}</div>
                            <div className='text-sm text-muted-foreground'>
                              {classItem.studentCount}/{classItem.capacity}{' '}
                              students
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className='text-sm'>
                          {getTeacherName(classItem.teacher_uuid)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className='flex items-center gap-2'>
                          <div className='text-sm font-medium'>
                            {classItem.studentCount}
                          </div>
                          <div className='text-xs text-muted-foreground'>
                            / {classItem.capacity}
                          </div>
                          <div
                            className={`h-2 w-16 rounded-full bg-muted ${
                              classItem.studentCount / classItem.capacity > 0.9
                                ? 'bg-red-200'
                                : 'bg-green-200'
                            }`}
                          >
                            <div
                              className={`h-full rounded-full ${
                                classItem.studentCount / classItem.capacity >
                                0.9
                                  ? 'bg-red-500'
                                  : 'bg-green-500'
                              }`}
                              style={{
                                width: `${
                                  (classItem.studentCount /
                                    classItem.capacity) *
                                  100
                                }%`,
                              }}
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            classItem.status === 'active'
                              ? 'default'
                              : 'secondary'
                          }
                        >
                          {classItem.status}
                        </Badge>
                      </TableCell>
                      <TableCell className='text-right'>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant='ghost' size='sm'>
                              <MenuSquareIcon className='h-4 w-4' />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align='end'>
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Class</DropdownMenuItem>
                            <DropdownMenuItem>View Students</DropdownMenuItem>
                            <DropdownMenuItem>Assign Teacher</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className='text-destructive'>
                              Delete Class
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
