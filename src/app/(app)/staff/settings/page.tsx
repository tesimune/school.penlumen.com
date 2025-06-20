'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useGrade } from '@/hooks/grade';
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
import IsLoading from '@/components/is-loading';
import { toast } from 'sonner';

interface Grade {
  uuid: string;
  score: number;
  grade: string;
  remark: string;
  description: string;
  created_at: string;
}

export default function GradesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [grades, setGrades] = useState<Grade[]>([]);
  const { index, create } = useGrade();

  const [formData, setFormData] = useState({
    score: 0,
    grade: '',
    remark: '',
    description: '',
  });

  const fetchData = async () => {
    setIsLoading(true);
    const response = await index();
    try {
      if (response.success) {
        setGrades(response.data.grades);
      } else {
        toast(response.message || 'Something went wrong');
      }
    } catch (error: any) {
      toast(error.message || 'Something went wrong');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await create(formData);
      if (response.success) {
        setFormData({
          score: 0,
          grade: '',
          remark: '',
          description: '',
        });
        setIsAddDialogOpen(false);
        fetchData();
      } else {
        toast(response.message || 'Something went wrong');
      }
    } catch (error: any) {
      toast(error.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredGrades = grades.filter(
    (grade) =>
      grade.grade.toLowerCase().includes(searchQuery.toLowerCase()) ||
      grade.remark.toLowerCase().includes(searchQuery.toLowerCase()) ||
      grade.score.toString().includes(searchQuery)
  );

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

  if (isLoading) {
    return <IsLoading />;
  }

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
              <form onSubmit={handleSubmit} className='space-y-4 py-4'>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='min-score'>Minimum Score</Label>
                    <Input
                      id='min-score'
                      type='number'
                      placeholder='e.g., 80'
                      value={formData.score}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          score: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='grade'>Grade</Label>
                    <Input
                      id='grade'
                      placeholder='e.g., A'
                      value={formData.grade}
                      onChange={(e) =>
                        setFormData({ ...formData, grade: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='remark'>Remark</Label>
                  <Input
                    id='remark'
                    placeholder='e.g., Excellent'
                    value={formData.remark}
                    onChange={(e) =>
                      setFormData({ ...formData, remark: e.target.value })
                    }
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='description'>Description (Optional)</Label>
                  <Textarea
                    id='description'
                    placeholder='Additional details about this grade'
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
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
                    <TableRow key={grade.uuid}>
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
