import { useMutation } from '@tanstack/react-query';

import {
  ReportCommentRequest,
  ReportCommentResponse,
} from '@/apis/dto/posts/report-comment';
import { axiosInstance } from '@/libs/axios';

export default function userReportComment() {
  const { mutate, data, isLoading, error, isSuccess } = useMutation({
    mutationKey: ['reportComment'],
    mutationFn: async (data: ReportCommentRequest) => {
      const res = await axiosInstance.post<ReportCommentResponse>(
        '/worry-reply-report',
        data
      );
      return res.data;
    },
  });

  return {
    reportComment: mutate,
    data,
    isLoading,
    isSuccess,
    error,
  };
}
