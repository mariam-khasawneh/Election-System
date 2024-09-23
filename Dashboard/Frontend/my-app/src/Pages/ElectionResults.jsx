import React, { useState, useEffect } from "react";
import axios from "axios";
import ButtonGroup from "../Components/ButtonGroup";
import LocalVotingStatistics from "../Components/Charts/LocalVotingStatistics";
import PartyVotingStatistics from "../Components/Charts/PartyVotingStatistics";

const Statistics = () => {
  return (
    <div className="p-12 flex flex-col gap-12">
      <div>
        <h2 className="text-2xl font-bold mb-4">نسب الاقتراع </h2>
        <div className="grid grid-cols-2  gap-8">
          <LocalVotingStatistics />
          <PartyVotingStatistics />
        </div>
      </div>
      <LocalResultsComponent />
    </div>
  );
};

function LocalResultsComponent() {
  const [finalResults, setFinalResults] = useState(null);
  const [listNames, setListNames] = useState({});
  const [listVotes, setListVotes] = useState({});
  const [loading, setLoading] = useState(true);
  const [apiUrl, setApiUrl] = useState(
    "http://localhost:3000/api/final-results/1"
  );
  const buttons = [
    {
      label: "دائرة عمان الاولى",
      id: 1,
      apiUrl: "http://localhost:3000/api/final-results/1",
      onClick: () =>
        handleButtonClick("http://localhost:3000/api/final-results/1"),
    },
    {
      label: "دائرة عمان الثانية",
      id: 2,
      apiUrl: "http://localhost:3000/api/final-results/2",
      onClick: () =>
        handleButtonClick("http://localhost:3000/api/final-results/2"),
    },
    {
      label: "دائرة الزرقاء",
      id: 3,
      apiUrl: "http://localhost:3000/api/final-results/3",
      onClick: () =>
        handleButtonClick("http://localhost:3000/api/final-results/3"),
    },
  ];
  const handleButtonClick = (url) => {
    setApiUrl(url);
    setLoading(true);
  };
  useEffect(() => {
    const fetchFinalResults = async () => {
      try {
        const response = await axios.get(apiUrl);
        const {
          totalVotes,
          circleThreshold,
          listsAboveThreshold,
          seatWeight,
          sumListsAboveThreshold,
          availableSeats,
          finalDistribution,
        } = response.data;
        // Create a map of list IDs and their corresponding number of votes
        const listVotesMap = listsAboveThreshold.reduce((acc, list) => {
          acc[list.id] = list.numOfVotes;
          return acc;
        }, {});
        setListVotes(listVotesMap);
        // Fetch list names for each listId in finalDistribution
        const listIds = finalDistribution.map((item) => item.listId);
        listIds.forEach(async (listId) => {
          try {
            const listResponse = await axios.get(
              `http://localhost:3000/api/local-list/${listId}`
            );
            setListNames((prevNames) => ({
              ...prevNames,
              [listId]: listResponse.data.name,
            }));
          } catch (error) {
            console.error(`Error fetching list name for id ${listId}:`, error);
          }
        });
        // Update the final distribution with seat ratio calculation
        const updatedFinalDistribution = finalDistribution.map((item) => {
          const votes = listVotesMap[item.listId];
          const seatRatio = votes / seatWeight;
          const correctSeats = Math.floor(seatRatio);
          const remainder = (seatRatio - correctSeats).toFixed(2);
          return {
            ...item,
            votes,
            seatRatio,
            correctSeats,
            remainder,
          };
        });
        // Calculate the total seats distributed
        const totalSeatsDistributed = updatedFinalDistribution.reduce(
          (acc, item) => acc + item.correctSeats,
          0
        );
        // Distribute remaining seats
        const remainingSeats = availableSeats - totalSeatsDistributed;
        const sortedFinalDistribution = [...updatedFinalDistribution].sort(
          (a, b) => b.remainder - a.remainder
        );
        let distributedSeats = [...updatedFinalDistribution];
        let remainingSeatsToDistribute = remainingSeats;
        for (
          let i = 0;
          i < sortedFinalDistribution.length && remainingSeatsToDistribute > 0;
          i++
        ) {
          const item = sortedFinalDistribution[i];
          const index = distributedSeats.findIndex(
            (d) => d.listId === item.listId
          );
          if (index !== -1) {
            distributedSeats[index].finalSeats =
              distributedSeats[index].correctSeats + 1;
            remainingSeatsToDistribute--;
          }
        }
        // Update final distribution with final seats
        const finalDistributionWithSeats = updatedFinalDistribution.map(
          (item) => {
            const finalItem = distributedSeats.find(
              (d) => d.listId === item.listId
            );
            return {
              ...item,
              finalSeats: finalItem ? finalItem.finalSeats : item.correctSeats,
            };
          }
        );
        setFinalResults({
          totalVotes,
          circleThreshold,
          seatWeight,
          sumListsAboveThreshold,
          availableSeats,
          finalDistribution: finalDistributionWithSeats,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching final results:", error);
        setLoading(false);
      }
    };
    fetchFinalResults();
  }, [apiUrl]); // Trigger the effect when apiUrl changes
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className=" py-6">
      <h2 className="text-2xl font-bold mb-4">
        النتائج الاولية للقوائم المحلية
      </h2>
      <div className="pb-6">
        <ButtonGroup buttons={buttons} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-md shadow">
          <p className="text-gray-700 font-bold">مجموع اصوات الدائرة</p>
          <p className="text-gray-900 text-lg">{finalResults.totalVotes}</p>
        </div>
        <div className="bg-white p-4 rounded-md shadow">
          <p className="text-gray-700 font-bold">نسبة الحسم</p>
          <p className="text-gray-900 text-lg">
            {finalResults.circleThreshold}
          </p>
        </div>
        <div className="bg-white p-4 rounded-md shadow">
          <p className="text-gray-700 font-bold">مجموع الأصوات بعد العتبة</p>
          <p className="text-gray-900 text-lg">
            {finalResults.sumListsAboveThreshold}
          </p>
        </div>
        <div className="bg-white p-4 rounded-md shadow">
          <p className="text-gray-700 font-bold">وزن المقعد</p>
          <p className="text-gray-900 text-lg">{finalResults.seatWeight}</p>
        </div>
        <div className="bg-white p-4 rounded-md shadow">
          <p className="text-gray-700 font-bold">عدد مقاعد الدائرة</p>
          <p className="text-gray-900 text-lg">{finalResults.availableSeats}</p>
        </div>
      </div>
      <h3 className="text-xl font-bold mt-6 mb-4">توزيع المقاعد النهائي</h3>
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-300 font-bold">
              <th className="px-4 py-3 text-right">إسم القائمة</th>
              <th className="px-4 py-3 text-right">عدد الأصوات</th>
              <th className="px-4 py-3 text-right">نسبة المقاعد</th>
              <th className="px-4 py-3 text-right">المقاعد الصحيحة</th>
              <th className="px-4 py-3 text-right">البواقي</th>
              <th className="px-4 py-3 text-right">عدد المقاعد النهائي</th>
            </tr>
          </thead>
          <tbody>
            {finalResults.finalDistribution.map((item) => (
              <tr
                key={item.listId}
                className="border-b hover:bg-gray-100 transition-colors duration-300"
              >
                <td className="px-4 py-2">
                  {listNames[item.listId] || "Loading..."}
                </td>
                <td className="px-4 py-2">{item.votes}</td>
                <td className="px-4 py-2">{item.seatRatio.toFixed(2)}</td>
                <td className="px-4 py-2">{item.correctSeats}</td>
                <td className="px-4 py-2">{item.remainder}</td>
                <td className="px-4 py-2">
                  {item.finalSeats || item.correctSeats}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  // return <div>hhh</div>;
}

export default Statistics;

//////////////////////////////////////////////////////////////////////////////////////////
