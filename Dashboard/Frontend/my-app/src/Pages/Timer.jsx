import axios from 'axios';
import { useState } from 'react';

function SetCountdown() {
  const [days, setDays] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/setCountdown', {
        days,
        hours,
        minutes,
      });
      alert('تم حفظ الوقت بنجاح!');
    } catch (error) {
      console.error('Error saving countdown:', error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">إعداد الوقت النهائي</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">الأيام:</label>
        <input
          type="number"
          value={days}
          onChange={(e) => setDays(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />

        <label className="block mb-2 mt-4">الساعات:</label>
        <input
          type="number"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />

        <label className="block mb-2 mt-4">الدقائق:</label>
        <input
          type="number"
          value={minutes}
          onChange={(e) => setMinutes(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />

        <button type="submit" className="mt-4 bg-green-500 text-white py-2 px-4 rounded">
          حفظ الوقت
        </button>
      </form>
    </div>
  );
}

export default SetCountdown;
