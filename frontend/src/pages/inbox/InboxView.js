import { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar"
import { Sidebar } from "../../components/Sidebar"
import { Chat } from "./components/Chat";
import { ChatList } from "./components/ChatList";
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { firestore } from "../../firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../redux/actions/UserActions";
import { getUserFriends } from "../../redux/actions/FollowsActions";
import { icons } from "../../assets";
import { BottomBar } from "../../components/BottomBar";

export const InboxView = ({ userId, myId, user }) => {
  const [currentChatId, setCurrentChatId] = useState(null);
  const [currentChatData, setCurrentChatData] = useState(null);
  const [chatList, setChatList] = useState('Favorites')
  const [userDetailsFetched, setUserDetailsFetched] = useState(false);
  const [userFriends, setUserFriends] = useState([]);
  const [userChats, setUserChats] = useState([]);
  const [isUserIdPresent, setIsUserIdPresent] = useState(Boolean(userId));

  const dispatch = useDispatch()

  const userDetails = useSelector(state => state.userDetails);
  const { userInfo } = userDetails;

  useEffect(() => {
    setIsUserIdPresent(Boolean(userId));
    if (userId) {
      dispatch(getUserDetails(userId));
    }
  }, [userId, dispatch]);

  useEffect(() => {
    if (userInfo && userInfo.id === userId) {
      setUserDetailsFetched(true);
    }
  }, [userInfo, userId]);

  useEffect(() => {
    const fetchMyChats = async () => {
      const chats = await fetchChats(myId);
      setUserChats(chats);
    };

    fetchMyChats();
  }, [myId]); // Triggered when myId changes


  const updateUserChatsAndOpenChat = async () => {
    const chats = await fetchChats(myId);
    setUserChats(chats);
    openOrCreateChat(chats);
  };
  
  useEffect(() => {
    if (userDetailsFetched && userId && userId !== myId) {
      updateUserChatsAndOpenChat();
    }
  }, [userId, userDetailsFetched, myId]); // Triggered when userId, userDetailsFetched, or userChats change


  // Fetch user friends when component mounts
  useEffect(() => {
    dispatch(getUserFriends(myId))
      .then((response) => {
        // Assuming the action returns a promise with the user friends data
        setUserFriends(response);
      })
      .catch((error) => {
        console.error("Error fetching user friends: ", error);
      });
  }, [dispatch, myId]);

  const openOrCreateChat = async () => {
    if (!userId || !userDetailsFetched || userId === myId) {
      return;
    }
    const existingChat = userChats.find(chat =>
      chat.participants.includes(userId) && chat.participants.includes(myId)
    );

    if (existingChat) {
      setCurrentChatId(existingChat.id);
      setCurrentChatData(existingChat);
    } else {
      // Only create a new chat if existingChat is not found
      await createNewChat(userId);
    }
  };

  const createNewChat = async (participantId) => {
    if (participantId === myId) {
      console.log("Cannot create chat with oneself");
      return;
    }
  
    // Double-check if chat already exists to prevent duplication
    const updatedChats = await fetchChats(myId);
    const chatAlreadyExists = updatedChats.some(chat => 
      chat.participants.includes(participantId) && chat.participants.includes(myId)
    );
  
    if (chatAlreadyExists) {
      console.log("Chat already exists with this user");
      const existingChat = updatedChats.find(chat => 
        chat.participants.includes(userId) && chat.participants.includes(myId)
      );
      setCurrentChatId(existingChat.id);
      setCurrentChatData(existingChat);
      return;
    }

    try {
      const participantsInfo = {
        [participantId]: {
          userId: userInfo.id,
          profileImg: userInfo.profileImg,
          name: userInfo.name,
        },
        [myId]: {
          userId: user.id,
          profileImg: user.profileImg,
          name: user.name,
        }
      };

      const chatData = {
        participants: [myId, participantId],
        participantsInfo: participantsInfo,
        createdAt: new Date(),
      };
      await addDoc(collection(firestore, 'chats'), chatData);
      // Construct the chat data object for currentChatData
      const chats = await fetchChats(myId);
      setUserChats(chats);
      const existingChat = await userChats.find(chat => chat.participants.includes(userId));
      setCurrentChatId(existingChat?.id);
      setCurrentChatData(existingChat);
    } catch (error) {
      console.error("Error creating new chat: ", error);
    }
  };

  const fetchChats = async (myId) => {
    const chatsRef = collection(firestore, 'chats');
    const q = query(chatsRef, where('participants', 'array-contains', myId));
    const querySnapshot = await getDocs(q);
    const chats = [];
    querySnapshot.forEach((doc) => {
      chats.push({ id: doc.id, ...doc.data() });
    });
    return chats;
  };

  const updateChatData = (chatId, lastMessage, lastMessageTime, lastMessageSenderId) => {
    setUserChats(prevChats =>
      prevChats.map(chat =>
        chat.id === chatId
          ? { ...chat, lastMessage, lastMessageDate: lastMessageTime, lastMessageSenderId }
          : chat
      )
    );
  };

  const handleChatList = (list) => {
    setChatList(list)
  }

  return (
    <div className="w-screen h-screen bg-neutral-50 flex flex-row overflow-hidden">
      <Sidebar />
      <div className="w-full flex flex-col flex-grow sm:justify-center overflow-y-hidden overflow-x-hidden">
        <div className="sticky top-0 z-10 bg-white">
          <Navbar title='Inbox' />
        </div>
        <div className="w-11/12 flex md:h-full justify-center flex-row ml-2 sm:mt-10 sm:ml-10">
          <div className={`w-full md:flex md:w-2/5 xl:w-1/4 ${isUserIdPresent && currentChatId ? 'hidden' : 'flex'} flex-col items-start overflow-hidden h-full gap-10`}>
            <div className="flex flex-col justify-start items-start gap-6 w-full">
              <div className="flex items-center w-full justify-start gap-2.5 px-4 py-3 bg-white rounded-3xl border border-slate-300">
                <div className="flex-grow text-slate-400 text-base font-normal leading-normal">Search or start a new chat</div>
              </div>
              <div className="w-full h-10 flex flex-row justify-start items-start gap-2.5">
                <button
                  onClick={() => handleChatList('Favorites')}
                  className={`flex-grow flex items-center justify-center px-4 py-3 ${chatList === 'Favorites' ? 'bg-primary' : 'bg-white'} rounded-l-xl`}
                >
                  <span
                    className={
                      `flex-grow text-center text-sm leading-normal ${chatList === 'Favorites' ? 'text-neutral-900 font-bold' : 'text-slate-500 font-medium'}`
                    }
                  >
                    Favorites
                  </span>
                </button>
                <button
                  onClick={() => handleChatList('Friends')}
                  className={`flex-grow flex items-center justify-center p-3 ${chatList === 'Friends' ? 'bg-primary' : 'bg-white'}`}
                >
                  <span
                    className={
                      `flex-grow text-center text-sm leading-normal ${chatList === 'Friends' ? 'text-neutral-900 font-bold' : 'text-slate-500 font-medium'}`
                    }
                  >
                    Friends
                  </span>
                </button>
                <button
                  onClick={() => handleChatList('Groups')}
                  className={`flex-grow flex items-center justify-center px-4 py-3 ${chatList === 'Groups' ? 'bg-primary' : 'bg-white'} rounded-r-xl`}
                >
                  <span
                    className={
                      `flex-grow text-center text-sm leading-normal ${chatList === 'Groups' ? 'text-neutral-900 font-bold' : 'text-slate-500 font-medium'}`
                    }
                  >
                    Groups
                  </span>
                </button>
              </div>
            </div>

            <ChatList chatList={chatList} userFriends={userFriends} userChats={userChats} myId={myId} userId={userId} />
          </div>

          {(isUserIdPresent && currentChatId) ? (
            <Chat
              currentChatId={currentChatId}
              currentChatData={currentChatData}
              myId={myId}
              updateChatData={updateChatData}
            />
          ) : (
            <div className={`hidden md:flex md:w-1/2 xl:w-3/4 h-full flex-col justify-center items-center ml-5 mb-10`}>
              <img src={icons.logoDark} alt="Brand illustration" style={{ width: '200px' }} />
              <h2 className="text-black text-center text-3xl font-bold mb-4">Start chatting with your friends!</h2>
            </div>
          )}
        </div>
      </div>
      <BottomBar />
    </div>
  )
}