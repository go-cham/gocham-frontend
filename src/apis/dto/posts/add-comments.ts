export interface AddCommentsRequest {
  content: string;
  userId: number;
  worryId: number;
  nestingReplyId:number | null;
}

export interface AddCommentsResponse {
  id:number;
  status:number;
  createdAt:number;
  updatedAt:number;
  etc:string;
  content:string;
}
