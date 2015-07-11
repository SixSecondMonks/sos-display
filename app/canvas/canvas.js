'use strict';

angular.module('sos.canvas', [])
.controller('CanvasCtrl', ['$scope', function($scope) {

	$scope.wallDisplay = {
		width: 192,
		height: 320
	}

	$scope.stage = null;
	$scope.canvasID = "sos-canvas";
	$scope.canvasDim = {
		width: 192,
		height: 320
	};
	$scope.offsetStyle = {
		left: 15,
		top: 0,
	};

	$scope.wallDisplayMode = "DEV";
	$scope.rotateForProduction = false;
	$scope.devModeInputGroupClass = "btn-primary active";
	$scope.prodModeInputGroupClass = "btn-primary"

	$scope.mediaList = [];

	$scope.$watch('wallDisplayMode', function(newMode) {

		if(newMode == "DEV") {
			// if newMode is true, dev mode is enabled
			console.log("DEV MODE");
			$scope.devModeInputGroupClass = "btn-primary active";
			$scope.prodModeInputGroupClass = "btn-default";
			$scope.rotateForProduction = false;
		} else {
			console.log("PROD (WALL) MODE");
			$scope.devModeInputGroupClass = "btn-default";
			$scope.prodModeInputGroupClass = "btn-primary active";
			$scope.rotateForProduction = true;
		}

	}, true);

	$scope.$watch('canvasDim', function(newDim) {
		$scope.setCanvasSize(newDim.width, newDim.height, true);
	}, true);

	$scope.$on("error", function(err) {
		console.log("Registered error:", err);
	});

	$scope.getWidthScaleFactor = function(origWidth) {
		return $scope.wallDisplay.width / origWidth;
	}

	$scope.getHeightScaleFactor = function(origHeight) {
		return $scope.wallDisplay.height / origHeight;
	}

	$scope.initCanvas = function() {

		console.log("Initializing <CANVAS> with id:", $scope.canvasID);

                // create canvas buffers (PImages) for incoming Kinect data. this
                // must be done before KinectData.initialize is called, so we set up
                // the PImages as early as possible.
		console.log("Initializing PImages for processing.js:", $scope.canvasID);
                var p = new Processing();
                KinectData.silhouette = new p.PImage(KinectData.width, KinectData.height, p.PConstants.RGBA);
                KinectData.userViewer = new p.PImage(KinectData.width, KinectData.height, p.PConstants.RGBA);

		// create the media list
			// available media
		$scope.mediaList = [
			{ name: "MIDI Keyboard Mode", fn: $scope.midiKeyboard },
			{ name: "Draw Geometrical Shapes", fn: $scope.drawGeometricalShapes },
			{ name: "Play movie.", fn: function() {

				var vidEl = document.createElement('video');
				vidEl.src = "media/small.mp4";

				vidEl.oncanplaythrough = function() {

					var video = new createjs.Bitmap(vidEl);

					console.log(video);

					// figure out scale
// 					var bounds = video.nominalBounds;
					console.log("video width and height is: ", video.image.videoWidth, video.image.videoHeight);

					video.scaleX = $scope.getWidthScaleFactor(video.image.videoWidth);
					video.scaleY = $scope.getHeightScaleFactor(video.image.videoHeight);
					$scope.stage.addChild(video);
					vidEl.play();
				}
			}},
			{ name: "Image", fn: function() {

				var gif = new createjs.Bitmap("media/winter-is-coming.jpg");
				gif.image.onload = function() {
					gif.scaleX = $scope.getWidthScaleFactor(gif.getBounds().width);
					gif.scaleY = $scope.getHeightScaleFactor(gif.getBounds().height);
					$scope.stage.addChild(gif);
				};
			}},
			{ name: "Spritesheet Slow Clap", fn: function() {

				var spriteWidth = 400;
				var spriteHeight = 300;

				var data = {
				    images: ["media/spritesheet.png"],
				    frames: {width: spriteWidth, height: spriteHeight},
				    animations: {
				        def: [0,6,"def"]
				    }
				};
				var spriteSheet = new createjs.SpriteSheet(data);
				var sprite = new createjs.Sprite(spriteSheet);

				sprite.setTransform(0, 0, $scope.getWidthScaleFactor(spriteWidth), $scope.getHeightScaleFactor(spriteHeight));

				sprite.gotoAndPlay("def");

				$scope.stage.addChild(sprite);
			}},
                        { name: "Processing-JS Example", fn: function() {
                                var req = new XMLHttpRequest();
                                req.overrideMimeType("text/plain");
                                req.open("GET", "sketches/sample.pde");
                                req.onload = function() {
                                        $scope.kinect = new Processing($scope.canvasID, this.response);;
                                };
                                req.error = function() {};
                                req.send();
                        }},
		];

		 //Create a stage by getting a reference to the canvas
	    $scope.stage = new createjs.Stage($scope.canvasID);
	    $scope.setCanvasSize($scope.canvasDim.width, $scope.canvasDim.height, false);

	    // set up the ticker
	    createjs.Ticker.setFPS(20);
	    createjs.Ticker.addEventListener('tick', function() {
                   // processing and easeljs uneasily co-exist with
                   // each other, so don't destroy their illusions.
                   if($scope.kinect) { return; }
		   $scope.stage.update();
	    });

	    $scope.playMedia(0);
	}

	$scope.drawGeometricalShapes = function() {
	    //Create a Shape DisplayObject.
	    var circle = new createjs.Shape();
	    circle.graphics.beginFill("red").drawCircle(50, 50, 40);
	    //Add Shape instance to stage display list.
	    $scope.stage.addChild(circle);

	    var box = new createjs.Shape();
	    box.graphics.beginFill("blue").drawRect(10, 70, 5, 240)
	    $scope.stage.addChild(box);
	}
	
	$scope.midiKeyboard = function() {

		MIDI.loadPlugin({
    	instrument: "acoustic_grand_piano", // or the instrument code 1 (aka the default)
    	onsuccess: function() { }
		});

		var socket = io.connect('http://localhost:1337');
		socket.on('message', function(data){
			console.log(data);

	    var note = data.note;

			var shape = new createjs.Shape();
			var colorMap = MIDI.Synesthesia.map();
			var map = colorMap[note];

			shape.graphics.beginFill(map.hex).drawRect(0, 0, 192, 320);
			MIDI.noteOn(0, note, 100, 0);
			$scope.stage.addChild(shape);

			socket.emit('launchpad-key-color', [note, map.hex]);
		});


    //Create a Shape DisplayObject.
    var circle = new createjs.Shape();
    circle.graphics.beginFill("green").drawCircle(0, 0, 40);
    //Set position of Shape instance.
    circle.x = circle.y = 50;
    //Add Shape instance to stage display list.
    $scope.stage.addChild(circle);		
	}

	$scope.playMedia = function(index) {

		$scope.clearStage();
                if($scope.kinect) {
                        $scope.kinect.exit();
                        $scope.kinect = null;
                }

		var media = $scope.mediaList[index];
		console.log("Playing media:", media.name);
		media['fn']()
	}

	$scope.clearStage = function() {
		console.log("Clearing stage...");
		$scope.stage.removeAllChildren();
	}

	$scope.setCanvasSize = function(width, height, doUpdate) {

		$scope.stage.canvas.width = width;
		$scope.stage.canvas.height = height;

		 // update the stage
		 if(doUpdate) {
			 $scope.stage.update();
		 }
	}
}]);
