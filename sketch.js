//create variables
var PLAY=1;
var END=0;
var gameState=PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, ObstacleGroup
var ground;
var score

//load the image and animations
function preload(){
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
createCanvas(600,500);
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  //create ground 
  ground = createSprite(400,350,1200,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x)
  
  //creating separete groups for food and obstacle to bring them as function later
  FoodGroup = new Group();
  ObstacleGroup = new Group();
  
  var survivalTime=0;
}


function draw() {
background("lightblue");
 
  
  
  if (gameState==PLAY){
  //make the score stop when money touches the obstacle
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time:"+survivalTime,230,50);
  survivalTime.visible=(true);   
    if(ground.x<0){
    ground.x=ground.width/2;
    } 
      //make monkey jump
  if(keyWentDown("space")){
  monkey.velocityY=-15;
 }
  monkey.velocityY=monkey.velocityY+0.8;
  monkey.collide(ground);
  
  spawnFood();
  spawnObstacle();
      
  if(ObstacleGroup.isTouching(monkey)){
    gameState=END;
    
  }
      
  }
  else if (gameState==END){
    ground.velocityX=0;
    monkey.velocityX=0;
    monkey.velocityY=0;
    ObstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    ObstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    
  }  
  
  
  //make the score
  drawSprites();
  stroke("lightblue");
  textSize(20);
  fill("lightblue");
  text("Score:"+score,400,50);
  
  
  //show the survival period of the monkey
  
}
//create function for food
function spawnFood(){
  if(frameCount % 80 ==0) {
    banana = createSprite(550,400,20,10);
    banana.y = random(120,200);
    banana.velocityX = -7;
    banana.lifetime = 200;
    monkey.depth = banana.depth + 1;
    banana.addImage(bananaImage);
    banana.scale = 0.07;
    FoodGroup.add(banana);
  }
}
//create function for obstacles
function spawnObstacle(){
  if(frameCount % 200 == 0){
    obstacle = createSprite(550,327,12,15);
    obstacle.velocityX=-5;
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.12;
    obstacle.lifetime = 200;
    ObstacleGroup.add(obstacle);
  }
}


