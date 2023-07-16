import { AddCommentsRequest, AddCommentsResponse } from "@/apis/dto/posts/add-comments";
import useAddComment from "@/apis/hooks/posts/useAddComment";
import PlusIcon from "@/components/icons/PlusIcon";
import { SetStateAction } from "jotai";
import React, { Dispatch, useEffect, useRef, useState } from "react";

interface addCommentI{
    addChildComment: { addChild: boolean; nestingReplyId: number; nickName:string };
    setAddChildComment: React.Dispatch<React.SetStateAction<{ addChild: boolean; nestingReplyId: number; nickName:string }>>
    userId: number ;
    worryId: number ;
}

export default function CommentInputWrapper({setAddChildComment,addChildComment, userId, worryId}:addCommentI){
    const [content,setContent] = useState('');
    const commentInputted = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(!content.includes(`@${addChildComment.nickName}`)){
            setAddChildComment({addChild:false, nestingReplyId:-1,nickName:''})
        }
        setContent(e.target.value);
    }
    const commentInputRef=useRef<HTMLInputElement>(null);
    const {addComment, isLoading, error, data} = useAddComment();
    const addCommentClicked = () => {
        setContent('');
        if(addChildComment.addChild){
            addComment({content, userId, worryId, nestingReplyId:addChildComment.nestingReplyId})
        }
        else{
            addComment({content, userId, worryId, nestingReplyId:null})
        }
    }
    useEffect(() => {
        if(addChildComment.addChild)
            setContent(prev => `@${addChildComment.nickName} ${prev}`)
            commentInputRef.current?.focus();
    },[addChildComment])
    return (
        <div className="fixed bottom-0 px-4 pb-10 pt-4 w-full flex justify-around items-center bg-white border-t border-gray-300 shadow-lg">
            <input 
                ref={commentInputRef}
                className="focus:border-black pl-4 py-4 w-5/6 rounded-lg border border-gray-300 font-red text-[1.4rem]"
                placeholder="의견을 자유롭게 작성해 주세요."
                onChange={commentInputted}
                value={content}
            />
            <div 
            onClick={addCommentClicked}
            className="w-[3.6rem] h-[3.6rem] rounded-full flex justify-center items-center bg-gray-300">
                <PlusIcon />
            </div>
        </div>
    )
}