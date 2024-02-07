
export const PlayerGames = () => {
  const dummyData = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
  ];

  return (
    <div className="flex flex-col w-full">
      <div className="w-full rounded-lg overflow-hidden mb-7">
        <div className="bg-gray text-white py-3 pl-6 font-semibold text-sm uppercase">
          <span className="font-manrope">Upcoming Games</span>
        </div>

        <div className="w-full flex flex-col">
          {dummyData.map((item) => (
            <div className="flex flex-col h-28" key={item.id}>
              <div className="flex flex-row h-2/3">
                <div className="flex justify-center items-center w-2/12">
                  01:00 PM
                </div>
                <div className="w-full flex flex-col">
                  <div className="h-1/2 flex flex-row justify-between">
                    <div className="flex items-center w-1/3">
                      <div className="text-zinc-400 text-base font-normal">451</div>
                      <div className="text-indigo-950 ml-5 text-base font-medium">New York Knicks</div>
                    </div>

                    <div className="flex flex-row justify-between w-2/4 mr-5">
                      <div className="flex items-center space-x-10">
                        <div className="flex items-center space-x-3">
                          <div className="flex justify-center items-center">
                            <div className="text-zinc-500 text-base font-normal">+10</div>
                          </div>
                          <div className="flex justify-center items-center">
                            <div className="text-zinc-400 text-base font-normal">-115</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="flex justify-center items-center">
                            <div className="text-zinc-500 text-base font-normal">+10</div>
                          </div>
                          <div className="flex justify-center items-center">
                            <div className="text-zinc-400 text-base font-normal">-123</div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-7">
                        <div className="flex items-center space-x-3">
                          <div className="flex justify-center items-center">
                            <div className="text-zinc-500 text-base font-normal">+10,5</div>
                          </div>
                          <div className="flex justify-center items-center">
                            <div className="text-zinc-400 text-base font-normal">-110</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="flex justify-center items-center">
                            <div className="text-zinc-500 text-base font-normal font-['Noto Sans']">+10</div>
                          </div>
                          <div className="flex justify-center items-center">
                            <div className="text-zinc-400 text-base font-normal font-['Noto Sans']">-115</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="h-1/2 flex flex-row justify-between">
                    <div className="flex items-center w-1/3">
                      <div className="text-zinc-400 text-base font-normal">451</div>
                      <div className="text-indigo-950 ml-5 text-base font-medium">New York Knicks</div>
                    </div>

                    <div className="flex flex-row justify-between w-2/4 mr-5">
                      <div className="flex items-center space-x-10">
                        <div className="flex items-center space-x-3">
                          <div className="flex justify-center items-center">
                            <div className="text-zinc-500 text-base font-normal">+10</div>
                          </div>
                          <div className="flex justify-center items-center">
                            <div className="text-zinc-400 text-base font-normal">-115</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="flex justify-center items-center">
                            <div className="text-zinc-500 text-base font-normal">+10</div>
                          </div>
                          <div className="flex justify-center items-center">
                            <div className="text-zinc-400 text-base font-normal">-123</div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-7">
                        <div className="flex items-center space-x-3">
                          <div className="flex justify-center items-center">
                            <div className="text-zinc-500 text-base font-normal">+10,5</div>
                          </div>
                          <div className="flex justify-center items-center">
                            <div className="text-zinc-400 text-base font-normal">-110</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="flex justify-center items-center">
                            <div className="text-zinc-500 text-base font-normal font-['Noto Sans']">+10</div>
                          </div>
                          <div className="flex justify-center items-center">
                            <div className="text-zinc-400 text-base font-normal font-['Noto Sans']">-115</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-1/3">
                <div className="w-full h-10 bg-neutral-50 flex items-center">
                  <div className="w-44 ml-44 flex items-center space-x-10">
                    <button className="w-14 h-5 flex flex-col justify-start items-start">
                      <div className="text-zinc-400 text-sm font-normal capitalize">matchup</div>
                    </button>
                    <button className="w-20 h-5 flex flex-col justify-start items-start">
                      <div className="text-zinc-400 text-sm font-normal capitalize">Line history</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full rounded-lg overflow-hidden">
        <div className="bg-gray text-white py-3 pl-6 font-semibold text-sm uppercase">
          <span className="font-manrope">Previous Games</span>
        </div>

        <div className="w-full flex flex-col">
          {dummyData.map((item) => (
            <div className="flex flex-col h-28" key={item.id}>
              <div className="flex flex-row h-2/3">
                <div className="flex justify-center items-center w-2/12">
                  01:00 PM
                </div>
                <div className="w-full flex flex-col">
                  <div className="h-1/2 flex flex-row justify-between">
                    <div className="flex items-center w-1/3">
                      <div className="text-zinc-400 text-base font-normal">451</div>
                      <div className="text-indigo-950 ml-5 text-base font-medium">New York Knicks</div>
                    </div>

                    <div className="flex flex-row justify-between w-2/4 mr-5">
                      <div className="flex items-center space-x-10">
                        <div className="flex items-center space-x-3">
                          <div className="flex justify-center items-center">
                            <div className="text-zinc-500 text-base font-normal">+10</div>
                          </div>
                          <div className="flex justify-center items-center">
                            <div className="text-zinc-400 text-base font-normal">-115</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="flex justify-center items-center">
                            <div className="text-zinc-500 text-base font-normal">+10</div>
                          </div>
                          <div className="flex justify-center items-center">
                            <div className="text-zinc-400 text-base font-normal">-123</div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-7">
                        <div className="flex items-center space-x-3">
                          <div className="flex justify-center items-center">
                            <div className="text-zinc-500 text-base font-normal">+10,5</div>
                          </div>
                          <div className="flex justify-center items-center">
                            <div className="text-zinc-400 text-base font-normal">-110</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="flex justify-center items-center">
                            <div className="text-zinc-500 text-base font-normal font-['Noto Sans']">+10</div>
                          </div>
                          <div className="flex justify-center items-center">
                            <div className="text-zinc-400 text-base font-normal font-['Noto Sans']">-115</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="h-1/2 flex flex-row justify-between">
                    <div className="flex items-center w-1/3">
                      <div className="text-zinc-400 text-base font-normal">451</div>
                      <div className="text-indigo-950 ml-5 text-base font-medium">New York Knicks</div>
                    </div>

                    <div className="flex flex-row justify-between w-2/4 mr-5">
                      <div className="flex items-center space-x-10">
                        <div className="flex items-center space-x-3">
                          <div className="flex justify-center items-center">
                            <div className="text-zinc-500 text-base font-normal">+10</div>
                          </div>
                          <div className="flex justify-center items-center">
                            <div className="text-zinc-400 text-base font-normal">-115</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="flex justify-center items-center">
                            <div className="text-zinc-500 text-base font-normal">+10</div>
                          </div>
                          <div className="flex justify-center items-center">
                            <div className="text-zinc-400 text-base font-normal">-123</div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-7">
                        <div className="flex items-center space-x-3">
                          <div className="flex justify-center items-center">
                            <div className="text-zinc-500 text-base font-normal">+10,5</div>
                          </div>
                          <div className="flex justify-center items-center">
                            <div className="text-zinc-400 text-base font-normal">-110</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="flex justify-center items-center">
                            <div className="text-zinc-500 text-base font-normal font-['Noto Sans']">+10</div>
                          </div>
                          <div className="flex justify-center items-center">
                            <div className="text-zinc-400 text-base font-normal font-['Noto Sans']">-115</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-1/3">
                <div className="w-full h-10 bg-neutral-50 flex items-center">
                  <div className="w-44 ml-44 flex items-center space-x-10">
                    <button className="w-14 h-5 flex flex-col justify-start items-start">
                      <div className="text-zinc-400 text-sm font-normal capitalize">matchup</div>
                    </button>
                    <button className="w-20 h-5 flex flex-col justify-start items-start">
                      <div className="text-zinc-400 text-sm font-normal capitalize">Line history</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}