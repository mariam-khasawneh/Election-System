import React, { useState } from "react";
import axios from "axios";

const VoteTable = () => {
  const [circleId, setCircleId] = useState("");
  const [listsData, setListsData] = useState([]);
  const [totalVotes, setTotalVotes] = useState(null);
  const [threshold, setThreshold] = useState(null);
  const [error, setError] = useState("");

  const handleFetchData = async () => {
    try {
      if (!circleId) {
        setError("مطلوب إدخال معرف الدائرة");
        return;
      }

      setError("");

      // Fetch lists data
      const listsResponse = await axios.get(
        `http://localhost:3000/api/local-lists`
      );
      setListsData(listsResponse.data);

      // Fetch lists by circle id
      const listsCirclesResponse = await axios.get(
        `http://localhost:3000/api/local-list/circle/${circleId}`
      );
      setListsData(listsCirclesResponse.data);

      // Fetch total votes for circle
      const totalVotesResponse = await axios.get(
        `http://localhost:3000/api/circle/${circleId}/votes`
      );
      setTotalVotes(totalVotesResponse.data);

      // Fetch threshold for circle
      const thresholdResponse = await axios.get(
        `http://localhost:3000/api/circle/${circleId}/threshold`
      );
      setThreshold(thresholdResponse.data);

      // Num of votes for lists in circle
      const votesNumber = listsCirclesResponse.data.localList.map(
        (list) => list.numOfvotes
      );

      console.log(threshold);
    } catch (err) {
      setError("خطأ في جلب البيانات");
      console.error("Error:", err);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen rtl">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-black text-white p-6 text-right">
          <h1 className="text-3xl font-bold">
            عداد الأصوات بالقوائم المحلية حسب الدائرة
          </h1>
        </div>
        <div className="p-6">
          <div className="mb-6 flex items-center">
            <button
              onClick={handleFetchData}
              className="mr-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              بيانات الأصوات
            </button>
            <input
              type="text"
              placeholder="ادخل رقم الدائرة"
              name="circleId"
              id="circleId"
              className="flex-1 min-w-[150px] text-right p-2 focus:ring-black focus:border-black block w-full rounded-md sm:text-sm border-gray-300"
              value={circleId}
              onChange={(e) => setCircleId(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 mt-4 text-right">{error}</p>}

          {listsData.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4 text-right">
                الأصوات لكل قائمة محلية
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 rtl">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        اسم القائمة
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        الأصوات
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        تجاوز العتبة
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {listsData.map((item, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                          {item.list_name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                          {item.vote_count}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                          {item.exceedsThreshold ? "نعم" : "لا"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {totalVotes !== null && (
            <div className="mt-8 bg-white rounded-lg p-6 shadow-md text-right">
              <h2 className="text-xl font-semibold mb-2">
                إجمالي الأصوات لجميع القوائم
              </h2>
              <p className="text-3xl font-bold text-black">{totalVotes}</p>
              {threshold !== null && (
                <p className="text-lg text-gray-700 mt-4">
                  قيمة العتبة: {threshold.toFixed(2)}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoteTable;
