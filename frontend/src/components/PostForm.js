import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../redux/actions/PostActions';
import { icons } from "../assets";

export const PostForm = ({userInfo, onPostCreated}) => {
  const [text, setText] = useState('');
  const textareaRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [previewVideo, setPreviewVideo] = useState(null);
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    const image = e.target.elements.image.files[0];
    dispatch(createPost(text, image, userInfo.id));
    setText('');
    setPreviewImage(null);
    onPostCreated();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result);
          setPreviewVideo(null); // Reset video preview
        };
        reader.readAsDataURL(file);
      } else if (file.type.startsWith('video/')) {
        setPreviewVideo(URL.createObjectURL(file));
        setPreviewImage(null); // Reset image preview
      }
    }
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
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

    // Calculate height
    const lineHeight = parseInt(window.getComputedStyle(textarea).lineHeight, 12);
    const minHeight = lineHeight * 2; // Minimum height for 2 lines
    const maxHeight = lineHeight * 5; // Maximum height for 5 lines
    const newHeight = initial ? minHeight : Math.min(textarea.scrollHeight, maxHeight);

    textarea.style.height = `${newHeight}px`;
  };

  return (
    <div className="flex gap-3 p-4 bg-white shadow">
      <img className="w-9 h-9 lg:w-12 lg:h-12 rounded-full" src={userInfo.profileImg} alt="Placeholder" />

      <form onSubmit={submitHandler} className="flex flex-col justify-start lg:ml-3 flex-grow">
        <textarea
          ref={textareaRef}
          name="text"
          value={text}
          onChange={handleTextChange}
          className="text-neutral-900 text-lg lg:text-xl p-2 font-normal leading-normal resize-none mb-3"
          placeholder="Write your first post here... Everyone can reply"
        />
        <input 
          type="file" 
          name="image" 
          className='hidden' 
          onChange={handleImageChange} 
          accept="image/*,video/*"
        />
        {previewImage && <img src={previewImage} alt="Preview" className="w-full h-72 rounded-2xl border object-contain border-gray" />}
        {previewVideo && <video src={previewVideo} alt="Preview" className="w-full h-72 rounded-2xl border border-gray" controls />}
        <div className="flex-grow h-1/3 flex items-end justify-between mt-3">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => document.querySelector('input[type="file"]').click()}
              className="w-9 h-9"
            >
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
          <div className="flex items-center gap-3">
            <button type="button" className="hidden xl:flex w-7 h-7 items-center justify-center">
              <div className="w-5 h-5 object-cover rounded-full border-2 border-gray"></div>
            </button>
            <button type="button" className="hidden xl:flex w-7 h-7">
              <img src={icons.plusCircle} alt="img" />
            </button>
            <button type="submit" className="h-10 p-2.5 bg-neutral-900 rounded-2xl flex items-center gap-2.5">
              <span className="text-white text-base font-bold leading-tight">Post</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
