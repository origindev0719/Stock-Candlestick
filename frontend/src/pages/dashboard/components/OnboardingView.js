import { useState } from "react";
import { Navbar } from "../../../components/Navbar";
import { Sidebar } from "../../../components/Sidebar";
import { updateUserInterests } from "../../../redux/actions/UserActions";
import { useDispatch } from "react-redux";

export const OnboardingView = ({userId}) => {
  const [selectedButton, setSelectedButton] = useState('Suggested');
  const [selectedItems, setSelectedItems] = useState([]);

  const dispatch = useDispatch();

  const toggleSelectedItem = (itemLabel) => {
    if (selectedItems.includes(itemLabel)) {
      setSelectedItems(prevItems => prevItems.filter(label => label !== itemLabel));
    } else {
      setSelectedItems(prevItems => [...prevItems, itemLabel]);
    }
  };

  const saveInterests = () => {
    dispatch(updateUserInterests(userId, selectedItems));
  }

  return (
    <div className="DashboardElParlay w-screen h-screen flex overflow-hidden bg-neutral-50">
      <Sidebar />
      <div className="Dashboard flex flex-col w-full h-screen">
        <Navbar title='Getting started' saveInterests={saveInterests} />
        <div className="flex w-90 h-screen">
          <Options setSelectedButton={setSelectedButton} selectedButton={selectedButton} />
          <ItemsDisplay selectedButton={selectedButton} selectedItems={selectedItems} toggleSelectedItem={toggleSelectedItem} />
        </div>
      </div>
    </div>
  );
};

const Options = ({ setSelectedButton, selectedButton }) => {

  return (
    <div className="w-32 h-full mr-16 flex flex-col items-start">
      {['Suggested', 'NBA', 'NFL', 'NHL', 'MLB', 'Golf', 'Soccer', 'NCAAM', 'NCAAF'].map(button => (
        <button
          key={button}
          onClick={() => setSelectedButton(button)}
          className={`w-32 h-20 p-7 ${selectedButton === button ? 'bg-neutral-200' : ''} text-neutral-500 text-sm font-semibold font-['SF Pro Text'] leading-tight`}
        >
          {button}
        </button>
      ))}
    </div>
  );
};

const ItemsDisplay = ({ selectedButton, selectedItems, toggleSelectedItem }) => {
  const dummyData = [
    {
      type: 'NBA',
      items: [
        { icon: 'https://via.placeholder.com/80x104', label: 'Lakers' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Warriors' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Bulls' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Celtics' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Heat' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Lakers' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Warriors' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Bulls' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Celtics' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Heat' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Lakers' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Warriors' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Bulls' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Celtics' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Heat' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Lakers' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Warriors' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Bulls' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Celtics' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Heat' },
      ]
    },
    {
      type: 'NFL',
      items: [
        { icon: 'https://via.placeholder.com/80x104', label: 'Patriots' },
        { icon: 'https://via.placeholder.com/80x104', label: '49ers' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Seahawks' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Cowboys' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Broncos' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Patriots' },
        { icon: 'https://via.placeholder.com/80x104', label: '49ers' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Seahawks' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Cowboys' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Broncos' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Patriots' },
        { icon: 'https://via.placeholder.com/80x104', label: '49ers' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Seahawks' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Cowboys' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Broncos' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Patriots' },
        { icon: 'https://via.placeholder.com/80x104', label: '49ers' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Seahawks' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Cowboys' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Broncos' },
      ]
    },
    {
      type: 'NHL',
      items: [
        { icon: 'https://via.placeholder.com/80x104', label: 'Blackhawks' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Bruins' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Kings' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Rangers' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Blackhawks' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Bruins' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Kings' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Rangers' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Blackhawks' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Bruins' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Kings' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Rangers' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Blackhawks' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Bruins' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Kings' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Rangers' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Blackhawks' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Bruins' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Kings' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Rangers' },
      ]
    },
    {
      type: 'MLB',
      items: [
        { icon: 'https://via.placeholder.com/80x104', label: 'Yankees' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Red Sox' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Dodgers' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Cubs' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Yankees' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Red Sox' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Dodgers' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Cubs' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Yankees' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Red Sox' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Dodgers' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Cubs' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Yankees' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Red Sox' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Dodgers' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Cubs' },
      ]
    },
    {
      type: 'Golf',
      items: [
        { icon: 'https://via.placeholder.com/80x104', label: 'Tiger Woods' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Phil Mickelson' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Rory McIlroy' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Tiger Woods' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Phil Mickelson' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Rory McIlroy' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Tiger Woods' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Phil Mickelson' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Rory McIlroy' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Tiger Woods' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Phil Mickelson' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Rory McIlroy' },
      ]
    },
    {
      type: 'Soccer',
      items: [
        { icon: 'https://via.placeholder.com/80x104', label: 'Barcelona' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Real Madrid' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Manchester United' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Liverpool' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Barcelona' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Real Madrid' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Manchester United' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Liverpool' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Barcelona' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Real Madrid' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Manchester United' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Liverpool' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Barcelona' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Real Madrid' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Manchester United' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Liverpool' },
      ]
    },
    {
      type: 'NCAAM',
      items: [
        { icon: 'https://via.placeholder.com/80x104', label: 'Duke' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Kentucky' },
        { icon: 'https://via.placeholder.com/80x104', label: 'North Carolina' },
        // ... add more NCAAM teams
      ]
    },
    {
      type: 'NCAAF',
      items: [
        { icon: 'https://via.placeholder.com/80x104', label: 'Alabama' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Clemson' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Ohio State' },
        // ... add more NCAAF teams
      ]
    },
    {
      type: 'Tennis',
      items: [
        { icon: 'https://via.placeholder.com/80x104', label: 'Roger Federer' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Rafael Nadal' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Serena Williams' },
        // ... add more tennis players
      ]
    },
    {
      type: 'UFC',
      items: [
        { icon: 'https://via.placeholder.com/80x104', label: 'Conor McGregor' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Khabib Nurmagomedov' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Amanda Nunes' },
        // ... add more UFC fighters
      ]
    },
    {
      type: 'Boxing',
      items: [
        { icon: 'https://via.placeholder.com/80x104', label: 'Floyd Mayweather' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Manny Pacquiao' },
        // ... add more boxers
      ]
    },
    {
      type: 'Rugby',
      items: [
        { icon: 'https://via.placeholder.com/80x104', label: 'All Blacks' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Wallabies' },
        // ... add more rugby teams
      ]
    },
    {
      type: 'Crypto',
      items: [
        { icon: 'https://via.placeholder.com/80x104', label: 'Bitcoin' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Ethereum' },
        { icon: 'https://via.placeholder.com/80x104', label: 'Cardano' },
        // ... add more cryptocurrencies
      ]
    },
    {
      type: 'Stocks',
      items: [
        { icon: 'https://via.placeholder.com/80x104', label: 'AAPL' },
        { icon: 'https://via.placeholder.com/80x104', label: 'TSLA' },
        { icon: 'https://via.placeholder.com/80x104', label: 'AMZN' },
        // ... add more stocks
      ]
    }
  ];

  const category = dummyData.find(cat => cat.type === selectedButton);
  const itemsToDisplay = category ? category.items : dummyData.flatMap(cat => cat.items);

  return (
    <div className="items-container w-full h-full pt-12 overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-x-4 gap-y-4">
      {itemsToDisplay.map((item, index) => (
        <button
          key={index}
          className={`item-card w-48 h-48 flex flex-col items-center justify-center bg-white rounded-xl ${selectedItems.includes(item.label) ? 'border-2 border-blue-500' : 'border border-zinc-400'}`}
          onClick={() => toggleSelectedItem(item.label)}
        >
          <img className="item-icon" src={item.icon} alt={item.label} />
          <div className="item-label text-center text-zinc-800 text-xs font-normal font-['SF Pro Text'] leading-tight">{item.label}</div>
        </button>
      ))}
    </div>
  );
};
