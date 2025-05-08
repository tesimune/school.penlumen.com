import { axiosInstance } from "@/lib/axios";

export const useBranch = () => {
  const index = async () => {
    const response = await axiosInstance.get("/api/v1/branches");
    const data = response.data;

    if (!data.success || !data.data) {
      return {
        success: false,
        message: data.message || "Something went wrong",
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
  };
};
