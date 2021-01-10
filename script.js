/*
 *	Author: Giovanna Gonçalves Cutieri
 */

 const dino = document.querySelector(".dino");
 const background = document.querySelector(".background");
 const scoreTag = document.querySelector(".score");

 let isJumping = false;
 let isCrouching = false;
 let isGameOver = false;
 let position = 0;
 let score = 0;

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
 	position = 0;

 	dino.style.backgroundImage = "url(img/dino2.png)";
 	dino.style.width = '80px';

 	//dino.style.backgroundColor = "green";

 	let crouchInterval = setInterval(() => {

 		if (position <= -150) {
 			//stop
 			clearInterval(crouchInterval);
 			//stand up
 			let standInterval = setInterval(() => {
 				if (position >= 0) {
 					clearInterval(standInterval);
 					isCrouching = false;
 					dino.style.backgroundImage = "url(img/dino.png)";
 					dino.style.width = '60px';
 					//dino.style.backgroundColor = "transparent";
 				} else {
 					position += 15;
 				}
 			}, 20);

 		} else {
 			//crouch
	 		position -= 15;
 		}

 	}, 20);
 }

 function createCactus() {
 	const cactus = document.createElement('div');
 	let cactusPosition = 1000;
 	let randomTime = Math.random() * 10000;

 	if(isGameOver) return;

 	cactus.classList.add('cactus');
 	background.appendChild(cactus);
 	cactus.style.left = cactusPosition + 'px';

 	//go left
 	let leftInterval = setInterval(() => {
 		
 		if (cactusPosition < -60) {
 			clearInterval(leftInterval);
 			background.removeChild(cactus);
 			score += 1;
 			scoreTag.innerHTML = "SCORE: " + score;
 			//console.log(score);
 		} else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) { //if it's on the same position as the dinosaur
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

 function createPterodactyl() {
 	const pterodactyl = document.createElement('div');
 	let pterodactylPosition = 1000;
 	let randomTime2 = Math.random() * 10000;

 	if(isGameOver) return;

 	pterodactyl.classList.add('pterodactyl');
 	background.appendChild(pterodactyl);
 	pterodactyl.style.left = pterodactylPosition + 'px';

 	//go left
 	let leftInterval2 = setInterval(() => {
 		
 		if (pterodactylPosition < -60) {
 			clearInterval(leftInterval2);
 			background.removeChild(pterodactyl);
 			score += 1;
 			scoreTag.innerHTML = "SCORE: " + score;
 			//console.log(score);
 		} else if (pterodactylPosition > 0 && pterodactylPosition < 60 && !isCrouching) { //if the dinosaur is standing
 			clearInterval(leftInterval2);
 			isGameOver = true;
 			document.body.innerHTML = "<h1 class=\"game-over\">GAME OVER</h1>";
 		} else {
 			pterodactylPosition -= 10;
 			pterodactyl.style.left = pterodactylPosition + 'px';
 		}

 	}, 20);

 	//creates new pterodactyl
 	setTimeout(createPterodactyl, randomTime2);
 }

 createCactus();
 setTimeout(createPterodactyl, 2000);
 document.addEventListener('keyup', handleKeyUp);