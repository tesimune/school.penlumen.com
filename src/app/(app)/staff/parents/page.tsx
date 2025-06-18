'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useUser } from '@/hooks/user';
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
import IsLoading from '@/components/is-loading';

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

interface Parent {
  user: User;
}

export default function parentPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [parents, setParents] = useState<Parent[] | []>([]);
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
    role: 'parent',
  });

  const fetchData = async () => {
    setIsLoading(true);
    const response = await index('parent');
    if (response.success) {
      setParents(response.data.user);
    } else {
      console.log(response);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!parents.length) {
      fetchData();
    }
  }, []);

  const saveParent = async () => {
    setIsLoading(true);
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
        role: 'parent',
      });
      fetchData();
      setIsAddDialogOpen(false);
    } else {
      console.log(response);
    }
    setIsLoading(false);
  };

  const filteredparent = parents.filter(
    (parent) =>
      (parent.user?.name ? parent.user.name.toLowerCase() : '').includes(
        searchQuery.toLowerCase()
      ) ||
      (parent.user?.email ? parent.user.email.toLowerCase() : '').includes(
        searchQuery.toLowerCase()
      ) ||
      (parent.user?.contact || '').includes(searchQuery) ||
      (parent.user?.alt_contact
        ? parent.user.alt_contact.includes(searchQuery)
        : false) ||
      (parent.user?.address ? parent.user.address.toLowerCase() : '').includes(
        searchQuery.toLowerCase()
      )
  );

  const getBadgeVariant = (position: string) => {
    switch (position?.toLowerCase()) {
      case 'parent':
        return 'default';
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
            <DialogContent className='max-w-md max-h-[95vh] overflow-y-auto'>
              <DialogHeader>
                <DialogTitle>Add New Parent</DialogTitle>
                <DialogDescription>
                  Create a new parent account
                </DialogDescription>
              </DialogHeader>
              <form className='space-y-4 py-4'>
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
                        setFormData({
                          ...formData,
                          contact: e.target.value,
                        })
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
                      <SelectItem value='parent'>Parent</SelectItem>
                      <SelectItem value='guardian'>Guardian</SelectItem>
                    </SelectContent>
                  </Select>
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
                  <Button onClick={() => saveParent()} type='submit'>
                    Save parent
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
                  <TableHead>Position</TableHead>
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
                    <TableRow key={parent.user.uuid}>
                      <TableCell className='font-medium'>
                        <div className='flex items-center gap-2'>
                          <Avatar className='h-8 w-8'>
                            <AvatarImage
                              src={`/placeholder.svg?height=32&width=32&text=${(
                                parent.user?.name ?? 'U'
                              ).charAt(0)}`}
                            />
                            <AvatarFallback>
                              {(parent.user?.name ?? 'U').charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          {parent.user?.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getBadgeVariant(parent.user.position)}>
                          {parent.user.position}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className='flex flex-col'>
                          <span>{parent.user?.contact}</span>
                          {parent.user?.alt_contact && (
                            <span className='text-xs text-muted-foreground'>
                              {parent.user?.alt_contact}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{parent.user.email}</TableCell>
                      <TableCell>{parent.user?.address}</TableCell>
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
                            <DropdownMenuItem>Edit parent</DropdownMenuItem>
                            <DropdownMenuItem>Assign child</DropdownMenuItem>
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
