/*
 *	Author: Giovanna Gonçalves Cutieri
 */

 const dino = document.querySelector(".dino");
 const background = document.querySelector(".background");

 let isJumping = false;
 let isCrouching = false;
 let isGameOver = false;
 let position = 0;

 function handleKeyUp(event) {
 	if (event.keyCode === 32 || event.keyCode === 38) {
 		if (!isCrouching && !isJumping) {
 			jump();
 		}
 	} else if (event.keyCode === 40) {
 		if (!isCrouching && !isJumping) {
 			crouch();
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
 					clearInterval(downInterval);
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

 function crouch() {
 	isCrouching = true;

 	dino.style.backgroundImage = "url(dino2.png)";

 	let crouchInterval = setInterval(() => {

 		if (position <= 150) {
 			//stop
 			clearInterval(crouchInterval);
 			//stand up
 			let standInterval = setInterval(() => {
 				if (position >= 0) {
 					clearInterval(standInterval);
 					isCrouching = false;
 					dino.style.backgroundImage = 'url(dino.png)';
 				} else {
 					position += 15;
 				}
 			}, 20);

 		} else {
 			//crouch
	 		position -= 15;
 		}

 	}, 400);
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