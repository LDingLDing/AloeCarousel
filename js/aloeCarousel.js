/**
 * @description  Carousel
 * @author  	 aloe(liluhui)
 * @date         2016/04/28
 *
 * @param {
 *      number: [Number],                       每个翻页有几个card展示
		autoplay : [Bolean/Number],             是否自动播放或时间间隔
		ishover: [Boolean],                     是否鼠标悬停是停止播放
		anchor: 'true/flase/center/left/right', 是否显示锚点 
		anchorEvent : 'all/click/hover',        锚点触发事件
		duration: [Number]/"normal/fast/slow",  动画速度曲线
		pageDown: [Boolean]                     左右翻页按钮
 * } 
 */
;(function($){
	$.fn.extend({
		aloeCarousel: function(options){
			var ops = $.extend({},defaults,options);
				ops = isValid(ops)
				if(!ops) {
					return this;
				}

			var $this       = $(this),
				$cards      = $this.find('.show-card'),
				$card       = $($cards[0]),
				$showCards  = $this.find('.show-cards'),
				$controlbox = $this.find('.carousel-control'),
				$pagedownL  = $this.find('.pagedown-left'),
				$pagedownR  = $this.find('.pagedown-right'),
				cardW       = $card.outerWidth();

			var nowAnchor  = 1; // 记录当前锚点
			var cardsCount = $cards.length,
				pageCount  = Math.ceil(cardsCount/ops.number);

				if($this.css('width') == '0px'){
					$this.css('width',cardW * ops.number + 'px');
				}

				if(ops.anchor){
					renderAnchor('center');
				}
				if(ops.autoplay) {
					var t = setInterval(function(){
						return showPage(nowAnchor+1);
					},ops.autoplay)

					if(ops.ishover) {
						$this.mouseenter(function(){
							clearInterval(t);
							t = 0;
						}).mouseleave(function(){
							if(!t){
								t = setInterval(function(){
									return showPage(nowAnchor+1);
								},ops.autoplay);
							}
						});
					}
				}

				if(ops.pageDown) {
					$pagedownL.on('click',function(){
						showPage(nowAnchor - 1);
					});
					$pagedownR.on('click',function(){
						showPage(nowAnchor + 1);
					});
				}




			function renderAnchor(pos){
				// 样式渲染
				var temp1 = '<a href="javascript:;" class="carousel-anchor carousel-anchor-active"></a>',
					temp2 = '<a href="javascript:;" class="carousel-anchor"></a>',
					dom   = '';
				for(var i=0;i<pageCount;i++){
					if(i==0){
						dom += '<a href="javascript:;" anchor=' + 1 + ' class="carousel-anchor carousel-anchor-active"></a>';
					}else {
						dom += '<a href="javascript:;" anchor=' + (i+1) + ' class="carousel-anchor"></a>';
					}
				}
				$controlbox.append(dom);

				var $a   = $($controlbox.find('a').get(0)),
					boxW = ($a.outerWidth()+parseFloat($a.css('margin-left'))+parseFloat($a.css('margin-right'))+1 ) * pageCount,
					boxH = $a.outerHeight()+parseFloat($a.css('margin-top'))+parseFloat($a.css('margin-left'))+1;
					$controlbox.css({
						'width':boxW,
						'height':boxH
					});
				if(pos === 'center'){
					$controlbox.css('margin','0 auto');
				}else if(pos === 'right'){
					$controlbox.css('float','right');
				}else if(pos === 'left'){
					$controlbox.css('float','left');
				}

				// 绑定事件
				var $anchor = $controlbox.find('a');
				if(ops.anchorEvent === 'all' || ops.anchorEvent === 'click') {
					$anchor.on('click',function(){
						var page = $(this).attr('anchor');
						showPage(page);
					});
				}
				if(ops.anchorEvent === 'all' || ops.anchorEvent === 'hover') {
					$anchor.on('mouseenter',function(){
						var page = $(this).attr('anchor');
						showPage(page);
					});
				}
			}

			function showPage(page){

				if(page > pageCount){
					nowAnchor = 1;
					$showCards.css('margin-left',0);
				}else if(page < 1){
					nowAnchor = pageCount;
					var l =  parseFloat($this.css('width')) * (pageCount-1);
					$showCards.css('margin-left','-' + l+'px');
				}else {
					nowAnchor = page;
					var l =  parseFloat($this.css('width')) * (page-1);
					$showCards.animate({marginLeft:'-'+ l +'px'}, ops.duration);
				}

				var $anchor = $controlbox.find('a');
				$anchor.removeClass('carousel-anchor-active');
				$($anchor[nowAnchor-1]).addClass('carousel-anchor-active');

			}
			return this;
		}
	});

	var defaults = {
		number: 1, // 每个翻页有几个card展示 number
		autoplay : 5000, //是否自动播放 time/false
		ishover: true, //是否鼠标悬停是停止播放
		anchor: 'center', // 是否显示锚点 true/flase/center/left/right
		anchorEvent : 'click', // 锚点触发事件 all/click/hover
		duration: 500 ,//动画速度曲线
		pageDown: false // 左右按钮
	};
	// 对传入参数进行处理
	function isValid(ops) {
		var flag = 1;
		if(typeof(ops.number) !== "number"){
			console.warn('aloeCarousel ERROR:  Please like this: {number:2}');
			ops.number = defaults.number;
		}
		if(ops.autoplay === true){
			ops.autoplay = defaults.autoplay;
		}else if(typeof(ops.autoplay) !== "number"){
			console.warn('aloeCarousel ERROR:  Please like this: {autoplay:2000}');
			ops.autoplay = defaults.autoplay;
		}
		if(typeof(ops.ishover) !== 'boolean'){
			console.warn('aloeCarousel ERROR: Please like this: {ishover:true}');
			ops.ishove = defaults.ishover;
		}
		if(ops.anchor === true) {
			ops.anchor = 'center';
		} else if(typeof(ops.anchor) !== 'boolean' && ops.anchor !== 'center' && ops.anchor !== 'left' && ops.anchor !== 'right'){
			console.warn('aloeCarousel ERROR: Please like this: {anchor:"true/false/left/center/right"}');
			ops.anchor = 'center';
		}
		if(ops.anchorEvent !== 'all' && ops.anchorEvent !== 'click' && ops.anchorEvent !== 'hover'){
			console.warn('aloeCarousel ERROR: Please like this: {anchorEvent:"all/click/hover"}');
			ops.anchorEvent = 'all';
		}
		if(typeof(ops.duration) !== 'number' && ops.duration !== 'normal' && ops.duration !== 'fast' && ops.duration !== 'slow'){
			console.warn('aloeCarousel ERROR: Please like this: {duration:[Number]/"normal/fast/slow"}');
			ops.duration = defaults.duration;
		}
		if(typeof(ops.pageDown) !== 'boolean'){
			console.warn('aloeCarousel ERROR: Please like this: {pageDown:true}');
			ops.pageDown = defaults.pageDown;
		}
		return flag ? ops : false;
    }

})(jQuery);