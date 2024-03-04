import { User } from "./userModel.js";

export const createUser = async (req, res) => {

    let { userName, email, phone } = req.body;
    if (!userName || !email || !phone)
        return res.status(404).send("missing required parameters");

    try {

        let findUser = User.find({ userName, emmail, phone });
        if (findUser.length > 0)
            return res.status(409).send("this user already exists");
        let newUser = await User.create({ userName, email, phone });
        return res.json(newUser);
    }
    catch (err) {
        res.status(400).send("unable to add this user " + err);
    }
}

export const updateUser = async (req, res) => {
    let { id } = req.params;
    try {
        let userToUpdate = await User.findOne(id);
        if (!userToUpdate)
            return res.status(404).send("there is no user with this id");
        userToUpdate.userName = req.body.userName || userToUpdate.userName;
        userToUpdate.email = req.body.email || userToUpdate.email;
        userToUpdate.phone = req.body.phone || userToUpdate.phone;
        await userToUpdate.save();
        return res.json(userToUpdate);
    }

    catch (err) {
        return res.status(400).send("an error occurred " + err);
    }
}
 

export const deleteUser = async (req, res) => {
    let { id } = req.params;
    try {
        let userTodelete = await User.findByIdAndDelete(id);
        if (!userTodelete)
            return res.status(404).send("there is no user with this id");
        return res.json(userTodelete);
    }
    catch(err){
        return res.status(400).send("an error occurred " + err);

    }
}