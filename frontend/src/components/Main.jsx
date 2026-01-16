import FoodTrackContainer from "./FoodTrackContainer.jsx"
import FoodStatus from "./FoodStatus.jsx"
const Main = () => {
	return (
		<div className="bg-white rounded-2xl shadow-2xl p-6 scroll-smooth mt-4 h-screen w-full overflow-auto thin-scrollbar">
			<FoodStatus/>
			<FoodTrackContainer/>
		</div>
	)
}

export default Main