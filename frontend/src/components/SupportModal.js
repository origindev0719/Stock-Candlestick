import { icons } from "../assets";

export const SupportModal = ({ isVisible, onClose }) => {
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
            <h3 className="text-neutral-900 text-lg font-semibold mb-2">Support</h3>
            <div className="w-full h-14 flex items-center bg-white rounded-xl border border-lightGray mb-2">
              <p className="flex-grow text-neutral-900 text-xs font-semibold leading-normal ml-4">Help Center</p>
              <img src={icons.chevronRight} className="w-4 h-4 mr-4" alt="img"/>
            </div>
            <div className="w-full h-14 flex items-center bg-white rounded-xl border border-lightGray mb-2">
              <p className="flex-grow text-neutral-900 text-xs font-semibold leading-normal ml-4">Terms of Service</p>
              <img src={icons.chevronRight} className="w-4 h-4 mr-4" alt="img"/>
            </div>
            <div className="w-full h-14 flex items-center bg-white rounded-xl border border-lightGray mb-2">
              <p className="flex-grow text-neutral-900 text-xs font-semibold leading-normal ml-4">Privacy Policy</p>
              <img src={icons.chevronRight} className="w-4 h-4 mr-4" alt="img"/>
            </div>
            <div className="w-full h-14 flex items-center bg-white rounded-xl border border-lightGray">
              <p className="flex-grow text-neutral-900 text-xs font-semibold leading-normal ml-4">Feedback</p>
              <img src={icons.chevronRight} className="w-4 h-4 mr-4" alt="img"/>
            </div>

            <h3 className="text-neutral-900 text-lg font-semibold my-2">Socials</h3>
            <div className="w-full h-14 flex items-center bg-white rounded-xl border border-lightGray mb-2">
              <p className="flex-grow text-neutral-900 text-xs font-semibold leading-normal ml-4">Follow our Twitter</p>
              <img src={icons.chevronRight} className="w-4 h-4 mr-4" alt="img"/>
            </div>
            <div className="w-full h-14 flex items-center bg-white rounded-xl border border-lightGray mb-2">
              <p className="flex-grow text-neutral-900 text-xs font-semibold leading-normal ml-4">Follow our Instagram</p>
              <img src={icons.chevronRight} className="w-4 h-4 mr-4" alt="img"/>
            </div>
            <div className="w-full h-14 flex items-center bg-white rounded-xl border border-lightGray mb-2">
              <p className="flex-grow text-neutral-900 text-xs font-semibold leading-normal ml-4">Follow our TikTok</p>
              <img src={icons.chevronRight} className="w-4 h-4 mr-4" alt="img"/>
            </div>
            <div className="w-full h-14 flex items-center bg-white rounded-xl border border-lightGray">
              <p className="flex-grow text-neutral-900 text-xs font-semibold leading-normal ml-4">Follow our Facebook</p>
              <img src={icons.chevronRight} className="w-4 h-4 mr-4" alt="img"/>
            </div>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
      </div>
    )
  );
}
