var pointArray = [];
var pointer;
var corner, cornerW, cornerH;

let cosiAzure;
let alteha_regular;
let alteha_bold;

function preload() {
  cosiAzure = loadFont('assets/CosiAzure-Bold.otf');
  alteha_bold = loadFont('assets/ALTEHAASGROTESKBOLD.TTF');
  alteha_regular = loadFont('assets/ALTEHAASGROTESKREGULAR.TTF');
}

function setup() {
  createCanvas(video.width, windowHeight);

  pointer = new Point(0, 0);
  corner = new Point(0, 0);
  cornerW = new Point(0, 0);
  cornerH = new Point(0, 0);

}

function draw() {
  clear();
  background(0, 0, 0, 255);
  stat = 2;

  if (stat == 0) {
    stat0();
  } else if (stat == 1) {
    stat1();
  } else if (stat == 2) {
    stat2();
  } else if (stat == 3) {
    stat3();
  } else if (stat == 4) {
    stat4();
  }


  textSize(10)
  noCursor()
  noFill()
  strokeWeight(1)
  stroke("white")

  //MOUSE pointer
  ellipse(mouseX, mouseY, 30)
  pointer.update(mouseX, mouseY);
  pointer.display();

  //CHECK IF AGE REMAIN THE SAME FOR A WHILE
  var average = getAvg(ageArray);

  if (stat != 3 && stat != 4) {

    if (detection == undefined) {
      trigger--;
      if (trigger <= 0) {
        stat = 0;
        trigger = 0;
      }
    } else {
      trigger++;
      if (trigger >= 300) {
        trigger = 300;
      }
    }
  }
}

function getAvg(grades) {
  const total = grades.reduce((acc, c) => acc + c, 0);
  return total / grades.length;
}

function windowResized() {
  resizeCanvas(video.width, windowHeight);
}

function Point(_x, _y) {
  this.x = _x;
  this.y = _y;
  this.speed = 5;
  this.directionX = 1;
  this.directionY = 1;

  this.noiseSeed = random();
  this.noise;
  this.s = random();
  this.n;

  this.update = function(_targetX, _targetY) {

    this.noise = 50 * noise(millis() / 10000 + this.noiseSeed);
    this.n = 3 * noise(millis() / 10000 + this.s);

    this.x = this.x + cos(this.noise / 3) * 2 * this.n
    this.y = this.y + sin(this.noise / 3) * 2 * this.n

    var deltaX = this.x - _targetX;
    var deltaY = this.y - _targetY;

    if (deltaX >= 0) {
      this.directionX = -1;
    } else {
      this.directionX = 1;
    }
    if (deltaY >= 0) {
      this.directionY = -1;
    } else {
      this.directionY = 1;
    }
    this.x = this.x + (this.speed * this.directionX * abs(deltaX) / 20);
    this.y = this.y + (this.speed * this.directionY * abs(deltaY) / 20);
  }

  this.display = function() {
    noStroke();
    fill(255, 255, 255, 20)
    ellipse(this.x, this.y, 15)
    ellipse(this.x, this.y, 12)
    ellipse(this.x, this.y, 9)
    ellipse(this.x, this.y, 9)
    ellipse(this.x, this.y, 7)
    ellipse(this.x, this.y, 6)
    ellipse(this.x, this.y, 5)
    fill(255, 255, 255)
    ellipse(this.x, this.y, 5)
  }
}

// function displaySquare() {
//   if (via > 0) {
//     noFill();
//     strokeWeight(3);
//     stroke("white")
//     var adjustY = (windowHeight - video.height) / 2
//
//     var cornerposY = sqY + adjustY
//     var d = (height / 2 - cornerposY) * 0.5;
//     console.log(windowHeight)
//     console.log(height);
//
//     corner.update(width - sqX + 100, sqY + adjustY - d + 100);
//     cornerW.update(sqW + 100, sqX);
//     cornerH.update(sqX, sqH + 100);
//     rect(corner.x, corner.y, -cornerW.x, cornerH.y);
//   }
// }

function displaySquare() {
  if (via > 0) {
    noFill();
    strokeWeight(3);
    stroke("white")
    var adjustY = (windowHeight - video.height) / 2

    var cornerposY = sqY + adjustY
    var d = (height / 2 - cornerposY) * 0.5;
    console.log(windowHeight)
    console.log(height);

    corner.update(width - sqX + 100, sqY + adjustY - d + 330);
    cornerW.update(sqW + 200, sqX);
    cornerH.update(sqX, sqH + 200);

    // stroke("red");
    // rect(corner.x, corner.y, -cornerW.x, cornerH.y);

    var lunghezza = 60;

    stroke("white");
    // punto in alto a destra
    line(corner.x, corner.y, corner.x - lunghezza, corner.y);
    line(corner.x, corner.y, corner.x, corner.y + lunghezza);
    // punto in alto a sinistra
    line(corner.x - cornerW.x, corner.y, corner.x - cornerW.x + lunghezza, corner.y);
    line(corner.x - cornerW.x, corner.y, corner.x - cornerW.x, corner.y + lunghezza);
    // punto in basso a destra
    line(corner.x, corner.y + cornerH.y, corner.x - lunghezza, corner.y + cornerH.y);
    line(corner.x, corner.y + cornerH.y, corner.x, corner.y + cornerH.y - lunghezza);
    // punto in basso a sinistra
    line(corner.x - cornerW.x, corner.y + cornerH.y, corner.x - cornerW.x + lunghezza, corner.y + cornerH.y);
    line(corner.x - cornerW.x, corner.y + cornerH.y, corner.x - cornerW.x, corner.y + cornerH.y - lunghezza);
  }
}


var ageCounter = -1;
var ageArray = [0]

function ageCalibration(_ageArray) {

  if (ageCounter >= 100) {
    ageCounter = -1;
  }

  ageCounter++;
  _ageArray[ageCounter] = age;

  var sum = 0;

  for (var i = 0; i < _ageArray.length; i++) {
    sum = sum + ageArray[i]
  }
  var average = sum / _ageArray.length;
  return round(average);
}

//START///////////////////////////////////////////////////////////////////////////
//STATES STATES STATES STATES STATES///////////////////////////////////////////

var stat = 0;

var trigger = 0;

function stat0() {
  // background("#FFDEED");
  background("white");

  noStroke();
  fill("black")
  textSize(200)
  textFont(cosiAzure)
  textAlign(CENTER)
  text("MIRAMI", width / 2, height / 2)


  //DETECTION TRIGGER ---> START STAT 1
  var average = getAvg(ageArray);

  if (detection != undefined) {
    trigger++;
    if (trigger >= 300) {
      stat++;
      frameCount = 0;
    }
  }
  var opacity = (-200 + trigger) * 6
  fill(0, 0, 0, opacity)
  rect(0, 0, width, height)
}

function stat1() {
  textDisplay(width / 2, height / 2, "Be yourself\ndiscover your age", 0, 110, CENTER, 75, alteha_regular)

  if (frameCount >= 150) {
    stat++;
    frameCount = 0;
  }
}

var finalAge;

function stat2() {
  var durata = 600;
  fill("white");
  noStroke();
  textAlign(CENTER);
  textFont(alteha_regular);
  textSize(50);
  text("age: " + ageCalibration(ageArray), corner.x - cornerW.x / 2, corner.y - 20);

  displaySquare();

  if (frameCount >= durata) {
    stat++;
    frameCount = 0;
    finalAge = ageCalibration(ageArray);
  }

  var stop = (360/durata * frameCount) - 90;
  angleMode(DEGREES);
  noFill();
  stroke(40);
  arc(width/2,height-200,100,100,-90,270);
  stroke("white");
  arc(width/2,height-200,100,100,-90,stop);
}

function stat3() {

  textDisplay(width / 2, height / 2, "You could be young\nforever", 30, 80, CENTER, 75, alteha_regular);
  textDisplay(width / 2, height / 2, "I'll show you how", 140, 80, CENTER, 75, alteha_regular);
  textDisplay(width / 2, height / 2, "Your page is\n" + finalAge, 270, 80, CENTER, 75, alteha_regular);
  textDisplay(320, 300, finalAge, 400, 800, LEFT, 150, alteha_bold);
  textDisplay(320, 150, "Actual Age", 400, 800, LEFT, 55, alteha_regular);
  textDisplay(width - 320, 300, finalAge, 400, 800, RIGHT, 150, alteha_bold);
  textDisplay(width - 320, 150, "Your page", 400, 800, RIGHT, 55, alteha_regular);

  //questa variabile è per far tornare gradualmente lo sfondo bianco ed introdurre poi il logo mirami
  var opacity = (-1200 + frameCount) * 6
  fill(255, 255, 255, opacity)
  rect(0, 0, width, height)

  if (frameCount >= 1280) {
    stat++;
    frameCount = 0;
    trigger = 0;
  }
}

//ho creato uno stato 4 con la comparsa del logo mirami che si ricollega poi all'inizio
function stat4() {

  background("white");

  noStroke();
  var opacity = frameCount * 6
  fill(0, 0, 0, opacity);
  textSize(200);
  textFont(cosiAzure);
  textAlign(CENTER);
  text("MIRAMI", width / 2, height / 2);

  if (frameCount >= 400) {
    stat = 0;
    frameCount = 0;
    trigger = 0;
  }
}
//END///////////////////////////////////////////////////////////////////////////
//STATES STATES STATES STATES STATES///////////////////////////////////////////

//TEXT DISPLAY AND DISAPPEAR
var textOpacity = 0;

// ho sistemato la funzione del testo in modo da averne solo una, aggiungengo "_align,_size,_font"
function textDisplay(_x, _y, _text, _startTime, _time, _align, _size, _font) {

  var inout = 15;
  var speed = 255 / 15;
  var timeTot = _startTime + _time;
  if (frameCount <= timeTot && frameCount >= _startTime) {
    if (frameCount <= _startTime + inout) {
      textOpacity = textOpacity + speed;
    } else if (frameCount >= timeTot - inout) {
      textOpacity = textOpacity - speed;
    }

    if (textOpacity <= 0) {
      textOpacity = 0;
    } else if (textOpacity >= 255) {
      textOpacity = 255;
    }

    noStroke();
    fill(255, 255, 255, textOpacity);
    console.log(textOpacity);
    textSize(_size);
    textAlign(_align);
    textFont(_font);
    text(_text, _x, _y);
  }

}
