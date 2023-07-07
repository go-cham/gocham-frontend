import { useMutation } from '@tanstack/react-query';

import {
  ReportPostRequest,
  ReportPostResponse,
} from '@/apis/dto/posts/report-post';
import { axiosInstance } from '@/libs/axios';

export default function useReportPost() {
  const { mutate, data, isLoading, error, isSuccess } = useMutation({
    mutationKey: ['report'],
    mutationFn: async (data: ReportPostRequest) => {
      const res = await axiosInstance.post<ReportPostResponse>(
        '/worry-report',
        data
      );
      return res.data;
    },
  });

  return {
    reportPost: mutate,
    data,
    isLoading,
    isSuccess,
    error,
  };
}
