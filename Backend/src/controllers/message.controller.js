import User from "../models/user.model.js";
import Message from "../models/message.model.js";

export async function getUserforSidebar(req,res) {
    try{
        const userId = req.user._id;
        const filteredUsers = await User.find({id:{$ne:userId}}).select("-password");
        return res.json(filteredUsers);
    }
    catch(error){
        console.log("Error in getUserforSidebar", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function getMessages(req,res) {
    try{
        const userId = req.user._id;
        const recveiverId = req.params.id;
        const messages = await Message.find({
            $or : [
                {senderId : userId , recveiverId:recveiverId},
                {senderId : recveiverId , recveiverId:userId}
            ]
        });
        res.json(messages);
    }
    catch(error){
        console.log("Error in getMessages", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export async function sendMessage(req,res) {
    try{
        const {text,image} = req.body;
        const senderId = req.user._id;
        const recveiverId = req.params.id;
        const message = await Message.create({
            senderId,
            recveiverId,
            text,
            image
        });
        res.json(message);
    }
    catch(error){
        console.log("Error in sendMessage", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }   
}

