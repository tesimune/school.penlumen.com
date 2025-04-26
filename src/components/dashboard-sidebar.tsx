'use client';

import Link from 'next/link';
import type React from 'react';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useEffect, useRef } from 'react';
import { useAuth } from '@/hooks/auth';
import { useRouter } from 'next/navigation';

export function DashboardSidebar({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { profile, logout } = useAuth();

  const terminateSession = () => {
    logout();
    router.push('/login');
  };

  let user;
  useEffect(() => {
    user = profile();
    if (!user) {
      // router.push('/login');
    }
  }, [router, profile]);

  const menuItems = [
    { title: 'Dashboard', icon: LayoutDashboard, href: '/staff/dashboard' },
    { title: 'parents', icon: Users, href: '/staff/parents' },
    { title: 'Staffs', icon: GraduationCap, href: '/staff/staffs' },
    { title: 'Classes', icon: BookOpen, href: '/staff/classes' },
    { title: 'Schedule', icon: Calendar, href: '/staff/schedule' },
    { title: 'Reports', icon: BarChart3, href: '/staff/reports' },
    { title: 'Settings', icon: Settings, href: '/staff/settings' },
  ];

  return (
    <SidebarProvider>
      <div className='flex min-h-screen w-full'>
        <Sidebar>
          <SidebarHeader>
            <div className='flex items-center gap-2 px-4 py-2'>
              <School className='h-6 w-6' />
              <span className='text-xl font-bold'>EduManage</span>
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
                      <AvatarImage src={profile()?.avatar || ''} alt='User' />
                      <AvatarFallback>
                        {profile()?.name?.charAt(0).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col items-start text-sm'>
                      <span>{profile()?.name || 'Unknow'}</span>
                      <span className='text-xs text-muted-foreground'>
                        {profile()?.role || 'ADMIN'}
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
                  <DropdownMenuItem>
                    <Settings className='mr-2 h-4 w-4' />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => terminateSession()}>
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
              <Button variant='outline' size='sm'>
                Help
              </Button>
            </div>
          </div>
          <main className='flex-1 w-full p-6'>{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
