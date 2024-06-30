class Controller {

  _targetNumber = 0;
  _attempts = 0;
  _guessedNumbers = [];
  _maxNumber = 10;

  _h1Element = document.querySelector("h1");
  _pElement = document.querySelector("p");
  _userInput = document.getElementById("valorUsuario");
  _attemptBtn = document.getElementById("intentar");
  _restartBtn = document.getElementById("reiniciar");

  constructor(){
    this._attemptBtn.addEventListener('click', e => this.validateAttempt());
    this._restartBtn.addEventListener('click', e=> this.onCreate());
    this._userInput.addEventListener('input', e => this.validateRange(e));
    this.onCreate();
  }

  onCreate(){
    this._targetNumber = this.getRandomNumber();
    this._h1Element.innerText = "Juego del número secreto";
    this._pElement.innerText = "Escoja un número del 1 al 10";
    this._attemptBtn.removeAttribute("disabled");
    this._restartBtn.setAttribute("disabled","true");
    this._userInput.value = "";
    this._attempts = 1;
  }

  getRandomNumber(){
    return Math.floor(Math.random() * this._maxNumber) + 1;
  }

  validateAttempt(){

    let userNumber = parseInt(this._userInput.value);

    if (userNumber === this._targetNumber){
      this._pElement.innerText = `Ganaste. Te tomo ${this._attempts} intento${this._attempts == 1 ? "" : "s"}.`
      this._attemptBtn.setAttribute("disabled","true");
      this._restartBtn.removeAttribute("disabled");
      return;
    }
    
    this._attempts++;
    this._userInput.value = "";
    
    this._pElement.innerText = `El número secreto es ${userNumber < this._targetNumber ? "mayor" : "menor"}`;

  }

  validateRange(e){

    console.log(e);

    if(e == null){
      return;
    }

    if(!e.data.match(/[0-9]/)){
      e.data = ""
      e.preventDefault();
      e.stopPropagation();
      e.cancelBubble = true;
    }

  }

}

new Controller();
