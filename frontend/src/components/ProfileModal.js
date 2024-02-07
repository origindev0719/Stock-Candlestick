import { Link, useNavigate } from "react-router-dom";
import { icons } from "../assets";
import { useDispatch } from "react-redux";
import { logout } from "../redux/actions/UserActions";

export const ProfileModal = ({ isVisible, onClose, userId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleLogout = async () => {
    await dispatch(logout(navigate))
  }
  return (
    isVisible && (
      <div
        className="fixed top-0 left-0 w-full h-full z-50"
        onClick={onClose}
      >
        <div
          className="absolute bottom-0 left-72 ml-5 w-80 my-10 bg-white rounded-xl shadow-lg z-50 overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex flex-col w-full p-5 overflow-y-auto h-full">
            <Link 
              to={`/profile/${userId}`}
              className="w-full h-14 flex items-center p-2 cursor-pointer justify-between bg-white rounded-xl border border-lightGray mb-2"
            >
              <div className="flex">
                <img src={icons.profile} className="w-4 h-4 mr-1" alt="img" />
                <p className="flex-grow text-neutral-900 text-xs font-semibold leading-normal ml-2">My Profile</p>
              </div>
              <img src={icons.chevronRight} className="w-4 h-4" alt="img" />
            </Link>
            <button className="w-full h-14 flex items-center p-2 justify-between bg-white rounded-xl border border-lightGray mb-2">
              <div className="flex">
                <img src={icons.security} className="w-4 h-4 mr-1" alt="img" />
                <p className="flex-grow text-neutral-900 text-xs font-semibold leading-normal ml-2">Security</p>
              </div>
              <img src={icons.chevronRight} className="w-4 h-4" alt="img" />
            </button>
            <button className="w-full h-14 flex items-center p-2 justify-between bg-white rounded-xl border border-lightGray mb-2">
              <div className="flex">
                <img src={icons.settings} className="w-4 h-4 mr-1" alt="img" />
                <p className="flex-grow text-neutral-900 text-xs font-semibold leading-normal ml-2">Settings</p>
              </div>
              <img src={icons.chevronRight} className="w-4 h-4" alt="img" />
            </button>
            <button className="w-full h-14 flex items-center p-2 justify-between bg-white rounded-xl border border-lightGray">
              <div className="flex">
                <img src={icons.language} className="w-4 h-4 mr-1" alt="img" />
                <p className="flex-grow text-neutral-900 text-xs font-semibold leading-normal ml-2">Language</p>
              </div>
              <img src={icons.chevronRight} className="w-4 h-4" alt="img" />
            </button>

            <button className="w-full h-14 flex items-center p-2 justify-between bg-white rounded-xl border border-lightGray mb-2">
              <div className="flex">
                <img src={icons.profile} className="w-4 h-4 mr-1" alt="img" />
                <p className="flex-grow text-neutral-900 text-xs font-semibold leading-normal ml-2">My Profile</p>
              </div>
              <img src={icons.chevronRight} className="w-4 h-4" alt="img" />
            </button>
            <div className="w-full h-14 flex items-center p-2 justify-between bg-white rounded-xl border border-lightGray mb-2">
              <div className="flex">
                <img src={icons.colorTheme} className="w-4 h-4 mr-1" alt="img" />
                <p className="flex-grow text-neutral-900 text-xs font-semibold leading-normal ml-2">Dark Theme</p>
              </div>
              <img src={icons.chevronRight} className="w-4 h-4" alt="img" />
            </div>
            <button className="w-full h-14 flex items-center p-2 justify-between bg-white rounded-xl border border-lightGray mb-2">
              <div className="flex">
                <img src={icons.bell} className="w-4 h-4 mr-1" alt="img" />
                <p className="flex-grow text-neutral-900 text-xs font-semibold leading-normal ml-2">Notifications</p>
              </div>
              <img src={icons.chevronRight} className="w-4 h-4" alt="img" />
            </button>
            <button className="w-full h-14 flex items-center p-2 justify-between bg-white rounded-xl border border-lightGray">
              <div className="flex">
                <img src={icons.info} className="w-4 h-4 mr-1" alt="img" />
                <p className="flex-grow text-neutral-900 text-xs font-semibold leading-normal ml-2">El Parlay info</p>
              </div>
              <img src={icons.chevronRight} className="w-4 h-4" alt="img" />
            </button>
            <button onClick={handleLogout} className="w-full h-14 flex items-center p-2 justify-between bg-white rounded-xl border border-lightGray">
              <div className="flex">
                <img src={icons.logout} className="w-4 h-4 mr-1" alt="img" />
                <p className="flex-grow text-neutral-900 text-xs font-semibold leading-normal ml-2">Log Out</p>
              </div>
            </button>
            <button className="w-full h-14 flex items-center p-2 justify-between bg-white rounded-xl border border-lightGray">
              <div className="flex">
                <img src={icons.delete} className="w-4 h-4 mr-1" alt="img" />
                <p className="flex-grow text-red text-xs font-semibold leading-normal ml-2">Delete Account</p>
              </div>
            </button>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
      </div>
    )
  );
}
