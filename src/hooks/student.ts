import { axiosInstance } from '@/lib/axios';

export const useStudent = () => {
  const index = async () => {
    const response = await axiosInstance.get('/api/v1/student/index');
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

  const create = async (studentData: any) => {
    const response = await axiosInstance.post('/api/v1/student/create', {
      name: studentData.name,
      reg_number: studentData.reg_number,
      parent_uuid: studentData.parent_uuid,
      class_uuid: studentData.class_uuid,
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
