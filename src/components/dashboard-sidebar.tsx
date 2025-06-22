'use client';

import Link from 'next/link';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import {
  BarChart3,
  BookOpen,
  Calendar,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  School,
  Settings,
  Users,
  User,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';

interface UserProfile {
  name: string;
  avatar: string;
  role: string;
}

export function DashboardSidebar({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [profile, setProfile] = useState<UserProfile>();
  const [menuItems, setMenuItems] = useState<any[]>([]);

  const terminateSession = () => {
    Cookies.remove('branch');
    router.push('/session');
  };

  const logoutAccount = () => {
    Cookies.remove('branch');
    Cookies.remove('token');
    Cookies.remove('user');
    router.push('/login');
  };

  const staffMenuItems = [
    { title: 'Dashboard', icon: LayoutDashboard, href: '/staff/dashboard' },
    { title: 'parents', icon: Users, href: '/staff/parents' },
    { title: 'Staffs', icon: GraduationCap, href: '/staff/staffs' },
    { title: 'Classes', icon: BookOpen, href: '/staff/classes' },
    { title: 'Students', icon: Users, href: '/staff/students' },
    { title: 'Settings', icon: Settings, href: '/staff/settings' },
    { title: 'Reports', icon: BarChart3, href: '/staff/reports' },
    { title: 'Schedules', icon: Calendar, href: '/staff/schedules' },
  ];

  const parentsMenuItems = [
    { title: 'Dashboard', icon: LayoutDashboard, href: '/parents/dashboard' },
    { title: 'My Children', icon: Users, href: '/parents/children' },
  ];

  useEffect(() => {
    const userString = Cookies.get('user');
    const user = userString ? JSON.parse(userString) : null;
    if (user) {
      setProfile(user);
      if (user.role === 'parent') {
        setMenuItems(parentsMenuItems);
      } else {
        setMenuItems(staffMenuItems);
      }
    } else {
      Cookies.remove('user');
      Cookies.remove('token');
      Cookies.remove('branch');
      router.push('/login');
    }
  }, [router]);

  return (
    <SidebarProvider>
      <div className='flex min-h-screen w-full'>
        <Sidebar>
          <SidebarHeader>
            <div className='flex items-center gap-2 px-4 py-2'>
              <School className='h-6 w-6' />
              <span className='text-xl font-bold'>Penlumen</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === item.href}
                        tooltip={item.title}
                      >
                        <Link href={item.href}>
                          <item.icon className='h-5 w-5' />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <div className='px-3 py-2'>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='ghost' className='w-full justify-start px-2'>
                    <Avatar className='h-8 w-8 mr-2'>
                      <AvatarImage src={profile?.avatar || ''} alt='User' />
                      <AvatarFallback>
                        {profile?.name?.charAt(0).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col items-start text-sm'>
                      <span>{profile?.name || 'Unknow'}</span>
                      <span className='text-xs text-muted-foreground'>
                        {profile?.role || 'ADMIN'}
                      </span>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end' className='w-56'>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className='mr-2 h-4 w-4' />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => logoutAccount()}>
                    <LogOut className='mr-2 h-4 w-4' />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </SidebarFooter>
        </Sidebar>
        <div className='flex-1 w-full'>
          <div className='flex h-16 items-center gap-4 border-b bg-background px-6'>
            <SidebarTrigger />
            <div className='ml-auto flex items-center gap-4'>
              <Button
                onClick={() => terminateSession()}
                variant='outline'
                size='sm'
              >
                Switch Branch
              </Button>
            </div>
          </div>
          <main className='flex-1 w-full p-6'>{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
