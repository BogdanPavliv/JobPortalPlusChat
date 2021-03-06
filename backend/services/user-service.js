const bcrypt = require("bcryptjs");
const models = require("../models/chatModels");


async function update(id,data){
    try {
        const user = await models.Applicant.findById(id);
        if (!user) {
            throw 'User not exist.';
        }
        user.full_name = data.full_name;
        const updateduser = await user.save();
        console.log("user updated")
        return updateduser;

    } catch (err) {
        throw err;
    }
}

async function getUser(id){
	try {
        const user = await models.Applicant.findById(id);
        return user;
    } catch (err) {
    	throw err;
    }
}
async function login(data){
	try {
        let user = await models.Applicant.findOne({
            email:data.email
        });
        if (!user) {
        	throw 'User not exist.';
        }
        const isMatch = await bcrypt.compare(data.password, user.password);
        if (!isMatch)
        	throw 'Incorrect Password !';

        return user;
        
    } catch (err) {
    	throw err;
    }
}

async function create(data) {
    console.log("user service create")
    console.log(data)
    
    try {
        let emailFound = await models.Applicant.findOne({
            email:data.email
        });
        if (emailFound) {
        	throw 'Email already taken.';
        }
        let usernameFound = await models.Applicant.findOne({
            name:data.name
        });
        if (usernameFound) {
        	throw 'Username already taken.';
        }

        const user = new models.Applicant(data);

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(data.password, salt);
        user.createdAt = Date.now();
        const newuser = await user.save();
        console.log("user saved")
        console.log(newuser)
        return newuser;
        
    } catch (err) {
    	throw err;
    }

}

module.exports = {
	getUser: getUser,
	login: login,
    create: create,
    update: update,
}
