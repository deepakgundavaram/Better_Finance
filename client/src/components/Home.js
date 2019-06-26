import React from 'react'
import PlaidLinkButton from 'react-plaid-link-button';
import axios from "axios";
import "../styles/Home.css"
class Home extends React.Component {

    constructor(props){
        super(props);
        this.state ={
            loaded:false,
            onSubmit: this.onSubmit.bind(this),
            public_token: null,
            metadata: null
        }
    }

    componentWillMount(){
        axios.get('/api/plaid/account/find',{headers:{'x-auth-token': sessionStorage.getItem("key")}})
        .then((response) => {
            console.log("this is the response: " + response.data);
            if(response.data === true) this.props.history.push('/dashboard');
        })
        .catch((err) => {
            console.log("user does not have an account");
        })
    }

    onSubmit = (metadata, public_token) => {
        axios.post('/api/plaid/account/add',{
                public_token: this.state.public_token,
                metadata: this.state.metadata,
            
            },{ headers:{"x-auth-token": sessionStorage.getItem("key")}
        }).then(() => this.props.history.push("/dashboard")
        ).catch(no => console.log(no));
    }

    render() {
        return (
            <div className="homeContainer">
                <div className="flex-box">
                    <h1 className="plaid-prompt"> Press the button, enter your credentails and begin your journey</h1>
                    <PlaidLinkButton
                        buttonProps={{ className:"plaid-btn"}}
                        plaidLinkProps={{
                        clientName: 'Plaid Quickstart',
                        key: 'c0905d93c6b04954e0465105254b09',
                        countryCodes: ['US'],
                        env: 'sandbox',
                        product: ['auth'],
                        webhook: 'https://localhost3000.com/dashboard',
                        //required for user verification 
                        user: {
                            legalName: 'John Appleseed',
                            emailAddress: 'jappleseed@youapp.com'
                        },
                        onLoad: function() {
                            console.log('the link has loaded')
                        },
                        onSuccess: function(public_token, metadata) {
                            // Send the public_token to your app server.
                            // The metadata object contains info about the institution the
                            // user selected and the account ID or IDs, if the
                            // Select Account view is enabled.
                            this.setState({public_token: public_token});
                            this.setState({metadata:metadata});
                            this.onSubmit();
                        }.bind(this),
                        onExit: function(err, metadata) {
                            if (err != null) {
                            console.log("there was an error on the exit");
                            alert(err);
                            }
                            console.log("the user has exited the plaid sandbox mode");
                        },
                        }}
                        onScriptLoad={() => this.setState({ loaded: true })}    
                    >
                        {this.state.loaded ? 'Add Account!' : 'Loading....'}
                    </PlaidLinkButton>
                </div>
            </div>
        );
    }
}

export default Home;