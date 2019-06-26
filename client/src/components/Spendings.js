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

    bugetHelper(){

    }

    render(){
        const {payment, travel, transfer, food, recreational} = this.state;
        console.log(payment + "amount");
        return(
            <div className="spendingContainer">
                <h1 className="">Here is where you will be able to keep track of all your spendings</h1> 

                <p>Payment</p>
                <div className="bar_input">
                    <div className="progressbarContainer">
                        <div className="progressbar" style={{width:payment}}>
                        </div>
                    </div>
                    <input placeholder="Budget" type="number" name="payment" onChange={this.bugetHelper} />
                </div>

                <p>Travel</p>
                <div className="bar_input">
                    <div className="progressbarContainer">
                        <div className="progressbar" style={{width:travel}}>
                        </div>
                    </div>
                    <input placeholder="Budget" type="number" name="travel" onChange={this.bugetHelper} />
                </div>

                <p>Transfer</p>
                <div className="bar_input">
                    <div className="progressbarContainer">
                        <div className="progressbar" style={{width:transfer}}>
                        </div>
                    </div>
                    <input placeholder="Budget" type="number" name="transfer" onChange={this.bugetHelper} />
                </div>


                <p>Food and Drink</p>
                <div className="bar_input">
                    <div className="progressbarContainer">
                        <div className="progressbar" style={{width:food}}>
                        </div>
                    </div>
                    <input placeholder="Budget" type="number" name="food" onChange={this.bugetHelper} />
                </div>

                <p>Recreational</p>
                <div className="bar_input">
                    <div className="progressbarContainer">
                        <div className="progressbar" style={{width:recreational}}>
                        </div>
                    </div>
                    <input placeholder="Budget" type="number" name="recreational" onChange={this.bugetHelper} />
                </div>
            </div>
        )
    }
}

export default Spendings;