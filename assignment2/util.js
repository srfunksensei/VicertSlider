// utility
(function(window){
	var Utility = {};

	Utility.addEventListener = function (node, type, listener, useCapture)
	{
		node.addEventListener ? 
				node.addEventListener(type, listener, useCapture) : 
				node.attachEvent('on' + type, listener);
	}

	Utility.getElementsByClass = function (node, classname)
	{
		if(node.getElementsByClassName){
			return node.getElementsByClassName(classname);
		}
		
		if(node.querySelectorAll){
			return node.querySelectorAll('.' + classname);
		}
		
		var elements = [];
		var re = new RegExp('(^| )' + classname + '( |$)');
		var els = node.getElementsByTagName("*");
		for(var i=0, j=els.length; i<j; i++){
			if(re.test(els[i].className)){
				elements.push(els[i]);
			}
		}
		
		return elements;
	}

	Utility.hasClass = function (node, classname)
	{
		return new RegExp('(\\s|^)' + classname + '(\\s|$)').test(node.className);
	}

	Utility.addClass = function (node, classname)
	{
		if(this.hasClass(node, classname)){
			return;
		}
		
		node.classList ? 
			node.classList.add(classname) :
			node.className += (node.className ? ' ' : '') + classname;
	}

	Utility.removeClass = function (node, classname)
	{
		if(!this.hasClass(node, classname)){
			return;
		}
		
		node.className = node.className.replace(new RegExp('(\\s|^)' + classname + '(\\s|$)'),' ').replace(/^\s+|\s+$/g, '');
	}

	Utility.fadeIn = function(node)
	{
		var op = 0;  // initial opacity
		var timer = setInterval(function () {
			if (op >= 1){
				clearInterval(timer);
				node.style.display = 'block';
			}
			node.style.opacity = op;
			node.style.filter = 'alpha(opacity=' + op * 100 + ")";
			op += 0.1;
		}, 10);
	}

	Utility.fadeOut = function(node)
	{
		var op = 1;  // initial opacity
		var timer = setInterval(function () {
			if (op <= 0.1){
				clearInterval(timer);
				node.style.display = 'none';
			}
			node.style.opacity = op;
			node.style.filter = 'alpha(opacity=' + op * 100 + ")";
			op -= op * 0.1;
		}, 10);
	}

	Utility.fadeConcurently = function(nodeFrom, nodeTo)
	{
		var opOut = 1;
		var opIn = 0;
		var timer = setInterval(function () {
			if (opOut <= 0.1 || opIn >= 1){
				clearInterval(timer);
				nodeFrom.style.display = 'none';
				nodeTo.style.display = 'block';
			}
			nodeFrom.style.opacity = opOut;
			nodeFrom.style.filter = 'alpha(opacity=' + opOut * 100 + ")";
			opOut -= opOut * 0.1;
			
			nodeTo.style.opacity = opIn;
			nodeTo.style.filter = 'alpha(opacity=' + opIn * 100 + ")";
			opIn += 0.1;
		}, 10);
	}
	
	window.VicertApp.Utility = Utility;
})(this);