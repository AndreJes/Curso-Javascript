class UserController {
    constructor(formId, tableId){
        this.formEL = document.getElementById(formId);
        this.tableEl = document.getElementById(tableId);
        
        this.onSubmit();
    
    }

    onSubmit(){
        this.formEL.addEventListener("submit", (event) => {
            event.preventDefault();
            let newUser = this.getUserFromForm();
            
            this.getPhoto().then(
                (content) => {
                    newUser.photo = content;
    
                    this.addNewLineToTable(newUser);
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
            console.log(file);

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

    addNewLineToTable(userData){

        let newLine = document.createElement("tr");
    
        newLine.innerHTML = `
            <td><img src="${userData.photo}" alt="User Image" class="img-circle img-sm"></img></td>
            <td>${userData.name}</td>
            <td>${userData.email}</td>
            <td>${userData.admin ? "Sim" : "Não"}</td>
            <td>${userData.createdDate}</td>
            <td>
                <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
                <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
            </td>
        `;
        this.tableEl.appendChild(newLine);
    }
    //Closing addLineToTab

    getUserFromForm(){
        let user = {};

        
        [...this.formEL.elements].forEach((field) =>{
    
            if(field.name == "gender"){
                if(field.isChecked){
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
    
        return new User(
                user.name,
                user.email,
                user.gender,
                user.birth,
                user.country,
                user.password,
                user.photo,
                user.admin
            );
    }
    //Closing getUserFromForm
}