import FoodTrackContainer from "./FoodTrackContainer.jsx"
import FoodStatus from "./FoodStatus.jsx"
const Main = ({setIsUpdateModalOpen}) => {
	return (
		<div className="bg-white rounded-2xl p-2 shadow-2xl scroll-smooth mt-4 w-full min-h-screen overflow-auto thin-scrollbar">
			<FoodStatus/>
			<FoodTrackContainer setIsUpdateModalOpen={setIsUpdateModalOpen}/>
		</div>
	)
}

export default Main