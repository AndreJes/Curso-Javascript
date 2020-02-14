class User {

    constructor(name, email, gender, birth, country, password, photo, admin){
        
        this.name = name;
        this.email = email;
        this.gender = gender;
        this.birth = birth;
        this.country = country;
        this.password = password;
        this.photo = photo;
        this.admin = admin;
        this.createdDate = new Date().toLocaleDateString('pt-BR');

    }

}