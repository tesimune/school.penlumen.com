'use client';

import Cookies from 'js-cookie';
import { motion } from 'framer-motion';
import { useBranch } from '@/hooks/branch';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Check,
  ChevronRight,
  School,
  Search,
  LogOut,
  Plus,
} from 'lucide-react';
import IsLoading from '@/components/is-loading';
import { toast } from 'sonner';

interface BranchAccess {
  uuid: string;
  name: string;
  contact: string;
  avata: string;
  address: string;
  students: number;
}

interface Branch {
  branch: BranchAccess;
}

export default function BranchSelectionPage() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const { index, create } = useBranch();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    address: '',
  });

  const fetchData = async () => {
    const userString = Cookies.get('user');
    const user = userString ? JSON.parse(userString) : null;
    if (!user) {
      router.push('/login');
      return;
    }

    const response = await index();
    if (!response.success) {
      console.error(response.message);
    } else {
      setBranches(response.data.branch_acccess);
    }
  };

  useEffect(() => {
    if (!branches.length) {
      fetchData();
    }
  }, [router]);

  const handleContinue = () => {
    if (selectedBranch === null) return;
    setIsLoading(true);
    setTimeout(() => {
      Cookies.set('branch', selectedBranch.toString(), { expires: 7 });
      const userString = Cookies.get('user');
      const user = userString ? JSON.parse(userString) : null;

      if (user?.role === 'PARENT') {
        router.push('/parent/dashboard');
      } else {
        router.push('/staff/dashboard');
      }
    }, 1000);
  };

  const handleLogout = () => {
    Cookies.remove('user');
    Cookies.remove('branch');
    router.push('/login');
  };

  const createBranch = async () => {
    try {
      setIsCreating(true);
      const response = await create(formData);
      if (response.success) {
        setFormData({
          name: '',
          email: '',
          contact: '',
          address: '',
        });
        fetchData();
        setShowCreateModal(false);
      } else {
        toast(response.message || 'Something went wrong');
      }
    } catch (error: any) {
      toast(error.message || 'Something went wrong');
    } finally {
      setIsCreating(false);
    }
  };

  const filteredBranches = branches.filter(
    (access) =>
      access.branch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      access.branch.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  if (isLoading) {
    return <IsLoading />;
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-muted p-4'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='w-full max-w-3xl'
      >
        <Card>
          <CardHeader>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <School className='h-6 w-6 text-primary' />
                <span className='text-xl font-bold'>Penlumen</span>
              </div>
              <div className='flex gap-2'>
                <Button
                  variant='outline'
                  size='icon'
                  onClick={() => setShowCreateModal(true)}
                  title='Create Branch'
                >
                  <Plus className='h-4 w-4' />
                </Button>

                <Button
                  variant='outline'
                  size='icon'
                  onClick={() => setShowLogoutModal(true)}
                  title='Logout'
                >
                  <LogOut className='h-4 w-4' />
                </Button>
              </div>
            </div>
            <CardTitle className='text-2xl font-bold text-center mt-4'>
              Select a Branch
            </CardTitle>
            <CardDescription className='text-center'>
              Choose which school branch you want to access
            </CardDescription>
          </CardHeader>

          <CardContent className='space-y-4'>
            <div className='relative'>
              <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
              <Input
                placeholder='Search branches...'
                className='pl-8'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <motion.div
              className='grid gap-3'
              variants={container}
              initial='hidden'
              animate='show'
            >
              {filteredBranches.length === 0 ? (
                <div className='text-center py-8 text-muted-foreground'>
                  No branches found matching your search.
                </div>
              ) : (
                filteredBranches.map((access) => (
                  <motion.div key={access.branch.uuid} variants={item}>
                    <div
                      className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedBranch === access.branch.uuid
                          ? 'border-primary bg-primary/5'
                          : 'hover:border-primary/50 hover:bg-muted'
                      }`}
                      onClick={() => setSelectedBranch(access.branch.uuid)}
                    >
                      <div className='flex items-center gap-4'>
                        <Avatar className='h-12 w-12'>
                          <AvatarImage
                            src={access.branch.avata || '/placeholder.svg'}
                            alt={access.branch.name}
                          />
                          <AvatarFallback>
                            {access.branch.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className='font-medium'>{access.branch.name}</h3>
                          <p className='text-sm text-muted-foreground'>
                            {access.branch.address}
                          </p>
                        </div>
                      </div>
                      <div className='flex items-center gap-4'>
                        {selectedBranch === access.branch.uuid ? (
                          <Check className='h-5 w-5 text-primary' />
                        ) : (
                          <ChevronRight className='h-5 w-5 text-muted-foreground' />
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          </CardContent>

          <CardFooter>
            <Button
              className='w-full'
              disabled={selectedBranch === null || isLoading}
              onClick={handleContinue}
            >
              {isLoading ? 'Loading...' : 'Continue'}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>

      {/* Create branch */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Branch</DialogTitle>
            <p className='text-muted-foreground text-sm'>
              Enter the details for your new branch.
            </p>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            <Input
              placeholder='Branch name *'
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <Input
              placeholder='Contact'
              value={formData.contact}
              onChange={(e) =>
                setFormData({ ...formData, contact: e.target.value })
              }
            />

            <Input
              placeholder='Address'
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
          </div>
          <DialogFooter className='flex justify-end gap-2'>
            <Button
              variant='outline'
              onClick={() => setShowCreateModal(false)}
              disabled={isCreating}
            >
              Cancel
            </Button>
            <Button onClick={() => createBranch()} disabled={isCreating}>
              {isCreating ? 'Creating...' : 'Create Branch'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 🔐 Logout Modal */}
      <Dialog open={showLogoutModal} onOpenChange={setShowLogoutModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Logout</DialogTitle>
            <p className='text-muted-foreground text-sm'>
              Are you sure you want to logout? You’ll need to log in again to
              continue.
            </p>
          </DialogHeader>
          <DialogFooter className='mt-4 flex justify-end gap-2'>
            <Button variant='outline' onClick={() => setShowLogoutModal(false)}>
              Cancel
            </Button>
            <Button variant='destructive' onClick={handleLogout}>
              Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
