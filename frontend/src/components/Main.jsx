import FoodTrackContainer from "./FoodTrackContainer.jsx"
import FoodStatus from "./FoodStatus.jsx"
import {useContext, useEffect} from 'react'
import { FoodContext } from "../context/FoodContext.jsx"

const Main = ({setIsUpdateModalOpen}) => {

	const { foodData } = useContext(FoodContext);

	
	console.log(foodData)
	return (
		<div className="bg-white rounded-2xl p-2 shadow-2xl scroll-smooth mt-4 w-full min-h-screen overflow-auto thin-scrollbar">
			<FoodStatus/>
			<FoodTrackContainer setIsUpdateModalOpen={setIsUpdateModalOpen}/>

			{
				foodData.length === 0 && (
					<div className="text-gray-600 flex items-center flex-col justify-center h-screen">
						<div className="text-lg ">There is no food data to render.</div>
						<span className="text-sm">Start tracking your calories by clicking the add entry button.</span>
					</div>
				)
			}
		</div>
	)
}

export default Main