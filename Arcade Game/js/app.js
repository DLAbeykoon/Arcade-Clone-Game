//Project Name : Arcade Clone Game RMIT
// Description :  The File consists of the functionalites of the game both enemy and player classes , Enemy collisions , Speed etc
//Author : Dumindu Abeykoon

"use strict";

let score = 0,
    gscore = document.querySelector('.score > span'),
    lives = 3,
    livesdiv = document.querySelector('.lives > span');
//defining the enemy class
class Enemy {
    constructor(x,y,motion){
        this.x = x;
        this.y = y;
        this.motion = motion;
        this.sprite = 'images/enemy-bug.png';
    }
    update(dt){
        this.x += this.motion * dt;
        livesdiv.innerText = lives;//showing the default number of lives
        // Restarts enemy movement from the left when Player reaches the water
        if (this.x > 500) {
            this.x = -100;
            this.motion = 100 + Math.floor(Math.random() * 400);//the speed of the enemy will be random
        }
        //condition for the collision of player and enemy
            if( player.x >= this.x -50 && player.x <=this.x + 50 ){
            if( player.y >= this.y -50 && player.y <=  this.y+50 ){
                player.x = 200;
                player.y = 300;
                lives--;//redcuing one live each time the player hits an enemy
                livesdiv.innerText = lives;
                //condition to check if the lives value is equal to zero then the confirmation message box will apper
                if(lives === 0 ){
                    confirm("Do you want to play again");
                lives = 3;
                score = 0;
                livesdiv.innerText = lives;
                gscore.innerText = '';
                }
            }
        }
    }
    render(){
        //render function will the images in the game
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}
//creating the player class
class Player{
    constructor(x,y,motion){
        //same as the enemy function this will determine the x and y axis and the moves of the player
        this.x = x;
        this.y = y;
        this.motion = motion;
        this.sprite = 'images/char-boy.png';//uploading the image for player
    }
    update(){
        //this if condition will determine when the player reaches the water and score upto 50 points the game will be won
        if(this.y < 0){
                this.x = 200;
                this.y = 300;
            score++;//score will increment
            gscore.innerText = score * 10;//score will be added to the html and multiplied by 10
            if(score === 5){
                confirm('You won the game!');
                 score = 0;//score will default to zero
                 lives = 3;
                 gscore.innerText = '';
            }
        }
    }
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);//Drawing the images using on the page
    }
   //the below code will help the player to move through the board without going out of the board
    handleInput(keypress){
        if( keypress =='left' && this.x > 0){
            this.x -= this.motion + 20;
        }else if(keypress =='right' && this.x < 380){
            this.x += this.motion + 20;
        }else if(keypress =='up' && this.y > 0){
            this.y -= this.motion + 20;
        }else if (keypress == 'down' && this.y < 410){
            this.y += this.motion + 20;
        }

    };
}

let allEnemies = [];
let player = new Player(200,300,20);//player class
let enemystat = [50,100, 165, 230];//enemy class with four enemies
//the loop to run through the list of enemies to list to set the position
enemystat.forEach((enemyPos) => {
    let enemy = new Enemy(0, enemyPos, 100 + Math.floor(Math.random() * 500));
    allEnemies.push(enemy);
});

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
