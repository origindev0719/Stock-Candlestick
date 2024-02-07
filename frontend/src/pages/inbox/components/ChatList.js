import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ChatList = ({ chatList, userFriends, userChats, myId, userId }) => {
  const navigate = useNavigate();
  const [selectedChatId, setSelectedChatId] = useState(userId);

  const handleDirectMessage = (userId) => {
    setSelectedChatId(userId);
    navigate(`/inbox?userId=${userId}`);
  };

  const formatTime = (timestamp) => {
    if (timestamp?.toDate) {
      const date = timestamp.toDate();
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
    }
    return '';
  };

  // Find the other participant's information
  const otherParticipant = (userChat) => userChat?.participantsInfo[Object.keys(userChat?.participantsInfo).find(id => id !== myId)];

  // Conditional rendering based on the selected tab
  let listToRender;
  if (chatList === 'Friends') {
    listToRender = userFriends;
  } else if (chatList === 'Favorites') {
    listToRender = userChats;
  } else {
    // Render nothing or a placeholder for the 'Groups' tab
    listToRender = [];
  }

  return (
    <div className="flex flex-col w-full h-full overflow-y-auto">
      {otherParticipant && listToRender.map((user, index) => {
        const userId = chatList === 'Favorites' ? otherParticipant(user).userId : user._id
        const isSelected = userId === selectedChatId;
        return (
        <button 
          onClick={() => handleDirectMessage(userId)} 
          className={`ChatCard flex w-full flex-row justify-between p-2 mt-2 ${isSelected ? 'bg-yellow-300 bg-opacity-20' : ''}`} 
          key={index}
        >
          <div className="flex flex-row gap-3">
            <img className="w-14 h-14 rounded-full" src={chatList === 'Favorites' ? otherParticipant(user).profileImg : user.profileImg} alt="Profile" />
            <div className="flex-grow flex flex-col justify-center items-start gap-4">
              <span className={`text-slate-900 text-base leading-normal ${isSelected ? 'font-bold' : 'font-medium'}`}>
                {chatList === 'Favorites' ? otherParticipant(user).name : user.name}
              </span>
              <span className={`text-xs font-normal leading-none ${isSelected ? 'text-slate-500' : 'text-slate-900'}`}>
                {user?.lastMessage ? user.lastMessage : ''}
              </span>
            </div>
          </div>
          <div className=" flex-grow flex flex-col justify-center items-end gap-4">
            <span className="text-right text-gray text-xs font-normal leading-none mr-2">
              {user.lastMessageDate ? formatTime(user.lastMessageDate) : ''}
            </span>
            <div className="w-6 h-6"></div>
          </div>
        </button>
      )})}
    </div>
  )
}