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
 powerOn = false;

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
 		} else if (cactusPosition > 0 && cactusPosition < 60 && position < 60 && powerOn == false) { //if it's on the same position as the dinosaur
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
 		} else if (pterodactylPosition > 0 && pterodactylPosition < 60 && !isCrouching && powerOn == false) { //if the dinosaur is standing
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

  function createPowerUp() {
 	const powerup = document.createElement('div');
 	let powerupPosition = 1000;
 	let randomTime3 = Math.random() * 60000;

 	if(isGameOver) return;

 	powerup.classList.add('powerup');
 	background.appendChild(powerup);
 	powerup.style.left = powerupPosition + 'px';

 	//go left
 	let leftInterval3 = setInterval(() => {
 		
 		if (powerupPosition < -60) {
 			clearInterval(leftInterval3);
 			background.removeChild(powerup);
 		} else if (powerupPosition > 0 && powerupPosition < 60 && position > 30) { //if the dinosaur is jumping
 			clearInterval(leftInterval3);
 			background.removeChild(powerup);
 			powerOn = true;
 			dino.style.backgroundImage = "url(img/dino3.png)";
 			dino.style.width = '74px';
 		} else {
 			powerupPosition -= 10;
 			powerup.style.left = powerupPosition + 'px';
 		}

 	}, 20);


 	//how long the powerup lasts
 	setTimeout(function(){
 		powerOn = false;
 		dino.style.backgroundImage = "url(img/dino.png)";
 		dino.style.width = '60px';
 	}, 8000);

 	//creates new powerup
 	setTimeout(createPowerUp, randomTime3);
 }

 createCactus();
 setTimeout(createPterodactyl, 2000);
 setTimeout(createPowerUp, 5000);
 document.addEventListener('keyup', handleKeyUp);