import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '@/common/libs/axios';
import {
  ReportCommentRequest,
  ReportCommentResponse,
} from './dto/report-comment';

async function reportComment(data: ReportCommentRequest) {
  const res = await axiosInstance.post<ReportCommentResponse>(
    '/worry-reply-report',
    data,
  );
  return res.data;
}

export function useReportComment() {
  return useMutation({
    mutationKey: ['reportComment'],
    mutationFn: reportComment,
  });
}
