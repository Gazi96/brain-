"use strict";

const audioUp = new Audio('../sound/up.mp3');
const audioDown = new Audio('../sound/down.mp3');
const audioLeft = new Audio('../sound/left.mp3');
const audioRight = new Audio('../sound/right.mp3');
const audioOpenEyes = new Audio('../sound/open your eyes.mp3');
const audioClick = new Audio('../sound/click the square.mp3');
const startButton = document.getElementsByClassName("main__button")[0];
let points = 0;

class pawn{
    constructor(element, x, y, width, height, elementLeft, elementTop, speed, sizeOfTable){
        this.element = element;
        this.x = x;
        this.y = y;
        this.elementLeft = elementLeft;
        this.elementTop = elementTop;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.sizeOfTable = sizeOfTable;
    }
    
    move(move){
        if(move == 1){    
            audioUp.play();
            
            this.y = this.y - 1;
            this.elementTop = this.elementTop - 100 / this.sizeOfTable;
            this.element.style.top = `${this.elementTop}%`;
        }
        if(move == 2){
            audioDown.play();
            
            this.y = this.y + 1;
            this.elementTop = this.elementTop + 100 / this.sizeOfTable;
            this.element.style.top = `${this.elementTop}%`;
        } 
        if(move == 3){
            audioRight.play();
            
            this.x = this.x + 1;
            this.elementLeft = this.elementLeft + 100 / this.sizeOfTable;
            this.element.style.left = `${this.elementLeft}%`;
        } 
        if(move == 4){
            audioLeft.play();
            
            this.x = this.x - 1;
            this.elementLeft = this.elementLeft - 100 / this.sizeOfTable;
            this.element.style.left = `${this.elementLeft}%`;
        }
    }
}

class table{
    constructor(rows, columns, table){
        this.rows = rows;
        this.columns = columns;
        this.table = table;
    }
    
    draw(){
        this.table.textContent = "";
        
        for(let i = 0; i < this.rows * this.columns; i++){
            const tableItem = document.createElement("div");
            tableItem.classList = "table__item";
            tableItem.style.flexBasis = `${100/this.rows}%`;
            
            this.table.appendChild(tableItem);
        }
    }
}

startApp();

function startApp(){
    menu();
}

function menu(){
    createListItem();
    const menuItems = document.getElementsByClassName("list__item");   
    const menu = document.getElementsByClassName("main__list")[0];
    const tableElement = document.getElementsByClassName("table")[0];
    tableElement.textContent = "";
    
    menu.classList = "main__list";
    tableElement.classList = "table table--hidden";
    
    for(let i = 0; i < menuItems.length; i++){
        console.log("DZIALA 1");
        menuItems[i].addEventListener("click", function addListener(){
            newGame(setParametrSize(i), setParametrSpeed(i));
            showAndHiddenElements();
           
            menuItems[i].removeEventListener("click", addListener, true);
        }, false);
    }
}

function createListItem(){
    const menu = document.getElementsByClassName("main__list")[0];
    menu.textContent = "";
    
    for(let i = 0; i < 6; i++){
        const menuItem = document.createElement("li");
        menuItem.classList = "list__item";
        menuItem.textContent = `Level ${i + 1}`;
        
        menu.appendChild(menuItem);
    }
}

function showAndHiddenElements(){
    const menu = document.getElementsByClassName("main__list")[0];
    const tableElement = document.getElementsByClassName("table")[0];
    const points = document.getElementsByClassName("header__points")[0];
    
    points.classList = "header__points";
    menu.classList = "main__list main__list--hidden";
    tableElement.classList = "table";
}

function setParametrSize(i){
    if(i == 0 || i == 1 || i == 2){
        return 3;
    }
    else{
        return 5;
    }
}

function setParametrSpeed(i){
    if(i == 0 || i == 3){
        return 1500;
    }
    if(i == 1 || i == 4){
        return 1100;
    }
    if(i == 2 || i == 5){
        return 700;
    }
}

function newGame(sizeOfTable, speedOfGame){
    const tableElement = document.getElementsByClassName("table")[0];
    const pawnElement = document.getElementsByClassName("table__img")[0];
    const newTable = new table(sizeOfTable, sizeOfTable, tableElement);
    const newPawn = new pawn(pawnElement, 3, 3, 5, 5, 50, 50, speedOfGame, sizeOfTable);
    createStarButton();
    const startButton = document.getElementsByClassName("main__button")[0];
    startButton.classList = "main__button";
    
    startButton.addEventListener("click", function listenerButton() {  
        startButton.removeEventListener("click", listenerButton, true);
        startButton.classList = "main__button main__button--none";
        startGame(newPawn, newTable);
    }, false);  
}

function createStarButton(){
    const startContainer = document.getElementsByClassName("main__box")[0];
    startContainer.textContent = "";
    
    const startButton = document.createElement("button");
    startButton.classList = "main__button";
    startButton.textContent = "Start";
    
    startContainer.appendChild(startButton);
}

function startGame(newPawn, newTable){
    newPawn.x = Math.ceil(newTable.rows / 2);
    newPawn.y = Math.ceil(newTable.columns / 2);
    newPawn.elementLeft = 50;
    newPawn.elementTop = 50;
    
    console.log("DZIALA 4");
    
    newTable.draw();
    createPawn();
    addConstructor(newPawn);
    
    setTimeout(() => { 
        moveThePawn(newPawn, newTable);    
    }, 1000);
}

function moveThePawn(newPawn, newTable){
    const amountsOfMoves = Math.floor((Math.random() * 5) + 5);
    
    console.log(amountsOfMoves);
    let randomDirection;
    
    for(let i =0; i <= amountsOfMoves; i++){
        setTimeout(() => { 
            randomDirection = randomNumber(newPawn, newTable)
            movePawn(newPawn, randomDirection);
            
            if(i == amountsOfMoves){
                chooseSquare(newPawn, newTable);
            }
        }, i * newPawn.speed);
    }
}

/*function createTable(){       
    const el = document.getElementsByClassName("table")[0];
    const elClone = el.cloneNode(true);
    
    el.textContent = "";
    el.parentNode.replaceChild(elClone, el);
    removePawnElement(elClone);
}*/

/*function removePawnElement(elClone){
    const pawn = document.getElementsByClassName("table__img")[0];
    
    elClone.removeChild(pawn);
}*/

function createPawn(){
    const table = document.getElementsByClassName("table")[0];
    const pawnImage = document.createElement("img");
    
    pawnImage.src = "img/chess-159693_640.png";
    pawnImage.classList = "table__img";
    table.appendChild(pawnImage);
}

function addConstructor(newPawn){
    const pawnElement = document.getElementsByClassName("table__img")[0];
    
    newPawn.element = pawnElement;
}

function chooseSquare(newPawn, newTable){
    const square = (newPawn.x - 1) + (newPawn.y - 1) * newTable.rows;
    const squareElement = document.getElementsByClassName("table__item")[square];
    const pawnImage = document.getElementsByClassName("table__img")[0];
    
    prepareTable(newPawn, square, squareElement, pawnImage, newTable);
}

function prepareTable(newPawn, square, squareElement, pawnImage, newTable){
    pawnImage.classList.toggle("table__img--hidden");
    informUser(newPawn, square, squareElement, pawnImage, newTable);
}

function informUser(newPawn, square, squareElement, pawnImage, newTable){
   /* setTimeout(() => { 
        audioOpenEyes.play();
    }, 1000);
    setTimeout(() => { 
        audioClick.play();
    }, 4000); */
    
    clickUser(newPawn, square, squareElement, pawnImage, newTable);
}

function clickUser(newPawn, square, squareElement, pawnImage, newTable){
    const tableSquares = document.getElementsByClassName("table__item");
        
    for(let i = 0; i < tableSquares.length; i++){
        tableSquares[i].addEventListener("click", function listener(){
            checkChoice(newPawn, square, squareElement, tableSquares, pawnImage, i, newTable);
            
            tableSquares[i].removeEventListener("click", listener, true);
        }, false);
    }
}

function checkChoice(newPawn, square, squareElement, tableSquares, pawnImage, i, newTable){       
    if(square == i){
        goodChoice(squareElement, pawnImage); 
    }
    else{
        wrongChoice(squareElement, tableSquares, i, pawnImage);
    }
    
    pawnImage.classList.toggle("table__img--hidden");
    addEventListenerOnButtons(newPawn, squareElement, tableSquares, i, newTable);
}

function goodChoice(squareElement, pawnImage){
    const points = document.getElementsByClassName("header__points")[0];
    
    squareElement.style.background = "linear-gradient(to right, rgb(29, 151, 108), rgb(147, 249, 185))";
    pawnImage.classList.toggle("table__img--hidden");       
    points.textContent = parseInt(points.textContent) + 1;
}

function wrongChoice(squareElement, tableSquares, i, pawnImage){    
    tableSquares[i].style.background = "linear-gradient(to left, rgb(235, 51, 73), rgb(244, 92, 67))";
    squareElement.style.background = "linear-gradient(to right, rgb(29, 151, 108), rgb(147, 249, 185))";
    pawnImage.classList.toggle("table__img--hidden");
}

function addEventListenerOnButtons(newPawn, squareElement, tableSquares, i, newTable){    
    const buttons = document.getElementsByClassName("main__buttons")[0];
    createButtons(buttons);
    showButtons(buttons);
    const buttonsItem = document.getElementsByClassName("buttons__item");
    
    buttonsItem[0].addEventListener("click", function buttonItemListener(){
        buttonsItem[0].removeEventListener("click", buttonItemListener, true);
        hideButtons(buttons);
        backgroundColorOff(squareElement, tableSquares, i);
        again(newPawn, buttons, newTable);  
        
        
    }, false);
    buttonsItem[1].addEventListener("click", function buttonItemListener(){
        
        buttonsItem[1].removeEventListener("click", buttonItemListener, true);
        hideButtons(buttons);
        backgroundColorOff(squareElement, tableSquares, i);
        backToMenu(buttons);
    }, false);
}

function again(newPawn, buttons, newTable){    
    buttons.innerHTML = "";
    startGame(newPawn, newTable);
}

function backToMenu(buttons){
    buttons.innerHTML = "";
    startApp();
}

function backgroundColorOff(squareElement, tableSquares, i){
    tableSquares[i].style.background = "transparent";
    squareElement.style.background = "transparent";
}

function createButtons(buttons){    
    const buttonAgain = document.createElement("button");
    const buttonMenu = document.createElement("button");
        
    buttonAgain.classList = "buttons__item";
    buttonAgain.textContent = "Again";
    buttonMenu.classList = "buttons__item";
    buttonMenu.textContent = "Menu";
    
    buttons.appendChild(buttonAgain);
    buttons.appendChild(buttonMenu);
}

function hideButtons(buttons){
    buttons.classList = "main__buttons buttons__item--hidden";
}

function showButtons(buttons){
    buttons.classList = "main__buttons";
}

function  randomNumber(newPawn, newTable){
    if(newPawn.x == 1 && newPawn.y == 1){
        return randomWithoutOneFour();
    }
    else if(newPawn.x == 1 && newPawn.y == newTable.rows){
        return randomWithoutTwoFour();
    }
    else if(newPawn.x == newTable.rows && newPawn.y == 1){
        return randomWithoutOneThree();
    }
    else if(newPawn.x == newTable.rows && newPawn.y == newTable.rows){
        return randomWithoutTwoThree();
    }
    else if(newPawn.x == 1){
        return randomWithoutFour();
    }
    else if(newPawn.x == newTable.rows){
        return randomWithoutThree();
    }
    else if(newPawn.y == 1){
        return randomWithoutOne();
    }
    else if(newPawn.y == newTable.rows){
        return randomWithoutTwo();
    }
    else{
        return Math.floor((Math.random() * 4) + 1); 
    }
}

function randomWithoutFour(){
    const randomArray = [1, 2, 3];
    const randomNumber = Math.floor((Math.random() * 3));
    
    return randomArray[randomNumber];
}

function randomWithoutThree(){
    const randomArray = [1, 2, 4];
    const randomNumber = Math.floor((Math.random() * 3));
    
    return randomArray[randomNumber];
}

function randomWithoutTwo(){
    const randomArray = [1, 3, 4];
    const randomNumber = Math.floor((Math.random() * 3));
    
    return randomArray[randomNumber];
}

function randomWithoutOne(){
    const randomArray = [2, 3, 4];
    const randomNumber = Math.floor((Math.random() * 3));
    
    return randomArray[randomNumber];
}

function randomWithoutOneFour(){
    const randomArray = [2, 3];
    const randomNumber = Math.floor((Math.random() * 2));
    
    return randomArray[randomNumber];
}

function randomWithoutTwoFour(){
    const randomArray = [1, 3];
    const randomNumber = Math.floor((Math.random() * 2));
    
    return randomArray[randomNumber];
}

function randomWithoutOneThree(){
    const randomArray = [2, 4];
    const randomNumber = Math.floor((Math.random() * 2));
    
    return randomArray[randomNumber];
}

function randomWithoutTwoThree(){
    const randomArray = [1, 4];
    const randomNumber = Math.floor((Math.random() * 2));
    
    return randomArray[randomNumber];
}

function movePawn(newPawn, randomDirection){
    newPawn.move(randomDirection);
}


 