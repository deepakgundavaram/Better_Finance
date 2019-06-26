const router = require('express').Router();
const auth = require("../middleware/auth");

//this calculates the user debt length and sends back
//the amount of interest paid, the total amount and length 
router.post("/", auth, (req,res) => {
    let data = req.body.data;

    data.forEach((object) => {
        let monthlyRate = ((object.interest / 100) / 365) * 30;
        while(object.current > 0 && object.payment > 0){
            let monthlyInterest = (object.current * monthlyRate);
            object.accuredInterest += monthlyInterest;
            object.current = (object.current + monthlyInterest) - object.payment;
            console.log(object.current);
            object.months += 1; 
        }
    })

    res.send(data)
})



module.exports = router;