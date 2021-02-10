var PLAY = 1;
var END = 0;
var gameState = PLAY;

var backImage,backgr;
var player, player_running;
var ground,ground_img;

var FoodGroup, bananaImage;
var obstaclesGroup, obstacle_img;

var gameOver;
var score;


function preload()
{
  backImage=loadImage("jungle.jpg");
  player_running=loadAnimation("Monkey10.png","Monkey2.png","Monkey3.png","Monkey4.png","Monkey5.png","Monkey6.png","Monkey7.png","Monkey8.png","Monkey9.png");
  
  
  monkeyImage= loadAnimation("Monkey3.png")
  bananaImage = loadImage("banana.png");
  obstacle_img = loadImage("stone.png"); 
  gameoverimg = loadImage("gameOver.png"); 
  
}

function setup() 
{
  createCanvas(600,500);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.addAnimation("player",monkeyImage)
  player.scale = 0.1;
  //player.debug=true;
  
  ground = createSprite(600,350,1200,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
  
  FoodGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
  
  stroke("black");
  textSize(20);
  fill("white");
}

function draw() 
{
  //background(255);
  
  drawSprites();
  
    if(gameState === PLAY)
     {
       
       //resetting ground
        if(ground.x<0) 
        {
          ground.x=ground.width/2;
        }
       
       //moving background
        if(backgr.x<100)
        {
          backgr.x=backgr.width/2;
        }
       

       //monkey scoring
        if(FoodGroup.isTouching(player))
        {
          FoodGroup.destroyEach();
          score= score + 1;
        }


       //jumping monkey
        if(keyDown("space") ) 
        {
          player.velocityY = -12;
        }

       //gravity
       player.velocityY = player.velocityY + 0.8;

       //monkey looses
        if(obstaclesGroup.isTouching(player))
          {
            gameState=END;
          }
    
        spawnFood();
        spawnObstacles();
 
    }
  else
    if(gameState===END)
   { 
      
        player.velocityY=0;
        ground.velocityX=0;
        backgr.velocityX=0;
        gameOver = createSprite(200,200,50,50);
        gameOver.addImage(gameoverimg);
        gameOver.scale = 0.9
        obstaclesGroup.setVelocityXEach(0);
        FoodGroup.setVelocityXEach(0);
     
        obstaclesGroup.setLifetimeEach(-1);
        FoodGroup.setLifetimeEach(-1);
     
        player.changeAnimation("player",monkeyImage)
     
      
    }
  player.collide(ground);
  
  text("Score: "+ score, 500,50);
}

function spawnFood()
{
  //write code here to spawn the food
  if (frameCount % 100 === 0)
  {
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -5;
    
     //assign lifetime to the variable
    banana.lifetime = 300;
    player.depth = banana.depth + 1;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() 
{
  if(frameCount % 200 === 0) 
  {
    var obstacle = createSprite(800,350,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacle_img);
    
    obstacle.debug=false;
    obstacle.setCollider("circle",0,0,150)
    
    //assign scale and lifetime to the obstacle     
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}
