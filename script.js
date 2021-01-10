/*
 *	Author: Giovanna Gonçalves Cutieri
 */

 const dino = document.querySelector(".dino");
 const background = document.querySelector(".background");

 let isJumping = false;
 let isGameOver = false;
 let position = 0;

 function handleKeyUp(event) {
 	if (event.keyCode === 32 || event.keyCode === 38) {
 		if (!isJumping) {
 			jump();
 		}
 	}
 }

 function jump(){
 	isJumping = true;

 	let upInterval = setInterval(() => {

 		if (position >= 150) {
 			//stop
 			clearInterval(upInterval);
 			//go down
 			let downInterval = setInterval(() => {
 				if (position <= 0) {
 					clearInterval(upInterval);
 					isJumping = false;
 				} else {
 					position -= 15;
	 		dino.style.bottom = position + 'px';
 				}
 			}, 20);

 		} else {
 			//go up
	 		position += 15;
	 		dino.style.bottom = position + 'px';
 		}

 	}, 20);
 }

 function createCactus() {
 	const cactus = document.createElement('div');
 	let cactusPosition = 1000;
 	let randomTime = Math.random() * 6000;

 	if(isGameOver) return;

 	cactus.classList.add('cactus');
 	background.appendChild(cactus);
 	cactus.style.left = cactusPosition + 'px';

 	//go left
 	let leftInterval = setInterval(() => {
 		
 		if (createCactus < -60) {
 			clearInterval(leftInterval);
 			background.removeChild(cactus);
 		} else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) { //if it's on the same position as the dinossaur
 			clearInterval(leftInterval);
 			isGameOver = true;
 			document.body.innerHTML = "<h1 class=\"game-over\">GAME OVER</h1>";
 		} else {
 			cactusPosition -= 10;
 			cactus.style.left = cactusPosition + 'px';
 		}

 	}, 20);

 	//creates new cactus
 	setTimeout(createCactus, randomTime);
 }

 createCactus();
 document.addEventListener('keyup', handleKeyUp);