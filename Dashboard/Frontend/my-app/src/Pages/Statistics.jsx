import React from "react";
import LocalVotingStatistics from "../Components/Charts/LocalVotingStatistics";
import PartyVotingStatistics from "../Components/Charts/PartyVotingStatistics";

const Statistics = () => {
  return (
    <div className="grid grid-cols-2 p-12 gap-8">
      <LocalVotingStatistics />
      <PartyVotingStatistics />
    </div>
  );
};

export default Statistics;
