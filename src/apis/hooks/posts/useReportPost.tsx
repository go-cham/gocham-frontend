import { useMutation } from '@tanstack/react-query';

import {
  ReportPostRequest,
  ReportPostResponse,
} from '@/apis/dto/posts/report-post';
import { axiosInstance } from '@/libs/axios';

async function reportPost(data: ReportPostRequest) {
  const res = await axiosInstance.post<ReportPostResponse>(
    '/worry-report',
    data,
  );
  return res.data;
}

export default function useReportPost() {
  return useMutation({
    mutationKey: ['report'],
    mutationFn: reportPost,
  });
}
