
export const StocksNews = () => {
  const dummyData = [
    {
      id: 1,
      imageUrl: "https://cdn.britannica.com/19/77419-050-7785C04B/White-House-portico-Pennsylvania-Avenue.jpg",
      title: "Game, set and almost match to Biden on the debt ceiling",
      subtitle: "International big brands may you know and love"
    },
    {
      id: 2,
      imageUrl: "https://www.boardeffect.com/wp-content/uploads/2022/05/how-to-run-a-volunteer-board-meeting.jpg",
      title: "Another headline for a different article",
      subtitle: "More international brands you might be familiar with"
    },
    {
      id: 3,
      imageUrl: "https://aprioboardportal.com/wp-content/uploads/2020/02/blog-how-to-run-a-board-meeting.jpg",
      title: "Yet another interesting headline",
      subtitle: "Brands and products from around the world"
    },
    {
      id: 4,
      imageUrl: "https://cdn.britannica.com/19/77419-050-7785C04B/White-House-portico-Pennsylvania-Avenue.jpg",
      title: "Game, set and almost match to Biden on the debt ceiling",
      subtitle: "International big brands may you know and love"
    },
    {
      id: 5,
      imageUrl: "https://www.boardeffect.com/wp-content/uploads/2022/05/how-to-run-a-volunteer-board-meeting.jpg",
      title: "Another headline for a different article",
      subtitle: "More international brands you might be familiar with"
    },
    {
      id: 6,
      imageUrl: "https://aprioboardportal.com/wp-content/uploads/2020/02/blog-how-to-run-a-board-meeting.jpg",
      title: "Yet another interesting headline",
      subtitle: "Brands and products from around the world"
    },
  ];


  return (
    <div className="flex flex-col w-full">
      {dummyData.map(item => (
        <div key={item.id} className="w-full h-44 relative rounded-3xl bg-stone-300 mb-3">
          <img className="w-full h-full object-cover rounded-3xl" src={item.imageUrl} alt={item.title} />

          <div className="absolute bottom-4 left-4 flex flex-col gap-1.5">
            <div className="text-white text-xl font-bold leading-loose font-['Urbanist']">
              {item.title}
            </div>
            <div className="text-white text-xs font-medium tracking-tight font-['Urbanist']">
              {item.subtitle}
            </div>
          </div>
        </div>
      ))}


    </div>
  )
}