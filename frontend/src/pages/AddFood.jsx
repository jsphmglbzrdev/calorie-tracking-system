import { useState } from 'react';
import API from '../api/axios.jsx';
import { useNavigate } from 'react-router-dom';

const AddFood = () => {
  const navigate = useNavigate();
  const [food, setFood] = useState({ foodName: '', calories: '' });

  const submitHandler = async (e) => {
    e.preventDefault();
    await API.post('/food', food);
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={submitHandler}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-xl font-bold">Add Food</h2>

        <input
          placeholder="Food Name"
          className="input"
          onChange={(e) => setFood({ ...food, foodName: e.target.value })}
        />

        <input
          type="number"
          placeholder="Calories"
          className="input"
          onChange={(e) => setFood({ ...food, calories: e.target.value })}
        />

        <button className="w-full bg-green-500 text-white p-2 rounded">
          Save
        </button>
      </form>
    </div>
  );
};

export default AddFood;
