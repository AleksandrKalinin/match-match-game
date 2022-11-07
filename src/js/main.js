var submit = document.getElementById('formSubmit');
var form = document.getElementById('formSection');
var fieldItems = document.querySelectorAll('.field-item');
var fieldElements = Array.prototype.slice.call(fieldItems);

submit.addEventListener('click', function(e){
	e.preventDefault();
	form.style.transform = 'translateX(100%)';
})

for (var i = 0; i < fieldElements.length; i++) {
	fieldElements[i].addEventListener('click', function(e){
		console.log(e.currentTarget);
		e.currentTarget.classList.add('field-item__rotate')
	})
}

var counter = 0;
for (var i = 0; i < fieldElements.length; i++) {
	delayAnimation(fieldElements[i]);
}

function delayAnimation(e){
	setTimeout(function(){
		e.style.opacity = '1';
	}, counter);
	counter+=50;
}

var difItems = document.querySelectorAll('.difficulty-item');
var difButtons = Array.prototype.slice.call(difItems);

for (var i = 0; i < difButtons.length; i++) {
	difButtons[i].addEventListener('click', function(){
		var size = Number(difButtons[i].getAttribute("size"))
		getRandomNumber(1, size);
	})
}

function getRandomNumber(min, max) {
	var size = max;
	var images = [];
	for (var i = 0; i < size; i++) {
		var rand = Math.random() * (65 - min) + min;
		var path = `${rand}.png`;
		images.push(path);
		images.push(path);
	}
    console.log(images);
}