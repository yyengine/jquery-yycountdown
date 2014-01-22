/*
 * jquery.yycountdown plugin
 *
 * Copyright (c) 2014 YYengine Yuji Yamabata
 * Dual licensed under the MIT and GPL licenses.
 * http://docs.jquery.com/License
 */
(function($) {
	$.fn.yycountdown = function(options){
		
		//default setting
		var defaults = {
			startDateTime : new Date(),
			endDateTime   : '2020/07/24 00:00:00',
			diffDateTime  : 0,
			unit          : {d: 'day', h: 'hour', m: 'min', s: 'sec'},
			complete      : null,
			node          : {d: null, h: null, m: null, s: null},
			self          : null,
			timerId       : null
		};
		var setting = $.extend(defaults, options);
		
		//DOM node set
		setting.self = $(this);

		//coutdown init
		var _initTimer = function(){
			//change string to Date object
			if(typeof setting.complete !== 'Date'){
				setting.startDateTimeObj = new Date(setting.startDateTime);
			}
			setting.endDateTimeObj   = new Date(setting.endDateTime);
			setting.diffDateTime     = Math.floor((setting.endDateTimeObj - setting.startDateTimeObj) / 1000);
			
			//view node setting
			var box        = $('<div />').addClass('yycountdown-box');
			var boxDay     = $('<span />').addClass('yyc-day');
			var boxHou     = $('<span />').addClass('yyc-hou');
			var boxMin     = $('<span />').addClass('yyc-min');
			var boxSec     = $('<span />').addClass('yyc-sec');
			var boxDayText = $('<span />').addClass('yyc-day-text');
			var boxHouText = $('<span />').addClass('yyc-hou-text');
			var boxMinText = $('<span />').addClass('yyc-min-text');
			var boxSecText = $('<span />').addClass('yyc-sec-text');
			
			boxDayText.html(setting.unit.d);
			boxHouText.html(setting.unit.h);
			boxMinText.html(setting.unit.m);
			boxSecText.html(setting.unit.s);

			box.append(boxDay).append(boxDayText)
				.append(boxHou).append(boxHouText)
				.append(boxMin).append(boxMinText)
				.append(boxSec).append(boxSecText);
			setting.self.append(box);
			
			setting.node.d = setting.self.find('.yyc-day');
			setting.node.h = setting.self.find('.yyc-hou');
			setting.node.m = setting.self.find('.yyc-min');
			setting.node.s = setting.self.find('.yyc-sec');
		}

		//timer coutdown
		var _countTimer = function(){
			var objDiff = _formatTimer(--setting.diffDateTime);
			_viewTimer(objDiff);
			if(setting.diffDateTime <= 0)  _completeTimer();
		}
		
		//time view
		var _viewTimer = function(objDiff){
			setting.node.d.html(objDiff.d);
			setting.node.h.html(('0' + objDiff.h).slice(-2));
			setting.node.m.html(('0' + objDiff.m).slice(-2));
			setting.node.s.html(('0' + objDiff.s).slice(-2));
		}
		
		//change ms to _day_hour_min_sec
		var _formatTimer = function(diff){
			var oneM = 60;
			var oneH = 60 * 60;
			var oneD = 60 * 60 * 24;
			var diffDay    = Math.floor(diff / oneD);
			var diffHour   = Math.floor((diff - diffDay * oneD) / oneH);
			var diffMinute = Math.floor((diff - diffDay * oneD - diffHour * oneH) / oneM);
			var diffSecond = Math.floor((diff - diffDay * oneD - diffHour * oneH - diffMinute * oneM));
			
			return {
				d: diffDay,
				h: diffHour,
				m: diffMinute,
				s: diffSecond
			};
		}

		//timer complete
		var _completeTimer = function(){
			clearInterval(setting.timerId);
			if(typeof setting.complete === 'function')  setting.complete(setting.self);
		}
		
		//coutdown timer start
		_initTimer();
		setting.timerId = setInterval(_countTimer, 1000);
	};
	
})(jQuery);


