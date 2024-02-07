import { Navigate, useLocation, useParams } from "react-router-dom";
import { ProfileView } from "./ProfileView"
import { getUserDetails } from "../../redux/actions/UserActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { amIFollowing, followTarget, getTargetFollowers, unfollowTarget } from "../../redux/actions/FollowsActions";
import { Loading } from "../../components/LoadingComponent";

export const ProfilePage = () => {
  const { id: userId } = useParams();
  const dispatch = useDispatch()
  const location = useLocation();

  const userDetails = useSelector(state => state.userDetails.userInfo);
  const followers = useSelector(state => state.getTargetFollowers);

  const [isFollowing, setIsFollowing] = useState(false);

  const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

  useEffect(() => {
    dispatch(getUserDetails(userId));
    dispatch(getTargetFollowers(userId));
  }, [userId, dispatch, isFollowing]);

  useEffect(() => {
    if (userDetails?.id !== userInfoFromStorage?.id) {
      dispatch(amIFollowing(userInfoFromStorage?.id, userDetails?.id)).then((response) => {
        setIsFollowing(response.amIFollowing);
      });
    }
  }, [userDetails?.id, userInfoFromStorage?.id, dispatch, isFollowing]);

  const token = window.localStorage.getItem("userInfo");

  if (!token) {
    return <Navigate to="/" />;
  }

  const handleFollow = async () => {
    try {
      await dispatch(followTarget(userInfoFromStorage?.id, userDetails?.id));
      setIsFollowing(true);
    } catch (error) {
      console.error("Error following user:", error);
    }
  }

  const handleUnfollow = async () => {
    try {
      await dispatch(unfollowTarget(userInfoFromStorage?.id, userDetails?.id));
      setIsFollowing(false);
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  }

  return userDetails ? (
    <ProfileView
      userDetails={userDetails}
      followers={followers}
      myId={userInfoFromStorage.id}
      isFollowing={isFollowing}
      follow={handleFollow}
      unfollow={handleUnfollow}
    />
  ) : (
    <div className="content h-screen w-screen flex items-center justify-center bg-white animate-bg">
      <Loading />
    </div>
  )
}