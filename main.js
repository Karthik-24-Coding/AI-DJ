song1="";
song2="";

song1_status="";
song2_status="";

score_right_wrist=0;
score_left_wrist=0;

right_wrist_x=0;
right_wrist_y=0;

left_wrist_x=0;
left_wrist_y=0;

function preload(){
    song1=loadSound("heatwaves.mp3");
    song2=loadSound("ghost.mp3");
}

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("PoseNet is initialized");
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        score_right_wrist=results[0].pose.keypoints[10].score;
        score_left_wrist=results[0].pose.keypoints[9].score;

        right_wrist_x=results[0].pose.rightWrist.x;
        right_wrist_y=results[0].pose.rightWrist.y;

        left_wrist_x=results[0].pose.leftWrist.x;
        left_wrist_y=results[0].pose.leftWrist.y;
    }
}

function draw(){
    image(video,0,0,600,500);

    song1_status=song1.isPlaying();
    song2_status=song2.isPlaying();

    fill("red");
    stroke("red");

    if(score_right_wrist>0.2){
        circle(right_wrist_x,right_wrist_y,20);
        song2.stop();

        if(song1_status == false){
            song1.play();
            document.getElementById("speed").innerHTML="Playing Heatwaves";
        }
    }

    if(score_left_wrist>0.2){
        circle(left_wrist_x,left_wrist_y,20);
        song1.stop();

        if(song2_status == false){
            song2.play();
            document.getElementById("volume").innerHTML="Playing Ghost";
        }
    }
}