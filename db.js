const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;
const {MONGODB_URL} = require("./config")
mongoose.connect(MONGODB_URL)

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