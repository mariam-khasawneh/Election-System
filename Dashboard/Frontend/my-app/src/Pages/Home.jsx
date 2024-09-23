import { MdOutlineHowToVote } from "react-icons/md";
import { TbUserSquare } from "react-icons/tb";

// CHARTS

// import CountsCard from "./Co"; // Ensure the import path is correct
import CountsCard from "../Components/Cards/CountsCard";

function Counts() {
  const countsList = [
    { id: 1, name: "عدد الناخبين", count: "1000", icon: TbUserSquare },
    { id: 2, name: "عدد المقترعين", count: "500", icon: MdOutlineHowToVote },
  ];

  return (
    <div className="p-12 flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {countsList.map(({ id, name, count, icon: Icon }) => (
          <CountsCard key={id} name={name} count={count} icon={Icon} />
        ))}
        {/* <DoughnutChartDemo /> */}
      </div>
    </div>
  );
}

export default Counts;
