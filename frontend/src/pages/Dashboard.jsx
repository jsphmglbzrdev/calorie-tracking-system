import { useEffect, useState } from 'react';
import API from '../api/axios.jsx';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    API.get('/food').then((res) => setFoods(res.data));
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-bold">Today's Calories</h1>
        <Link to="/add-food" className="bg-green-500 text-white px-4 py-2 rounded">
          Add Food
        </Link>
      </div>

      <div className="space-y-3">
        {foods.map((food) => (
          <div key={food._id} className="p-4 bg-white rounded shadow flex justify-between">
            <span>{food.foodName}</span>
            <span>{food.calories} kcal</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
