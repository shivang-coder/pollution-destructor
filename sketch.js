var player ;
var ground;
var playerImage;
var backgroundImage;
var ObstaclesGroup;
var carImage;
var smoke2CarImage;
var score = 0;
var gameOver, restart;
var PLAY = 1;
var END = 0;
var gameState = PLAY;


function preload(){
  playerImage = loadImage("player.png")
backgroundImage = loadImage("background.jpg")
carImage = loadImage("car.png")
smokeCar2Image = loadImage("smokeCar2.jpg")
gameOverImage = loadImage("gameOver.png")
restartImage  = loadImage("restart.png")

}

function setup() {
  createCanvas (1500,600);
   
    ground = createSprite(600,300);
    ground.velocityX = -4;
    ground.addImage("background",backgroundImage);
    ground.x = ground.width /2;
    player = createSprite(100,148,25,25);
   player.scale = 0.3;
   player.addImage("player",playerImage);
ground.scale = 3;
ObstaclesGroup =  new Group();
score = 0;
SmokeObstaclesGroup =  new Group();


  
  gameOver = createSprite(800,160);
  gameOver.addImage("gameOver",gameOverImage);
  
  restart = createSprite(800,250);
  restart.addImage("restart",restartImage);
  
  //gameOver.scale = 1.5;
  //restart.scale = 1.5;

  gameOver.visible = false;
  restart.visible = false;
}

function draw() {
  background("orange");  

textSize (30);
textFont ("Georgia");
  
  if (gameState===PLAY){
    
    ground.velocityX = -(6 + 3*score/100);
  
  edges = createEdgeSprites();
  console.log(player.y);

  if(keyDown("space") && player.y > 511)  {
    player.velocityY = -28;
  }
  player.velocityY = player.velocityY + 1;



 
 spawnObstacles();
 spawnSmokeObstacles();







  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  if(ObstaclesGroup.isTouching(player)){
    gameState = END;
}
if(SmokeObstaclesGroup.isTouching(player)){
  SmokeObstaclesGroup.destroyEach();
  score = score + 10;

}

}
else if (gameState === END) {
gameOver.visible = true;
restart.visible = true;

//set velcity of each game object to 0
ground.velocityX = 0;
player.velocityY = 0;
ObstaclesGroup.setVelocityXEach(0);
 

if(mousePressedOver(restart)){
  reset();
}



}



  drawSprites();
  text("Score: "+ score, 500,50);


player.collide(edges[3]);    



}
function spawnObstacles(){

if(frameCount % 115 ===0 ){
  var obstacle = createSprite(1500,560,10,40);
  //obstacle.debug = true;

  obstacle.velocityX = -16; 
  
  //generate random obstacles
  var rand = Math.round(random(1,2));
  
  obstacle.addImage(carImage);
         
  
  //assign scale and lifetime to the obstacle           
  obstacle.scale = 0.1;
  obstacle.lifetime = 300;
  //add each obstacle to the group
  ObstaclesGroup.add(obstacle);
}
}
function spawnSmokeObstacles(){

  if(frameCount % 180 ===0 ){
    var smokeObstacle = createSprite(1500,560,10,40);
    //obstacle.debug = true;
  
    smokeObstacle.velocityX = -16; 
    
    //generate random obstacles
    var rand = Math.round(random(1,2));
    
      
             
      smokeObstacle.addImage(smokeCar2Image);
           
    
     
    
    
    //assign scale and lifetime to the obstacle           
    smokeObstacle.scale = 0.1;
    smokeObstacle.lifetime = 300;
    //add each obstacle to the group
    SmokeObstaclesGroup.add(smokeObstacle);
  }
  }
  


function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  

  SmokeObstaclesGroup.destroyEach();
  ObstaclesGroup.destroyEach();

  score = 0;



}
