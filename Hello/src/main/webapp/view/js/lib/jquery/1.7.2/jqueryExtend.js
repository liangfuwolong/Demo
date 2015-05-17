/**
 * 基于jQuery的扩展方法定义
 */

/**
 * 扩展jQuery类方法：stringifyJSON
 * 用于把JavaScript对象序列化为JSON字符串
 */
jQuery.extend({
	special4JSON: {'\b': '\\b', '\t': '\\t', '\n': '\\n', '\f': '\\f', '\r': '\\r', '"' : '\\"', '\\': '\\\\'},
	escape4JSON: function(chr){
		return jQuery.special4JSON[chr] || '\\u' + ('0000' + chr.charCodeAt(0).toString(16)).slice(-4);
	},
	stringifyJSON: function(data){
		// use native if exists
		if (window.JSON && window.JSON.stringify){
			return window.JSON.stringify(data);
		}
			
		switch (jQuery.type(data)){
			case 'string':
				return '"' + data.replace(/[\x00-\x1f\\"]/g, jQuery.escape4JSON) + '"';
			case 'array':
				return '[' + jQuery.map(data, jQuery.stringifyJSON) + ']';
			case 'object':
				var string = [];
				jQuery.each(data, function(key, val){
					var json = jQuery.stringifyJSON(val);
					if (json) 
						string.push(jQuery.stringifyJSON(key) + ':' + json);
				});
				return '{' + string + '}';
			case 'number': 
			case 'boolean': 
				return '' + data;
			case 'undefined':
			case 'null': 
				return 'null';
		}
		
		return data;
	}
});

/**
 * 扩展jQuery对象方法：smartFloat
 * 用于展示页面右侧悬浮div层，页面上需要定义一个div，调用该jquery对象的smartFloat()方法
 * 例子：
 * <div class="float" id="float" onclick="toEditService()">浮动显示</div>
 * 
 * $("#float").smartFloat();
 */
jQuery.fn.smartFloat = function() {
    var position = function(element) {
        var top = element.position().top, pos = element.css("position");
        jQuery(window).scroll(function() {
            var scrolls = jQuery(this).scrollTop();
            if (scrolls > top) {
                if (window.XMLHttpRequest) {
                    element.css({
                        position: "fixed",
                        top: 0
                    });    
                } else {
                    element.css({
                        top: scrolls
                    });    
                }
            }else {
                element.css({
                    position: "absolute",
                    top: top
                });    
            }
        });
    };
    return jQuery(this).each(function() {
        position(jQuery(this));                         
    });
}; 

/**
 * 扩展jQuery的zTree命名空间，方便使用zTree组件
 */
jQuery.zTree={
	/**
	 * 获取js对象的真实类型
	 * @param {Object} o 任意js对象
	 * @return {String} 表示对象类型的字符串
	 */
	getRealType: function(o){
		if(typeof(o) == "object"){
			if(o === null){
				return "null";
			}
			if(o.constructor == (new Array).constructor){
				return "array";
			}
			if(o.constructor == (new Date).constructor){
				return "date";
			}
			if(o.constructor == (new RegExp).constructor){
				return "regex";
			}
			return "object";
		}
		return typeof(o);
	},
	/**
	 * 用于将json对象转换成ztree需要的json数据格式
	 * @param {JSON} obj 任意json对象
	 * @param {Array} parentArray 父数组，如果不传值，则默认方法内部自己构建一个数组返回，如果有值则取该值添加转换后的json对象
	 * @return {JSON}
	 */
	convert4ZTree: function(obj, parentArray){
		var retValue = null;
	  	if(parentArray){
	  		retValue = parentArray;
	  	}else{
	  		retValue = new Array();
	  	}
	  	switch($.zTree.getRealType(obj)){
	      	case "object"://如果是对象，则遍历属性名和属性值，构造json返回
	      		$.each(obj, function(name, value){
	      			var json = {};
				  		json["name"] = name;//属性名
				  		json["open"] = true;
	  					json["children"] = $.zTree.convert4ZTree(value);
	  					retValue.push(json);
	      		});
	      		break;
	      	case "array"://如果是数组，则遍历数组元素，构造json返回    
	      		$.each(obj, function(i, data){
	      			if($.zTree.getRealType(data) == "object"){
	      				$.zTree.convert4ZTree(data, retValue);
	      			}else{
	      				var json = {};
					  	json["name"] = data;//属性名
	  					retValue.push(json);
	      			}
	      		});
	      		break;
	  	}
	  	return retValue;
	}
};
jQuery.fn.hoverDelay = function(options){
    var defaults = {
        hoverDuring: 300,
        outDuring: 200,
        hoverEvent: function(){
            $.noop();
        },
        outEvent: function(){
            $.noop();    
        }
    };
    var sets = $.extend(defaults,options || {});
    var hoverTimer, outTimer;
    return $(this).each(function(){
        $(this).hover(function(){
            clearTimeout(outTimer);
            hoverTimer = setTimeout(sets.hoverEvent, sets.hoverDuring);
        },function(){
            clearTimeout(hoverTimer);
            outTimer = setTimeout(sets.outEvent, sets.outDuring);
        });    
    });
}
jQuery.fn.defaultChars = function() {
   return $(this).each(function() {
        var $this = $(this);
        if ($this.val())
            return;
        var $defaultchars = $this.attr('defaultchars');
        var oldColor = $this.css('color');
        $this.val($defaultchars).css('color', '#999');
        $this.focusin(function () {
            if ($this.val() == $defaultchars)
                $this.val('').css('color', oldColor);
        }).focusout(function () {
            if ($this.val() == '')
                $this.val($defaultchars).css('color', '#999');
            ;
        });
    });
} 
$.fn.textMagnifier = function(options) {
	var options = $.extend({
		splitType:[3,4,4],
		explainText:"请输入13位手机号码",
		delimiter:" ",
		align:"bottom",
		width:253
	},options);
	
	var self = this;

	self.bind("focusin keyup", function(){
		if($(this).val().indexOf("1")==0){
			creat()
		}else{
			hide();
		};	
	});

	self.bind("focusout", function(){
		hide();
	});


	var _temp = '<div class="Rose-zoomTips" >'+
       '<div class="Rose-zoomTips-cnt" rel="con"></div>'+
       '<div class="Rose-zoomTips-msg" rel="text"></div>'+
    '</div>',_dom;


	var creat = function(){
		if (!_dom ) {
			_dom = $(_temp);
			$(document.body).append($(_dom));
			setPosition();
		}else{
			setContent();
		}
	}

	var setContent = function(){
		var _val = getSplitText(self.val()),_text = options.explainText;
		_dom.find("[rel='con']").html(_val).end().find("[rel='text']").html(_text);	

		_val.length > 0 ? _dom.show() : null; 
		if(options.explainText==""){_dom.find("[rel='text']").remove()}
	}

	var getSplitText=function(str){
        var output=[],start=0,st=options.splitType;
        for(var i=0 ,len = st.length; i<len ;i++){
            var s=str.substr(start,st[i]);
            if(s.length > 0){
                output.push(s);
            }
            start+=st[i];
        }
        return output.join(options.delimiter);
    };

	var setPosition = function(){
		var y = self.outerHeight();
        var t = self.offset().top;
        var l = self.offset().left;
        $(_dom).css({
            "top": (t+y) + "px",
            "left":l + "px"
        }); 
	}

	var hide = function(){
		 if(_dom){
            _dom.hide();
        }	
	}
}