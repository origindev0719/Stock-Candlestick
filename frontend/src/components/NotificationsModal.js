export const NotificationsModal = ({ isVisible, onClose }) => {
  return (
    isVisible && (
      <div
        className="fixed top-0 left-0 w-full h-full z-50"
        onClick={onClose}
      >
        <div
          className="absolute bottom-0 left-72 ml-5 w-80 my-10 h-5/6 bg-white rounded-xl shadow-lg z-50 overflow-hidden"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex flex-col w-full py-5 overflow-y-auto h-full">
            {Array(6).fill().map((_, index) => (
              <div className="flex flex-col" key={index}>
                <p className="text-zinc-500 text-xs font-semibold leading-none ml-3 mb-2">06/01/23 1:23pm</p>
                <div className="flex flex-col justify-start items-start m-3 p-3 mt-0 bg-lightGray rounded-xl">
                  <h6 className="text-neutral-900 text-sm font-semibold leading-tight mb-2">Placeholder Notification</h6>
                  <p className="text-zinc-500 text-xs font-medium leading-tight">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
      </div>
    )
  );
}
