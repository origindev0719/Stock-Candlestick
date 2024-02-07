
export const About = () => {

  return (
    <div className="w-full flex flex-col bg-white rounded-lg p-5">
      <div className="flex-col justify-start items-start gap-6 inline-flex">
        <div className="text-center text-slate-900 text-base font-bold leading-relaxed">About</div>
        <div className="w-full text-slate-400 text-base font-normal leading-relaxed">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. <br /><br />Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</div>
      </div>

      <div className="w-full h-24 flex-col justify-start items-start gap-6 inline-flex mt-7">
        <div className="text-center text-slate-900 text-base font-normal leading-relaxed">Interest</div>
        <div className="self-stretch justify-start items-center gap-3 inline-flex">
          <div className="self-stretch px-4 py-1.5 bg-primary rounded-3xl justify-start items-start gap-2.5 flex">
            <div className="text-neutral-900 text-base font-normal leading-relaxed">NBA</div>
          </div>
          <div className="self-stretch px-4 py-1.5 bg-primary rounded-3xl justify-start items-start gap-2.5 flex">
            <div className="text-neutral-900 text-base font-normal leading-relaxed">Lakers</div>
          </div>
          <div className="self-stretch px-4 py-1.5 bg-primary rounded-3xl justify-start items-start gap-2.5 flex">
            <div className="text-neutral-900 text-base font-normal leading-relaxed">LeBron </div>
          </div>
          <div className="self-stretch px-4 py-1.5 bg-primary rounded-3xl justify-start items-start gap-2.5 flex">
            <div className="text-neutral-900 text-base font-normal leading-relaxed">NFL</div>
          </div>
          <div className="self-stretch px-4 py-1.5 bg-primary rounded-3xl justify-start items-start gap-2.5 flex">
            <div className="text-neutral-900 text-base font-normal leading-relaxed">PGA</div>
          </div>
          <div className="self-stretch px-4 py-1.5 bg-primary rounded-3xl justify-start items-start gap-2.5 flex">
            <div className="text-neutral-900 text-base font-normal leading-relaxed">Bitcoin</div>
          </div>
          <div className="self-stretch px-4 py-1.5 bg-primary rounded-3xl justify-start items-start gap-2.5 flex">
            <div className="text-neutral-900 text-base font-normal leading-relaxed">Ethereum</div>
          </div>
          <div className="self-stretch px-4 py-1.5 bg-primary rounded-3xl justify-start items-start gap-2.5 flex">
            <div className="text-neutral-900 text-base font-normal leading-relaxed">TSLA</div>
          </div>
          <div className="self-stretch px-4 py-1.5 bg-primary rounded-3xl justify-start items-start gap-2.5 flex">
            <div className="text-neutral-900 text-base font-normal leading-relaxed">AAPL</div>
          </div>
        </div>
      </div>
    </div>
  )
}