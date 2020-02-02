/*Metologia antiga*/
let Celular = function(){
    this.cor = "azul";

    this.Ligar = function(){
        console.log("uma ligação");
    }
}

let nokia = new Celular();

console.log(nokia.cor);
nokia.Ligar();

/*Novo TypeScript */
class SmartPhone {
    //Atributos são definidos dentro de construtores
    constructor(cor, ram, armazenamento) {
        this.cor = cor;
        this.ram = ram,
        this.armazenamento = armazenamento;
    }

    //Métodos são definidos sem "function"
    IniciarApp(){
        return "Iniciando App";
    }
}

let j2 = new SmartPhone("Preto", "4GB", "64GB");
console.log(j2);
