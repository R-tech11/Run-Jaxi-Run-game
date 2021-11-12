var path,boy, leftBoundary,rightBoundary;
var pathImg,boyImg, bombImg, coinImg, drinkImg;
var i, score = 0;
var gameState, PLAY = 1, END = 0;

function preload()
{
  pathImg = loadImage("path.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  bombImg = loadImage("bomb.png");
  coinImg = loadImage("coin.png");
  drinkImg = loadImage("energyDrink.png");
}

function setup()
{
  createCanvas(400,400);
  
  // Moving background
  path = createSprite(200,200);
  path.addImage(pathImg);
  path.velocityY = 4;
  path.scale = 1.2;

  //creating boy running
  boy = createSprite(180,340,30,30);
  boy.scale = 0.07;
  boy.addAnimation("JakeRunning",boyImg);
    
  leftBoundary = createSprite(0,0,100,800);
  leftBoundary.visible = false;

  rightBoundary = createSprite(410,0,100,800);
  rightBoundary.visible = false;

  bombGroup = new Group();
  coinGroup = new Group();
  drinkGroup = new Group();

  gameState = PLAY;
}

function draw() 
{
  background(0);
  if(gameState === PLAY)
  {
    path.velocityY = 4;
  
    boy.x = World.mouseX;

    //code to reset the background
    if(path.y > 400 )
    {
      path.y = height/4;
    }
   
    createBomb();
    createCoin();
    createdrink();

    if(boy.isTouching(coinGroup))
    {
      score = score + 1;
      coinGroup.destroyEach();
    }
    else if(boy.isTouching(drinkGroup))
    {
      score = score + 5;
      drinkGroup.destroyEach();
    }
    else if(boy.isTouching(bombGroup))
    {
      gameState = END;
    }
  }
  else if(gameState === END)
  {
    path.velocityY = 0;

    coinGroup.destroyEach();
    drinkGroup.destroyEach();
    bombGroup.destroyEach();

    boy.destroy();

  }

  edges = createEdgeSprites();

  boy.collide(edges[3]);
  boy.collide(leftBoundary);
  boy.collide(rightBoundary);
  
  drawSprites();

  textSize(20);
  fill(200);
  text("Point: "+ score,50,30);

}

function createBomb()
{
  if (World.frameCount %  Math.round(random(200, 450)) == 0) {
    var bomb = createSprite(Math.round(random(50, 350),40, 10, 10));
    bomb.addImage(bombImg);
    bomb.scale = 0.1;
    bomb.velocityY = 4;
    bomb.lifetime = 150;
    bombGroup.add(bomb);
  }
}

function createCoin()
{
  if (World.frameCount %  Math.round(random(200, 300)) == 0) {
    var coin = createSprite(Math.round(random(50, 350),40, 10, 10));
    coin.addImage(coinImg);
    coin.scale = 0.4;
    coin.velocityY = 4;
    coin.lifetime = 150;
    coinGroup.add(coin);
  }
}

function createdrink()
{
  if (World.frameCount %  Math.round(random(200, 600)) == 0) {
    var drink = createSprite(Math.round(random(50, 350),40, 10, 10));
    drink.addImage(drinkImg);
    drink.scale = 0.1;
    drink.velocityY = 4;
    drink.lifetime = 150;
    drinkGroup.add(drink);
  }
}



