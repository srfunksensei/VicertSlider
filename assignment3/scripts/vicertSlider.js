/* 
## Advanced Javascript - Assigment No. 2

** Forbidden usage of any Thirdy Party javascript libraries like jQuery, requireJS etc. **

	Assigment No. 1 must be completed before starting Assigment No. 2

	1. Create Module for VicertSlider object. VicertSlider module needs to be created by using Namespace + Module pattern
	2. All code regarding VicertSlider module must be inside external javascript file

	Global Namespace object for this assigment:  var VicertApp = {};

*/

define(["./helper/util"], function(Utility){
	var sliderOptions;
	var defaults = {  
		slidePrefix            	: 'slide-',
		slidesContainerID      	: 'slides',
		prevSlide			   	: 'prev',
		nextSlide			   	: 'next',
		startSlideAnimation	   	: 'start',
		stopSlideAnimation	   	: 'stop',
		activeSlide			   	: 'active',
		hiddenSlide			   	: 'hidden',

		slideDelay			   	: 5000
	};
	
	var transInterval  	   	   	= 0;
		
	var VicertSlider = function(options) { 
		sliderOptions = options || defaults;
		
		init();
	};

	// set up
	function init() 
	{
		setUpSlides();
		setUpSliderControls();
	}

	function setUpSlides()
	{
		// collect the slides
		var slidesCollection = document.getElementById(sliderOptions.slidesContainerID).children;

		if (slidesCollection.length < 2) return;
	 
		//go through all slides
		for (var i=0; i < slidesCollection.length; i++)
		{
			// give IDs to slides
			slidesCollection[i].id = sliderOptions.slidePrefix + (i + 1);

			//hide all slides except the first
			if (i > 0){
				Utility.addClass(slidesCollection[i], sliderOptions.hiddenSlide);
			} else if( i == 0){
				Utility.addClass(slidesCollection[i], sliderOptions.activeSlide);
			}
		}
	}
	
	function setUpSliderControls()
	{
		// collect the controls
		var slidePrev = document.getElementById(sliderOptions.prevSlide);
		var slideNext = document.getElementById(sliderOptions.nextSlide);
		var slidesStartAnimation = document.getElementById(sliderOptions.startSlideAnimation);
		var slidesStopAnimation = document.getElementById(sliderOptions.stopSlideAnimation);
		
		// attach onclick handlers to controls
		var func = null;
		if (slidePrev !== null){
			func = (function(context){ return function() {context.prev()}})(VicertSlider.prototype);
			Utility.addEventListener(slidePrev, 'click', func);
		}
		if (slideNext !== null){
			func = (function(context){ return function() {context.next()}})(VicertSlider.prototype);
			Utility.addEventListener(slideNext, 'click', func);
		}
		if (slidesStartAnimation !== null){
			func = (function(context){ return function() {context.start()}})(VicertSlider.prototype);
			Utility.addEventListener(slidesStartAnimation, 'click', func);
		}
		if (slidesStopAnimation !== null){
			func = (function(context){ return function() {context.stop()}})(VicertSlider.prototype);
			Utility.addEventListener(slidesStopAnimation, 'click', func);
		}
	}
	
	// get slide index
	function getCurrentSlideIndex()
	{
		var currentSlideID = Utility.getElementsByClass(document, sliderOptions.activeSlide)[0].id;
		var currentSlideIndex = currentSlideID.substr(currentSlideID.lastIndexOf('-') + 1);
		return parseInt(currentSlideIndex);
	}
	
	function getNextSlideIndex()
	{
		var totalSlides = document.getElementById(sliderOptions.slidesContainerID).children.length;
		var currentSlideIndex = getCurrentSlideIndex();
		return (currentSlideIndex % totalSlides) + 1;
	}
	
	function getPrevSlideIndex()
	{
		var totalSlides = document.getElementById(sliderOptions.slidesContainerID).children.length;
		var currentSlideIndex = getCurrentSlideIndex();
		var nextIndex = (currentSlideIndex - 1) % totalSlides;
		return nextIndex == 0 ? totalSlides : nextIndex;
	}
	
	// animation
	VicertSlider.prototype.animate = function (slideNo)
	{
		var from = getCurrentSlideIndex();	
		var to = (arguments.length === 0 ? getNextSlideIndex() : slideNo);
		
		if (to === from){
			return;
		}
	 
		var currentSlide = document.getElementById(sliderOptions.slidePrefix + from);
		var nextSlide = document.getElementById(sliderOptions.slidePrefix + to);
		
		// fade out the current slide
		// fade in the next slide
		Utility.fadeConcurently(currentSlide, nextSlide);
		
		// complete
		Utility.addClass(currentSlide, sliderOptions.hiddenSlide);
		Utility.removeClass(currentSlide, sliderOptions.activeSlide);
		
		Utility.addClass(nextSlide, sliderOptions.activeSlide);
		Utility.removeClass(nextSlide, sliderOptions.hiddenSlide);
	}
	
	VicertSlider.prototype.start = function ()
	{
		if(!transInterval){
			var func = (function(context){ return function() {context.animate()}})(VicertSlider.prototype);
			transInterval = setInterval(func, sliderOptions.slideDelay);
		}
	}

	VicertSlider.prototype.stop = function ()
	{
		if(transInterval){
			clearInterval(transInterval);
			transInterval = 0;
		}
	}
	
	VicertSlider.prototype.prev = function ()
	{
		var prevSlideIndex = getPrevSlideIndex();
		this.animate(prevSlideIndex); 
	}
	
	VicertSlider.prototype.next = function ()
	{
		var nextSlideIndex = getNextSlideIndex();
		this.animate(); 
	}
	
	return VicertSlider;
});