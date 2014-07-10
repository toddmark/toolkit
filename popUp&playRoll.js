//2014.03.20
jQuery.tod = {
	/*
	options: {
		time: int,
		TimeValue: str,
		title: str,
		titText: str,
		user: {
			obj: childBg,
			css: css
		}
		btnClose: jQuery obj
	}
	*/
	popMask: function(child, options) {
		if(!child){
			alert('弹出层获取失败！');
			return false;
		}
		var defaults = options;
		var mask = $('.pop-mask');
		if (mask[0]) {
			var display = mask.css('display');
			if (display == 'block') {
				return false;
			}
			cssStyle();
			popup();
		} else {
			mask = document.createElement('div');
			var body = $('body');
			mask = $(mask);
			mask.attr('class', 'pop-mask');
			cssStyle();
			popup();
			body.append(mask[0]);
		}

		$(window).resize(function() {
			cssStyle();
		})
		$(window).scroll(function() {
			cssStyle();
		});
		$(window).keydown(function(e) {
			switch(e.keyCode){
				case 27:
				closePop();
				break;
			}
		});
		//2014.03.30 add close click 
		if (defaults.btnClose) {
			// console.log('存在关闭按钮！');
			var btnClose = defaults.btnClose;
			btnClose.click(function() {
				closePop();
			});
		}
		// response keyboard event
		function popup() {
			child.css({
				'z-index': 10
			});
			mask.fadeIn(100, function() {
				handleDefaults();
				child.slideDown();
			});
		}

		function closePop() {
			child.slideUp(function() {
				mask.fadeOut('fast');
			});
		}

		function handleDefaults() {
			if (!defaults) {
				return false;
			};
			if (defaults.time) {
				var time = defaults.time;
				var eleVar = defaults.TimeValue;
				eleVar.html(time);
				var objTimer = setInterval(function() {
					time -= 1;
					eleVar.html(time);
					if (time == 0) {
						clearInterval(objTimer);
						closePop();
					}
				}, 1000)
			}
			if (defaults.title) {
				var obj = defaults.title;
				var text = defaults.titText;
				obj.html(text);
			}
			if (defaults.user) {
				defaults.user.obj.css({
					'background-position': defaults.user.css
				})
			}
		}

		function cssStyle() {
			var width = $(window).width();
			var height = $(document).height();
			var scrollTop = $(window).scrollTop();
			var childWidth = child.width();
			mask.css({
				'position': 'absolute',
				'top': 0,
				'left': 0,
				'z-index': 9,
				'width': width,
				'height': height,
				'background': '#333',
				'opacity': 0.9
			});
			child.css({
				'left': (width - childWidth) / 2 + 'px',
				'top': 50 + scrollTop
			})
		}
	},
//2014.4.23
	playRoll: function (options){
		// all element
		var wrap = options.wrapped;
		//all btn
		var btn = options.btn;
		//active className of all btn
		var activeClass = options.activeBtn;
		// identify
		var index = 0;
		var timer = null;
		var timeInterval = 3000;
		reset();
		// click event
		btn.each(function (i){
			$(this).click(function (){
				if( index == i){
					return false;
				}
				index = i;
				console.log(i);
				wrap.fadeOut();
				$(wrap[i]).fadeIn();
			})
		});
		// hover event
		btn.hover(function() {
			btn.removeClass(activeClass);
			clearInterval(timer);
		}, function() {
			play();
		});
		play();
		//  auto play
		function play(){
			timer = setInterval(function (){
				index ++;
				wrap.fadeOut();
				if(index == wrap.length){
					index = 0;
				}
				$(wrap[index]).fadeIn();
				btn.removeClass(activeClass);
				$(btn[index]).addClass(activeClass);
			}, timeInterval)
		};
		function reset(){
			wrap.hide();
			$(wrap[0]).show();
		}
	}
}
