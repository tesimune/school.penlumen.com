'use client';
import { useUser } from '@/hooks/user';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MenuSquareIcon, Plus, Search } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';
import UserUpdate from './user-update';

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

interface Users {
  user: User;
}

export default function UsersIndex({
  role,
  fetchData,
  setIsLoading,
  users,
}: {
  role: string;
  fetchData: () => void;
  setIsLoading: (loading: boolean) => void;
  users: Users[];
}) {
  const { register } = useUser();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editUUID, setEditUUID] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    contact: '',
    alt_contact: '',
    position: '',
    address: '',
  });

  const filteredUsers = users.filter(
    (filter) =>
      (filter.user?.name ? filter.user.name.toLowerCase() : '').includes(
        searchQuery.toLowerCase()
      ) ||
      (filter.user?.email ? filter.user.email.toLowerCase() : '').includes(
        searchQuery.toLowerCase()
      ) ||
      (filter.user?.contact || '').includes(searchQuery) ||
      (filter.user?.alt_contact
        ? filter.user.alt_contact.includes(searchQuery)
        : false) ||
      (filter.user?.address ? filter.user.address.toLowerCase() : '').includes(
        searchQuery.toLowerCase()
      )
  );

  const saveUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await register(formData);

      if (response.success) {
        setFormData({
          name: '',
          email: '',
          password: '',
          contact: '',
          alt_contact: '',
          position: '',
          address: '',
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

  const handleEdit = async (user: any) => {
    setFormData({
      name: user.name,
      email: user.email,
      contact: user.contact,
      alt_contact: user.alt_contact,
      position: user.position,
      address: user.address,
      password: '',
    });
    setEditUUID(user.uuid);
    setIsAddDialogOpen(true);
  };

  const handleDelete = async (uuid: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      alert(`Delete user with UUID: ${uuid}`);
    }
  };

  const getBadgeVariant = (position: string) => {
    switch (position?.toLowerCase()) {
      case 'administrator':
        return 'default';
      case 'principal':
        return 'default';
      case 'vice principal':
        return 'secondary';
      case 'teacher':
        return 'outline';
      case 'parent':
        return 'default';
      case 'guardian':
        return 'outline';
      default:
        return 'outline';
    }
  };

  return (
    <div>
      <UserUpdate
        role={role}
        formData={formData}
        setFormData={setFormData}
        fetchData={fetchData}
        setIsLoading={setIsLoading}
        isAddDialogOpen={isAddDialogOpen}
        setIsAddDialogOpen={setIsAddDialogOpen}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader className='flex flex-col gap-4 sm:flex-row sm:items-center'>
            <div className='relative w-full'>
              <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
              <Input
                placeholder={`Search for user...`}
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
                  <TableHead>Position</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead className='text-right'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className='h-24 text-center'>
                      No staff found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((filter) => (
                    <TableRow key={filter.user.uuid}>
                      <TableCell className='font-medium'>
                        <div className='flex items-center gap-2'>
                          <Avatar className='h-8 w-8'>
                            <AvatarImage
                              src={`/placeholder.svg?height=32&width=32&text=${(
                                filter.user?.name ?? 'U'
                              ).charAt(0)}`}
                            />
                            <AvatarFallback>
                              {(filter.user?.name ?? 'U').charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          {filter.user?.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className='capitalize'
                          variant={getBadgeVariant(filter.user.position)}
                        >
                          {filter.user.position}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className='flex flex-col'>
                          <span>{filter.user.contact}</span>
                          {filter.user.alt_contact && (
                            <span className='text-xs text-muted-foreground'>
                              {filter.user.alt_contact}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{filter.user.email}</TableCell>
                      <TableCell>{filter.user.address}</TableCell>
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
                            <DropdownMenuItem
                              onClick={() => handleEdit(filter.user)}
                            >
                              Edit {role}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleDelete(filter.user.uuid)}
                              className='text-destructive'
                            >
                              Delete Staff
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
