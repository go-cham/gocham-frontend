import { useMutation } from '@tanstack/react-query';

import {
  ReportCommentRequest,
  ReportCommentResponse,
} from '@/apis/dto/posts/report-comment';
import { axiosInstance } from '@/libs/axios';

async function reportComment(data: ReportCommentRequest) {
  const res = await axiosInstance.post<ReportCommentResponse>(
    '/worry-reply-report',
    data,
  );
  return res.data;
}

export default function useReportComment() {
  return useMutation({
    mutationKey: ['reportComment'],
    mutationFn: reportComment,
  });
}
