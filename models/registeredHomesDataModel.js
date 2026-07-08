const db = require('../utils/database');

//Class for Structuring Data
class Home {
    constructor(name, phoneNumber, houseType, location, rating, photourl, price, description){
        this.name = name;          //"this" refere to object being created through the class
        this.phoneNumber = phoneNumber;
        this.houseType = houseType;
        this.location = location;
        this.rating = rating;
        this.photourl = photourl;
        this.price = price;
        this.description = description;
    }

    save(){
        if(this.id !== undefined){ //Editng Mode
            return db.execute("UPDATE registeredhomes SET name=(?), phoneNumber=(?), houseType=(?), location=(?), rating=(?), photourl=(?), price=(?), description=(?) WHERE id =(?)", [this.name, this.phoneNumber, this.houseType, this.location, this.rating, this.photourl, this.price, this.description, this.id]);
        } else { //Create Mode
            this.id = Math.random().toString();
            return db.execute(
                "INSERT INTO registeredhomes VALUES (?,?,?,?,?,?,?,?,?)", [this.id, this.name, this.price, this.location, this.rating, this.photourl, this.phoneNumber, this.description, this.houseType]
            );
        }
        
    }

    static fetchAll(){
        //Database Import
        return db.execute('SELECT * FROM registeredhomes;');
    };

    static FindByID(id){
        return db.execute('SELECT * FROM registeredhomes WHERE id = (?)', [id]);
    }

    static deleteHome(homeId){
        return db.execute('DELETE FROM registeredhomes WHERE id = (?)', [homeId]);
    }
};


module.exports = Home;