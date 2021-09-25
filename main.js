sound="";
status="";
objects=[];
function preload(){
}
function setup(){
canvas=createCanvas(380,380);
canvas.center();
video=createCapture(VIDEO);
video.size(380,380);
video.hide();
objectdetector=ml5.objectDetector('cocossd',modelLoaded);
document.getElementById("status").innerHTML="Status: detecting objects";

}
function draw(){
    image(video,0,0,380,380);
   if(status!=""){
    objectdetector.detect(video,gotResult);
    r=random(255);
    g=random(255);
    b=random(255);
for(i=0;i<objects.length;i++){
    document.getElementById("status").innerHTML="Status: objects detected";
    fill(r,g,b);
    percent=floor(objects[i].confidence*100);
    text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
    noFill();
    stroke(r,g,b);
    rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
    if(objects[i].label=="person"){
        document.getElementById("number_of_objects").innerHTML="Baby Found";
    }
    else{
        document.getElementById("number_of_objects").innerHTML="Baby not Found";    
    }
}
if(objects.length==0){
    document.getElementById("number_of_objects").innerHTML="Baby not Found";
}
} 
}
function modelLoaded(){
    console.log("model loaded");
    status=true;
}
function gotResult(error,results){
if(error){
    console.error(error);
}
else{
    console.log(results);
    objects=results;
}
}