class CalcController {
    //o construtor é onde atributos são criados
    constructor(){
        //this é utilizado para gerar atributos na classe
        this.locale = "pt-BR";

        this._operation = [];
        this._lastOperator = '';
        this._lastNumber = '';
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
            
        this.setLastNumberOnDisplay();
    }

    clearAll(){
        this._operation = [];
        this.setLastNumberOnDisplay();
    }

    clearEntry(){
        this._operation.pop();
        this.setLastNumberOnDisplay();
    }

    setError(){
        this.displayCalc = "Error";
    }

    getLastOperation(){
        return this._operation[this._operation.length - 1]
    }

    setLastOperation(value){
        this._operation[this._operation.length - 1] = value;
    }

    isOperator(value){
        return (["+", "-", "*", "/", "%"].indexOf(value) > -1);
    }

    pushOperation(value){
        this._operation.push(value);

        if(this._operation.length > 3){

            this.calc();

            console.log(this._operation);
        }
    }

    getResult(){
        return eval(this._operation.join(""));
    }

    calc(){

        let last = "";
            this._lastOperator = this.getLastItem();

        if(this._operation.length < 3){
            let firstItem = this._operation[0];
            this._operation = [firstItem, this._lastOperator, this._lastNumber];
        }

        if(this._operation.length > 3){
            last = this._operation.pop();
            this._lastNumber = this.getResult();
        }
        else if(this._operation.length == 3){
            this._lastNumber = this.getLastItem(false);
        }

        let result = this.getResult();
        
        if(last == "%"){
            result /= 100;
            this._operation = [result];
        }
        else{
            this._operation = [result];
            
            if(last){
                this._operation.push(last);
            }
        }

        this.setLastNumberOnDisplay();
    }

    getLastItem(isOperator = true){

        let lastItem;

        for (let i = this._operation.length - 1; i >= 0; i--){

            if(this.isOperator(this._operation[i]) == isOperator){
                lastItem = this._operation[i];
                break;
            }
            
        }

        if(!lastItem){
            lastItem = (isOperator) ? this._lastOperator : this._lastNumber;
        }

        return lastItem;

    }

    setLastNumberOnDisplay(){

        let lastNumber = this.getLastItem(false);

        if(!lastNumber){
            lastNumber = "0";
        }

        this.displayCalc = lastNumber;
    }

    addOperation(operation){
        //isNaN = detecta se o valor não é um numero
        if(isNaN(this.getLastOperation())){
            if(this.isOperator(operation)){
                this.setLastOperation(operation);
            }
            else if(isNaN(operation)){
                
            }
            else{
                this.pushOperation(operation)
                this.setLastNumberOnDisplay();
            }
        }
        else {

            if(this.isOperator(operation)){
                this.pushOperation(operation);
            }
            else{
                let newValue = this.getLastOperation().toString() + operation.toString();
                this.setLastOperation(parseInt(newValue))
                this.setLastNumberOnDisplay();
            }
        }
        console.log(this._operation);
    }

    /**
     * @param {string} textValue 
     */
    execBtn(textValue){
        switch(textValue.toLowerCase()){
            
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
                this.addOperation(parseInt(textValue))
                break;
            case "ac":
                this.clearAll();
                break;
            case "ce":
                this.clearEntry();
                break;
            case "soma":
                this.addOperation("+");
                break;
            case "subtracao":
                this.addOperation("-");
                break;
            case "multiplicacao":
                this.addOperation("*");
                break;
            case "divisao":
                this.addOperation("/");
                break;
            case "porcento":
                this.addOperation("%");
                break;
            case "ponto":
                this.addOperation(".");
                break;
            case "igual":
                this.calc();
                break;
            default:
                this.setError();
                break;
        }
    }

    initButtonsEvents(){
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");

        console.log(buttons);

        buttons.forEach(btn => {
            this.addEventListenerAll(btn, ["click", "drag"], e => {
                let textBtn = btn.className.baseVal.replace("btn-", "");
                this.execBtn(textBtn)
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
        this._displayCalcEl.innerHTML = value;
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