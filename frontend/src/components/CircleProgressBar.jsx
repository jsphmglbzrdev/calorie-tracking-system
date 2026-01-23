import { useContext } from "react";
import { FoodContext } from "../context/FoodContext";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CircleProgressBar = () => {

	const { percentage } = useContext(FoodContext);
	console.log(percentage)
  return (
    <div className="w-32 h-32 text-center">
      <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        styles={buildStyles({
          rotation: 0,

          // Rounded edges look smoother
          strokeLinecap: "round",

          textSize: "14px",

          pathTransitionDuration: 0.6,

          // 🌱 Green theme
          pathColor: "#16a34a", // Tailwind green-600
          textColor: "#166534", // Tailwind green-800
          trailColor: "#dcfce7", // Tailwind green-100
          backgroundColor: "#f0fdf4",
        })}
      />
    </div>
  );
};

export default CircleProgressBar;
