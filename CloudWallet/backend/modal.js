const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/cloudwallet', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected!');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});
const UserSchema=mongoose.Schema({
    username:String,
    password:String,
    privateKey:String,
    publicKey:String,

})



const userModel=mongoose.model("users",UserSchema);

module.exports={
    userModel,
}