const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = Schema({
    userId: {
        type: Schema.Types.ObjectId, 
        ref: "users"
      },
      accessToken: {
        type: String,
        required: true
      },
      itemId: {
        type: String,
        required: true
      },
      institutionId: {
        type: String,
        required: true
      },
      institutionName: {
        type: String
      },
      accountName: {
        type: String
      },
      accountType: {
        type: String
      },
      accountSubtype: {
        type: String
      },
      budget: {
        payment:{
          type:String,
          default:"0%"
        },
        travel:{
          type:String,
          default:"0%"
        },
        transfer:{
          type:String,
          default:"0%"
        },
        food:{
          type:String,
          default:"0%"
        },
        recreation:{
          type:String,
          default:"0%"
        }
      }

});

const Account = mongoose.model("Accounts", schema);
module.exports = Account;