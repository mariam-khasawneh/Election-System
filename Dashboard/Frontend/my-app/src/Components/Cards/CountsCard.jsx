import { MdOutlineHowToVote } from "react-icons/md";

function CountsCard({ name, count, icon: Icon }) {
  return (
    <div className="bg-white px-8 py-8 flex gap-2 items-center">
      <div className="bg-green-100 rounded-full h-12 w-12 flex items-center justify-center">
        <Icon size={24} className="text-green-900" />
      </div>
      <div>
        <div>{name}</div>
        <div className="font-bold">{count}</div>
      </div>
    </div>
  );
}

export default CountsCard;
