//document: o documento HTML
//window: a janela do seu navegador
//addEventListener(evento, ação): função que adiciona uma função a um evento que ocorrer com o objeto especificado

window.addEventListener('focus', event => {
    console.log("Bem-Vindo!");
});

var textoAlvo = document.getElementById('textoPrincipal');

document.addEventListener('click', event => {
    console.log("Você clicou na pagina!");
});

textoAlvo.addEventListener('click', event => {
    textoAlvo.setAttribute('style', "color : red");
});