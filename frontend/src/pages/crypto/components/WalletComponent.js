import { icons } from "../../../assets"

export const WalletComponent = () => {
  const cryptoData = [
    {
        name: 'Bitcoin',
        code: 'BTC',
        price: '123.12 USD',
        amount: '0.1874',
        image: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png'
    },
    {
        name: 'Ethereum',
        code: 'ETH',
        price: '123.12 USD',
        amount: '0.1874',
        image: 'https://cryptologos.cc/logos/ethereum-eth-logo.png'
    },
    {
        name: 'Cardano',
        code: 'ADA',
        price: '123.12 USD',
        amount: '0.1874',
        image: 'https://cryptologos.cc/logos/cardano-ada-logo.png'
    },
    {
        name: 'Ripple',
        code: 'XRP',
        price: '123.12 USD',
        amount: '0.1874',
        image: 'https://cryptologos.cc/logos/xrp-xrp-logo.png'
    }
    ,
    {
        name: 'Ethereum',
        code: 'ETH',
        price: '123.12 USD',
        amount: '0.1874',
        image: 'https://cryptologos.cc/logos/ethereum-eth-logo.png'
    },
    {
        name: 'Cardano',
        code: 'ADA',
        price: '123.12 USD',
        amount: '0.1874',
        image: 'https://cryptologos.cc/logos/cardano-ada-logo.png'
    },
    {
        name: 'Ripple',
        code: 'XRP',
        price: '123.12 USD',
        amount: '0.1874',
        image: 'https://cryptologos.cc/logos/xrp-xrp-logo.png'
    }
];

  return (
    <div className="flex flex-col w-full">
      <div className="w-full h-28 bg-neutral-900 rounded-xl flex flex-row p-4">
        <div className="w-1/2 flex flex-col">
          <div className="text-zinc-400 text-xs font-semibold mb-2">Total Assets</div>

          <div className="flex justify-start items-center mb-2">
            <div className="text-white text-xl font-bold">2,460.89</div>
            <div className="text-center ml-1 text-zinc-400 text-xs font-semibold">USD</div>
          </div>

          <div className="flex justify-start items-center">
            <div className="text-center text-white text-sm font-semibold">0.23415600</div>
            <div className="text-center ml-1 text-zinc-400 text-xs font-semibold">BTC</div>
          </div>
        </div>
        <div className="w-1/2 flex justify-end items-end">
          <img src={icons.walletIcon} alt="img" />
        </div>
      </div>

      <div className="flex-col w-full mt-6 justify-center items-center p-3 border border-lightGray bg-white rounded-lg">
        {cryptoData.map((item, index) => (
          <div className='flex flex-row w-full justify-between mb-3' key={index}>
          <div className="flex flex-row">
            <div className="w-10 h-10 relative flex-grow">
              <img className="w-6 h-6 absolute top-2 left-2" src={item.image} alt="img" />
            </div>
            <div className='flex flex-col flex-grow ml-2'>
              <div className="text-neutral-900 text-sm font-semibold">{item.name}</div>
              <div className="text-zinc-500 text-xs font-medium">{item.code}</div>
            </div>
            </div>
            <div className='flex flex-col justify-end items-end flex-grow'>
              <div className="text-neutral-900 text-sm font-semibold">{item.price}</div>
              <div className="text-zinc-500 text-xs font-medium">{item.amount}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}