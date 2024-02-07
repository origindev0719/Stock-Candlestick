import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { icons } from "../assets";
import { getFeedPosts } from '../redux/actions/PostActions';
import { PostForm } from './PostForm';
import { getPostLikes, likePost, unlikePost } from '../redux/actions/LikeActions';
import { CommentsModal } from './CommentsModal';
import { collection, query, where, getDocs } from "firebase/firestore";
import { firestore } from '../firebaseConfig';

export const Feed = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [likesData, setLikesData] = useState({});
  const [isCommentsModalVisible, setIsCommentsModalVisible] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [commentCounts, setCommentCounts] = useState({});
  const pageSize = 5; // Number of posts per page

  const observer = useRef();
  const lastPostElementRef = useCallback(node => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setCurrentPage(prevPageNumber => prevPageNumber + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [hasMore]);

  const dispatch = useDispatch();
  const userDetails = useSelector(state => state.userDetails);
  const { userInfo } = userDetails;

  const feedPosts = useSelector(state => state.feedPosts);
  const { loading, error, posts } = feedPosts;

  useEffect(() => {
    if (userInfo) {
      dispatch(getFeedPosts(userInfo.id, currentPage, pageSize))
        .then((newPosts) => {
          setHasMore(newPosts?.length === pageSize);
          newPosts?.forEach(async post => {
            // Fetch likes
            dispatch(getPostLikes(post._id, userInfo.id))
              .then(data => {
                // Update likes data state
                setLikesData(prevLikesData => ({
                  ...prevLikesData,
                  [post._id]: data
                }));
              });

            // Fetch comment count
            const count = await fetchCommentCount(post._id);
            setCommentCounts(prevCounts => ({
              ...prevCounts,
              [post._id]: count
            }));
          });
        });
    }
  }, [dispatch, userInfo, currentPage]);

  const refreshFeed = () => {
    setCurrentPage(1); // Reset to the first page
    dispatch(getFeedPosts(userInfo.id, 1, pageSize))
      .then((newPosts) => {
        setHasMore(newPosts?.length === pageSize);
        // Optionally scroll to the top of the feed
        window.scrollTo(0, 0);
      })
      .catch(error => {
        // Handle errors here
        console.error('Failed to refresh feed:', error);
      });
  };

  const fetchCommentCount = async (postId) => {
    try {
        // Construct the query
        const commentsQuery = query(
            collection(firestore, 'comments'), 
            where('postId', '==', postId)
        );

        // Execute the query
        const commentsSnapshot = await getDocs(commentsQuery);

        return commentsSnapshot.docs.length; // Return the count of documents in the snapshot
    } catch (error) {
        console.error('Error fetching comment count:', error);
        return 0;
    }
};

  function timeSince(date) {
    const now = new Date();
    const past = new Date(date);
    const diff = now - past;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);

    if (seconds < 60) {
      return `${seconds} sec${seconds > 1 ? 's' : ''} ago`;
    } else if (minutes < 60) {
      return `${minutes} min${minutes > 1 ? 's' : ''} ago`;
    } else if (hours < 24) {
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (days < 7) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else {
      return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    }
  }

  // Function to open comments modal
  const openCommentsModal = (postId) => {
    setSelectedPostId(postId);
    setIsCommentsModalVisible(true);
  };

  // Function to close comments modal
  const closeCommentsModal = () => {
    setIsCommentsModalVisible(false);
    setSelectedPostId(null);
  };

  return (
    <div className="w-full h-52 flex flex-col justify-start items-start gap-2 rounded-lg bg-white shadow">
      <div className="w-full h-12 flex items-center pl-4 py-4 gap-2.5 border-b border-gray-400">
        <span className="text-neutral-900 text-xl font-extrabold">Feed</span>
      </div>
      <div className="w-full flex flex-col gap-3">

        <PostForm userInfo={userInfo} onPostCreated={refreshFeed} />

        {posts?.map((post, index) => {
          const postLikeData = likesData[post._id];
          const isLiked = postLikeData?.isLikedByUser;
          const totalLikes = postLikeData?.totalLikes;

          const handleLikeClick = async (postId) => {
            let isLikedNow = false;
            if (isLiked) {
              await dispatch(unlikePost(postId, userInfo.id));
              isLikedNow = false;
            } else {
              await dispatch(likePost(postId, userInfo.id));
              isLikedNow = true;
            }

            // Update likes data state
            setLikesData(prevLikesData => {
              const currentLikes = prevLikesData[postId]?.totalLikes || 0;
              return {
                ...prevLikesData,
                [postId]: {
                  ...prevLikesData[postId],
                  isLikedByUser: isLikedNow,
                  totalLikes: isLikedNow ? currentLikes + 1 : Math.max(0, currentLikes - 1)
                }
              };
            });
          };

          if (posts.length === index + 1) {
            return (
              <div
                key={index}
                ref={lastPostElementRef}
                className="flex flex-col gap-3 bg-white p-4 border-b border-gray-400 shadow rounded-lg"
              >
                <div className="flex gap-3 w-full">
                  <img 
                    className="w-7 h-7 lg:w-12 lg:h-12 rounded-full shadow" 
                    src={
                      post?.userId?.profileImg ? 
                      post?.userId?.profileImg : 
                      'https://el-parlay-bucket.s3.us-west-1.amazonaws.com/user_images/user_avatar.png'
                    } 
                    alt="profile" 
                  />
                  <div className="flex flex-col justify-start items-start gap-1 w-full">
                    <div className="flex items-center gap-2">
                      <span className="text-neutral-900 text-base font-bold font-['Roboto']">{post?.userId?.name}</span>
                      <span className="text-slate-500 text-base font-normal">{"@" + (post?.userId?.name?.replace(/\s+/g, '') ?? '')}</span>
                      <span className="text-slate-500 text-base font-normal font-['Roboto']">·</span>
                      <span className="text-slate-500 text-base font-normal font-['Roboto']">{timeSince(post?.createdAt)}</span>
                    </div>
                    <p className="text-black font-light font-['Roboto'] leading-tight">{post?.text}</p>
                    <div className='w-auto mt-3'>
                      {post?.image && <img className="w-11/12 h-72 rounded-2xl border border-gray" src={post?.image} alt="post" />}
                    </div>
                    <div className="flex w-full p-4 justify-between items-end">
                      <button
                        onClick={() => openCommentsModal(post._id)}
                        className="flex items-center gap-2"
                      >
                        <img className="icon-size w-5 h-5 object-cover" src={icons.comment} alt="img" />
                        <span className="text-slate-500 text-xs font-normal font-['Roboto']">{commentCounts[post._id] || 0}</span>
                      </button>
                      <button className="flex items-center gap-2">
                        <img className="icon-size w-5 h-5 object-cover" src={icons.retweet} alt="img" />
                        <span className="text-slate-500 text-xs font-normal font-['Roboto']">{post.comments}</span>
                      </button>
                      <button
                        onClick={() => handleLikeClick(post._id)}
                        className="flex items-center gap-2"
                      >
                        <img className="icon-size w-6 h-5 object-cover" src={isLiked ? icons.likeFill : icons.like} alt="img" />
                        <span className="text-slate-500 text-xs font-normal font-['Roboto']">{totalLikes}</span>
                      </button>
                      <button className="flex items-center gap-2">
                        <img className="icon-size w-5 h-5 object-cover" src={icons.share} alt="img" />
                        <span className="text-slate-500 text-xs font-normal font-['Roboto']">{post.comments}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          } else {
            return (
              <div key={index} className="flex flex-col gap-3 bg-white p-4 border-b border-gray-400 shadow rounded-lg">
                <div className="flex gap-3 w-full">
                <img 
                    className="w-7 h-7 lg:w-12 lg:h-12 rounded-full shadow" 
                    src={
                      post?.userId?.profileImg ? 
                      post?.userId?.profileImg : 
                      'https://el-parlay-bucket.s3.us-west-1.amazonaws.com/user_images/user_avatar.png'
                    } 
                    alt="profile" 
                  />
                  <div className="flex flex-col justify-start items-start gap-1 w-full">
                    <div className="flex items-center gap-2">
                      <span className="text-neutral-900 text-base font-bold font-['Roboto']">{post?.userId?.name}</span>
                      <span className="text-slate-500 text-base font-normal">{"@" + (post?.userId?.name?.replace(/\s+/g, '') ?? '')}</span>
                      <span className="text-slate-500 text-base font-normal font-['Roboto']">·</span>
                      <span className="text-slate-500 text-base font-normal font-['Roboto']">{timeSince(post.createdAt)}</span>
                    </div>
                    <p className="text-black font-light font-['Roboto'] leading-tight">{post.text}</p>
                    <div className='w-11/12 mt-3'>
                      {post?.image && <img className="w-full h-auto rounded-2xl border border-gray object-contain" src={post.image} alt="post" />}
                    </div>
                    <div className="flex w-full p-4 justify-between items-end">
                      <button
                        onClick={() => openCommentsModal(post._id)}
                        className="flex items-center gap-2"
                      >
                        <img className="icon-size w-5 h-5 object-cover" src={icons.comment} alt="img" />
                        <span className="text-slate-500 text-xs font-normal font-['Roboto']">{commentCounts[post._id] || null}</span>
                      </button>
                      <button className="flex items-center gap-2">
                        <img className="icon-size w-5 h-5 object-cover" src={icons.retweet} alt="img" />
                        <span className="text-slate-500 text-xs font-normal font-['Roboto']">{post.comments}</span>
                      </button>
                      <button
                        onClick={() => handleLikeClick(post._id)}
                        className="flex items-center gap-2"
                      >
                        <img className="icon-size w-6 h-5 object-cover" src={isLiked ? icons.likeFill : icons.like} alt="img" />
                        <span className="text-slate-500 text-xs font-normal font-['Roboto']">{totalLikes === 0 ? null : totalLikes}</span>
                      </button>
                      <button className="flex items-center gap-2">
                        <img className="icon-size w-5 h-5 object-cover" src={icons.share} alt="img" />
                        <span className="text-slate-500 text-xs font-normal font-['Roboto']">{post.comments}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
        })}
      </div>

      <CommentsModal isVisible={isCommentsModalVisible} onClose={closeCommentsModal} postId={selectedPostId} userInfo={userInfo} />
    </div>
  )
}