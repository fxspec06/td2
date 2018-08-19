




setup1 = function() {
	console.log("setup1")

	document.getElementById("dart1").style.visibility = "hidden";
	document.getElementById("dart2").style.visibility = "hidden";
	document.getElementById("dart3").style.visibility = "hidden";
	document.getElementById("bottomBar").style.visibility = "hidden";
	document.getElementById("again").style.visibility = "hidden";
	document.getElementById("wildn").style.visibility = "hidden";
	document.getElementById("clearview").style.visibility = "hidden";
    document.getElementById("tapzoneDiv").style.visibility = "visible";
    document.getElementById("killedLeo").style.visibility = "hidden";

	numLeos = 13;
    //numLeos = 1;
    
    
	leoImageArray = [];
	for(var x = 0; x < numLeos; x++){
		leoImageArray[x] = x + 1;
	}
	fisherYates(leoImageArray);


	leoImage = 1;

	dart = 1;
	totalScore = 0;
    
    
    
    
    
    
    hitZones = [
                [{x: 25, y: 55}],
                [{x: 33, y: 25}],
                [{x: 55, y: 65}],
                [{x: 50, y: 40}],
                [{x: 49, y: 64}],
                [{x: 85, y: 95}],
                [{x: 52, y: 87}],
                [{x: 51, y: 95}],
                [{x: 60, y: 70}],
                [{x: 46, y: 53}],
                [{x: 50, y: 35}],
                [{x: 45, y: 50}],
                [{x: 42, y: 62}],
                [{x: 40, y: 56}],
    ];
    
    
    
    
    
	setup2();
};

function zonePercentageToPixels(xPerc, yPerc, img, z, hitZone) {
    
    var xPix = 0,
    yPix = 0;
    
    var returnArg = {x: xPix, y: yPix};
    
               var offsetY = img.offsetHeight;
               var offsetX = img.offsetWidth;
                var imageAspectRatio = offsetX / offsetY;
               
               document.body.removeChild(img);
               
               console.log("offsetWidth: " + offsetX, "offsetHeight: " + offsetY);
               
               
               var windowWidth = window.innerWidth;
               var windowHeight = window.innerHeight;
                var windowAspectRatio = windowWidth / windowHeight;
               
    
               
    var xBound, yBound, trueWidth, trueHeight;
               
               if (imageAspectRatio > 1) {
                   if (windowAspectRatio > 1) {
                       // wider than taller
                       trueWidth = windowHeight * .9 * imageAspectRatio;
                       trueHeight = trueWidth / imageAspectRatio;
                       console.log(trueWidth, trueHeight);
                   } else if (windowAspectRatio <= 1) {
                       // wider than taller
                       trueHeight = windowWidth * .9 * imageAspectRatio;
                       trueWidth = trueHeight / imageAspectRatio;
                       console.log(trueWidth, trueHeight);
                   }
                   
                   
               } else {
                   if (windowAspectRatio > 1) {
                       // wider than taller
                       trueWidth = windowHeight * .9 * imageAspectRatio;
                       trueHeight = trueWidth / imageAspectRatio;
                       console.log(trueWidth, trueHeight);
                   } else if (windowAspectRatio <= 1) {
                       // wider than taller
                       trueHeight = windowWidth * .9 * imageAspectRatio;
                       trueWidth = trueHeight / imageAspectRatio;
                       console.log(trueWidth, trueHeight);
                   }
               }
    
               
               
    
                xBound = (windowWidth - trueWidth) / 2;
                yBound = (windowHeight - trueHeight) / 2;
               
    
                console.log("xBound: " + xBound, "yBound: " + yBound);
               
               
               
    
               xPix = (trueWidth * xPerc / 100) + xBound;
               yPix = (trueHeight * yPerc / 100) + yBound;
               
               //console.log("xPix: " + xPix, "yPix: " + yPix);
               
               returnArg.x = xPix;
               returnArg.y = yPix;
    
    console.log("x target: " + xPix, "y target: " + yPix, "z: " + z);
    
    targets.push({
                 weight: (hitZone.length - z) * 5,
                 xPos: xPix,
                 yPos: yPix
    });
    
               return returnArg;
    
}

function randomInt(min, max) { //returns a random integer value with min max arguments
	return Math.floor(Math.random() * ( max - min + 1)) + min;
};
function fisherYates ( myArray ) {
  var i = myArray.length;
  if ( i == 0 ) return false;
  while ( --i ) {
     var j = Math.floor( Math.random() * ( i + 1 ) );
     var tempi = myArray[i];
     var tempj = myArray[j];
     myArray[i] = tempj;
     myArray[j] = tempi;
   }
}

function setup2 () {
    console.log("setup2");
	if(leoImage > numLeos){
		this.killedLeo();
		return;
	}
	scoreTimeout = 0;
	roundTimeout = 0;
	round = 0;
    
    document.getElementById("round").innerHTML = "";

    var imgUrls = [];
    var url = 'trump' + (leoImageArray[leoImage - 1]) + '.jpg';
    
    imgUrls.push(url);
    
    
    
    var innerHtml = '<div id="leodarts" style="background-image: url(\'' + imgUrls[0] + '\'); background-size: contain;"></div>';
	document.getElementById("leodartsDiv").innerHTML = innerHtml;
    
    nextTarget();
    
};

function nextTarget() {
    targets = [];
    
    var hitZone = hitZones[leoImageArray[leoImage - 1]];
    
    for (var z in hitZone) {
        var zone = hitZone[z];
        //console.log("zone: " + JSON.stringify(zone));
        
        
        
        
        var img = new Image();
        img.src = "trump" + leoImageArray[leoImage-1] + ".jpg";
        document.body.appendChild(img);
        
        
        setTimeout(zonePercentageToPixels.bind(this, zone.x, zone.y, img, z, hitZone), 1000, zone.x, zone.y, img, z, hitZone);
        
        
    }
}

function next() {
    document.getElementById("bottomBar").style.visibility = "hidden";
    scoreTimeout = 0;
}

function throwDart25 (event) {
    console.log('THROWDART25...', event);
    throwDart(event, 25);
}

function throwDart50 (event) {
    console.log('THROWDART50...', event);
    throwDart(event, 50);
}

function throwDart100 (event) {
    console.log('THROWDART100...', event);
    throwDart(event, 100);
}

function calculateScore(_targets, _x, _y) {
    //console.log("CALCULATING SCORE...");
    //console.log("TARGETS: " + JSON.stringify(_targets));
    //console.log("DART X POS: " + _x, "DART Y POS: " + _y);
    
    var distances = [];
    
    for (var t in _targets) {
        var _t = _targets[t];
        
        var x1 = Math.abs(_t.xPos - _x);
        
        var distance = calculateDistance(_t.xPos, _t.yPos, _x, _y);
        
        distances.push(distance);
    }
    
    var _totalDistance = 0;
    
    console.log("WEIGHTED VALUES: " + JSON.stringify(distances));
    
    for (var i = 0; i < distances.length; i++) {
        var _d = distances[i];
        _totalDistance += _d;
    }
    
    //points = _totalDistance / distances.length;
    
    _maxDistance = 0;
    
    var imageAspectRatio = document.getElementById("leodarts").offsetWidth / document.getElementById("leodarts").offsetHeight;
    
    var maxWidth = window.innerWidth * .9;
    maxHeight = maxWidth / imageAspectRatio;
    
    
    
    
    var __x = 0, __y = 0;
    var dis = calculateDistance(_t.xPos, __x, _t.yPos, __y);
    if (dis > _maxDistance) _maxDistance = dis;
    
    __x = maxWidth;
    dis = calculateDistance(_t.xPos, __x, _t.yPos, __y);
    if (dis > _maxDistance) _maxDistance = dis;
    
    __x = 0, __y = maxHeight;
    dis = calculateDistance(_t.xPos, __x, _t.yPos, __y);
    if (dis > _maxDistance) _maxDistance = dis;
    
    __x = maxWidth;
    dis = calculateDistance(_t.xPos, __x, _t.yPos, __y);
    if (dis > _maxDistance) _maxDistance = dis;
    
    var percentage = distance / _maxDistance;
    
    console.error('DISTANCE PERCENTAGE: ', percentage);
    
    return Math.round((1 / percentage) * (1/.4));
}

function calculateDistance(x1, y1, x2, y2) {
    
    var x = Math.abs(x1 - x2);
    var y = Math.abs(y1 - y2);
    //console.log("x1: ", x1, "y1: ", y1);
    
    var distance = Math.sqrt( x + y );
    
    console.log("DISTANCE: " + distance );
    
    return distance;
}

function throwDart (event, max) {
	console.log("throwdart", event)
	

	//Mojo.Log.info("tap down at x: " + event.down.x + " y: " + event.down.y);
	var tapXcoor = event.x - 114;
	var tapYcoor = event.y - 169;

	var dartImg = document.getElementById("dart" + dart);
	dartImg.style.left = tapXcoor + "px";
	dartImg.style.top = tapYcoor + "px";
	dartImg.style.visibility = "visible";
    
    
	//var score = this.calculateScore(leoImage, tapXcoor, tapYcoor);

	//var score = randomInt(0, max);
    
    var score = calculateScore(targets, event.clientX, event.clientY);
    
	score = score * 5;
	round = round + score;
	totalScore = totalScore + score;

	document.getElementById("score").innerHTML = score + " POINTS!";
	document.getElementById("bottomBar").style.visibility = "visible";
	if(scoreTimeout){clearTimeout(scoreTimeout)};
	scoreTimeout = window.setTimeout(next.bind(this), 1000);

    if (typeof webkit == "undefined")
        document.getElementById("dartaudio" + dart).play();
    else webkit.messageHandlers.playFile.postMessage("dart");
    
    
    
	dart++;
	if(dart == 4){
		//this.controller.stopListening(document.getElementById("leodarts"), Mojo.Event.tap, this.throwDart.bind(this));
		document.getElementById("round").innerHTML = "THIS ROUND:<BR>" + round + " POINTS!";
		document.getElementById("bottomBar").style.visibility = "visible";
		roundTimeout = window.setTimeout(function() {
			console.log("roundTimeout");
			document.getElementById("dart1").style.visibility = "hidden";
			document.getElementById("dart2").style.visibility = "hidden";
			document.getElementById("dart3").style.visibility = "hidden";
			document.getElementById("bottomBar").style.visibility = "hidden";
			leoImage++;
			dart = 1;
                                         nextTarget();
			setup2();
			roundTimeout = 0;
		}, 1000);
	}
};
function killedLeo(){
	console.log("killedleo")
	leoImage = 0;
    document.getElementById("leodartsDiv").innerHTML = '<div id="leodarts" style="background-image: url(\'icon.png\'); background-size: contain;">';
	document.getElementById("score").innerHTML = "YOU STUCK IT TO TRUMP!!!";
    document.getElementById("round").innerHTML = "TOTAL SCORE:\n" + totalScore + " POINTS!";
	document.getElementById("bottomBar").style.visibility = "visible";
    document.getElementById("tapzoneDiv").style.visibility = "hidden";
    document.getElementById("killedLeo").style.visibility = "visible";

	document.getElementById("again").style.visibility = "visible";
	//document.getElementById("wildn").style.visibility = "visible";
	//document.getElementById("clearview").style.visibility = "visible";

	document.getElementById("wildn").addEventListener("click", wildn.bind(this));
	document.getElementById("again").addEventListener("click", again.bind(this));
	document.getElementById("clearview").addEventListener("click", clearview.bind(this));
};
function again(event){
	console.log("again")
	totalScore = 0;
	leoImage++;

	fisherYates(leoImageArray);

	setup1(); //Mojo.Controller.stageController.swapScene("leodarts");
};
function wildn(event) {

};
function clearview(event) {

};
