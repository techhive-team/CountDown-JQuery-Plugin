(function($){
	
	$.fn.techhiveCountDownInit=function(){
		console.log(this);
		var htmlContent='<div class="dash weeks_dash">'+
                '<span class="dash_title">weeks</span>'+
                '<div class="digit">0</div>'+
                '<div class="digit">0</div>'+
            '</div>'+

            '<div class="dash days_dash">'+
                '<span class="dash_title">days</span>'+
                '<div class="digit">0</div>'+
                '<div class="digit">0</div>'+
            '</div>'+

            '<div class="dash hours_dash">'+
                '<span class="dash_title">hours</span>'+
                '<div class="digit">0</div>'+
                '<div class="digit">0</div>'+
            '</div>'+

            '<div class="dash minutes_dash">'+
                '<span class="dash_title">minutes</span>'+
                '<div class="digit">0</div>'+
                '<div class="digit">0</div>'+
            '</div>'+

            '<div class="dash seconds_dash">'+
                '<span class="dash_title">seconds</span>'+
                '<div class="digit">0</div>'+
                '<div class="digit">0</div>'+
            '</div>';
		for (var i=0; i<this.length; i++)
		  {
			  var selector=$(this[i]),
			  date=selector.attr('tech-Date');
			  selector.html(htmlContent);
				this.techhiveCountDown(date,selector);
		  }
	}
	$.fn.techhiveCountDown = function (toDate,targetSelector) {


		diffSecs = this.setCountDown(toDate);
		// targetSelector=this;
		console.log(targetSelector);
		targetIdName=$(this).attr('class');
		$(targetSelector).find('.digit').html('<div class="top"></div><div class="bottom"></div>');
		$(this).doCountDown(targetSelector, diffSecs, 500);

		return this;

	};

	$.fn.setCountDown = function (toDate) {
		

		if (toDate)
		{
			targetTime = new Date(toDate);
		}
		

		var nowTime = new Date();

		diffSecs = Math.floor((targetTime.valueOf()-nowTime.valueOf())/1000);

		$.data(this[0], 'diffSecs', diffSecs);

		return diffSecs;
	};

	$.fn.doCountDown = function (id, diffSecs, duration) {
		$this = id;
		if (diffSecs <= 0)
		{
			diffSecs = 0;
			if ($.data($this[0], 'timer'))
			{
				clearTimeout($.data($this[0], 'timer'));
			}
		}

		secs = diffSecs % 60;
		mins = Math.floor(diffSecs/60)%60;
		hours = Math.floor(diffSecs/60/60)%24;
		if ($.data($this[0], 'omitWeeks') == true)
		{
			days = Math.floor(diffSecs/60/60/24);
			weeks = Math.floor(diffSecs/60/60/24/7);
		}
		else 
		{
			days = Math.floor(diffSecs/60/60/24)%7;
			weeks = Math.floor(diffSecs/60/60/24/7);
		}

		$this.dashChangeTo(id, 'seconds_dash', secs, duration ? duration : 800);
		$this.dashChangeTo(id, 'minutes_dash', mins, duration ? duration : 1200);
		$this.dashChangeTo(id, 'hours_dash', hours, duration ? duration : 1200);
		$this.dashChangeTo(id, 'days_dash', days, duration ? duration : 1200);
		$this.dashChangeTo(id, 'weeks_dash', weeks, duration ? duration : 1200);

		$.data($this[0], 'diffSecs', diffSecs);
		if (diffSecs > 0)
		{
			e = $this;
			t = setTimeout(function() { e.doCountDown(id, diffSecs-1) } , 1000);
			$.data(e[0], 'timer', t);
		} 
		else if (cb = $.data($this[0], 'callback')) 
		{
			$.data($this[0], 'callback')();
		}

	};

	$.fn.dashChangeTo = function(id, dash, n, duration) {
		  $this = id;
		 
		  for (var i=($this.find('.' + dash + ' .digit').length-1); i>=0; i--)
		  {
				var d = n%10;
				n = (n - d) / 10;
				$this.digitChangeTo($this.find('.'+dash).find(' .digit:eq('+i+')'), d, duration);
		  }
	};

	$.fn.digitChangeTo = function (digit, n, duration) {
		if (!duration)
		{
			duration = 800;
		}
		divTop=digit.find(' div.top');
		divBottom=digit.find(' div.bottom');
		if (divTop.html() != n + '')
		{

			divTop.css({'display': 'none'});
			divTop.html((n ? n : '0')).slideDown(duration);

			divBottom.animate({'height': ''}, duration, function() {
				divBottom.html(divTop.html());
				divBottom.css({'display': 'block', 'height': ''});
				divTop.hide().slideUp(10);
			});
		}
	};

})(jQuery);


