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
        }
        this.bugetHelper = this.bugetHelper.bind(this);
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
                result.transactions.map(transaction => {
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
                })
        })})
        .catch(err => console.log(err));
    }

    bugetHelper(evt){
        //gets the state corresponding to the input and gets the percentage taken
        //from input
        let percent = (this.state[evt.target.name]/evt.target.value) * 100;
        let data = evt.target.name+"Percent";
        if(evt.target.value === "") percent = 0;
        this.setState({[data]:percent+"%"})
    }

    saveBudget(){
        
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
        } = this.state;
        
        return(
            <div className="spendingContainer">
                <h1 className="">Here is where you will be able to keep track of all your spendings</h1> 
                
                <p>Payment:${payment.toFixed(2)}</p>
                <div className="bar_input">
                    <div className="progressbarContainer">
                        <div className="progressbar" style={{width:paymentPercent}}>
                        </div>
                    </div>
                    <input placeholder="Budget" type="number" name="payment" onChange={this.bugetHelper} />
                </div>

                <p>Travel:${travel.toFixed(2)}</p>
                <div className="bar_input">
                    <div className="progressbarContainer">
                        <div className="progressbar" style={{width:travelPercent}}>
                        </div>
                    </div>
                    <input placeholder="Budget" type="number" name="travel" onChange={this.bugetHelper} />
                </div>

                <p>Transfer:${transfer.toFixed(2)}</p>
                <div className="bar_input">
                    <div className="progressbarContainer">
                        <div className="progressbar" style={{width:transferPercent}}>
                        </div>
                    </div>
                    <input placeholder="Budget" type="number" name="transfer" onChange={this.bugetHelper} />
                </div>


                <p>Food and Drink:${food.toFixed(2)}</p>
                <div className="bar_input">
                    <div className="progressbarContainer">
                        <div className="progressbar" style={{width:foodPercent}}>
                        </div>
                    </div>
                    <input placeholder="Budget" type="number" name="food" onChange={this.bugetHelper} />
                </div>

                <p>Recreational:${recreational.toFixed(2)}</p>
                <div className="bar_input">
                    <div className="progressbarContainer">
                        <div className="progressbar" style={{width:recreationalPercent}}>
                        </div>
                    </div>
                    <input placeholder="Budget" type="number" name="recreational" onChange={this.bugetHelper} />
                </div>

                <button onClick={this.saveBudget}> Lock Budget </button>
            </div>
        )
    }
}

export default Spendings;