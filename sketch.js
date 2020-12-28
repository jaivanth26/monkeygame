var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup,ground,invisibleground
var survialTime


function preload(){
   monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(600, 500);

  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("mon",monkey_running);
  monkey.scale=0.1
  
  ground=createSprite(400,350,900,10)
  ground.velocityX=-4
  ground.x = ground.width /2;
  console.log(ground.x)
  
  invisibleground=createSprite(400,350,900,2)
  invisibleground.visible=false
  
  obstaclesGroup = createGroup();
  FoodGroup = createGroup();
  
 survivalTime=0

  
 
  
  score = 0;
  
}

function draw() {
  
  background("black");
 
  
  stroke("white") 
  textSize(20)
  fill("white")
  
  survivalTime=Math.ceil(frameCount/frameRate());
  text("survivalTime:"+survivalTime,100,50);
  
  monkey.collide(invisibleground)
  
  
  if(keyDown("space")&& monkey.y>=310){
    monkey.velocityY=-16
   
  }
  
  //if(keyWentDown("space")){
   // monkey.velocityY=0
 // }
  
  monkey.velocityY=monkey.velocityY + 0.8
  
  Banana();
  spawnObstacles();
  
   if (ground.x < 150){
      ground.x = ground.width/2;
    }
  
if(obstaclesGroup.isTouching(monkey)){
  obstaclesGroup.setVelocityXEach(0);
  FoodGroup.setVelocityXEach(0);
  obstaclesGroup.setLifetimeEach(-1);
      FoodGroup.setLifetimeEach(-1);
  survivalTime=0
  
}
  
       

  drawSprites();
}


function Banana(){
  if(frameCount % 80==0){
    banana=createSprite(500,400,20,20);
    banana.addImage("banana",bananaImage);
    banana.y=Math.round(random(120,160))
    banana.velocityX=-8
    banana.lifetime=150
     banana.depth = monkey.depth;
  monkey.depth=monkey.depth+1
    banana.scale=0.1
    FoodGroup.add(banana)
    
  }
  
  
}


function spawnObstacles(){
 if (frameCount % 300 === 0){
    obstacle = createSprite(600,307,10,40);
   obstacle.addImage("ob",obstacleImage)
   obstacle.velocityX = -(6 + score/100);
   
    obstacle.depth=monkey.depth
   
  monkey.depth=monkey.depth+1
   
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2  ;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}






