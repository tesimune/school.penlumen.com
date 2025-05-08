'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Plus, Search } from 'lucide-react';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function parentPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Mock parent data
  const parentMembers = [
    {
      id: 1,
      uuid: 'parent-uuid-1',
      first_name: 'David',
      last_name: 'Wilson',
      email: 'david.wilson@example.com',
      contact: '+1234567890',
      alt_contact: '+0987654321',
      address: '123 Main St, City',
      created_at: '2023-01-15',
    },
    {
      id: 2,
      uuid: 'parent-uuid-2',
      first_name: 'Sarah',
      last_name: 'Johnson',
      email: 'sarah.johnson@example.com',
      contact: '+2345678901',
      alt_contact: null,
      address: '456 Oak Ave, Town',
      created_at: '2023-01-16',
    },
    {
      id: 3,
      uuid: 'parent-uuid-3',
      first_name: 'Michael',
      last_name: 'Brown',
      email: 'michael.brown@example.com',
      contact: '+3456789012',
      alt_contact: '+2109876543',
      address: '789 Pine Rd, Village',
      created_at: '2023-01-17',
    },
    {
      id: 4,
      uuid: 'parent-uuid-4',
      first_name: 'Jennifer',
      last_name: 'Davis',
      email: 'jennifer.davis@example.com',
      contact: '+4567890123',
      alt_contact: null,
      address: '321 Elm St, County',
      created_at: '2023-01-18',
    },
  ];

  // Filter parent based on search query
  const filteredparent = parentMembers.filter(
    (parent) =>
      parent.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      parent.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      parent.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      parent.contact.includes(searchQuery) ||
      (parent.alt_contact && parent.alt_contact.includes(searchQuery)) ||
      parent.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='space-y-6'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>Parents</h1>
          <p className='text-muted-foreground'>
            Manage school parent information and accounts
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
                Add Parent
              </Button>
            </DialogTrigger>
            <DialogContent className='max-w-md'>
              <DialogHeader>
                <DialogTitle>Add New Parent</DialogTitle>
                <DialogDescription>
                  Create a new parent account
                </DialogDescription>
              </DialogHeader>
              <form className='space-y-4 py-4'>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='first-name'>First Name</Label>
                    <Input id='first-name' placeholder='e.g., John' />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='last-name'>Last Name</Label>
                    <Input id='last-name' placeholder='e.g., Doe' />
                  </div>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='email'>Email</Label>
                  <Input
                    id='email'
                    type='email'
                    placeholder='e.g., john.doe@example.com'
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='password'>Password</Label>
                  <Input id='password' type='password' />
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='contact'>Contact Number</Label>
                    <Input id='contact' placeholder='e.g., +1234567890' />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='alt-contact'>
                      Alternative Contact (Optional)
                    </Label>
                    <Input id='alt-contact' placeholder='e.g., +0987654321' />
                  </div>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='address'>Address</Label>
                  <Input id='address' placeholder='e.g., 123 Main St, City' />
                </div>
                <DialogFooter>
                  <Button
                    type='button'
                    variant='outline'
                    onClick={() => setIsAddDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type='submit'>Save parent</Button>
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
              <CardTitle>All parents</CardTitle>
              <CardDescription>
                View and manage school parent accounts
              </CardDescription>
            </div>
            <div className='relative w-full sm:w-64'>
              <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
              <Input
                placeholder='Search parent...'
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
                  <TableHead>Contact</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead className='text-right'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredparent.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className='h-24 text-center'>
                      No parent found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredparent.map((parent) => (
                    <TableRow key={parent.id}>
                      <TableCell className='font-medium'>
                        <div className='flex items-center gap-2'>
                          <Avatar className='h-8 w-8'>
                            <AvatarImage
                              src={`/placeholder.svg?height=32&width=32&text=${parent.first_name.charAt(
                                0
                              )}`}
                            />
                            <AvatarFallback>
                              {parent.first_name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          {parent.first_name} {parent.last_name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className='flex flex-col'>
                          <span>{parent.contact}</span>
                          {parent.alt_contact && (
                            <span className='text-xs text-muted-foreground'>
                              {parent.alt_contact}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{parent.email}</TableCell>
                      <TableCell>{parent.address}</TableCell>
                      <TableCell className='text-right'>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant='ghost' size='sm'>
                              Actions
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align='end'>
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>Edit parent</DropdownMenuItem>
                            <DropdownMenuItem>Assign Classes</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className='text-destructive'>
                              Delete parent
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
