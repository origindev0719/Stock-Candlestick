import React, { useEffect, useRef, useState } from 'react';
import { icons } from '../assets';
import { collection, getDocs, query, where, orderBy, onSnapshot, addDoc } from "firebase/firestore";
import { firestore } from '../firebaseConfig';

const Comment = ({ comment, setReplyingToAndFocus, onShowReplies }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  const handleShowReplies = async () => {
    if (!comment.replies) {
      await onShowReplies(comment.id);
    }
    setShowReplies(!showReplies);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const shouldTruncate = comment.text.length > 80;
  const displayedText = isExpanded || !shouldTruncate ? comment.text : `${comment.text.substring(0, 80)}...`;

  return (
    <div key={comment.id} className="flex items-start align-middle gap-3 my-2">
      <img className="w-10 h-10 rounded-full" src={comment.profileImg} alt="User" />
      <div className='flex flex-col items-start'>
        <div className='bg-neutral-900 rounded-lg p-2 shadow-md'>
          <span className="font-semibold text-white">{comment.name}</span>
          <p className='text-white'>{displayedText}</p>
          {shouldTruncate && !isExpanded && (
            <button onClick={toggleExpand} className="text-gray-600 hover:text-gray-800">See More</button>
          )}
        </div>
        <div className='flex mt-1 gap-2'>
          <button onClick={() => setReplyingToAndFocus(comment.id)} className="reply-button text-sm text-gray">
            Reply
          </button>
          {comment.replyCount > 0 && (
            <button onClick={handleShowReplies} className="text-sm text-gray">
              {showReplies ? "Hide" : `See ${comment.replyCount}`} replies
            </button>
          )}
        </div>
        {showReplies && comment.replies && (
          <div className="replies-container">
            {comment.replies.map(reply => (
              <div key={reply.id} className="flex items-start align-middle gap-3 my-2">
                <img className="w-10 h-10 rounded-full" src={reply.profileImg} alt="User" />
                <div className='bg-neutral-900 rounded-lg p-2 shadow-md'>
                  <span className="font-semibold text-white">{reply.name}</span>
                  <p className='text-white'>{reply.text}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export const CommentsModal = ({ isVisible, onClose, postId, userInfo }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);

  const textareaRef = useRef(null);

  useEffect(() => {
    if (!postId) return;

    // Define the query for fetching comments
    const commentsQuery = query(
      collection(firestore, 'comments'),
      where('postId', '==', postId),
      orderBy('createdAt')
    );

    // Subscribe to comments
    const unsubscribe = onSnapshot(commentsQuery, async (snapshot) => {
      const commentsData = await Promise.all(snapshot.docs.map(async (doc) => {
        const commentData = { id: doc.id, ...doc.data() };

        // Fetch the reply count for each comment
        const replyCountSnapshot = await getDocs(collection(firestore, `comments/${doc.id}/replies`));
        return { ...commentData, replyCount: replyCountSnapshot.size };
      }));

      setComments(commentsData);
    });

    return () => unsubscribe();
  }, [postId]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (newComment.trim() === '') return;

    try {
      const commentData = {
        userId: userInfo.id,
        text: newComment,
        profileImg: userInfo.profileImg,
        name: userInfo.name,
        createdAt: new Date(),
      };

      if (replyingTo) {
        // Adding a reply to the comment with ID = replyingTo
        await addDoc(collection(firestore, `comments/${replyingTo}/replies`), commentData);

        // Fetch updated replies for the comment
        const updatedRepliesSnapshot = await getDocs(collection(firestore, `comments/${replyingTo}/replies`), orderBy('createdAt'));
        const updatedReplies = updatedRepliesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // Update the state with the new reply
        setComments(comments => comments.map(comment => 
          comment.id === replyingTo ? { ...comment, replies: updatedReplies } : comment
        ));
      } else {
        // Adding a new comment
        commentData.postId = postId;
        await addDoc(collection(firestore, 'comments'), commentData);
      }

      setNewComment('');
      setReplyingTo(null); // Reset after submitting
    } catch (error) {
      console.error("Error submitting comment/reply: ", error);
    }
  };

  const setReplyingToAndFocus = (commentId) => {
    setReplyingTo(commentId);
    textareaRef.current?.focus(); // Focus the textarea
  };

  const fetchReplies = async (commentId) => {
    const existingComment = comments.find(comment => comment.id === commentId);
    if (existingComment && existingComment.replies) {
      return; // Replies already fetched
    }

    // Logic to fetch replies for a comment
    const repliesQuery = query(collection(firestore, `comments/${commentId}/replies`), orderBy('createdAt'));
    const repliesSnapshot = await getDocs(repliesQuery);
    const replies = repliesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Update the specific comment in the state with fetched replies
    setComments(comments => comments.map(comment =>
      comment.id === commentId ? { ...comment, replies: replies } : comment
    ));
  };

  return (
    isVisible && (
      <div
        className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-xl shadow-lg z-50 overflow-hidden w-3/5 lg:w-1/2 xl:w-2/5"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex flex-col w-full p-5 h-full justify-between">
            <div className='Header h-10 flex items-center justify-center mb-4'>
              <span className='text-lg font-bold'>Post by Andre</span>
            </div>
            <div className='CommentsSection overflow-y-auto h-64 mb-4'>
              {comments ? comments?.map((comment, index) => (
                <Comment
                  key={index}
                  comment={comment}
                  setReplyingToAndFocus={setReplyingToAndFocus}
                  onShowReplies={fetchReplies}
                />
              )) : null}
            </div>
            <div className='InputSection flex gap-3 bg-white'>
              <img className="w-10 h-10 rounded-full" src={userInfo.profileImg} alt="User" />
              <form onSubmit={handleAddComment} className="flex flex-col justify-start flex-grow">
                <textarea
                  ref={textareaRef}
                  name="newComment"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="text-neutral-900 text-md p-2 font-normal leading-normal resize-none mb-3 border-gray"
                  placeholder={replyingTo ? "Write a reply..." : "Add a comment..."}
                />
                <div className="flex-grow h-1/3 flex items-end justify-between">
                  <div className="flex gap-3">
                    {/* Replicating buttons from PostForm */}
                    <button type="button" className="w-9 h-9">
                      <img src={icons.gallery} alt="img" />
                    </button>
                    <button type="button" className="w-9 h-9">
                      <img src={icons.gif} alt="img" />
                    </button>
                    <button type="button" className="w-9 h-9 hidden lg:flex">
                      <img src={icons.stats} alt="img" />
                    </button>
                    <button type="button" className="w-9 h-9">
                      <img src={icons.emoji} alt="img" />
                    </button>
                    <button type="button" className="w-9 h-9 hidden lg:flex">
                      <img src={icons.calendar} alt="img" />
                    </button>
                  </div>
                  <button type="submit" className="h-10 p-2.5 bg-neutral-900 rounded-2xl flex items-center gap-2.5">
                    <span className="text-white text-base font-bold leading-tight">Post Comment</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
      </div>
    )
  );
}