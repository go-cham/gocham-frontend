import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import useDeletePost from '@/apis/hooks/posts/useDeletePost';
import useGetComments from '@/apis/hooks/posts/useGetComments';
import useGetPost from '@/apis/hooks/posts/useGetPost';
import useUser from '@/apis/hooks/users/useUser';
import MoreIcon from '@/components/icons/MoreIcon';
import TopAppBar from '@/components/layout/TopAppBar';
import PostUserProfile from '@/components/post/PostUserProfile';
import Dropdown from '@/components/ui/Dropdown';
import Popup from '@/components/ui/modal/Popup/Popup';
import { PostDetailContent } from '@/pages/feed/PostDetail/PostDetail';
import { calculateAgeFromBirthday } from '@/utils/date/calculateAge';

import CommentBox from './CommentBox';
import CommentInputWrapper from './CommentInputWrapper';

export default function FeedCommentPage() {
  const [showMore, setShowMore] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const handleClickMore = () => setShowMore((prev) => !prev);
  const { id } = useParams();
  const navigate = useNavigate();
  const { comments } = useGetComments(Number(id));
  const { post, error } = useGetPost(Number(id));
  const { user } = useUser();
  const age = post ? calculateAgeFromBirthday(post?.user.birthDate) : -1;
  const [addChildComment, setAddChildComment] = useState({
    addChild: false,
    nestingReplyId: -1,
    nickName: '',
    mentionUserId: -1,
  });
  const { deletePost, error: deletePostError, isSuccess } = useDeletePost();
  const dropdownSelected = (value: number) => {
    if (value == MENU.Delete) setDeleteModalOpen(true);
  };
  const handleDeletePost = () => {
    if (post) deletePost(post.id);
  };
  enum MENU {
    Edit,
    Delete,
    Report,
  }
  useEffect(() => {
    if (isSuccess) {
      alert('게시물이 정상적으로 삭제되었습니다.');
      setDeleteModalOpen(false);
      navigate(-1);
    }
    if (deletePostError) {
      alert('오류가 발생하였습니다.');
    }
    setShowMore(false);
  }, [error, isSuccess]);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      // 클릭 이벤트가 Dropdown 내부가 아닌 경우 Dropdown 닫기
      setShowMore(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside); // 외부 클릭 이벤트 감지
    return () => {
      document.removeEventListener('click', handleClickOutside); // 컴포넌트 언마운트 시 이벤트 핸들러 해제
    };
  }, []);

  if (!post || !user) {
    return null;
  }

  return (
    <div className="flex h-full flex-col">
      <TopAppBar title="댓글" navigateRoute="/" />
      <div className="flex flex-col border-b border-background-dividerLine-300 pb-[1.9rem] pt-[2.1rem]">
        <div className="flex items-center justify-between px-[2.5rem]">
          <PostUserProfile
            nickname={post.user.nickname}
            age={age}
            color="gray"
          />
          <div className="relative" ref={dropdownRef}>
            <MoreIcon className="cursor-pointer" onClick={handleClickMore} />
            {showMore && (
              <Dropdown
                options={
                  user.id === post.user.id
                    ? [
                        { value: MENU.Edit, label: '게시물 수정' },
                        { value: MENU.Delete, label: '게시물 삭제' },
                      ]
                    : [{ value: MENU.Report, label: '게시물 신고' }]
                }
                onSelect={dropdownSelected}
                className="right-0 top-[2.9rem] mt-0"
              />
            )}
          </div>
        </div>
        <PostDetailContent title={post.title} content={post.content} />
        <div className="flex space-x-[1.3rem] px-[2.5rem]">
          {post?.worryFiles &&
            post.worryFiles.map((image) => (
              <img
                key={image.url}
                src={image.url}
                alt={'업로드 이미지'}
                className="h-[7.1rem] w-[7.1rem] rounded-[0.5rem] object-cover"
              />
            ))}
        </div>
      </div>
      <div className="hide-scrollbar flex flex-1 flex-col divide-y-[1px] divide-background-dividerLine-300 overflow-y-scroll pt-[0.5rem]">
        {comments?.map((comment) => (
          <div key={comment.id}>
            <CommentBox
              key={comment.id}
              className1="pl-[5.5rem] pr-[2.5rem]"
              comment={comment}
              postId={post.id}
              isWriter={comment.user.id === post.user.id}
              isCommentWriter={comment.user.id === user.id}
              setAddChildComment={setAddChildComment}
            />
            {comment.childReplies.length > 0 &&
              comment.childReplies.map((childComment) => (
                <CommentBox
                  key={childComment.id}
                  className="pl-[5.5rem]"
                  className1="pl-[8.5rem] pr-[2.5rem]"
                  mentionUser={childComment.mentionUser}
                  comment={childComment}
                  postId={post ? post.id : -1}
                  parentCommentId={comment.id}
                  isWriter={childComment.user.id === post?.user.id}
                  isCommentWriter={childComment.user.id === user.id}
                  setAddChildComment={setAddChildComment}
                />
              ))}
          </div>
        ))}
      </div>
      <CommentInputWrapper
        userId={user ? user.id : NaN}
        worryId={post ? post.id : NaN}
        setAddChildComment={setAddChildComment}
        addChildComment={addChildComment}
      />
      <Popup
        isOpen={deleteModalOpen}
        text="게시물을 삭제하시겠습니까?"
        subText="이 작업은 실행 취소할 수 없습니다."
        buttonLabel="게시물 삭제"
        onCancel={() => setDeleteModalOpen(false)}
        onClickButton={handleDeletePost}
      />
    </div>
  );
}
