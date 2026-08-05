import mongoose from "mongoose";

export const connectDB = async () => {
    try{
        await mongoose.connect('mongodb+srv://aryansarathe:Sarathe312@cluster0.s88vqfw.mongodb.net/food-del').then( () => console.log(' DB Connected '))
    } catch (error) {
        console.log("MongoDB Connection Failed:", error);
    }    
}
