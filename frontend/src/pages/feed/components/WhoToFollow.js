import { useDispatch, useSelector } from "react-redux";
import { getSuggestedUsers } from "../../../redux/actions/UserActions";
import { useEffect } from "react";
import { followTarget } from "../../../redux/actions/FollowsActions";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../../components/LoadingComponent";

export const WhoToFollow = () => {
  const userInfo = localStorage.getItem('userInfo') 
    ? JSON.parse(localStorage.getItem('userInfo')) 
    : null;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const suggestedUsers = useSelector(state => state.suggestedUsers);
  const { loading, error, users } = suggestedUsers;

  useEffect(() => {
    dispatch(getSuggestedUsers(userInfo?.id));
  }, [dispatch, userInfo?.id]);

  const handleFollow = async (followedId) => {
    try {
      await dispatch(followTarget(userInfo?.id, followedId));
      dispatch(getSuggestedUsers(userInfo?.id)); // Refresh the suggested users list
    } catch (error) {
      console.error("Error following user:", error);
    }
  }

  return users ? (
      <div className="flex flex-col items-start bg-white w-full mb-6">
      <div className="flex justify-start items-center rounded-t-lg w-full h-12 px-4 py-3 bg-neutral-900">
        <div className="text-white text-xl font-extrabold leading-normal">Who to follow</div>
      </div>

      <div className="w-full flex flex-col bg-white space-y-4"> {/* Added space-y-4 for spacing between child divs */}
        {loading ? (
          <Loading />
        ) : error ? (
          <div>{error}</div>
        ) : (
          users.map(user => (
            <div key={user._id} className="w-full h-16 px-4 py-3 bg-white rounded-b-lg shadow flex items-center justify-between">
              <div onClick={() => navigate(`/profile/${user._id}`)} className="flex items-start gap-2 w-3/4 justify-start cursor-pointer">
                <img className="w-12 h-12 rounded-full shadow" src="https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png" alt="Round placeholder" />
                <div className="flex flex-col w-3/4">
                  <p className="text-neutral-900 text-base font-bold truncate">{user.name}</p>
                  <p className="text-zinc-500 text-xs font-normal leading-none truncate">@{user.name}</p>
                </div>
              </div>
              <button
                className="w-24 h-8 flex items-center justify-center p-2.5 rounded-2xl border border-neutral-900"
                onClick={() => handleFollow(user._id)}
              >
                <p className="text-neutral-900 text-base font-bold leading-tight">Follow</p>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
    ) : null
}
