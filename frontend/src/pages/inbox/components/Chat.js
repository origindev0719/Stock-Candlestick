import { useEffect, useRef, useState } from "react";
import { icons } from "../../../assets"
import { addDoc, collection, onSnapshot, orderBy, query, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../../firebaseConfig";
import { formatDistanceToNow } from 'date-fns';
import { useSelector } from "react-redux";

export const Chat = ({ currentChatId, currentChatData, myId, updateChatData }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const textareaRef = useRef(null);

  // Find the other participant's information
  const otherParticipant = currentChatData && currentChatData.participantsInfo 
                           ? currentChatData.participantsInfo[Object.keys(currentChatData.participantsInfo).find(id => id !== myId)]
                           : null;

  useEffect(() => {
    if (currentChatId) {
      const unsubscribe = onSnapshot(
        query(collection(firestore, `chats/${currentChatId}/messages`), orderBy('createdAt', 'asc')),
        snapshot => {
          const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setMessages(messages);
        }
      );
      return () => unsubscribe();
    }
  }, [currentChatId]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const messageData = {
        text: newMessage,
        senderId: myId,
        createdAt: new Date(),
      };

      await addDoc(collection(firestore, `chats/${currentChatId}/messages`), messageData);

      // Update chat document with the last message details
      const chatDocRef = doc(firestore, "chats", currentChatId);
      await updateDoc(chatDocRef, {
        lastMessage: newMessage,
        lastMessageDate: messageData.createdAt,
        lastMessageSenderId: myId,
      });

      // Update the local state with the latest chat data
      updateChatData(currentChatId, newMessage, messageData.createdAt, myId);

      setNewMessage('');
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };


  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(e);
    }
  };

  const formatTime = (timestamp) => {
    // Check if timestamp exists and is valid
    if (timestamp?.toDate) {
      // Convert Firestore timestamp to JavaScript Date object
      return formatDistanceToNow(timestamp.toDate(), { addSuffix: true });
    }
    // Return an empty string or placeholder if timestamp is invalid
    return '';
  };

  const isLastMessage = (index) => {
    if (index === messages.length - 1) return true;
    return messages[index].senderId !== messages[index + 1].senderId;
  };

  const handleTextChange = (e) => {
    setNewMessage(e.target.value);
    adjustTextareaHeight();
  };

  useEffect(() => {
    // Set initial height of textarea to 2 lines when component mounts
    adjustTextareaHeight(true);
  }, []);

  const adjustTextareaHeight = (initial = false) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Reset height to 'auto' to get the correct scrollHeight
    textarea.style.height = 'auto';
    textarea.style.marginBottom = '10px'

    // Calculate height
    const lineHeight = parseInt(window.getComputedStyle(textarea).lineHeight, 10);
    const minHeight = lineHeight * 2; // Minimum height for 1 lines
    const maxHeight = lineHeight * 5; // Maximum height for 5 lines
    const newHeight = initial ? minHeight : Math.min(textarea.scrollHeight, maxHeight);

    textarea.style.height = `${newHeight}px`;
  };

  return (
    <div className="w-full md:w-3/4 sm:h-full flex flex-col ml-5 mb-10">
      {/* Chat Header */}
      <div className="w-full h-20 px-6 py-4 bg-neutral-900 flex items-center gap-3 rounded-t-3xl">
        <img className="w-12 h-12 rounded-full" src={otherParticipant?.profileImg} alt="Profile" />
        <div className="flex-grow flex flex-col justify-center gap-1">
          <div className="flex items-center gap-3">
            <div className="text-white text-lg font-medium leading-7">{otherParticipant?.name}</div>
            <div className="rounded-lg flex items-center justify-center">
              <img src={icons.heart} className="w-5 h-5" alt="img" />
            </div>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <div className="text-white text-xs font-medium leading-normal">Online</div>
          </div>
        </div>
        <button className="w-12 h-12 p-3 rounded-lg flex items-center justify-center">
          <img src={icons.calling} className="w-5 h-5" alt="img" />
        </button>
        <button className="w-12 h-12 p-3 rounded-lg flex items-center justify-center">
          <img src={icons.video} className="w-5 h-5" alt="img" />
        </button>
        <button className="w-12 h-12 p-3 rounded-lg flex items-center justify-center">
          <img src={icons.searchWhite} className="w-5 h-5" alt="img" />
        </button>
        <button className="w-12 h-12 p-3 rounded-lg flex items-center justify-center">
          <img src={icons.arrowDownWhite} className="w-5 h-5" alt="img" />
        </button>
      </div>

      {/* Messages Section */}
      <div className="flex-grow h-full bg-neutral-50 p-4 overflow-y-auto flex flex-col mb-40">
        {messages.map((message, index) => (
          <div key={message.id} className={`flex flex-col max-w-1/2 my-1 ${message.senderId === myId ? 'ml-auto' : 'mr-auto'}`}>
            <div className={`p-2 rounded-xl ${message.senderId === myId ? 'bg-neutral-900 text-white' : 'bg-gray-400 text-black'}`}>
              {message.text}
            </div>
            {isLastMessage(index) && (
              <span className="text-xs text-gray-500 mt-1">
                {formatTime(message.createdAt)}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Chat Input Section */}
      <div className="w-full px-6 py-4 h-44 bg-neutral-50 flex flex-grow items-center gap-2.5 sticky bottom-0">
        <div className="flex items-center gap-6 w-full h-full">
          <div className="flex items-center gap-6">
            <img className="w-6 h-6" src={icons.emojiColor} alt="Emoji" />
            <button className="p-0.5 flex items-center justify-center">
              <img className="w-5 h-5 relative" src={icons.plusSquare} alt="img" />
            </button>
          </div>
          <form className="flex items-center justify-center gap-6 flex-grow h-full">
            <textarea
              ref={textareaRef}
              placeholder="Type Something..."
              value={newMessage}
              onChange={handleTextChange}
              onKeyPress={handleKeyPress}
              className="w-full p-3 bg-white rounded-3xl text-lg font-normal leading-normal resize-none"
            />
            <button onClick={sendMessage} className="w-10 h-10 px-1 py-0.5 flex items-center justify-center">
              <img className="w-9 h-9 relative object-cover" src={icons.play} alt="img" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}