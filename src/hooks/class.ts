import { axiosInstance } from '@/lib/axios';

export const useClass = () => {
  const index = async () => {
    const response = await axiosInstance.get('/api/v1/class/index');
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

  const create = async (classData: any) => {
    const response = await axiosInstance.post('/api/v1/class/create', {
      name: classData.name,
      capacity: classData.capacity,
      teacher_uuid: classData.teacher_uuid,
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

  return {
    index,
    create,
  };
};
