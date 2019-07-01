import React, {Component} from 'react';
import axios from 'axios'
import "../styles/Spendings.css"


class Spendings extends Component{
    constructor(props){
        super();
        this.state ={
            payment:0,
            travel:0,
            transfer:0,
            food:0,
            recreational:0,
            paymentPercent: "0%",
            travelPercent:"0%",
            transferPercent:"0%",
            foodPercent:"0%",
            recreationalPercent:"0%",
            budgetLocked: false,
        }
        this.bugetHelper = this.bugetHelper.bind(this);
        this.saveBudget = this.saveBudget.bind(this);
    }

    componentWillMount(){
        if(sessionStorage.getItem("key") == null){
            this.props.history.push('/');
        }
    }

    componentDidMount(){
        axios.post("/api/plaid/accounts/transactions",null,  {headers: {"x-auth-token": sessionStorage.getItem("key")}})
        .then(results => {
            console.log(results.data)
            results.data.map((result) => {
                return( 
                    result.transactions.map((transaction) => {
                        switch(transaction.category[0]){
                            case "Payment": 
                                this.setState(prevState => ({payment: prevState.payment + transaction.amount }))
                                break;
                            case "Travel":
                                this.setState(prevState => ({travel: prevState.travel + transaction.amount }))
                                break;
                            case "Transfer":
                                this.setState(prevState => ({transfer: prevState.transfer + transaction.amount }))
                                break;
                            case "Food and Drink":
                                this.setState(prevState => ({food: prevState.food + transaction.amount }))
                                break;
                            case "Recreation":
                                this.setState(prevState => ({recreational: prevState.recreational + transaction.amount }))
                                break;
                            default:
                                break;
                        }
                }))
        })})
        .catch(err => console.log(err));

        //this is getting the users budget from the database
        axios.get("/api/budget/getBudget",{headers:{"x-auth-token":sessionStorage.getItem('key')}})
        .then(result => {
            const data = result.data;
            return(
                this.setState({paymentPercent:data.payment,
                    travelPercent:data.travel,
                    transferPercent:data.transfer,
                    foodPercent:data.food,
                    recreationalPercent:data.recreational,
                    budgetLocked:true,
                })
            )
        })
        .catch(err => console.log(err));
    }

    //this helper changes the percentage bar when ever the user inputs a number on the input
    bugetHelper(evt){
        //gets the state corresponding to the input and gets the percentage taken
        //from input
        let percent = (this.state[evt.target.name]/evt.target.value) * 100;
        let data = evt.target.name+"Percent";
        if(evt.target.value === "") percent = 0;
        this.setState({[data]:percent+"%"})
    }

    //this function saves the users input on the budget input 
    saveBudget(){
        axios.post("/api/budget/saveBudget", {data:{payment:this.state.paymentPercent, 
            travel:this.state.travelPercent,
            transfer:this.state.transferPercent, 
            food: this.state.foodPercent, 
            recreational: this.state.recreationalPercent }},
            {headers:{"x-auth-token": sessionStorage.getItem("key")}})
            .then(result => console.log(JSON.stringify(result.data)))
            .catch(err => console.log(err))


        //disable the inputs and change the button text
        this.setState(prevState => ({budgetLocked: !prevState.budgetLocked}))
    }

    render(){ 
        const {
            payment, 
            travel, 
            transfer, 
            food, 
            recreational,
            paymentPercent, 
            travelPercent, 
            transferPercent, 
            foodPercent, 
            recreationalPercent,
            budgetLocked
        } = this.state;
        
        return(
            <div className="spendingContainer" style={{justifyContent:budgetLocked ? "center":""}}>
                <h1 className="">Here is where you will be able to keep track of all your spendings</h1> 
                
                <p>Payment:${payment.toFixed(2)}</p>
                <div className="bar_input">
                    <div className="progressbarContainer">
                        <div className="progressbar" style={{width:paymentPercent}}>
                        </div>
                    </div>
                    <input disabled={budgetLocked} style={{display: budgetLocked ? "none":""}} placeholder="Budget" type="number" name="payment" onChange={this.bugetHelper} />
                </div>

                <p>Travel:${travel.toFixed(2)}</p>
                <div className="bar_input">
                    <div className="progressbarContainer">
                        <div className="progressbar" style={{width:travelPercent}}>
                        </div>
                    </div>
                    <input disabled={budgetLocked} style={{display: budgetLocked ? "none":""}} placeholder="Budget" type="number" name="travel" onChange={this.bugetHelper} />
                </div>

                <p>Transfer:${transfer.toFixed(2)}</p>
                <div className="bar_input">
                    <div className="progressbarContainer">
                        <div className="progressbar" style={{width:transferPercent}}>
                        </div>
                    </div>
                    <input disabled={budgetLocked} style={{display: budgetLocked ? "none":""}} placeholder="Budget" type="number" name="transfer" onChange={this.bugetHelper} />
                </div>


                <p>Food and Drink:${food.toFixed(2)}</p>
                <div className="bar_input">
                    <div className="progressbarContainer">
                        <div className="progressbar" style={{width:foodPercent}}>
                        </div>
                    </div>
                    <input disabled={budgetLocked} style={{display: budgetLocked ? "none":""}} placeholder="Budget" type="number" name="food" onChange={this.bugetHelper} />
                </div>

                <p>Recreational:${recreational.toFixed(2)}</p>
                <div className="bar_input">
                    <div className="progressbarContainer">
                        <div className="progressbar" style={{width:recreationalPercent}}>
                        </div>
                    </div>
                    <input disabled={budgetLocked} style={{display: budgetLocked ? "none":""}} placeholder="Budget" type="number" name="recreational" onChange={this.bugetHelper} />
                </div>

                <button onClick={this.saveBudget} className="budget_Btn" style={{backgroundColor:budgetLocked? "green":"red"}}> {budgetLocked ? "Reset Budget":"Lock Budget"} </button>
            </div>
        )
    }
}

export default Spendings;