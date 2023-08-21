import { useMutation } from '@tanstack/react-query';
import { axiosPrivate } from '@/common/libs/axios';
import { ReportPostRequest, ReportPostResponse } from './dto/report-post';

async function reportPost(data: ReportPostRequest) {
  const res = await axiosPrivate.post<ReportPostResponse>(
    '/worry-report',
    data,
  );
  return res.data;
}

export function useReportPost() {
  return useMutation({
    mutationKey: ['report'],
    mutationFn: reportPost,
  });
}
