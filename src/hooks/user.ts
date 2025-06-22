import { axiosInstance } from '@/lib/axios';

export const useUser = () => {
  const index = async (role: string) => {
    const response = await axiosInstance.get(
      `/api/v1/user/index?role=${role.toUpperCase()}`
    );
    const data = response.data;

    if (!data.success || !data.data) {
      return {
        success: false,
        message: data.message || 'Something went wrong',
      };
    } else {
      return {
        success: true,
        data: data.data,
      };
    }
  };

  const create = async (user_uuid: string) => {
    const response = await axiosInstance.post('/api/v1/user/create', {
      user_uuid,
    });
    const data = response.data;

    if (!data.success || !data.data) {
      return {
        success: false,
        message: data.message || 'Something went wrong',
      };
    } else {
      return {
        success: true,
        data: data.data,
      };
    }
  };

  const register = async (userData: any) => {
    const response = await axiosInstance.post('/api/v1/register', {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      contact: userData.contact,
      alt_contact: userData.alt_contact,
      position: userData.position,
      address: userData.address,
      role: userData.role,
    });
    const data = response.data;

    if (!data.success || !data.data) {
      return {
        success: false,
        message: data.message || 'Something went wrong',
        data: data.data,
      };
    } else {
      return {
        success: true,
        data: data.data,
      };
    }
  };

  return {
    index,
    create,
    register,
  };
};
