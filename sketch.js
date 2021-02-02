var PLAY = 1; 
var END = 0;
var gameState = PLAY;
var monkey , monkey_running,monkeycollide;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var ground,groundimg,ground;
var survivalTime;
var Score;
var gameoverimg;
var restartimg;
var reset;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  monkeycollide=loadAnimation("sprite_0.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

  restartimg=loadImage("restart.png");
  groundimg=loadImage("jungle.jpg");
  
  gameoverimg=loadImage("over.png");
}



function setup() {
  createCanvas(600,400);
  

  jungle=createSprite(300,100,800,20);
  jungle.addAnimation("jungle.jpg",groundimg);
  jungle.scale=1.2;
  jungle.x = jungle.width /62;

  gameover=createSprite(270,190,40,40);
  gameover.addAnimation("over.png",gameoverimg);
  gameover.scale=0.5;
  
  monkey=createSprite(100,310,20,10);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale=0.1;
  
  FoodGroup=createGroup();
  obstacleGroup=createGroup();
  
  ground=createSprite(300,340,600,10);
 ground.x = ground.width /6;
  
  restart=createSprite(270,250,20,20);
  restart.addAnimation("47-512.png",restartimg);
  restart.scale=0.1;
 

  Score=0;
  survivalTime=0;
  
   
}


function draw() {
background(525)
  
  
   
  
  
 
  
  if(gameState===PLAY){ 
    
    survivalTime = survivalTime + Math.round(frameCount/60);
    restart.visible=false;
  ground.visible=false;
    gameover.visible=false;
    
    jungle.velocityX = - 8;
    
  if(keyDown("space")){
    monkey.velocityY = -10;
  }
  
  if(monkey.isTouching(FoodGroup)){
    FoodGroup.destroyEach();
    Score=Score+2;
  }
  
    if(monkey.isTouching(obstacleGroup)){
     
    gameState = END;
  
 
    
  }
  
  if (jungle.x < 0){
      jungle.x = jungle.width/2;
    }
  
  monkey.velocityY=monkey.velocityY+0.8;
  monkey.collide(ground);
 
  
  //call objects
  Food();
  obstacle();
  
  
    }
  
 else if(gameState===END){
      monkey.collide(ground);
 obstacleGroup.setVelocityXEach(0);
   FoodGroup.setVelocityXEach(0);
   restart.visible=true;
   gameover.visible=true;
  obstacleGroup.setLifetimeEach  (-1);
  FoodGroup.setLifetimeEach  (-1);
   jungle.velocityX=0;
   
   if(mousePressedOver(restart)){
     reset();
   }
   

  
 
  
  }
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score:"+ Score,400,50);
  
    stroke("black");
  textSize(20);
  fill("black");
  text("SurvivalTime:"+ survivalTime,150,90);


  
}

function Food(){
 if(frameCount%80===0){
   banana=createSprite(390,300,50,50);
   banana.y=Math.round(random(200,250));
   banana.addImage(bananaImage);
   banana.scale=0.05;
   banana.velocityX=-5;
   banana.lifetime=100;
   
   
  FoodGroup.add(banana);

 }
 }

function reset(){
  Score=0;
  FoodGroup.destroyEach();
  obstacleGroup.destroyEach();
  gameState = PLAY;
  survivalTime = 0;

}
function obstacle(){
 
 if(frameCount%100===0){
  rock=createSprite(600,310,20,20);
  rock.addImage(obstacleImage);
  rock.scale=0.15;
  rock.velocityX=-5;
  rock.lifetime=200;
   
  obstacleGroup.add(rock);

 }
 }










































































































































