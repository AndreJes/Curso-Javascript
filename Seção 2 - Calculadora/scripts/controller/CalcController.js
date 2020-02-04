class CalcController {
    //o construtor é onde atributos são criados
    constructor(){
        //this é utilizado para gerar atributos na classe
        this.locale = "pt-BR";

        //query selector obtem um elemento de acordo com o id ou class
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#data");
        this._timeEl = document.querySelector("#hora");
        this._currentDate;
        this.initialize();
        this.initButtonsEvents();
    }

    initialize(){
        this.setDisplayDateTime();
        //Executa uma ação em determinado intervalo
        setInterval(() => {
            this.setDisplayDateTime();
            }, 1000);
    }

    initButtonsEvents(){
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");

        console.log(buttons);

        buttons.forEach(btn => {
            this.addEventListenerAll(btn, ["click", "drag"], e => {
                console.log(btn);
            });

            this.addEventListenerAll(btn, ["mouseover", "mouseup", "mousedown"], e =>{
                btn.style.cursor = "pointer";
            });
        
        });
    }

    /**
     * Adiciona a função especificada aos eventos de um elemento
     * @param {string} element O elemento que receberá os eventos
     * @param {string[]} events Eventos que receberão a função
     * @param {function} fn Função usada pelos eventos 
     */
    addEventListenerAll(element, events, fn){
        events.forEach(event => {
            element.addEventListener(event, fn);
        });
    }

    setDisplayDateTime(){
        this.displayTime = this.currentDate.toLocaleTimeString(this.locale);
        //Formatação de data e hora
        this.displayDate = this.currentDate.toLocaleDateString(this.locale, {
                day: "2-digit",
                month: "long",
                year: "numeric"
            });
    }

    get displayCalc(){
        return this._displayCalcEl.innerHTML;
    }
    set displayCalc(value){
        this._displayCalcEl.innerHTML = this.displayCalc;
    }

    get displayDate(){
        return this._dateEl.innerHTML;
    }

    set displayDate(value){
        this._dateEl.innerHTML = value;
    }

    get displayTime(){
        return this._timeEl.innerHTML;
    }

    set displayTime(value){
        this._timeEl.innerHTML = value;
    }

    get currentDate(){
        return new Date();
    }

    set currentDate(value){
        this._currentDate = value;
    }

}