import PostUserProfile from "@/components/post/PostUserProfile";
import { PostDetailContent } from "./PostDetail/PostDetail";
import { CommentBoxType } from "./CommentBoxType";
import { calculateAgeFromBirthday } from "@/utils/date/calculateAge";
import commentTime from "@/utils/date/commentTime";
import useDeletePost from "@/apis/hooks/posts/useDeletePost";

interface commentChildrenBoxI{
    content:string;
    parentCommentId:number;
    commentId:number;
    createdAt:string;
    nickName:string;
    birthDate:string;
    isCommentWriter:boolean;
    isWriter?:boolean;
    comment?:boolean;
    setAddChildComment:React.Dispatch<React.SetStateAction<{ addChild: boolean; nestingReplyId: number; nickName: string }>>
}

export default function CommentChildrenBox({
    content,
    parentCommentId,
    commentId,
    createdAt,
    nickName,
    birthDate,
    isCommentWriter,
    isWriter,
    comment,
    setAddChildComment
    }:commentChildrenBoxI){
        const {deletePost,
            data,
            isLoading,
            error,
            isSuccess} = useDeletePost();
        const addCommentClicked = () => {
            setAddChildComment({addChild:true,nestingReplyId:parentCommentId,nickName})
        }
        const commentDeleteClicked = () => {
            deletePost(commentId);
        }
    return (
        <div className="flex flex-col border-b border-custom-background-200 py-[1.3rem]">
            <div className="flex items-center justify-between pr-[2.5rem] pl-[5.5rem]">
                <PostUserProfile
                nickname={nickName}
                age={calculateAgeFromBirthday(birthDate)} 
                color="gray"
                comment={comment}
                isWriter={isWriter}
                />
                {isCommentWriter ? <div onClick={commentDeleteClicked} className="text-body2">삭제</div>
                : <div className="text-body2">신고</div>
            }
            </div>
            <PostDetailContent className="pl-[6rem]" content={content} />
            <div className="pr-[2.5rem] pl-[8.5rem] flex justify-between text-body2 text-custom-text-500">
                <span onClick={(addCommentClicked)}>답글달기</span>
                <span>{commentTime(createdAt)}</span>
            </div>
        </div>
    )
}