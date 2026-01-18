import FoodLog from '../models/FoodLog.js';


export const addFood = async (req, res) => {
	try {
		const { foodName, calories, protein, carbs, fat } = req.body;

		const food = await FoodLog.create({
			user: req.user.id,
			foodName,
			calories,
			protein,
			carbs,
			fat
		});

		res.status(201).json(food);

	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};


export const getFoods = async (req, res) => {
	try {
		const foods = await FoodLog.find({ user: req.user.id })
			.sort({ date: -1 });

		res.json(foods);

	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};


export const updateFood = async (req, res) => {
  try {
    const food = await FoodLog.findOne({
      _id: req.params.id,
      user: req.user.id, // ownership check
    });

    if (!food) {
      return res.status(404).json({
        message: "Food not found or not authorized",
      });
    }

    const updatedFood = await FoodLog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedFood);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



export const deleteFood = async (req, res) => {
	try {
		const food = await FoodLog.findById(req.params.id);

		if (!food) {
			return res.status(404).json({ message: 'Food not found' });
		}

		if (food.user.toString() !== req.user) {
			return res.status(401).json({ message: 'Not authorized' });
		}

		await food.deleteOne();

		res.json({ message: 'Food removed' });

	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const getFoodById = async (req, res) => {

	try {
		const food = await FoodLog.findById(req.params.id);

		if (!food) {
			return res.status(404).json({ message: 'Food not found' });
		}

		res.json(food);

	} catch (error) {
		res.status(500).json({ message: error.message });

	}

}