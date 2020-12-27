//Create variables here
var dog, dogImg, happyDogImg, database, foodS, foodStock;

function preload(){
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/happydogImg.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  foodStock = database.ref("Food");
  foodStock.on("value", readStock);
  foodStock.set(20);

  dog = createSprite(250,330,10,60);
  dog.addImage(dogImg);
  dog.scale = 0.2;
}

function draw() {  
  background("black");
  if(foodS!== undefined){
    textSize(20);
    fill(255); 
    text("Note: Press UP_ARROW Key To Feed Drago Milk!", 30,70);
    text("Food Remaining: "+foodS, 150,160);

    if(keyWentDown(UP_ARROW)){
      writeStock(foodS);
      dog.addImage(happyDogImg);
    }

    if(keyWentUp(UP_ARROW)){
      dog.addImage(dogImg);
    }
  
    if(foodS === 0){
      foodS = 20;
    }

    drawSprites();
}}

function writeStock(x){
  if(x<=0){
    x = 0;
  }
  else{
    x = x-1;
  }
  database.ref("/").update({
    Food:x
  });
}

function readStock(data){
  foodS = data.val();
}