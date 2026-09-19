const mongoose = require('mongoose');

const FavSchema = new mongoose.Schema({
    homeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Homes',
        required: true,
        unique: true
    }
})

module.exports = mongoose.model("FavHomes", FavSchema);