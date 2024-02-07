import { icons } from '../../../assets'
import '../../../styles/Dashboard/dashboardStyle.css';

export const Achievements = () => {

  const dummyData = [
    {
      title: "Newbie Navigator",
      description: "Exploring the platform and getting familiar with the features.",
      imgSrc: icons.newbieNavigator,
      checked: false
    },
    {
      title: "Active Contributor",
      description: "Engaging in conversations and sharing insights regularly.",
      imgSrc: icons.activeContributor,
      checked: true
    },
    {
      title: "Market Mentor",
      description: "Guiding and assisting other users with their questions.",
      imgSrc: icons.marketMentor,
      checked: false
    },
    {
      title: "Sports Enthusiast",
      description: "Regularly participating in sports-related discussions and events.",
      imgSrc: icons.sportsEnthusiast,
      checked: false
    },
    {
      title: "Championship Chatter",
      description: "Eagerly discussing upcoming sports championships.",
      imgSrc: icons.championshipChatter,
      checked: false
    }
  ]

  return (
    <div className="w-full flex flex-col bg-white rounded-xl p-8">
      <div className="mb-8 text-start text-slate-900 text-base font-bold leading-relaxed">
        Earned Achievements
      </div>

      <div className="space-y-6">
        {dummyData.map((achievement, index) => (
          <div key={index} className="flex items-center gap-7">
            <label className="checkbox-wrapper">
              <input
                type="checkbox"
                checked={achievement.checked}
                className="hidden"
                readOnly
              />
              <span className={`custom-checkbox ${achievement.checked ? 'checked' : ''}`}></span>
            </label>
            <img className="w-8 h-8" src={achievement.imgSrc} alt={achievement.title} />
            <div className="flex-grow">
              <span className="text-black text-base font-bold leading-relaxed">{achievement.title}:</span>
              <span className="text-black text-base font-normal leading-relaxed"> {achievement.description}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}