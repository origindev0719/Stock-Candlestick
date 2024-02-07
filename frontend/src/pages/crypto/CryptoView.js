import { Feed } from "../../components/FeedComponent";
import { Navbar } from "../../components/Navbar"
import { Sidebar } from "../../components/Sidebar"
import { StocksAndCryptoTicker } from "../../components/StocksAndCryptoTicker";
import { SnapshotComponent } from "./components/SnapshotComponent";
import { WalletComponent } from "./components/WalletComponent";

export const CryptoView = () => {

  return (
    <div className="w-full h-screen bg-neutral-50 flex flex-row overflow-hidden">
      <Sidebar />
      <div className="flex flex-col h-screen overflow-y-auto overflow-x-hidden">
        <div className="sticky top-0 z-10 bg-white">
          <Navbar title='Crypto' />
        </div>
        <div className="sticky top-24 z-10 bg-white">
          <StocksAndCryptoTicker selectedCategory={'crypto'} />
        </div>
        <div className="mt-10 ml-10 flex flex-row h-full justify-center">
          <div className="w-1/4">
            <SnapshotComponent />
          </div>
          <div className="w-2/5">
            <Feed />
          </div>
          <div className="w-1/4 ml-10">
            <WalletComponent />
          </div>
        </div>
      </div>
    </div>
  )
}