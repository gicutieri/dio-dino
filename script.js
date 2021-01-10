/*
 *	Author: Giovanna Gonçalves Cutieri
 */

 const dino = document.querySelector(".dino");
 let isJumping = false;

 function handleKeyUp(event) {
 	if (event.keyCode === 32) {
 		if (!isJumping) {
 			jump();
 		}
 	}
 }

 function jump(){
 	isJumping = true;
 	let position = 0;

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
 					position -= 20;
	 		dino.style.bottom = position + 'px';
 				}
 			}, 20);

 		} else {
 			//go up
	 		position += 20;
	 		dino.style.bottom = position + 'px';
 		}

 	}, 20);
 }

 document.addEventListener('keyup', handleKeyUp);