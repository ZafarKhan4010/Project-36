var dog,sadDog,happyDog;
var feedDog,addFood;
var foodobj;
var  lastFed;

function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
  
}

function setup() {
  database=firebase.database();
  console.log(database);
  createCanvas(1000,500);
  

  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed = createButton ("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFood);  

  foodobj=new DogFood();
    
}

function draw() {
  background(46,139,87);
 
  //add styles
 
   fedTime =  database.ref("FeedTime");
   fedTime.on("value", function(data){
      lastFed = data.val();  
   })

   fill(255);
   textSize(20);
   if(lastFed >= 12){
     text("Last Feed :" + lastFed % + "PM", 350,30);
   }else if(lastFed == 0){
     text("Last Feed :12 AM",350,30);
   }else{
     text("Last Feed : " + lastFed + "AM",350,30); 
   }  

   foodobj.display();
   drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS = data.val();
  foodobj.updateFoodStock(foodS);
}   

//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);
  foodobj.updateFoodStock(foodobj.getFoodstock()- 1) 
  database.ref('/').update({
     Food: foodobj.getFoodstock(),
     FeedTime: hour()
  })    
}

//function to add food in stock
function addFoods(){
  foods ++;
  database.ref('/').update({
  Food:foods
  })
}