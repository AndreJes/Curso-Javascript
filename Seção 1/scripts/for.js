var n = 5;

for (let i = 0; i <= 10; i++) {
    // Template String:
    // Permite que você utilize variaveis dentro da string
    console.log(`${i} x ${n} = ${i*n}`);
}

// EXTRA: Object Literals
const numeroSwitch = (numero) => ({
    1 : "Um",
    2 : "Dois",
    3 : "Três",
    4 : "Quatro",
    5 : "Cinco"
}) [numero]

console.log(numeroSwitch(n));