import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import { Button } from '@/components/ui/button';
import { Link, MenuSquareIcon } from 'lucide-react';

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

export default function StudentsTable({
  filteredStudents,
  handleEdit,
  handleDelete,
}: {
  filteredStudents: Student[];
  handleEdit: (student: Student) => void;
  handleDelete: (student: Student) => void;
}) {
  return (
    <div>
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
              <TableRow key={student.uuid}>
                <TableCell className='font-medium'>
                  <div className='flex items-center gap-2'>
                    <Avatar className='h-8 w-8'>
                      <AvatarImage
                        src={`/placeholder.svg?height=32&width=32&text=${student.name.charAt(
                          0
                        )}`}
                      />
                      <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {student.name}
                  </div>
                </TableCell>
                <TableCell>{student.class.name}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      student.status === 'active' ? 'default' : 'secondary'
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
                      <DropdownMenuItem>
                        <Link href={`/staff/students/${student.uuid}`}>
                          Show Reports
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => handleDelete(student)}
                        className='text-destructive'
                      >
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
    </div>
  );
}
