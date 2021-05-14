img = "";
status = "";
object = [];

function preload() {
    img = loadImage("Bedroomimg.jpg");
}

function setup() {
    canvas = createCanvas(600, 400);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoded);
    document.getElementById("status").innerHTML = "Status : Detecting Object";
}

function modelLoded() {
    console.log("Model_Loaded");
    status = true;
    objectDetector.detect(img, gotResult);
}

function draw() {
    image(img, 0, 0, 600, 400);
    if (status != "") {
        for (i = 0; i < object.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            fill("#FF0000");
            percent = floor(object[i].confidence * 100);
            noFill();
            stroke("#FF0000");
            text(object[i].label + " " + percent+"%", object[i].x + 15, object[i].y + 15);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }
    }
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        object = results;
    }
}