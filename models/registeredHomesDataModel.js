const db = require('../utils/database');

//Class for Structuring Data
class Home {
    constructor(name, phoneNumber, houseType, location, rating, photourl, price, description){
        this.ownerName = ownerName;          //"this" refere to object being created through the class
        this.phoneNumber = phoneNumber;
        this.houseType = houseType;
        this.location = location;
        this.rating = rating;
        this.photo = photo;
        this.price = price;
        this.description = description;
    }

    save(){  
        this.id = Math.random.toString;
        return db.execute(
            "INSERT INTO registeredhomes VALUES (?,?,?,?,?,?,?,?,?)",
            [this.id, this.name, this.price, this.location, this.rating, this.photo, this.phoneNumber, this.description, this.houseType]
        );
    }

    static fetchAll(){
        //Database Import
        return db.execute('SELECT * FROM registeredhomes;');
    };

    static FindByID(homeId, callback){
        
    }

    static deleteHome(homeId, callback){
        
    }
};


module.exports = Home;