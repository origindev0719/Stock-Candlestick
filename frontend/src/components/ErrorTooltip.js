
export const ErrorTooltip = ({ message }) => {
  return (
    <div
      className={`
        absolute top-0 left-full rounded-md px-2 py-1 ml-6
        bg-white text-zinc-800 text-xs z-10 overflow-hidden
        transition-all whitespace-no-wrap w-2/5
        visible opacity-100 translate-x-0
        border border-red focus:shadow-outline
      `}
    >
      {message}
    </div>
  );
};