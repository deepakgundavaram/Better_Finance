import React from 'react';
import axios from 'axios';
import DashboardSection from "./layout/DashboardSection"
import "../styles/Dashboard.css";


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            transactions: [],
            balance: 0,
        }
    }

    //checking if the user is logged in yet
    componentWillMount() {
        if (sessionStorage.getItem("key") == null) {
            this.props.history.push('/');
        }
    }

    //call for the users transactions
    componentDidMount() {
        //this call is to get the users transactions for the last month
        axios.post("/api/plaid/accounts/transactions", null,
            {
                headers: { "x-auth-token": sessionStorage.getItem("key") }
            }).then((results) => {
                this.setState({
                    transactions: results.data.map(result => {
                        return result.transactions;
                    })
                });
                console.log(this.state.transactions);
            }).then(() => {
                this.setState({ transactions: this.state.transactions[0] })
            }).catch(err => console.log(err));

        //this calls is to get the users total balance
        axios.post("/api/plaid/account/balance", null,
            {
                headers: { "x-auth-token": sessionStorage.getItem("key") }
            }).then((results) => {
                console.log(results.data);
                this.setState({
                    balance: results.data.netWorth.balance,
                    name: results.data.name
                })
                console.log(`this the networth ${this.state.balance} and this is the debt ${this.state.debt}`)
            }).catch((err) => console.log(err));
    }


    render() {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2
        })
        const { name, balance } = this.state;
        return (
            <div className="dashboardContainer">
                <section className="dashBoard-top">
                    <div className="dashBoard-header">
                        <div className="dashBoard-leftSide">
                            <h3 className="dashBoard-h3"> Hello, </h3>
                            <h1 className="dashBoard-h1"> {name} </h1>
                        </div>
                        <div className="dashBoard-rightSide">
                            <h3 className="dashBoard-h3"> networth, </h3>
                            <h1 className="dashBoard-h1"> {formatter.format(balance)} </h1>
                        </div>
                    </div>
                </section>
                <section className="chart">
                    <table border="5" width="100%" cellPadding="4" cellSpacing="3">
                        <tbody >
                            <tr>
                                <th colSpan="3"><h2>Account History</h2></th>
                            </tr>
                            <tr>
                                <th> Date </th>
                                <th> Category </th>
                                <th> Amount </th>
                            </tr>
                            {this.state.transactions.map((items, key) => {
                                let category = "";
                                //data is the index and items.category is the object
                                for (var data in items.category) {
                                    category = items.category[data];
                                    break; //so that it only grabs the first category type
                                }
                                return (
                                    <DashboardSection
                                        key={key}
                                        date={items.date}
                                        category={category}
                                        amount={formatter.format(items.amount)}
                                    />
                                )

                            })}
                        </tbody>
                    </table>
                </section>
                <section>

                </section>
            </div>
        )
    }
}

export default Dashboard;