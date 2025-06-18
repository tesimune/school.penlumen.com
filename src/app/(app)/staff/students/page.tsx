'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, MenuSquareIcon, Plus, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import { Upload, UserPlus, X } from 'lucide-react';

interface AddStudentModalProps {
  branches?: { uuid: string; name: string }[];
  classes?: { uuid: string; name: string; branch_uuid: string }[];
  parents?: { uuid: string; name: string; email: string }[];
}

export default function StudentsPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    avatar: '',
    reg_number: '',
    class_uuid: '',
    branch_uuid: '',
    parent_uuid: '',
  });

  const branches = [
    { uuid: 'branch-1', name: 'Main Campus' },
    { uuid: 'branch-2', name: 'North Branch' },
    { uuid: 'branch-3', name: 'South Branch' },
  ];
  const classes = [
    { uuid: 'class-1', name: 'Grade 1A', branch_uuid: 'branch-1' },
    { uuid: 'class-2', name: 'Grade 1B', branch_uuid: 'branch-1' },
    { uuid: 'class-3', name: 'Grade 2A', branch_uuid: 'branch-1' },
    { uuid: 'class-4', name: 'Grade 1A', branch_uuid: 'branch-2' },
  ];
  const parents = [
    { uuid: 'parent-1', name: 'John Smith', email: 'john@example.com' },
    { uuid: 'parent-2', name: 'Sarah Johnson', email: 'sarah@example.com' },
    { uuid: 'parent-3', name: 'Michael Brown', email: 'michael@example.com' },
  ];
  const students = [
    {
      id: 1,
      name: 'Alice Johnson',
      grade: '10th',
      section: 'A',
      status: 'active',
      email: 'alice@example.com',
    },
    {
      id: 2,
      name: 'Bob Smith',
      grade: '9th',
      section: 'B',
      status: 'active',
      email: 'bob@example.com',
    },
    {
      id: 3,
      name: 'Charlie Brown',
      grade: '11th',
      section: 'A',
      status: 'inactive',
      email: 'charlie@example.com',
    },
    {
      id: 4,
      name: 'Diana Prince',
      grade: '12th',
      section: 'C',
      status: 'active',
      email: 'diana@example.com',
    },
    {
      id: 5,
      name: 'Edward Cullen',
      grade: '10th',
      section: 'B',
      status: 'active',
      email: 'edward@example.com',
    },
    {
      id: 6,
      name: 'Fiona Gallagher',
      grade: '9th',
      section: 'A',
      status: 'active',
      email: 'fiona@example.com',
    },
    {
      id: 7,
      name: 'George Weasley',
      grade: '11th',
      section: 'C',
      status: 'inactive',
      email: 'george@example.com',
    },
    {
      id: 8,
      name: 'Hermione Granger',
      grade: '12th',
      section: 'A',
      status: 'active',
      email: 'hermione@example.com',
    },
  ];

  const filteredClasses = classes.filter(
    (cls) => cls.branch_uuid === formData.branch_uuid
  );

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData({ ...formData, avatar: e.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);

    setFormData({
      name: '',
      avatar: '',
      reg_number: '',
      class_uuid: '',
      branch_uuid: '',
      parent_uuid: '',
    });
    setIsAddDialogOpen(false);
  };

  const removeAvatar = () => {
    setFormData({ ...formData, avatar: '' });
  };

  // Filter students based on search query
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.grade.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.section.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='space-y-6'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Students</h1>
          <p className='text-muted-foreground'>
            Manage student records and information
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
                Add Student
              </Button>
            </DialogTrigger>
            <DialogContent className='max-w-md max-h-[95vh] overflow-y-auto'>
              <DialogHeader>
                <DialogTitle>Add New Student</DialogTitle>
                <DialogDescription>
                  Enter the student details to add them to the school system.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className='space-y-4 py-4'>
                {/* Avatar Upload Section */}
                <div className='flex flex-col items-center space-y-4'>
                  <div className='relative'>
                    <Avatar className='h-20 w-20'>
                      <AvatarImage
                        src={formData.avatar || '/placeholder.svg'}
                      />
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
                        <SelectItem key={parent.uuid} value={parent.uuid}>
                          <div className='flex flex-col'>
                            <span>{parent.name}</span>
                            <span className='text-xs text-muted-foreground'>
                              {parent.email}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Branch Selection */}
                <div className='space-y-2'>
                  <Label htmlFor='branch'>Branch *</Label>
                  <Select
                    value={formData.branch_uuid}
                    onValueChange={(value) => {
                      setFormData({
                        ...formData,
                        branch_uuid: value,
                        class_uuid: '',
                      });
                    }}
                    required
                  >
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Select branch' />
                    </SelectTrigger>
                    <SelectContent>
                      {branches.map((branch) => (
                        <SelectItem key={branch.uuid} value={branch.uuid}>
                          {branch.name}
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
                    disabled={!formData.branch_uuid}
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
                      {filteredClasses.map((cls) => (
                        <SelectItem key={cls.uuid} value={cls.uuid}>
                          {cls.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Summary Card */}
                {formData.name &&
                  formData.branch_uuid &&
                  formData.class_uuid && (
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
                            <span className='font-medium'>Branch:</span>{' '}
                            {
                              branches.find(
                                (b) => b.uuid === formData.branch_uuid
                              )?.name
                            }
                          </p>
                          <p>
                            <span className='font-medium'>Class:</span>{' '}
                            {
                              classes.find(
                                (c) => c.uuid === formData.class_uuid
                              )?.name
                            }
                          </p>
                          <p>
                            <span className='font-medium'>Parent:</span>{' '}
                            {
                              parents.find(
                                (p) => p.uuid === formData.parent_uuid
                              )?.name
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
                      !formData.branch_uuid ||
                      !formData.class_uuid
                    }
                  >
                    Add Student
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
              <CardTitle>All Students</CardTitle>
              <CardDescription>
                A list of all students with their details
              </CardDescription>
            </div>
            <div className='relative w-full sm:w-64'>
              <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
              <Input
                placeholder='Search students...'
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
                  <TableHead>Name</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className='text-right'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className='h-24 text-center'>
                      No students found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className='font-medium'>
                        <div className='flex items-center gap-2'>
                          <Avatar className='h-8 w-8'>
                            <AvatarImage
                              src={`/placeholder.svg?height=32&width=32&text=${student.name.charAt(
                                0
                              )}`}
                            />
                            <AvatarFallback>
                              {student.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          {student.name}
                        </div>
                      </TableCell>
                      <TableCell>{student.grade}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            student.status === 'active'
                              ? 'default'
                              : 'secondary'
                          }
                        >
                          {student.status}
                        </Badge>
                      </TableCell>
                      <TableCell className='text-right'>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant='ghost' size='sm'>
                              <MenuSquareIcon />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align='end'>
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem>Edit Student</DropdownMenuItem>
                            <DropdownMenuItem>
                              Attendance Record
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className='text-destructive'>
                              Delete Student
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
