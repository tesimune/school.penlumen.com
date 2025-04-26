'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Download, MenuSquareIcon, Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

export default function GradesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Mock grade data
  const grades = [
    {
      id: 1,
      uuid: 'grade-uuid-1',
      score: 90,
      grade: 'A',
      remark: 'Excellent',
      created_at: '2023-01-15',
    },
    {
      id: 2,
      uuid: 'grade-uuid-2',
      score: 80,
      grade: 'B',
      remark: 'Very Good',
      created_at: '2023-01-16',
    },
    {
      id: 3,
      uuid: 'grade-uuid-3',
      score: 70,
      grade: 'C',
      remark: 'Good',
      created_at: '2023-01-17',
    },
    {
      id: 4,
      uuid: 'grade-uuid-4',
      score: 60,
      grade: 'D',
      remark: 'Fair',
      created_at: '2023-01-18',
    },
    {
      id: 5,
      uuid: 'grade-uuid-5',
      score: 50,
      grade: 'E',
      remark: 'Pass',
      created_at: '2023-01-19',
    },
    {
      id: 6,
      uuid: 'grade-uuid-6',
      score: 40,
      grade: 'F',
      remark: 'Fail',
      created_at: '2023-01-20',
    },
  ];

  // Filter grades based on search query
  const filteredGrades = grades.filter(
    (grade) =>
      grade.grade.toLowerCase().includes(searchQuery.toLowerCase()) ||
      grade.remark.toLowerCase().includes(searchQuery.toLowerCase()) ||
      grade.score.toString().includes(searchQuery)
  );

  // Function to get badge color based on grade
  const getBadgeVariant = (grade: string) => {
    switch (grade) {
      case 'A':
        return 'default';
      case 'B':
        return 'secondary';
      case 'C':
        return 'outline';
      case 'D':
        return 'destructive';
      case 'E':
        return 'destructive';
      case 'F':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <div className='space-y-6'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Grading System</h1>
          <p className='text-muted-foreground'>
            Manage grading criteria for student assessments
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
                Add Grade
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Grade</DialogTitle>
                <DialogDescription>
                  Create a new grade criteria for student assessment
                </DialogDescription>
              </DialogHeader>
              <form className='space-y-4 py-4'>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='min-score'>Minimum Score</Label>
                    <Input
                      id='min-score'
                      type='number'
                      placeholder='e.g., 80'
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='grade'>Grade</Label>
                    <Input id='grade' placeholder='e.g., A' />
                  </div>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='remark'>Remark</Label>
                  <Input id='remark' placeholder='e.g., Excellent' />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='description'>Description (Optional)</Label>
                  <Textarea
                    id='description'
                    placeholder='Additional details about this grade'
                  />
                </div>
                <DialogFooter>
                  <Button
                    type='button'
                    variant='outline'
                    onClick={() => setIsAddDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type='submit'>Save Grade</Button>
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
              <CardTitle>Grade Criteria</CardTitle>
              <CardDescription>
                Grading system used for student assessment
              </CardDescription>
            </div>
            <div className='relative w-full sm:w-64'>
              <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
              <Input
                placeholder='Search grades...'
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
                  <TableHead>Grade</TableHead>
                  <TableHead>Score Range</TableHead>
                  <TableHead>Remark</TableHead>
                  <TableHead>Created Date</TableHead>
                  <TableHead className='text-right'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredGrades.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className='h-24 text-center'>
                      No grades found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredGrades.map((grade) => (
                    <TableRow key={grade.id}>
                      <TableCell className='font-medium'>
                        <div className='flex items-center gap-2'>
                          <Award className='h-4 w-4 text-primary' />
                          <Badge variant={getBadgeVariant(grade.grade)}>
                            {grade.grade}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>{grade.score}% and above</TableCell>
                      <TableCell>{grade.remark}</TableCell>
                      <TableCell>{grade.created_at}</TableCell>
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
                            <DropdownMenuItem>Edit Grade</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className='text-destructive'>
                              Delete Grade
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
