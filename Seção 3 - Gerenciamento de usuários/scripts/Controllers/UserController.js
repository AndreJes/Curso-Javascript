class UserController {
    constructor(formIdCreate, formIdUpdate, tableId){
        this.formEL = document.getElementById(formIdCreate);
        this.tableEl = document.getElementById(tableId);
        this.formUpdateEL = document.getElementById(formIdUpdate);
        
        this.onSubmit();
        this.onEdit();
        this.selectAll();
    }

    onSubmit(){
        this.formEL.addEventListener("submit", (event) => {
            event.preventDefault();

            let btn = this.formEL.querySelector("[type=submit]");

            btn.disabled = true;

            let newUser = this.getUserFromForm(this.formEL);
            
            if(!newUser){
                return false;
            }

            this.getPhoto().then(
                (content) => {
                    newUser.photo = content;
    
                    this.insert(newUser);

                    this.addNewLineToTable(newUser);

                    this.formEL.reset();

                    btn.disabled = false;
                },

                (e) => {
                    console.error(e);
                }
            );
        });
    }
    //Closing onSubmit

    getPhoto(){
        
        return new Promise((resolve, reject) =>{

            let fileReader = new FileReader();

            let elements = [...this.formEL.elements].filter(item => {
                if(item.name === "photo"){
                    return item;
                }
            });

            let file = elements[0].files[0];

            fileReader.onload = () =>{
                resolve(fileReader.result);
            }

            fileReader.onerror = (e) => {
                reject(e);
            }

            if(file){
                fileReader.readAsDataURL(file);
            }
            else{
                resolve("dist/img/boxed-bg.jpg")
            }
        });
    }
    //Closing getPhoto

    getStoredUsers(){

        let users = [];

        if(sessionStorage.getItem("users")){

            users = JSON.parse(sessionStorage.getItem("users"));
        }

        return users;
    }

    selectAll(){

        let users = this.getStoredUsers();

        users.forEach(storedUser => {

            let user = new User();

            user.loadFromJSON(storedUser);

            this.addNewLineToTable(user);

        });

    }

    insert(data){

        let users = this.getStoredUsers();

        users.push(data);

        console.log(users);

        sessionStorage.setItem("users", JSON.stringify(users));

    }

    createUserLine(userData, newLine = null){
        
        if(newLine == null){
            newLine = document.createElement("tr");
        }

        newLine.dataset.user = JSON.stringify(userData);

        newLine.innerHTML = `
            <td><img src="${userData.photo}" alt="User Image" class="img-circle img-sm"></img></td>
            <td>${userData.name}</td>
            <td>${userData.email}</td>
            <td>${userData.admin ? "Sim" : "Não"}</td>
            <td>${userData._createdDate}</td>
            <td>
                <button type="button" class="btn btn-primary btn-xs btn-flat btn-edit">Editar</button>
                <button type="button" class="btn btn-danger btn-xs btn-flat btn-remove">Excluir</button>
            </td>
        `;

        this.addEventToLine(newLine);

        return newLine;
    }

    addNewLineToTable(userData){

        let newLine = this.createUserLine(userData);

        this.tableEl.appendChild(newLine);

        this.updateCount();

    }
    //Closing addLineToTab

    addEventToLine(line){

        line.querySelector('.btn-remove').addEventListener("click", e =>{

            if(confirm("Deseja realmente excluir?")){

                line.remove();

                this.updateCount();

            }

        });


        line.querySelector('.btn-edit').addEventListener("click", e =>{

            let json = JSON.parse(line.dataset.user);

            this.formUpdateEL.dataset.trIndex = line.sectionRowIndex;

            for(let name in json){

                let field = this.formUpdateEL.querySelector("[name=" + name.replace('_', '') + ']');

                if(field){
                    switch(field.type){
                        case 'file':
                            continue;
                            break;
                        case 'radio':
                            field = this.formUpdateEL.querySelector("[name="+ name.replace('_', '') + "][value=" + json[name] +"]");
                            console.log(field);
                            field.checked = true;
                            break;
                        case 'checkbox':
                            field.checked = json[name];
                            break;
                        default:
                            field.value = json[name];
                            break;
                    }
                }
            }

            this.formUpdateEL.querySelector(".photo").src = json._photo;

            this.showPanelUpdate();

        });
    }

    onEdit(){

        document.querySelector('#box-user-update .btn-cancel').addEventListener('click', e =>{
            this.showPanelCreate();
        });

        this.formUpdateEL.addEventListener('submit', event => {
            event.preventDefault();

            let btn = this.formUpdateEL.querySelector("[type=submit]");

            btn.disabled = true;

            let user = this.getUserFromForm(this.formUpdateEL);

            let index = this.formUpdateEL.dataset.trIndex;

            let line = this.tableEl.rows[index];

            let oldUser = JSON.parse(line.dataset.user);

            let result = Object.assign({}, oldUser, user);


            this.getPhoto(this.formUpdateEL).then(
                (content) => {

                if(!user._photo){
                    result._photo = oldUser._photo;
                } else {
                    result._photo = content;
                }

                let fUser = new User();

                fUser.loadFromJSON(result);

                this.createUserLine(fUser, line);

                btn.disabled = false;

                this.updateCount();

                this.formUpdateEL.reset();

                this.showPanelCreate();
            },
            (e) =>{
                console.log(e);
            });

        });
    }

    showPanelCreate(){
        
        document.querySelector("#box-user-create").style.display = 'block';
        document.querySelector("#box-user-update").style.display = 'none';

    }

    showPanelUpdate(){
        
        document.querySelector("#box-user-create").style.display = 'none';
        document.querySelector("#box-user-update").style.display = 'block';

    }

    updateCount(){

        let nUsers = 0;
        let nAdmins = 0;

        [...this.tableEl.children].forEach(tr => {

            nUsers++;
            if(JSON.parse(tr.dataset.user)._admin){
                nAdmins++;
            }

        });

        document.querySelector('#user-count').innerHTML = nUsers;
        document.querySelector('#admin-count').innerHTML = nAdmins;
    }

    getUserFromForm(formEL){
        let user = {};

        let isValid = true;

        [...formEL.elements].forEach((field) =>{
    
            if(['name', 'email', 'password'].indexOf(field.name) >= 0 && !field.value){

                field.parentElement.classList.add("has-error");
                isValid = false;
                return false;
            }

            if(field.name == "gender"){
                if(field.checked){
                    user[field.name] = field.value;
                }
            }
            else if(field.name == "admin"){
                user[field.name] = field.checked;
            }
            else{
                user[field.name] = field.value;
            }
    
        });
    
        if(!isValid){
            return false;
        }

        let newUser = new User(
            user.name,
            user.email,
            user.gender,
            user.birth,
            user.country,
            user.password,
            user.photo,
            user.admin,
        )

        newUser._createdDate = new Date().toLocaleDateString('pt-br');

        return newUser;
    }
    //Closing getUserFromForm
}