import MoreIcon from "@/components/icons/MoreIcon";
import TopAppBar from "@/components/layout/TopAppBar";
import PostUserProfile from "@/components/post/PostUserProfile";
import Dropdown from "@/components/ui/Dropdown";
import { useState } from "react";
import { PostDetailContent } from "./PostDetail/PostDetail";
import CommentBox from "./CommentBox";
import { useParams } from "react-router-dom";
import useGetComments from "@/apis/hooks/posts/useGetComments";
import CommentChildrenBox from "./CommentChildrenBox";
import CommentInputWrapper from "./CommentInputWrapper";
import useGetPost from "@/apis/hooks/posts/useGetPost";
import useUser from "@/apis/hooks/users/useUser";
import { calculateAgeFromBirthday } from "@/utils/date/calculateAge";

export default function FeedCommentPage(){
    const [showMore, setShowMore] = useState(false);
    const handleClickMore = () => [
        setShowMore(prev => !prev)
    ]
    const {id} = useParams();
    const {comments, isLoading:commentsLoading, error:commentsError} = useGetComments(Number(id));
    const {post, isLoading, error} = useGetPost(Number(id));
    const {user, isLoading:useUserLoading, error:useUserError, status}=useUser();
    const age=post ? calculateAgeFromBirthday(post?.user.birthDate) : -1; 
    const [addChildComment, setAddChildComment] = useState({addChild:false, nestingReplyId:-1,nickName:''});
    return (
        <>
        <TopAppBar
            title="댓글"
            background={'white'}
        />
        <div className="flex flex-col border-b border-custom-background-200 py-[1.3rem] border-b-custom-gray-300">
            <div className="flex items-center justify-between px-[2.5rem]">
                <PostUserProfile
                nickname={post ? post.user.nickname : ""}
                age={age} 
                color="gray"
                />
                <div className="relative">
                    <MoreIcon className="cursor-pointer" onClick={handleClickMore} />
                    {showMore && (
                        <Dropdown
                            options={user?.id === post?.user.id ? 
                              [{value:0, label:"게시물 수정"},{value:1, label:"게시물 삭제"}] 
                              :
                              [{value:0, label:"게시물 신고"}] 
                            }
                            className="right-0 top-[2.9rem] mt-0"
                        />
                    )}
                </div>
            </div>
            <PostDetailContent
                title={post?.title}
                content={post?.content}
            />
            <div className="flex w-full px-[2.5rem]">
              <div
                className="relative mr-[1rem] flex"
              >
                {post?.worryFiles && post.worryFiles.map(image => <img
                  key={image.url}
                  src={image.url}
                  alt={'업로드 이미지'}
                  className="object-cover mr-[1rem] w-[7.1rem] h-[7.1rem]"
                />)}
              </div>
            </div>
        </div>
        <div className="overflow-y-scroll h-4/6 py-[0.5rem]">
          {comments?.map(comment => {
            return user?.id === post?.user.id ? <><CommentBox 
            key={comment.id}
            commentId={comment.id}
            nickName={comment.user.nickname}
            content={comment.content} 
            voteContent={comment.user.worryChoice ? comment.user.worryChoice.label : null}
            isWriter={true}
            createdAt={comment.createdAt}
            isCommentWriter={comment.user.id === user?.id ? true : false}
            setAddChildComment={setAddChildComment}
             />{comment.childReplies.length>0 && comment.childReplies.map(childComment => (
                <CommentChildrenBox 
                  key={childComment.id} 
                  parentCommentId={comment.id}
                  commentId={childComment.id}
                  content={childComment.content} 
                  createdAt={childComment.createdAt}
                  nickName={childComment.user.nickname}
                  birthDate={childComment.user.birthDate}
                  isCommentWriter={childComment.user.id === user?.id ? true : false}
                  isWriter={true}
                  setAddChildComment={setAddChildComment}
                />
            ))}
          </> : <><CommentBox
            key={comment.id}
            commentId={comment.id}
            nickName={comment.user.nickname}
            content={comment.content}
            voteContent={comment.user.worryChoice ? comment.user.worryChoice.label : null}
            comment={true}
            createdAt={comment.createdAt}
            isCommentWriter={comment.user.id === user?.id ? true : false}
            setAddChildComment={setAddChildComment}
             />{comment.childReplies.length>0 && comment.childReplies.map(childComment => (
              <CommentChildrenBox 
                key={childComment.id} 
                parentCommentId={comment.id}
                commentId={childComment.id}
                content={childComment.content} 
                createdAt={childComment.createdAt}
                nickName={childComment.user.nickname}
                birthDate={childComment.user.birthDate}
                isCommentWriter={childComment.user.id === user?.id ? true : false}
                comment={true}
                setAddChildComment={setAddChildComment}
              />
          ))};
             </>
          })}
        </div>
        <CommentInputWrapper 
        userId={user ? user.id : NaN} 
        worryId={post ? post.id : NaN} 
        setAddChildComment={setAddChildComment}
        addChildComment={addChildComment}
        />
      </>
    )
}