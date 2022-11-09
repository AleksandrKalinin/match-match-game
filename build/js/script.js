//default-color: #32425B
//black: #222222
//blue: #104C94
//tomato: #CB4E39

//change delay

let currentDelay = 1000;
let speedOptions = document.getElementById('#speedOptions');
let colorOptions = document.getElementById('#colorOptions');
let gameMode = document.getElementById('#gameMode');

speedOptions.addEventListener('click', function(e){
	 if(e.target !== e.currentTarget) {
	 	currentDelay = Number(e.target.getAttribute('val'))
	 }
})

let optionsDOM = document.querySelectorAll('.single-option');
let options = Array.prototype.slice.call(optionsDOM);
for (var i = 0; i < options.length; i++) {
	options[i].addEventListener('click', function(e){
		let siblings = e.target.parentNode.children;
		for (var i = 0; i < siblings.length; i++) {
			siblings[i].classList.remove('single-option_selected');
		}
		e.target.classList.add('single-option_selected');
	})
}


let yourPairsCount = 0;
let computerPairsCount = 0;
let yourPairs = document.getElementById('#yourPairs');
let computerPairs = document.getElementById('#computerPairs');

let currentTurn = true;


const user = {};
let submit = document.getElementById('formSubmit');
let form = document.getElementById('formSection');
let difSection = document.getElementById('difSection');
let fieldItems;
let fieldElements;
let moves = 0;
let activeItems = [];
submit.addEventListener('click', function(e){
	e.preventDefault();
	user.userName = document.getElementById('userName').value;
	user.userLastname = document.getElementById('userLastname').value;
	user.userMail = document.getElementById('userMail').value;
	form.style.transform = 'translateX(100%)';
})

let difItems = document.querySelectorAll('.difficulty-item');
let difButtons = Array.prototype.slice.call(difItems);
for (let i = 0; i < difButtons.length; i++) {
	difButtons[i].addEventListener('click', function(e){
		e.currentTarget.disabled = "true";
		let size = Number(e.target.getAttribute("size"));
		getRandomNumber(1, size);
		difSection.style.transform = 'translateX(100%)';
	})
}
let images = [];
function getRandomNumber(min, max) {
	let size = max; let unique1 = []; let unique2 = [];
	while(unique1.length < size / 2){
		let rand = Math.ceil(Math.random() * (64 - min) + min);
		let path = rand;
		images.push(path);
		unique1 = [...new Set(images)];
		unique2 = [...new Set(images)];
	}
	images = unique1.concat(unique2);
    for (let i = images.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = images[i];
        images[i] = images[j];
        images[j] = temp;
    }
    drawField();
	//drawRectangles();
}

function drawField() {
	let container = document.getElementById('field');
	container.style.gridTemplateColumns = `repeat(${Math.sqrt(images.length)}, 1fr)`;
	for (let i = 0; i < images.length; i++) {
		let container = document.getElementById('field');
		let field = document.createElement('div');
		field.classList.add('field__item', 'field-item');
		let fieldFront = document.createElement('div');
		fieldFront.classList.add('field-item__front', 'field-front');
		let img = document.createElement('img');
		img.setAttribute('src', './src/images/1.png');
		img.classList.add('field-front__image', 'field-image');
		let fieldBack = document.createElement('div');
		fieldBack.classList.add('field-item__back', 'field-back');
		fieldFront.appendChild(img);
		field.appendChild(fieldFront);
		field.appendChild(fieldBack);
		container.appendChild(field);
	}
	fieldItems = document.querySelectorAll('.field-item');
	fieldElements = Array.prototype.slice.call(fieldItems);
	remElements = fieldElements.length;
	drawRectangles();
}

let curValue = '';
let curEl = '';
let remElements;

function drawRectangles(){
	for (let i = 0; i < fieldElements.length; i++) {
		activeItems.push(i + 1);
		fieldElements[i].children[0].children[0].src = `./src/images/${images[i]}.png`;
		fieldElements[i].children[0].children[0].setAttribute('val', images[i]);
	}	
	setTimeout(function(){ 
		computerTurn();
	}, 2000)
	for (let i = 0; i < fieldElements.length; i++) {
		delayAnimation(fieldElements[i]);
	} 
	addTransition(fieldElements.length);
	playerTurn();

}

function checkLength(el){
	if (el == 0) {
		setTimeout(function(){
			let congrats = document.getElementById('congratsSection');
			congrats.style.transform = 'translateX(0)';
		},500)
	}
}


let counter = 0;

function delayAnimation(e){
	setTimeout(function(){
		e.style.opacity = '1';
	}, counter);
	setTime();
}

let timer = document.getElementById('timer');

function setTime(){
	let seconds = 0;
	let minutes = 0;
	setInterval(function(){
		if (seconds == 59) {
			seconds = 0;
			++minutes
		}
		else{
			++seconds;
		}
	let secondsVal = ('00'+ seconds).slice(-2);	
	let minutesVal = ('00'+ minutes).slice(-2);
	timer.innerText = '';
	timer.innerText = `${minutesVal}:${secondsVal}`;
	},1000);
}

let refreshButton = document.getElementById('refreshButton');

refreshButton.addEventListener('click', function(){

})

function addTransition(elements) {
	setTimeout(function(){
		let fieldItems = document.querySelectorAll('.field-item');
		for (var i = 0; i < fieldItems.length; i++) {
			fieldItems[i].classList.add('field-item_transition');
		}
	}, elements * 50);
}

window.onload = addTransition();

function computerTurn() {
	console.log("now is computer turn");
	let first, second;
	let arr = [];
	let valArr = [];
	while(arr.length < 2) {
	    var random = activeItems[Math.floor(Math.random() * activeItems.length)] - 1;
	    if(arr.indexOf(random) === -1) {
	    	arr.push(random);
	    }
	}
	console.log(arr);
	for (let i = 0; i < arr.length; i++) {
		let el = arr[i];
		for (let j = 0; j < fieldElements.length; j++) {
			if (j == el) {
				fieldElements[j].classList.add('field-item__rotate')
				valArr.push(fieldElements[j]);
			}
		}
	}
	first = valArr[0].children[0].children[0].getAttribute('val');
	second = valArr[1].children[0].children[0].getAttribute('val')
	if (first === second) {
		valArr[0].style.visibility = 'hidden';
		valArr[1].style.visibility = 'hidden';		
		first = '';
		second = '';
		computerPairsCount += 1;
		computerPairs.innerText = computerPairsCount;
	} else {
		setTimeout(function(){
			playerTurn();
		}, currentDelay + 1000)	
		setTimeout(function(){
			valArr[0].classList.remove('field-item__rotate');
			valArr[1].classList.remove('field-item__rotate');
			first = '';
			second = '';
		}, currentDelay)
	}	
}

function playerTurn() {
	for (let i = 0; i < fieldElements.length; i++) {
		fieldElements[i].addEventListener('click', addListenerToItem)
	}	
}

function removeListenerFromItem() {
	for (let i = 0; i < fieldElements.length; i++) {
		fieldElements[i].removeEventListener('click', addListenerToItem)
	}		
}

function addListenerToItem(e) {
	e.currentTarget.classList.add('field-item__rotate');
	let val = e.currentTarget.children[0].children[0].getAttribute('val');
	let targ = e.currentTarget;
	if (curValue === '') {
		curValue = val;
		curEl = e.currentTarget;
	}
	else {
		moves += 1;
		let movesContainer = document.getElementById('moves');
		movesContainer.innerText = moves;
		if (curValue == val && curEl !== e.currentTarget) {
			curEl.style.visibility = 'hidden';
			targ.style.visibility = 'hidden';
			curValue = ''; 
			curEl = '';
			checkLength(remElements-=2);
			yourPairsCount += 1;
			yourPairs.innerText = yourPairsCount;
		}
		else{
			removeListenerFromItem();
			setTimeout(function(){
				computerTurn();
			}, currentDelay + 1000)			
			setTimeout(function(){
				curEl.classList.remove('field-item__rotate');
				targ.classList.remove('field-item__rotate');
				curValue = '';
				curEl = '';
			}, currentDelay)
		}
	}
}