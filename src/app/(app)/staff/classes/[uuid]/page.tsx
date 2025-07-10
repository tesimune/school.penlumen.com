'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  GraduationCap,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  BookOpen,
  Edit,
  UserPlus,
  Download,
  Search,
  MoreHorizontal,
  Eye,
  Trash2,
  Award,
  TrendingUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
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
import { Badge } from '@/components/ui/badge';
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
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Teacher {
  uuid: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  subject_specialization?: string;
  years_experience?: number;
  qualification?: string;
}

interface Student {
  uuid: string;
  name: string;
  reg_number: string;
  avatar?: string;
  email?: string;
  phone?: string;
  date_of_birth?: string;
  enrollment_date: string;
  status: 'active' | 'inactive' | 'transferred';
  parent_name?: string;
  parent_phone?: string;
  average_grade?: number;
  attendance_percentage?: number;
}

interface ClassData {
  uuid: string;
  name: string;
  description?: string;
  capacity: number;
  schedule?: string;
  room_number?: string;
  academic_year: string;
  term: string;
  created_at: string;
  updated_at: string;
  branch_name?: string;
  teacher: Teacher;
  students: Student[];
}

interface ClassDetailsPageProps {
  classData: ClassData;
}

export default function ClassDetailsPage({}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);

  const classData = {
    uuid: 'class-123',
    name: 'JSS 2A',
    description: 'Junior Secondary School Class 2A - Science Track',
    capacity: 35,
    schedule: 'Monday to Friday, 8:00 AM - 2:00 PM',
    room_number: 'Room 204',
    academic_year: '2023/2024',
    term: 'Second Term',
    created_at: '2023-09-01T00:00:00Z',
    updated_at: '2024-01-15T10:30:00Z',
    branch_name: 'Main Campus',
    teacher: {
      uuid: 'teacher-456',
      name: 'Mrs. Sarah Johnson',
      email: 'sarah.johnson@school.edu',
      phone: '+234 801 234 5678',
      avatar: '/placeholder.svg?height=80&width=80',
      subject_specialization: 'Mathematics & Sciences',
      years_experience: 8,
      qualification: 'B.Ed Mathematics, M.Sc Education',
    },
    students: [
      {
        uuid: 'student-001',
        name: 'Alice Johnson',
        reg_number: 'STU001',
        avatar: '/placeholder.svg?height=40&width=40',
        email: 'alice.johnson@student.edu',
        phone: '+234 802 345 6789',
        date_of_birth: '2008-03-15',
        enrollment_date: '2023-09-01T00:00:00Z',
        status: 'active',
        parent_name: 'Mr. John Johnson',
        parent_phone: '+234 803 456 7890',
        average_grade: 85.5,
        attendance_percentage: 95,
      },
      {
        uuid: 'student-002',
        name: 'Bob Smith',
        reg_number: 'STU002',
        avatar: '/placeholder.svg?height=40&width=40',
        email: 'bob.smith@student.edu',
        phone: '+234 804 567 8901',
        date_of_birth: '2008-07-22',
        enrollment_date: '2023-09-01T00:00:00Z',
        status: 'active',
        parent_name: 'Mrs. Jane Smith',
        parent_phone: '+234 805 678 9012',
        average_grade: 78.2,
        attendance_percentage: 88,
      },
      {
        uuid: 'student-003',
        name: 'Charlie Brown',
        reg_number: 'STU003',
        avatar: '/placeholder.svg?height=40&width=40',
        email: 'charlie.brown@student.edu',
        phone: '+234 806 789 0123',
        date_of_birth: '2008-11-08',
        enrollment_date: '2023-09-01T00:00:00Z',
        status: 'active',
        parent_name: 'Dr. Michael Brown',
        parent_phone: '+234 807 890 1234',
        average_grade: 92.1,
        attendance_percentage: 98,
      },
      {
        uuid: 'student-004',
        name: 'Diana Prince',
        reg_number: 'STU004',
        avatar: '/placeholder.svg?height=40&width=40',
        email: 'diana.prince@student.edu',
        phone: '+234 808 901 2345',
        date_of_birth: '2008-05-30',
        enrollment_date: '2023-09-01T00:00:00Z',
        status: 'inactive',
        parent_name: 'Ms. Wonder Prince',
        parent_phone: '+234 809 012 3456',
        average_grade: 88.7,
        attendance_percentage: 75,
      },
      {
        uuid: 'student-005',
        name: 'Edward Cullen',
        reg_number: 'STU005',
        avatar: '/placeholder.svg?height=40&width=40',
        email: 'edward.cullen@student.edu',
        phone: '+234 810 123 4567',
        date_of_birth: '2008-06-20',
        enrollment_date: '2023-09-01T00:00:00Z',
        status: 'active',
        parent_name: 'Mr. Carlisle Cullen',
        parent_phone: '+234 811 234 5678',
        average_grade: 91.3,
        attendance_percentage: 96,
      },
    ],
  };

  // Filter students based on search
  const filteredStudents = classData.students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.reg_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate class statistics
  const activeStudents = classData.students.filter(
    (s) => s.status === 'active'
  ).length;
  const averageGrade =
    classData.students.reduce((sum, s) => sum + (s.average_grade || 0), 0) /
    classData.students.length;
  const averageAttendance =
    classData.students.reduce(
      (sum, s) => sum + (s.attendance_percentage || 0),
      0
    ) / classData.students.length;
  const capacityUtilization =
    (classData.students.length / classData.capacity) * 100;

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { variant: 'default' as const, color: 'text-green-600' },
      inactive: { variant: 'secondary' as const, color: 'text-gray-600' },
      transferred: { variant: 'outline' as const, color: 'text-blue-600' },
    };
    const config =
      statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
    return (
      <Badge variant={config.variant} className={config.color}>
        {status.toUpperCase()}
      </Badge>
    );
  };

  const getGradeColor = (grade: number) => {
    if (grade >= 90) return 'text-green-600';
    if (grade >= 80) return 'text-blue-600';
    if (grade >= 70) return 'text-yellow-600';
    if (grade >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 95) return 'text-green-600';
    if (attendance >= 85) return 'text-blue-600';
    if (attendance >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const viewStudentDetails = (student: Student) => {
    setSelectedStudent(student);
    setIsStudentModalOpen(true);
  };

  return (
    <div className='space-y-6 p-6'>
      {/* Header */}
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>
            {classData.name}
          </h1>
          <p className='text-muted-foreground'>{classData.description}</p>
        </div>
        <div className='flex items-center gap-2'>
          <Button variant='outline' size='sm' className='gap-2'>
            <Download className='h-4 w-4' />
            Export
          </Button>
          <Button variant='outline' size='sm' className='gap-2'>
            <Edit className='h-4 w-4' />
            Edit Class
          </Button>
          <Button size='sm' className='gap-2'>
            <UserPlus className='h-4 w-4' />
            Add Student
          </Button>
        </div>
      </div>

      {/* Class Details Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <BookOpen className='h-5 w-5' />
              Class Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
              {/* Class Information */}
              <div className='space-y-4'>
                <h4 className='font-medium text-sm text-muted-foreground uppercase tracking-wide'>
                  Class Information
                </h4>
                <div className='space-y-3'>
                  <div className='flex items-center gap-2'>
                    <GraduationCap className='h-4 w-4 text-muted-foreground' />
                    <div>
                      <p className='text-sm font-medium'>Class Name</p>
                      <p className='text-sm text-muted-foreground'>
                        {classData.name}
                      </p>
                    </div>
                  </div>

                  <div className='flex items-center gap-2'>
                    <MapPin className='h-4 w-4 text-muted-foreground' />
                    <div>
                      <p className='text-sm font-medium'>Location</p>
                      <p className='text-sm text-muted-foreground'>
                        {classData.room_number} • {classData.branch_name}
                      </p>
                    </div>
                  </div>

                  <div className='flex items-center gap-2'>
                    <Calendar className='h-4 w-4 text-muted-foreground' />
                    <div>
                      <p className='text-sm font-medium'>Academic Period</p>
                      <p className='text-sm text-muted-foreground'>
                        {classData.academic_year} • {classData.term}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Class Teacher */}
              <div className='space-y-4'>
                <h4 className='font-medium text-sm text-muted-foreground uppercase tracking-wide'>
                  Class Teacher
                </h4>
                <div className='flex items-center gap-3'>
                  <div className='flex-1'>
                    <h3 className='font-semibold'>{classData.teacher.name}</h3>
                    <p className='text-sm text-muted-foreground'>
                      {classData.teacher.subject_specialization}
                    </p>
                  </div>
                </div>

                <div className='space-y-2'>
                  <div className='flex items-center gap-2'>
                    <Mail className='h-4 w-4 text-muted-foreground' />
                    <span className='text-sm'>{classData.teacher.email}</span>
                  </div>
                  {classData.teacher.phone && (
                    <div className='flex items-center gap-2'>
                      <Phone className='h-4 w-4 text-muted-foreground' />
                      <span className='text-sm'>{classData.teacher.phone}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Class Statistics */}
              <div className='space-y-4'>
                <h4 className='font-medium text-sm text-muted-foreground uppercase tracking-wide'>
                  Class Statistics
                </h4>
                <div className='space-y-3'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                      <Users className='h-4 w-4 text-muted-foreground' />
                      <span className='text-sm font-medium'>Capacity</span>
                    </div>
                    <div className='text-right'>
                      <div className='font-semibold'>{classData.capacity}</div>
                    </div>
                  </div>

                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                      <Users className='h-4 w-4 text-muted-foreground' />
                      <span className='text-sm font-medium'>
                        Total Students
                      </span>
                    </div>
                    <div className='text-right'>
                      <div className='font-semibold'>{activeStudents}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Students List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card>
          <CardHeader className='flex flex-col gap-4 sm:flex-row sm:items-center'>
            <div className='relative w-full'>
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
            <div className='overflow-x-auto'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Registration</TableHead>
                    <TableHead className='text-center'>Status</TableHead>
                    <TableHead className='text-center'>Average Grade</TableHead>
                    <TableHead className='text-center'>Attendance</TableHead>
                    <TableHead>Parent Contact</TableHead>
                    <TableHead className='text-center'>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className='h-24 text-center'>
                        <div className='flex flex-col items-center gap-2'>
                          <Users className='h-8 w-8 text-muted-foreground opacity-50' />
                          <p className='text-muted-foreground'>
                            {searchQuery
                              ? 'No students found matching your search.'
                              : 'No students in this class.'}
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredStudents.map((student) => (
                      <TableRow key={student.uuid}>
                        <TableCell>
                          <div className='flex items-center gap-3'>
                            <Avatar className='h-10 w-10'>
                              <AvatarImage
                                src={student.avatar || '/placeholder.svg'}
                              />
                              <AvatarFallback>
                                {student.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className='font-medium'>{student.name}</div>
                              <div className='text-sm text-muted-foreground'>
                                {student.email}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className='font-mono text-sm'>
                            {student.reg_number}
                          </div>
                          <div className='text-xs text-muted-foreground'>
                            Enrolled:{' '}
                            {new Date(
                              student.enrollment_date
                            ).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell className='text-center'>
                          {getStatusBadge(student.status)}
                        </TableCell>
                        <TableCell className='text-center'>
                          <span
                            className={`font-medium ${getGradeColor(
                              student.average_grade || 0
                            )}`}
                          >
                            {student.average_grade?.toFixed(1) || 'N/A'}%
                          </span>
                        </TableCell>
                        <TableCell className='text-center'>
                          <span
                            className={`font-medium ${getAttendanceColor(
                              student.attendance_percentage || 0
                            )}`}
                          >
                            {student.attendance_percentage || 'N/A'}%
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className='text-sm'>
                            <div className='font-medium'>
                              {student.parent_name}
                            </div>
                            <div className='text-muted-foreground'>
                              {student.parent_phone}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className='text-center'>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant='ghost' size='sm'>
                                <MoreHorizontal className='h-4 w-4' />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align='end'>
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                // onClick={() => viewStudentDetails(student)}
                              >
                                <Eye className='mr-2 h-4 w-4' />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className='mr-2 h-4 w-4' />
                                Edit Student
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Award className='mr-2 h-4 w-4' />
                                View Grades
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className='text-red-600'>
                                <Trash2 className='mr-2 h-4 w-4' />
                                Remove from Class
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Student Details Modal */}
      <Dialog open={isStudentModalOpen} onOpenChange={setIsStudentModalOpen}>
        <DialogContent className='max-w-2xl'>
          <DialogHeader>
            <DialogTitle>Student Details</DialogTitle>
            <DialogDescription>
              Detailed information about the selected student
            </DialogDescription>
          </DialogHeader>
          {selectedStudent && (
            <div className='space-y-6'>
              <div className='flex items-center gap-4'>
                <Avatar className='h-16 w-16'>
                  <AvatarImage
                    src={selectedStudent.avatar || '/placeholder.svg'}
                  />
                  <AvatarFallback className='text-xl'>
                    {selectedStudent.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className='flex-1'>
                  <h3 className='text-xl font-semibold'>
                    {selectedStudent.name}
                  </h3>
                  <p className='text-muted-foreground'>
                    {selectedStudent.reg_number}
                  </p>
                  <div className='flex items-center gap-2 mt-2'>
                    {getStatusBadge(selectedStudent.status)}
                  </div>
                </div>
              </div>

              <div className='grid gap-4 md:grid-cols-2'>
                <div className='space-y-3'>
                  <h4 className='font-medium'>Personal Information</h4>
                  <div className='space-y-2 text-sm'>
                    <div className='flex justify-between'>
                      <span className='text-muted-foreground'>Email:</span>
                      <span>{selectedStudent.email}</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-muted-foreground'>Phone:</span>
                      <span>{selectedStudent.phone}</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-muted-foreground'>
                        Date of Birth:
                      </span>
                      <span>
                        {selectedStudent.date_of_birth
                          ? new Date(
                              selectedStudent.date_of_birth
                            ).toLocaleDateString()
                          : 'N/A'}
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-muted-foreground'>
                        Enrollment Date:
                      </span>
                      <span>
                        {new Date(
                          selectedStudent.enrollment_date
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className='space-y-3'>
                  <h4 className='font-medium'>Academic Performance</h4>
                  <div className='space-y-2 text-sm'>
                    <div className='flex justify-between'>
                      <span className='text-muted-foreground'>
                        Average Grade:
                      </span>
                      <span
                        className={getGradeColor(
                          selectedStudent.average_grade || 0
                        )}
                      >
                        {selectedStudent.average_grade?.toFixed(1) || 'N/A'}%
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-muted-foreground'>Attendance:</span>
                      <span
                        className={getAttendanceColor(
                          selectedStudent.attendance_percentage || 0
                        )}
                      >
                        {selectedStudent.attendance_percentage || 'N/A'}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className='space-y-3'>
                  <h4 className='font-medium'>Parent/Guardian</h4>
                  <div className='space-y-2 text-sm'>
                    <div className='flex justify-between'>
                      <span className='text-muted-foreground'>Name:</span>
                      <span>{selectedStudent.parent_name}</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-muted-foreground'>Phone:</span>
                      <span>{selectedStudent.parent_phone}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
