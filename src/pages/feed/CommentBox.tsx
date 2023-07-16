import PostUserProfile from "@/components/post/PostUserProfile";
import { CommentBoxType } from "./CommentBoxType";
import { PostDetailContent } from "./PostDetail/PostDetail";
import commentTime from "@/utils/date/commentTime";
import useDeletePost from "@/apis/hooks/posts/useDeletePost";

export default function CommentBox({
    commentId,
    content,
    nickName,
    comment,
    voteContent,
    createdAt,
    isWriter,
    isCommentWriter,
    setAddChildComment
}:CommentBoxType){
    const {deletePost,
        data,
        isLoading,
        error,
        isSuccess} = useDeletePost();
    const addCommentClicked = () => {
        setAddChildComment({addChild:true,nestingReplyId:commentId,nickName})
    }
    const commentDeleteClicked = () => {
        deletePost(commentId);
    }
    return (
        <div className="flex flex-col border-b border-custom-background-200 py-[1.3rem]">
            <div className="flex items-center justify-between px-[2.5rem]">
                <PostUserProfile
                nickname={nickName}
                age={20} 
                color="gray"
                comment={comment}
                isWriter={isWriter}
                voteContent={voteContent}
                />
                {isCommentWriter ? <div onClick={commentDeleteClicked} className="text-body2">삭제</div>
                : <div className="text-body2">신고</div>
            }
            </div>
            <PostDetailContent className="pl-[3rem]" content={content} />
            <div className="pr-[2.5rem] pl-[5.5rem] flex justify-between text-body2 text-custom-text-500">
                <span onClick={(addCommentClicked)}>답글달기</span>
                <span>{commentTime(createdAt)}</span>
            </div>
        </div>
    )
}