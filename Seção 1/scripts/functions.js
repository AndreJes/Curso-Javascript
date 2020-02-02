//Função comum
function CalcSimples(n1 , n2, oper){
    // eval: Interpreta a string utilizada como javascript
    return eval(`${n1} ${oper} ${n2}`);
}

console.log(CalcSimples(5, 5, '/'));

//Função Anônima:
//Não pode ser chamada, executada apenas uma vez  
(function(n1 , n2, oper){
    let result = eval(`${n1} ${oper} ${n2}`);
    console.log(result);
}) (4, 10, '+') /* <---- Parametros para chamada da função*/;

//Arrow Function:
//Pode compartilhar informações de fora dentro da função
const ArrowCalc = (n1 , n2, oper) => {
    return eval(`${n1} ${oper} ${n2}`);
}
console.log(ArrowCalc(10, 20, "-"))


