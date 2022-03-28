const mongoose = require("mongoose")

const UserSchema = require("../models/User")

class UserService {
    async getUsers() {
        //let user = mongoose.model("User", UserSchema);
        let User = this.getModel()
        return User.find({ isdel: false }).select(["-salt", "-hash"])
    }

    // async createUser(userobj) {
    //     let User = this.getModel()
    //     //return User.create(userobj)
    //     if (userobj["_id"] !== undefined) {
    //         return User.updateOne({ _id: userobj["_id"] }, {$set: userobj})
    //     }

    //     else {
    //         const userInstance = new User(userobj)
    //         const result = await userInstance.save()
    //         return result
    //     }
    // }
    async createUser(userObj) {
        let User = this.getModel();
        if (userObj["_id"] !== undefined) {
            return User.updateOne({ _id: userObj["_id"] }, { $set: userObj });
        }
        else {
            const userInstance = new User(userObj);
            userInstance.setPassword(userObj['password'])
            const result = await userInstance.save();
            return result;
        }
    }

    deleteUser(id) {
        let User = this.getModel()
        return User.updateOne({ _id: id }, { $set: { isDel: true } })
    }

    async loginUser(loginObject) {
        let User = this.getModel()
        let FoundUser = await User.findOne({ email: loginObject.emailID })
        //console.log(FoundUser)
        if (FoundUser) {
            //console.log("user found......")
            const user = FoundUser
            if (user.validatePassword(loginObject.password)) {
                user.salt = ""
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
        return mongoose.model("User", UserSchema)
    }
}

module.exports = UserService