import { Link } from "react-router-dom";
import { Loading } from "../../../components/LoadingComponent";

export const Trending = ({ latestNews, cryptoNews, stocksNews }) => {

  function formatDate(dateString) {
    const inputDate = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - inputDate);
    const diffHours = diffTime / (1000 * 60 * 60);

    // Check if the date is today
    if (inputDate.toDateString() === now.toDateString()) {
      if (diffHours < 12) {
        // If less than 12 hours ago
        if (inputDate.getHours() < 12) {
          return 'This morning';
        } else {
          return 'This afternoon';
        }
      } else {
        return 'Today';
      }
    } else {
      // For dates other than today
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return inputDate.toLocaleDateString('en-US', options);
    }
  }

  if (!cryptoNews || !cryptoNews.news || cryptoNews.news.length === 0) {
    return (
      <div className="content h-screen w-screen flex items-center justify-center bg-white animate-bg">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start bg-white w-full mb-6">
      <div className="flex justify-start items-center rounded-t-lg w-full px-4 py-3 bg-neutral-900">
        <div className="text-white text-xl font-extrabold leading-normal">What's happening</div>
      </div>

      <div className="w-full flex flex-row sm:flex-col justify-around flex-wrap bg-white">
        {
          cryptoNews.news.slice(0, 4).map((item, index) => (
            <Link to={item.Url} className="w-1/2 sm:w-full h-28 px-4 py-3 bg-white rounded-b-lg shadow flex items-start gap-4" key={index}>
              <div className="flex flex-col justify-start items-start gap-2 w-3/4">
                <div className="flex items-center gap-2">
                  <img className="w-4 h-4 rounded-full" src="https://images.ctfassets.net/lh3zuq09vnm2/yBDals8aU8RWtb0xLnPkI/19b391bda8f43e16e64d40b55561e5cd/How_tracking_user_behavior_on_your_website_can_improve_customer_experience.png" alt="Small round placeholder" />
                  <div className="text-neutral-900 text-xs font-semibold leading-none">Trending in Crypto</div>
                  <div className="text-slate-500 text-xs font-normal leading-none">·</div>
                  <div className="text-zinc-500 text-xs font-normal leading-none">{formatDate(item.PublishedOn)}</div>
                </div>
                <div className="text-neutral-900 text-base font-bold leading-tight line-clamp-2">{item.Title}</div>
              </div>
              <div className="w-1/4 flex justify-end items-start">
                <img className="w-16 h-16 object-cover rounded-2xl" src={item.Image} alt="Large square placeholder" />
              </div>
            </Link>
          ))
        }

        {
          stocksNews.news.slice(0, 4).map((item, index) => (
            <Link to={item.Url} className="w-1/2 sm:w-full h-28 px-4 py-3 bg-white rounded-b-lg shadow flex items-start gap-4" key={index}>
              <div className="flex flex-col justify-start items-start gap-2 w-3/4">
                <div className="flex items-center gap-2">
                  <img className="w-4 h-4 rounded-full" src="https://images.ctfassets.net/lh3zuq09vnm2/yBDals8aU8RWtb0xLnPkI/19b391bda8f43e16e64d40b55561e5cd/How_tracking_user_behavior_on_your_website_can_improve_customer_experience.png" alt="Small round placeholder" />
                  <div className="text-neutral-900 text-xs font-semibold leading-none">Trending in Stocks</div>
                  <div className="text-slate-500 text-xs font-normal leading-none">·</div>
                  <div className="text-zinc-500 text-xs font-normal leading-none">{formatDate(item.PublishedOn)}</div>
                </div>
                <div className="text-neutral-900 text-base font-bold leading-tight line-clamp-2">{item.Title}</div>
              </div>
              <div className="w-1/4 flex justify-end items-start">
                <img className="w-16 h-16 object-cover rounded-2xl" src={item.Image} alt="Large square placeholder" />
              </div>
            </Link>
          ))
        }
      </div>
    </div>
  )
}