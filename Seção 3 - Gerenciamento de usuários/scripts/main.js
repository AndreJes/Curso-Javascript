var fields = document.querySelectorAll("#form-user-create [name]");

function getUserFromForm(){
    let user = {};

    fields.forEach((field, index) =>{

    if(field.name == "gender"){
        if(field.isChecked){
            user[field.name] = field.value;
        }
    }
    else{
        user[field.name] = field.value;
    }

    });

    return user;
}

function addLineToTab(userData){

    let newLine = document.createElement("tr");

    newLine.innerHTML = `
        <td><img src="dist/img/user1-128x128.jpg" alt="User Image" class="img-circle img-sm"></td>
        <td>${userData.name}</td>
        <td>${userData.email}</td>
        <td>${userData.admin ? "Sim" : "Não"}</td>
        <td>${new Date().toLocaleDateString('pt-br', 'short')}</td>
        <td>
            <button type="button" class="btn btn-primary btn-xs btn-flat">Editar</button>
            <button type="button" class="btn btn-danger btn-xs btn-flat">Excluir</button>
        </td>
    `;

    let tbody = document.querySelector("#user-list > tbody");
    tbody.appendChild(newLine);

}

document.querySelector("#form-user-create").addEventListener("submit", (event) =>{
    event.preventDefault();
    let newUser = getUserFromForm();
    console.log(newUser.admin);
    addLineToTab(newUser);
});