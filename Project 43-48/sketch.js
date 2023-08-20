var PLAY = 1;
var END = 0;
var gameState = PLAY;

var flippingMan, flippingMan_running, flippingMan_collided;
var score=0;

var gameOver, restart;


function preload(){
  flippingMan_running =   loadAnimation("image_0.png","image_1.png","image_2.png", "image_3.png", "image_4.png");
  flippingMan_collided = loadAnimation("image_0.png");
backgroundImage = loadImage("background.jpg")

  

  gameOverImg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");

}

function setup() {
  createCanvas(600, 200);
  
  flippingMan = createSprite(300,180,20,50);
  
  flippingMan.addAnimation("running", flippingMan_running);
  flippingMan.addAnimation("collided", flippingMan_collided);
  flippingMan.scale = 0.5;
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;

  bar = createSprite(300,40,100,20)
  bar.shapeColor = "white"
  score = 0;
  bar1 = createSprite(350,40,10,20)
  bar1.shapeColor = "green"
  bar2 = createSprite(300,40,10,20)
  bar2.shapeColor = "red"
}

function draw() {
  //flippingMan.debug = true;
  background(backgroundImage);
  text("Score: "+ score, 500,50);
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    //change the flippingMan animation
    flippingMan.changeAnimation("running", flippingMan_running);
    
    if(keyDown("space") && flippingMan.y >= 159) {
      flippingMan.velocityY = -12;
    }
  
    flippingMan.velocityY = flippingMan.velocityY + 0.8
  
    flippingMan.collide(invisibleGround);
    
    if(bar2.x = 400){ 
      bar2.velocityX = 10
      }
      if(bar2.x = 200){
        bar2.velocityX = -10
      }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    flippingMan.velocityY = 0;
    
    //change the flippingMan animation
    flippingMan.changeAnimation("collided",flippingMan_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}



function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  score = 0;
}