import { Link } from "react-router-dom"
import { Loading } from "../../../components/LoadingComponent";

export const LatestNews = ({ title, data }) => {
  if (!data || !data.news || data.news.length === 0) {
    return (
      <div className="content h-full w-full flex items-center justify-center bg-white">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full sm:ml-10 sm:mt-10">
      <div className="text-justify text-indigo-950 text-3xl font-semibold mb-4">{title}</div>
      <div className="flex flex-wrap lg:flex-row gap-5">
        {data.news.slice(0, 4).map((item, index) => (
          <Link to={item.Url} className="flex flex-col w-full sm:w-4/5 md:w-2/5 lg:w-1/5 flex-shrink-0" key={index}>
            <div className="h-40 w-full">
              <img className="w-full h-full object-cover" src={item.Image} alt="News" />
            </div>
            <div className="flex flex-col p-2">
              <h4 className="text-indigo-950 text-base font-bold line-clamp-3 mb-2">
                {item.Title}
              </h4>
              <p className="text-zinc-500 text-sm font-normal line-clamp-4">
                {item.Description}
              </p>
              <div className="flex items-center gap-1 mt-2">
                <span className="text-zinc-400 text-xs font-medium">by</span>
                <span className="text-zinc-400 text-xs font-medium">{item.Source}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div> 
  )
}
