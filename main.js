var status_check = "";
var cocossd = "";
var objects = [];
var synth = window.speechSynthesis;
var inputvalue = document.getElementById("inputobject").value;
function setup(){
    canvas = createCanvas(640, 420);
    canvas.center();
    background("lightblue");
    video = createCapture(VIDEO);
    video.hide();
}
function start(){
    cocossd = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}
function gotResults(results, error){
    if(error){
        console.log(error);
    }
    if(results){
        console.log(results);
        console.log(objects.length);
        objects = results;
    }
}
function draw(){
    image(video, 0, 0, 640, 420);
    if(status_check != ""){
        console.log("if is working");
        console.log(objects.length);
        for(i = 0; i < objects.length; i++){
            console.log(objects.length);
            fill("red"); 
            percent = floor(objects[i].confidence * 100); 
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15); 
            noFill(); 
            stroke("red"); 
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height); 
            if(inputvalue == objects[i].label){
                video.stop();
                cocossd.detect(gotResults);
                var utterThis = new SpeechSynthesisUtterance("Object Found");
                document.getElementById("status").innerHTML = "Object found!";
                synth.speak(utterThis);
            }
        }
    }
}
function modelLoaded(){
    console.log("cocossd is loaded");
    status_check = true;
    cocossd.detect(video, gotResults);
}
