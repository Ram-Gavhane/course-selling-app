const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

mongoose.connect('mongodb+srv://DB1-practice:aA4LCFbAHW4jcQgm@cluster0.gpxo7.mongodb.net/course-selling-app')

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

const adminModel = mongoose.model('admin',adminSchema);
const userModel = mongoose.model('user',userSchema);
const courseModel = mongoose.model('course',courseSchema);
const purchasesModel = mongoose.model('purchases',purchasesSchema);

module.exports = {
    adminModel,
    userModel,
    courseModel,
    purchasesModel
}