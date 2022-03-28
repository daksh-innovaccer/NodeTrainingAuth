const mongoose = require("mongoose")
const UserSchema = require("../models/User") // "../" is used to go back two levels (folders)

class UserService {
    async getUsers() {
        //let user = mongoose.model("User", UserSchema);
        let User = this.getModel() // no need to create model again and again, just call the function in which we are creating the model
        return User.find({ isdel: false }).select(["-salt", "-hash"]) //only show the entries with isdel:false and remove salt and hash while listing
    }

    async createUser(userObj) {
        let User = this.getModel();
        //check if user with specified id already there and you want to update something there
        if (userObj["_id"] !== undefined) {
            return User.updateOne({ _id: userObj["_id"] }, { $set: userObj });
        }
        //else do this
        else {
            const userInstance = new User(userObj); // create instance of that user
            userInstance.setPassword(userObj['password']) // set the password, NOTE THAT you have to pass a password field while creating and don't pass salt and hash
            const result = await userInstance.save(); // to save in the collection
            return result; //returns the new object created (JSON)
        }
    }

    deleteUser(id) {
        let User = this.getModel()
        return User.updateOne({ _id: id }, { $set: { isDel: true } }) //sets the isdel:true to show that it is deleted
    }

    async loginUser(loginObject) {
        let User = this.getModel()
        let FoundUser = await User.findOne({ email: loginObject.emailID }) // find the user with emailid, so email should be unique
        //console.log(FoundUser)
        // if the user with given email is there in the records
        if (FoundUser) { 
            //console.log("user found......")
            const user = FoundUser
            //validating passed password for that user
            if (user.validatePassword(loginObject.password)) {
                user.salt = "" //this way we are making salt and hash empty so that no one can view them
                user.hash = ""
                return user
            }
            else {
                return {}
            }
        }
        else return {}
    }

    getModel() {
        return mongoose.model("User", UserSchema) //creating the model
    }
}

module.exports = UserService