import { Link } from "react-router-dom";
import { Loading } from "../../../components/LoadingComponent"

export const MainNews = ({ latestNews }) => {

  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

  if (!latestNews || !latestNews.news || latestNews.news.length === 0) {
    return (
      <div className="content h-full w-full flex items-center justify-center bg-white animate-bg">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <h2 className="text-justify text-indigo-950 text-2xl md:text-3xl font-extrabold uppercase mt-4">latest Sports, Stock, & Crypto news</h2>
      <div className="flex xl:flex-row space-y-4 sm:w-full xl:space-y-4 xl:space-x-8">
        <div className="bg-white rounded-lg sm:w-full xl:w-1/3 flex-grow h-72 flex justify-center items-center">
          <img className="w-full h-full object-cover rounded-lg" src={latestNews?.news[0]?.Image} alt="img" />
        </div>
        <Link to={latestNews?.news[0]?.Url} className="flex-grow h-72 sm:w-full xl:w-2/3 sm:ml-5 flex flex-col overflow-hidden">
          <div className="flex flex-col xl:justify-between">
            <h4 className="text-indigo-950 text-xl xl:text-2xl font-bold">
              {latestNews?.news[0]?.Title}
            </h4>
            <p className="text-zinc-500 text-sm font-normal">
              {latestNews?.news[0]?.Description}
              <br />
              <br />
              {latestNews?.news[0]?.Summary}
            </p>
          </div>
          <div className="flex justify-start items-center gap-1.5 lg:mt-5">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3" />
              <span className="text-zinc-400 text-xs font-medium">{formatDate(latestNews?.news[0]?.PublishedOn)}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-zinc-400 text-xs font-medium">by</span>
              <span className="text-zinc-400 text-xs font-medium">{latestNews?.news[0]?.Source}</span>
            </div>
          </div>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 my-8">
        <Link to={latestNews?.news[1]?.Url} className="w-1/3 h-80 flex flex-col space-y-3">
          <div className="flex-grow md:h-44 flex justify-center items-center">
            <img className="w-full h-full object-cover rounded-lg" src={latestNews?.news[1]?.Image}  alt="img" />
          </div>
          <div className="h-28 flex flex-grow flex-col justify-around space-y-2 overflow-hidden">
            <h4 className="text-indigo-950 text-sm md:text-base font-bold line-clamp-3">
            {latestNews?.news[1]?.Title}
            </h4>
            <p className="text-zinc-500 text-xs md:text-sm font-normal line-clamp-4">
            {latestNews?.news[1]?.Description}
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3" />
              <span className="text-zinc-400 text-xs font-medium">{formatDate(latestNews?.news[1]?.PublishedOn)}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-zinc-400 text-xs font-medium">by</span>
              <span className="text-zinc-400 text-xs font-medium">{latestNews?.news[1]?.Source}</span>
            </div>
          </div>
        </Link>

        <Link to={latestNews?.news[2]?.Url} className="w-1/3 h-80 flex flex-col space-y-3">
          <div className="flex-grow md:h-44 flex justify-center items-center">
            <img className="w-full h-full object-cover rounded-lg" src={latestNews?.news[2]?.Image} alt="img" />
          </div>
          <div className="h-28 flex flex-grow flex-col justify-around space-y-2 overflow-hidden">
            <h4 className="text-indigo-950 text-sm md:text-base font-bold line-clamp-3">
              {latestNews?.news[2]?.Title}
            </h4>
            <p className="text-zinc-500 text-xs md:text-sm font-normal line-clamp-4">
              {latestNews?.news[2]?.Description}
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3" />
              <span className="text-zinc-400 text-xs font-medium">{formatDate(latestNews?.news[2]?.PublishedOn)}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-zinc-400 text-xs font-medium">by</span>
              <span className="text-zinc-400 text-xs font-medium">{latestNews?.news[2]?.Source}</span>
            </div>
          </div>
        </Link>

        <Link to={latestNews?.news[4]?.Url} className="w-1/3 h-80 flex flex-col space-y-3">
          <div className="flex-grow md:h-44 flex justify-center items-center">
            <img className="w-full h-full object-cover rounded-lg" src={latestNews?.news[4]?.Image}  alt="img" />
          </div>
          <div className="h-28 flex flex-grow flex-col justify-around space-y-2 overflow-hidden">
            <h4 className="text-indigo-950 text-sm md:text-base font-bold line-clamp-3">
              {latestNews?.news[4]?.Title}
            </h4>
            <p className="text-zinc-500 text-xs md:text-sm font-normal line-clamp-4">
              {latestNews?.news[4]?.Description}
            </p>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3" />
              <span className="text-zinc-400 text-xs font-medium">{formatDate(latestNews?.news[4]?.PublishedOn)}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-zinc-400 text-xs font-medium">by</span>
              <span className="text-zinc-400 text-xs font-medium">{latestNews?.news[4]?.Source}</span>
            </div>
          </div>
        </Link>
      </div>
    </>
  )
}