const Expense = require("../model/ExpenseSchmea");
const TyreSchemea = require("../model/TyreSchemea");

const addExpense = async (req, res) => {
  try {
    const data = req.body;
    const tyre_id = data.tyre_id;
    const tyre = await TyreSchemea.findOne({ tyre_id });
    if(!tyre){
      return res.status(400).json({
        message: "Tyre not found",
      });
    }
    tyre.Miscellaneous_cost =Number(tyre.Miscellaneous_cost)+Number(data.cost);
    await tyre.save();

    const expense = new Expense(data);
    await expense.save();
    res.json({
      message: "Expense added successfully",
    });
  } catch (error) {
    res.status(400).json({
      error: "Failed to add expense",
    });
  }
};

const getExpenses = async (req, res) => {
  const { tyre_id } = req.params;
  console.log(tyre_id);

  try {
    //latest first
    const expenses = await Expense.find({ tyre_id }).sort({ date: -1 });
    res.json(expenses).status(200);
  } catch (error) {
    res.status(400).json({
      message: "Failed to get expenses",
    });
  }
};


const topPerformingTyres = async (req, res) => {
  try {
    const tyres = await TyreSchemea.find();

    const validTyres = tyres.map((tyre) => {
      console.log("TyreData", tyre.Miscellaneous_cost, tyre.purchase_cost, tyre.operating_hours);

      const costPerWorkingHour = (tyre.Miscellaneous_cost + tyre.purchase_cost) / tyre.operating_hours
    

      console.log(costPerWorkingHour, "Cost");
      return {
        ...tyre.toObject(),
        costPerWorkingHour : costPerWorkingHour.toFixed(),
      };
    });

  

    const sortedTyres = validTyres.sort((a, b) => a.costPerWorkingHour - b.costPerWorkingHour);
     console.log(sortedTyres);
     
    const uniqueTyres = [];
    const seenMakes = new Set();

    for (const tyre of sortedTyres) {
      if (!seenMakes.has(tyre.tyre_make)) {
        uniqueTyres.push(tyre);
        seenMakes.add(tyre.tyre_make);
      }
    }

    // Get the top 5 lowest CPWH unique tyres
    const top5Tyres = uniqueTyres.slice(0, 5);

    res.status(200).json(top5Tyres);
  } catch (error) {
    res.status(400).json({
      message: "Failed to get top performing tyres",
      error: error.message,
    });
  }
};

const LeastPerformingTyres = async (req, res) => {
  try {
    const tyres = await TyreSchemea.find();

    const validTyres = tyres.map((tyre) => {
     // console.log("TyreData", tyre.Miscellaneous_cost, tyre.purchase_cost, tyre.operating_hours);

      const costPerWorkingHour = (tyre.Miscellaneous_cost + tyre.purchase_cost) / tyre.operating_hours
    

      return {
        ...tyre.toObject(),
        costPerWorkingHour : costPerWorkingHour.toFixed(),
      };
    });

  

const sortedTyres = validTyres.sort((a, b) => b.costPerWorkingHour - a.costPerWorkingHour);
     console.log(sortedTyres);
     
    const uniqueTyres = [];
    const seenMakes = new Set();

    for (const tyre of sortedTyres) {
      if (!seenMakes.has(tyre.tyre_make)) {
        uniqueTyres.push(tyre);
        seenMakes.add(tyre.tyre_make);
      }
    }

    // Get the top 5 Highest CPWH unique tyres
    const top5Tyres = uniqueTyres.slice(0, 5);

    res.status(200).json(top5Tyres);
  } catch (error) {
    res.status(400).json({
      message: "Failed to get Least performing tyres",
      error: error.message,
    });
  }
};



const topMiscellaneousCostTyres = async (req, res) => {
  try {
    const tyres = await TyreSchemea.find();

   

    const sortedTyres = tyres.sort((a, b) => b.Miscellaneous_cost - a.Miscellaneous_cost);
  
    console.log(sortedTyres);

    

    const top5Tyres = sortedTyres.slice(0, 5);
    const tyrewithExpense = await Promise.all(
      top5Tyres.map(async (tyre) => {
        const data = await Expense.find({ tyre_id: tyre.tyre_id });
        return {
          ...tyre.toObject(),
          data,
        };
      })
    );
    
    res.status(200).json(tyrewithExpense);
    
  } catch (error) {
    res.status(400).json({
      message: "Failed to get tyres with highest miscellaneous cost",
      error: error.message,
    });
  }
};

const getPerformanceScores = async (req, res) => {
  try {
    // Fetch all tyres
    const tyres = await TyreSchemea.find();

    // Fetch all expenses
    const expenses = await Expense.find();

    // Group expenses by tyre_make
    const expenseCountByMake = {};
    for (const expense of expenses) {
      const tyre = await TyreSchemea.findOne({ tyre_id: expense.tyre_id });
      if (tyre) {
        const make = tyre.tyre_make;
        expenseCountByMake[make] = (expenseCountByMake[make] || 0) + 1;
      }
    }

    // Calculate total expenses for scaling
    const totalExpenseCount = expenses.length;

    // Create a complete list of tyre makes with scores
    const performanceScores = [];
    const seenMakes = new Set();

    for (const tyre of tyres) {
      const make = tyre.tyre_make;

      // Skip duplicate makes
      if (seenMakes.has(make)) continue;

      seenMakes.add(make);

      const expenseCount = expenseCountByMake[make] || 0; // Default to 0 if no expenses
      const performanceScore = ((1 - expenseCount / totalExpenseCount) * 100).toFixed(2);

      performanceScores.push({
        tyre_make: make,
        expense_count: expenseCount,
        performance_score: parseFloat(performanceScore), // Parse to number for easier sorting
      });
    }

    // Sort by performance score (higher score = better performance)
    const sortedScores = performanceScores.sort((a, b) => b.performance_score - a.performance_score);

    res.status(200).json(sortedScores);
  } catch (error) {
    res.status(400).json({
      message: "Failed to calculate performance scores",
      error: error.message,
    });
  }
};



module.exports = {
  addExpense,
  getExpenses,
  topPerformingTyres,
  LeastPerformingTyres,
  topMiscellaneousCostTyres,
  getPerformanceScores
};
