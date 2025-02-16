const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

mongoose.connect('mongodb+srv://DB1-practice:R5Y71dLhNLahIA3r@cluster0.gpxo7.mongodb.net/course-selling-app')

const adminSchema = new Schema({
    username: String,
    firstName: String,
    lastName: String,
    email: String,
    password: String
});
const userSchema = new Schema({
    username: String,
    firstName: String,
    lastName: String,
    email: String,
    password: String
});
const courseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    imageurl: String,
    creatorId: ObjectId
});
const purchasesSchema = new Schema({
    userId: ObjectId,
    courseId: ObjectId
});

const adminModel = mongoose.model('admins',adminSchema);
const userModel = mongoose.model('users',userSchema);
const courseModel = mongoose.model('courses',courseSchema);
const purchasesModel = mongoose.model('purchases',purchasesSchema);

module.exports = {
    adminModel,
    userModel,
    courseModel,
    purchasesModel
}