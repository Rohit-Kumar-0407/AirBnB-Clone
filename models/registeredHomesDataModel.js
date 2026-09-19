const mongoose = require('mongoose');

const homeSchema = new mongoose.Schema({
    name: {type: String, required: true},
    phoneNumber: {type: Number, required: true},
    houseType: {type: String, required: true},
    location: {type: String, required: true},
    rating: {type: Number, required: true},
    photourl: {type: String, required: true},
    price: {type: Number, required: true},
    description: {type: String, required: true}   
})

homeSchema.pre('findOneAndDelete', async function(next){
    const homeId = this.getQuery()["_id"];
    await Favourite.deleteMany({houseId: homeId});
    next();
})

module.exports = mongoose.model("Homes", homeSchema);