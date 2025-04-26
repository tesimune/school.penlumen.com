import Cookies from 'js-cookie';
import { axiosInstance } from '@/lib/axios';

type Session = {
  status: number;
  success: boolean;
  message: string;
  token: string;
  data: {
    user: {
      uuid: string;
      role: string;
      name: string;
      email: string;
      avatar: string;
    };
  };
};

type Role = 'root' | 'admin' | 'staff' | 'parent';

export const useAuth = () => {
  /**
   * 
   * @param param0 
   * @returns 
   */
  const session = async ({
    role,
    email,
    password,
  }: {
    role: Role;
    email: string;
    password: string;
  }) => {
    let result: Session;
    const response = await axiosInstance.post('/api/v1/session', {
      role,
      email,
      password,
    });

    result = response.data;

    if (!result.success) {
      return {
        success: false,
        message: result.message || 'Something went wrong',
      };
    }

    Cookies.set('token', result.token, {
      expires: 7,
    });
    Cookies.set('user', JSON.stringify(result.data.user), {
      expires: 7,
    });

    return {
      success: true,
      message: result.message || 'Login successful',
    };
  };

  
  const profile = () => {
    const token = Cookies.get('token');
    if (!token) {
      return null;
    }
    const user = Cookies.get('user');
    if (!user) {
      return null;
    }
    const parsedUser = JSON.parse(user);
    console.log('Parsed user:', parsedUser);
    return {
      uuid: parsedUser.uuid,
      role: parsedUser.role,
      name: parsedUser.name,
      email: parsedUser.email,
      avatar: parsedUser.avatar,
    };
  }

  const logout = () => {
    Cookies.remove('token');
    Cookies.remove('user');
  };


  return {
    session,
    profile,
    logout,
  };
};
