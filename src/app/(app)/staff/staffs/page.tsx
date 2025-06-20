'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Download, MenuSquareIcon, Plus, Search } from 'lucide-react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useUser } from '@/hooks/user';
import IsLoading from '@/components/is-loading';
import { toast } from 'sonner';

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

interface Staff {
  user: User;
}

export default function StaffPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [staffs, setStaffs] = useState<Staff[] | []>([]);
  const { index, create } = useUser();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    contact: '',
    alt_contact: '',
    position: '',
    address: '',
    role: 'staff',
  });

  const fetchData = async () => {
    setIsLoading(true);
    const response = await index('staff');
    if (response.success) {
      setStaffs(response.data.user);
    } else {
      console.log(response);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!staffs.length) {
      fetchData();
    }
  }, []);

  const saveStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await create(formData);
      if (response.success) {
        setFormData({
          name: '',
          email: '',
          password: '',
          contact: '',
          alt_contact: '',
          position: '',
          address: '',
          role: 'staff',
        });
        fetchData();
        setIsAddDialogOpen(false);
      } else {
        toast(response.message || 'Something went wrong');
      }
    } catch (error: any) {
      toast(error.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredStaff = staffs.filter(
    (staff) =>
      (staff.user?.name ? staff.user.name.toLowerCase() : '').includes(
        searchQuery.toLowerCase()
      ) ||
      (staff.user?.email ? staff.user.email.toLowerCase() : '').includes(
        searchQuery.toLowerCase()
      ) ||
      (staff.user?.contact || '').includes(searchQuery) ||
      (staff.user?.alt_contact
        ? staff.user.alt_contact.includes(searchQuery)
        : false) ||
      (staff.user?.address ? staff.user.address.toLowerCase() : '').includes(
        searchQuery.toLowerCase()
      )
  );

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
          <h1 className='text-3xl font-bold tracking-tight'>Staff</h1>
          <p className='text-muted-foreground'>
            Manage school staff information and accounts
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
                Add Staff
              </Button>
            </DialogTrigger>
            <DialogContent className='max-w-md max-h-[95vh] overflow-y-auto scroll-hidden'>
              <DialogHeader>
                <DialogTitle>Add New Staff</DialogTitle>
                <DialogDescription>
                  Create a new staff account
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={saveStaff} className='space-y-4 py-4'>
                <div className='space-y-2'>
                  <Label htmlFor='name'>Full Name</Label>
                  <Input
                    id='name'
                    placeholder='e.g., John Doe'
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='email'>Email</Label>
                  <Input
                    id='email'
                    type='email'
                    placeholder='e.g., john.doe@example.com'
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='password'>Password</Label>
                  <Input
                    id='password'
                    type='password'
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='contact'>Contact Number</Label>
                    <Input
                      id='contact'
                      placeholder='e.g., +1234567890'
                      value={formData.contact}
                      onChange={(e) =>
                        setFormData({ ...formData, contact: e.target.value })
                      }
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='alt-contact'>
                      Alternative Contact (Optional)
                    </Label>
                    <Input
                      id='alt-contact'
                      placeholder='e.g., +0987654321'
                      value={formData.alt_contact}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          alt_contact: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='position'>Position</Label>
                  <Select
                    value={formData.position}
                    onValueChange={(value) =>
                      setFormData({ ...formData, position: value })
                    }
                  >
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Select position' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='principal'>Principal</SelectItem>
                      <SelectItem value='vice principal'>
                        Vice Principal
                      </SelectItem>
                      <SelectItem value='teacher'>Teacher</SelectItem>
                      <SelectItem value='administrator'>
                        Administrator
                      </SelectItem>
                      <SelectItem value='counselor'>Counselor</SelectItem>
                      <SelectItem value='librarian'>Librarian</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='address'>Address</Label>
                  <Input id='address' placeholder='e.g., 123 Main St, City' />
                </div>
                <DialogFooter>
                  <Button
                    onClick={() => setIsAddDialogOpen(false)}
                    type='button'
                    variant='outline'
                  >
                    Cancel
                  </Button>
                  <Button type='submit'>Save Staff</Button>
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
              <CardTitle>All Staff</CardTitle>
              <CardDescription>
                View and manage school staff accounts
              </CardDescription>
            </div>
            <div className='relative w-full sm:w-64'>
              <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
              <Input
                placeholder='Search staff...'
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
                {filteredStaff.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className='h-24 text-center'>
                      No staff found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredStaff.map((staff) => (
                    <TableRow key={staff.user.uuid}>
                      <TableCell className='font-medium'>
                        <div className='flex items-center gap-2'>
                          <Avatar className='h-8 w-8'>
                            <AvatarImage
                              src={`/placeholder.svg?height=32&width=32&text=${(
                                staff.user?.name ?? 'U'
                              ).charAt(0)}`}
                            />
                            <AvatarFallback>
                              {(staff.user?.name ?? 'U').charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          {staff.user?.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className='capitalize'
                          variant={getBadgeVariant(staff.user.position)}
                        >
                          {staff.user.position}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className='flex flex-col'>
                          <span>{staff.user.contact}</span>
                          {staff.user.alt_contact && (
                            <span className='text-xs text-muted-foreground'>
                              {staff.user.alt_contact}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{staff.user.email}</TableCell>
                      <TableCell>{staff.user.address}</TableCell>
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
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>Edit Staff</DropdownMenuItem>
                            <DropdownMenuItem>Assign Classes</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className='text-destructive'>
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
