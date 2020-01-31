import User from "../models/user";

module.exports.register = async (req, res, next) => {
    // We create a new user uppon user request
    try {
        let user = new User(req.body);
        const savedUser = await user.save(); 
        const token = await user.generateAuthToken()
        return res.status(200).send({ savedUser, token });
    } catch (error) {
        return res.status(500).send(error);
    }
}

module.exports.login = async (req, res, next) => {
    try {
        const user = await User.findOne({"username": req.body.username});
        if(user) {
            const isValid = await user.comparePassword(req.body.password);
            if(isValid) {
                const token = await user.generateAuthToken()
                return res.status(201).send({ user, token });
            }
        }
        return res.status(401).send({"errMsg": "Wrong credentials"});
    } catch (error) {
        return res.status(500).send(error);
    }
}

//