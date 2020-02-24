class User {

    constructor(name, email, gender, birth, country, password, photo, admin){
        
        this._name = name;
        this._email = email;
        this._gender = gender;
        this._birth = birth;
        this._country = country;
        this._password = password;
        this._photo = photo;
        this._admin = admin;
        this._createdDate = "";

    }

    get name(){
        return this._name;
    }

    get email(){
        return this._email;
    }

    get password(){
        return this._password;
    }

    get gender(){
        return this._gender;
    }

    get birth(){
        return this._birth;
    }

    get country(){
        return this._country;
    }

    get photo(){
        return this._photo;
    }

    get admin(){
        return this._admin;
    }

    set photo(value){
        this._photo = value;
    }

    loadFromJSON(json){
        
        for(let name in json){
            this[name] = json[name];
        }
    }

}