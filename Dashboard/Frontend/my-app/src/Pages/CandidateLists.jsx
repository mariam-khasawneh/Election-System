import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ButtonGroup from "../Components/ButtonGroup";

function CandidateLists() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiUrl, setApiUrl] = useState("http://localhost:3000/api/local-lists");

  const buttons = [
    {
      label: "القوائم المحلية",
      id: 2,
      apiUrl: "http://localhost:3000/api/local-lists",
      onClick: () => handleButtonClick("http://localhost:3000/api/local-lists"),
    },
    {
      label: "القوائم الحزبية",
      id: 3,
      apiUrl: "http://localhost:3000/api/party-lists",
      onClick: () => handleButtonClick("http://localhost:3000/api/party-lists"),
    },
  ];

  const handleButtonClick = (url) => {
    setApiUrl(url);
    setLoading(true);
  };

  useEffect(() => {
    axios
      .get(apiUrl)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
        setError("There was an error fetching the data.");
        setLoading(false);
      });
  }, [apiUrl]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="px-12 py-6 flex flex-col gap-6">
      <div className="font-medium text-lg">طلبات الترشيح</div>
      <div>
        <ButtonGroup buttons={buttons} />
      </div>
      <div className="grid gap-4">
        {data.map((item) => (
          <LocalRequestRow
            key={item.id}
            listId={item.id}
            listName={item.name}
            listCircle={item.circle_id}
            apiUrl={apiUrl}
          />
        ))}
      </div>
    </div>
  );
}

function LocalRequestRow({ listId, listName, listCircle, apiUrl }) {
  const navigate = useNavigate();

  const handleViewRequest = () => {
    console.log("Navigating with listId:", listId);
    navigate(`/local-candidate-info/${listId}`);
  };

  const handleAcceptRequest = () => {
    // Add logic to accept the request
    console.log("Accepting request for listId:", listId);
  };

  const handleRejectRequest = () => {
    // Add logic to reject the request
    console.log("Rejecting request for listId:", listId);
  };

  return (
    <div className="bg-white p-6 flex justify-between items-center shadow-sm rounded-md">
      <div className="flex items-center gap-4">
        <div className="flex flex-col gap-1">
          <p className="font-semibold text-lg text-gray-800">{listName}</p>
        </div>
      </div>
      {apiUrl === "http://localhost:3000/api/party-lists" ? (
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleAcceptRequest}
            className="focus:outline-none bg-green-500 hover:bg-green-600 text-white font-medium text-sm px-5 py-2.5 rounded-md"
          >
            قبول
          </button>
          <button
            type="button"
            onClick={handleRejectRequest}
            className="focus:outline-none bg-red-500 hover:bg-red-600 text-white font-medium text-sm px-5 py-2.5 rounded-md"
          >
            رفض
          </button>
        </div>
      ) : (
        <div>
          <button
            type="button"
            onClick={handleViewRequest}
            className="focus:outline-none bg-teal-500 hover:bg-teal-600 text-white font-medium text-sm px-5 py-2.5 rounded-md"
          >
            عرض الطلب
          </button>
        </div>
      )}
    </div>
  );
}

export default CandidateLists;
