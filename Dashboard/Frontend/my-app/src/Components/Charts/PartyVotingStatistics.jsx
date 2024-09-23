import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const PartyVotingStatistics = () => {
  const [partyVotingPercentage, setPartyVotingPercentage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/party-voting-percentage"
        );
        setPartyVotingPercentage(parseFloat(response.data.votingPercentage));
      } catch (error) {
        console.error("Error fetching party voting data:", error);
      }
    };

    fetchData();
  }, []);

  const data = [
    { name: " نسبة الاصوات", value: partyVotingPercentage },
    { name: "النسبة المتبقية ", value: 100 - partyVotingPercentage },
  ];

  const COLORS = ["#00C49F", "#FF8042"];

  return (
    <div style={{ width: "100%", height: 300 }} className="bg-white p-6">
      <h2 className="text-center font-bold">
        نسبة الاقتراع في القوائم الحزبية{" "}
      </h2>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            // label={({ name, percent }) =>
            //   `${name}: ${(percent * 100).toFixed(2)}%`
            // }
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PartyVotingStatistics;
