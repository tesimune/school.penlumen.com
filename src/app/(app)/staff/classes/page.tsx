'use client';

import type React from 'react';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useClass } from '@/hooks/class';
import { useUser } from '@/hooks/user';
import {
  Download,
  MenuSquareIcon,
  Plus,
  Search,
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
import { toast } from 'sonner';
import IsLoading from '@/components/is-loading';

interface Class {
  uuid: string;
  name: string;
  email: string;
  status: string;
  capacity: number;
  studentCount: number;
  teacher_uuid: string;
}

interface User {
  uuid: string;
  name: string;
}

interface Teacher {
  user: User;
}

export default function ClassesPage() {
  const { index: userIndex } = useUser();
  const { index: classIndex, create } = useClass();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [classes, setClasses] = useState<Class[]>([]);
  const [teachers, setTeacher] = useState<Teacher[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    capacity: 0,
    teacher_uuid: '',
  });

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const resClass = await classIndex();
      const resUser = await userIndex('staff');
      if (resClass.success && resUser) {
        setClasses(resClass.data.classes);
        setTeacher(resUser.data.user);
      } else {
        toast(resClass.message || 'Something went wrong');
        toast(resUser.message || 'Something went wrong');
      }
    } catch (error: any) {
      toast(error.message || 'Something went wront');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const response = await create(formData);
      if (response.success) {
        fetchData();
        setFormData({
          name: '',
          capacity: 0,
          teacher_uuid: '',
        });
      } else {
        toast(response.message || 'Something went wrong');
      }
    } catch (error: any) {
      toast(error.message || 'Something went wrong');
    } finally {
      setIsAddDialogOpen(false);
      setIsLoading(false);
    }
  };

  const filteredClasses = classes.filter(
    (classItem) =>
      classItem.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teachers
        .find((t) => t.user.uuid === classItem.teacher_uuid)
        ?.user?.name.toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  const getTeacherName = (teacher_uuid: string) => {
    const teacher = teachers.find(
      (teacher) => teacher.user.uuid === teacher_uuid
    );
    return teacher ? teacher.user.name : '';
  };

  if (isLoading) {
    return <IsLoading />;
  }

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
                        <SelectItem
                          key={teacher.user.uuid}
                          value={teacher.user.uuid}
                        >
                          <div className='flex flex-col'>
                            <span>{teacher.user.name}</span>
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
