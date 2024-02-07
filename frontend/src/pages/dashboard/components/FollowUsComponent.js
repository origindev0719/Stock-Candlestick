import { icons } from "../../../assets"

export const FollowUsComponent = () => {

  return (
    <div className="flex flex-col w-full gap-3.5">
      <div className="text-justify text-indigo-950 text-3xl font-semibold">Follow Us</div>
      <div className="flex flex-row flex-wrap gap-10">
        <div className="p-3 xl:p-5 w-16 h-16 xl:w-24 xl:h-24 bg-blue-600 rounded-full flex justify-center items-center">
          <img className="w-8 h-8 xl:w-12 xl:h-12 object-cover" src={icons.facebookLogoWhite} alt="img" />
        </div>
        <div className="p-3 xl:p-5 w-16 h-16 xl:w-24 xl:h-24 bg-amber-300 rounded-full flex justify-center items-center">
          <img className="w-8 h-8 xl:w-12 xl:h-12 object-cover" src={icons.instagramLogoWhite} alt="img" />
        </div>
        <div className="p-3 xl:p-5 w-16 h-16 xl:w-24 xl:h-24 bg-sky-500 rounded-full flex justify-center items-center">
          <img className="w-9 h-9 xl:w-14 xl:h-14 object-cover" src={icons.twitterLogoWhite} alt="img" />
        </div>
        <div className="p-3 xl:p-5 w-16 h-16 xl:w-24 xl:h-24 bg-sky-600 rounded-full flex justify-center items-center">
          <img className="w-7 h-7 xl:w-10 xl:h-10 object-cover" src={icons.linkedinLogoWhite} alt="img" />
        </div>
        <div className="p-3 xl:p-5 w-16 h-16 xl:w-24 xl:h-24 bg-red rounded-full flex justify-center items-center">
          <img className="w-8 h-7 xl:w-12 xl:h-10 object-cover" src={icons.ytLogoWhite} alt="img" />
        </div>
        <div className="p-3 xl:p-5 w-16 h-16 xl:w-24 xl:h-24 bg-rose-500 rounded-full flex justify-center items-center">
          <img className="w-8 h-8 xl:w-12 xl:h-12 object-cover" src={icons.tiktokLogoWhite} alt="img" />
        </div>
      </div>
    </div>

  )
}