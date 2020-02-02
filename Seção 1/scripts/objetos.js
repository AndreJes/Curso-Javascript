//Instancia de um objeto que manipula datas
let data = new Date();
console.log(data.toLocaleDateString("pt-BR"));

//Arrays em javascript
let carros = ["Uno", "Palio", "Focus"];
//ForEach em javascript
carros.forEach(element => {
    console.log(element);
});

//Arrays tem tipos dinâmicos
let arraySortido = [new Date(), true, "Textãoo", 25, function(){}];
//ForEach em javascript
arraySortido.forEach(function(value, index) {
    console.log(`Array Sortido:
    i: ${index} / valor: ${value} / tipo: ${typeof(arraySortido[index])}`);
});
