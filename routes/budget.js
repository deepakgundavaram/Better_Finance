const router = require("express").Router();
const auth = require("../middleware/auth");
const Account = require("../models/Account");


//this gets the budget in the databse
rotuer.get("/getBudget", auth, async(req,res) => {
    const id = req.user._id;
    try{ 
        const budget = await Account.findById({userId:id});
    }
    catch{
        res.status(500).send("something went wrong in the database");
    }

    res.send(budget.budget);
})


//this save the budget in the database
router.post("/saveBudget", auth, async(req,res) => {
    const user = req.user_.id
    const account = await Account.findById({userId:user});
    const data = res.body.data;

    //save the data in data
    account.update({userId:user}, )
})

module.exports = router;