

let pts;
let caslon;
let colorPicker; 
let input;
let img; 
let nval=0.1; 
let sel; 
let recording = false 
let col;
let rot; 
let alpha;



function preload(){
  caslon = loadFont('36days-Light.ttf');
}

function setup() {
 
  createCanvas(windowWidth, windowHeight); 
  
  colorPicker = select('#color-picker-background');
  colorPickerfill = select('#color-picker-fill');
  colorPickerol = select('#color-picker-stroke');
  
  nslider = select('#range-points');
  cslider = select('#range-scale');
  wslider = select('#range-stroke');
  rslider = select('#range-rotate');

  sel = select('#select-brush-shape');
  sel.changed(mySelectEvent);
  
  input = select('#upload-image');
  input.changed(handleFile);
  
  selmouse = select("#animate-letter");
  selmouse.changed(mySelectEvent);
 
  button = select("#save-image");
  button.mousePressed(saveJPG); 
  button.mouseOver(changeGray); 
  button.mouseOut(changeAlpha);
  
  // We have two different save buttons now,
  // Make sure both of them do the same thing.
  buttonMobile = select("#save-image-mobile");
  buttonMobile.mousePressed(saveJPG);
  
  // Attach event listeners to the menu buttons so that
  // they animate the mobile menu to slide up or slide down.
  let menuOpen = select("#menu-open");
  menuOpen.mousePressed(() => {
    select("#menu").class("slide-up")
  })
  
  let menuClose = select("#menu-close");
  menuClose.mousePressed(() => {
    select("#menu").class("slide-down")
  })
  
 //  button = createButton('save svg');
 // button.position(10, 580);
//  button.mousePressed(saveSVG); 
  //let col = color('grey'); //use color instead of fill
 
 
} 



function draw() { 
  
  let wval = wslider.value();
  let cval = cslider.value();
  let rval = rslider.value();
  let val = sel.value();
  let valmouse = selmouse.value();
  let scalex = (mouseX/5)+5;  
 // let alpha = 255; 
  
  
 
  
  
 // button = createButton('save mp4');
  //let col = color('grey'); //use color instead of fill
//  button.position(8, 625);
//  button.mousePressed(saveMP4);
//  button.style('font-size', '15px');
//  button.style('background-color', col);
//  button.style('color', 'white');
//  button.style('border', 'none');
//  button.style('padding', '8px 15px');
//  button.style('width', '100px');
//  button.addClass('button');
  
  input.style('display', 'none');
   let nval = nslider.value(); 
   let nval2= nval/10; 
  
   if(valmouse != 'points'){  
     nval2= nval/10; 
   } else if(valmouse == 'points'){  
     nval2= (mouseX/(2500)); 
   }
  
   pts = caslon.textToPoints('v', (windowWidth/2)-225, (windowHeight/2)+220, 950,{
    sampleFactor: nval2,
    simplifyThreshold: 0
  });
  
  
  
  translate (0,0)
  background(colorPicker.value());
  textSize(15); 
  fill(128,128,128,alpha);
  noStroke(); 
//  text('Click to start/stop recording ', 10, 620);
  
  fill(colorPickerfill.value());
  stroke(colorPickerol.value()); 
  
  translate(width*0.1, height*0.1)
   scale(0.8);
 
   if(valmouse != 'stroke'){   
  strokeWeight(wval); 
   } else if (valmouse == 'stroke'){ 
     strokeWeight(mouseX/100); 
   }
   
  if(valmouse != 'rotate'){  
     
    rot = rval; 
   } else if (valmouse == 'rotate'){ 
      rot = mouseX/1000; 
   }
  
   if(valmouse != 'scale'){  
     sca = cval; 
   } else if (valmouse == 'scale'){ 
      sca = scalex; 
   }
  
  
  
  for(let i =0; i< pts.length; i++){
 
      
    
  if(val == 'circle'){ 
     push()
    translate((pts[i].x) ,(pts[i].y))
    rotate(frameCount * rot/100);
    // rotate(rot);
    ellipse(0, 0, sca, sca); 
    input.style('display', 'none'); 
    pop()
  } else if(val == 'square'){
     push()
    translate((pts[i].x) ,(pts[i].y))
    rotate(frameCount * rot/100);
    // rotate(rot);
   	rect(-sca/2, -sca/2, sca, sca);  
    input.style('display', 'none');
    pop()
  } else if(val == 'image'){
    push()
    translate((pts[i].x) ,(pts[i].y))
    rotate(frameCount * rot/100);
    // rotate(rot);
   	input.style('display', 'block');
    if (img) {
    image(img, -sca/2, -sca/2, (sca*(img.width))/img.height, sca);
    noFill();
    rect(-sca/2, -sca/2, (sca*(img.width))/img.height, sca);
    } 
    pop()
  }  

    
    
    
  
  }
  return false;
} 

function mySelectEvent() {
}



function handleFile(file) {
  let fileData = file.target.files[0]

  if (fileData.type.includes("image")) {
    let urlOfImageFile = URL.createObjectURL(fileData);
    let imageObject = loadImage(urlOfImageFile, (myImg) => {
      img = myImg
    })
  } else {    
    img = null
  }
} 


function changeGray() {
  alpha = 0;
  }
  
function changeAlpha() {
  alpha = 255;
  }


function saveJPG() {
   console.log("saving")
    save();
    console.log("saved...?") 
   
}


//function saveSVG() {
//   save("mySVG.svg"); // give file name
//  print("saved svg");
//}


function saveMP4() {
     if (recording) {
       col = color('grey'); 
    stopRecording()
    recording = false
  } else { 
    col = color('red');
    startRecording()
    recording = true
  }
}



function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  
} 

