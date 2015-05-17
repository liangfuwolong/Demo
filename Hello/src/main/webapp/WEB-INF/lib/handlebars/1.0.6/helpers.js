/* Handlebars Helpers - Dan Harper (http://github.com/danharper) */
/**
 * 自定义方法：主要解决在广告里放其他连接
 * eg ：
 * href="{{ishttp colorID modelID brandID}}" 
 */
Handlebars.registerHelper("ishttp", function(colorID ,modelID ,brandID, fn) {
 colorID = colorID+"";
 var buffer = "";
 if( colorID.indexOf("url") < 0 ){  //没有连接
  buffer = "product.jsp?uid=b00001&colorID="+colorID+"&modelID="+modelID+"&brandID="+brandID;
 }else{  
  buffer = colorID.substring(4);
 }
 return buffer;
});

/**
 * 自定义方法：跳转地址
 * eg ：
 * href="{{isFolder1 adPic colorID modelID brandID}}" 
 */
Handlebars.registerHelper("isFolder1", function(adPic ,colorID ,modelID,brandID,fn) {
 var buffer = "";
 if( adPic.indexOf(".jpg") < 0 && adPic.indexOf(".png") < 0 && adPic.indexOf(".gif") < 0 && adPic.indexOf(".jpeg") < 0   ){  //是文件夹
   buffer = adPic+"/index.html";
 }else{//是图片
   buffer = "product.jsp?uid=b00001&colorID="+colorID+"&modelID="+modelID+"&brandID="+brandID;
 }
 return buffer;
});
/**
 * 自定义方法：图片地址
 * eg ：
 * href="{{isFolder2 adPic}}" 
 */
Handlebars.registerHelper("isFolder2", function(adPic , fn) {
 var buffer = "";
 if( adPic.indexOf(".jpg") < 0 && adPic.indexOf(".png") < 0 && adPic.indexOf(".gif") < 0 && adPic.indexOf(".jpeg") < 0   ){  //是文件夹
   buffer = adPic+"/index.jpg";
 }else{//是图片
   buffer = adPic;
 }
 return buffer;
});




/**
 * 自定义方法：主要解决在#if_eq里面不能../../这种方式
 * eg ：
 * {{#rebetas ../../this.model}}{{/rebetas}}
 */
Handlebars.registerHelper("sumexceed", function(array, fn) {
	var buffer = "";
	if(array[10]==0||array[10]==0){
		buffer = "无优惠";
	}else{
		buffer = "满"+array[10]+"立减"+array[11];
	}
	return buffer;
});
Handlebars.registerHelper("sumtatol", function(array, fn) {
	var buffer = "";
	if(array[1]==0||array[2]==0){
		buffer = "无优惠";
	}else{
		buffer = "满"+array[1]+"立减"+array[2];
	}
	return buffer;
});
Handlebars.registerHelper("prosum", function(str1,str2, fn) {
	var buffer = "";
	if(str1==0||str2==0){
		buffer = "无优惠";
	}else{
		buffer = "满"+(str1/100)+"元立减"+(str2/100)+"元。";
	}
	return buffer;
});
/**
 * 自定义方法：主要解决在#if_eq里面不能../../这种方式
 * eg ：
 * {{#rebetas ../../this.model}}{{/rebetas}}
 */
Handlebars.registerHelper("rebetas", function(array, fn) {
	var buffer = "";
	if(array[4]==0){
		buffer = "";
	}else{
		buffer = "-";
	}
	return buffer;
});
/**
 * 带序号的循环
 * {{index}}为序号。
 * eg ：
 * {{#each_with_index array}}
 * 		{{index}}
 * {{/each_with_index}}
 */
Handlebars.registerHelper("each_with_index", function(array, fn) {
	var buffer = "";
	array = array?array:[''];
	for (var i = 0, j = array.length; i < j; i++) {
		var item = array[i];
	
		// stick an index property onto the item, starting with 1, may make configurable later
		item.index = i+1;
	
		// show the inside of the block
		buffer += fn(item);
	}
	// return the finished buffer
	return buffer;
});

Handlebars.registerHelper('divide100', function(value){
	return value/100;
});
Handlebars.registerHelper('add', function(value, addition){
	return value + addition;
});
Handlebars.registerHelper('subtract', function(value, substraction){
	return value - substraction;
});
Handlebars.registerHelper('divide', function(value, divisor){
	return value / divisor
});
Handlebars.registerHelper('multiply', function(value, multiplier){
	return value * multiplier
});
Handlebars.registerHelper('floor', function(value){
	return Math.floor(value);
});
Handlebars.registerHelper('ceil', function(value){
	return Math.ceil(value);
});
Handlebars.registerHelper('round', function(value){
	return Math.round(value);
});



/**
 * If Equals
 * if_eq this compare=that
 */
Handlebars.registerHelper('if_eq', function(context, options) {
  if (context == options.hash.compare)
    return options.fn(this);
  return options.inverse(this);
});



/**
 * Unless Equals
 * unless_eq this compare=that
 */
Handlebars.registerHelper('unless_eq', function(context, options) {
  if (context == options.hash.compare)
    return options.inverse(this);
  return options.fn(this);
});


/**
 * If Greater Than
 * if_gt this compare=that
 */
Handlebars.registerHelper('if_gt', function(context, options) {
  if (context > options.hash.compare)
    return options.fn(this);
  return options.inverse(this);
});

/**
 * Unless Greater Than
 * unless_gt this compare=that
 */
Handlebars.registerHelper('unless_gt', function(context, options) {
  if (context > options.hash.compare)
    return options.inverse(this);
  return options.fn(this);
});


/**
 * If Less Than
 * if_lt this compare=that
 */
Handlebars.registerHelper('if_lt', function(context, options) {
  if (context < options.hash.compare)
    return options.fn(this);
  return options.inverse(this);
});

/**
 * Unless Less Than
 * unless_lt this compare=that
 */
Handlebars.registerHelper('unless_lt', function(context, options) {
  if (context < options.hash.compare)
    return options.inverse(this);
  return options.fn(this);
});


/**
 * If Greater Than or Equal To
 * if_gteq this compare=that
 */
Handlebars.registerHelper('if_gteq', function(context, options) {
  if (context >= options.hash.compare)
    return options.fn(this);
  return options.inverse(this);
});

/**
 * Unless Greater Than or Equal To
 * unless_gteq this compare=that
 */
Handlebars.registerHelper('unless_gteq', function(context, options) {
  if (context >= options.hash.compare)
    return options.inverse(this);
  return options.fn(this);
});


/**
 * If Less Than or Equal To
 * if_lteq this compare=that
 */
Handlebars.registerHelper('if_lteq', function(context, options) {
  if (context <= options.hash.compare)
    return options.fn(this);
  return options.inverse(this);
});

/**
 * Unless Less Than or Equal To
 * unless_lteq this compare=that
 */
Handlebars.registerHelper('unless_lteq', function(context, options) {
  if (context <= options.hash.compare)
    return options.inverse(this);
  return options.fn(this);
});

/**
 * Convert new line (\n\r) to <br>
 * from http://phpjs.org/functions/nl2br:480
 */
Handlebars.registerHelper('nl2br', function(text) {
  var nl2br = (text + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br>' + '$2');
  return new Handlebars.SafeString(nl2br);
});

Handlebars.registerHelper('br2nl', function(text,fn) {
	  var nl2br = (text + '').replace(/<br>/ig, "\n");
	  return new Handlebars.SafeString((nl2br||'您可能无法办理该活动。')+"\n");
});

/**
 *  Check current index is odd or even
 *  判断当前行的奇偶
 */
Handlebars.registerHelper("isOdd", function(index,options) {
	var str = (index%2==0)?'even':'odd';
	return new Handlebars.SafeString(str);
});
/**
 *  首页轮播 每三个li换一ul
 */
Handlebars.registerHelper("checkUl", function(index,options) {
	var str;
	if(index == 1) {
		str = '<ul>';
	} else if(index%3==1) {
		str = '</ul><ul>';
	} else {
		str = '';
	}
	return new Handlebars.SafeString(str);
}); 
/**
 *  裁剪内容,对于过长的string,使用...来替代
 *  参数：内容,保留长度
 */
Handlebars.registerHelper("shrink", function(content,length) {
	content = content ? content : '';
	if(content.length > length){
		content = content.slice(0,length);
		content += '..';
	}
	return new Handlebars.SafeString(content);
});


Handlebars.registerHelper("subStr", function(content,start,length) {
    content = content ? content : '';
    if(content.length > length && content.length>start){
        content = content.slice(start,length);
    }
    return new Handlebars.SafeString(content);
});

Handlebars.registerHelper("ternary", function(content,value) {
	content = content ? content : value;
	return new Handlebars.SafeString(content);
});


/**
 *  fullMenu菜单 每三个加border
 */
Handlebars.registerHelper("checkBorder", function(index,options) {
	var str = index!=1&&index%3==1 ? ' class="separatorBorder" ':'';
	return new Handlebars.SafeString(str);
});

/**
 * SafeString
 */
Handlebars.registerHelper('safeString', function(text,options) {
	text = text ? text : '';
	return new Handlebars.SafeString(text);
});

/**
 * 定义表格隔行变色
 */
Handlebars.registerHelper("splitClass", function(txt,fn) {
	var buffer = "split";
	if( txt % 2 == 0  ){
		buffer = "";
	}
	return buffer;
});

/**
 * 定义表格隔行变色
 */
Handlebars.registerHelper("splitClass1", function(txt,fn) {
	var buffer = "ui-table-split";
	if( txt % 2 == 0  ){
		buffer = "";
	}
	return buffer;
});

/**
 * 判断数组中是否有多个数组项目
 * 
 */
Handlebars.registerHelper("if_array_multi", function(array, options) {
	array = array?array:[''];
	if(array.length && array.length>1){
		return options.fn(this);
	} else {
		return options.inverse(this);
	}
});

/**
 * 0 限数量 1 限金额 2限制金额和数量  3不限
 你可以兑换总价值的礼品，你还可兑换数量：
						    <span class="colorRed" id="JS_remain_amount"></span>
						    还可以兑换金额：
						    RULE_TYPE RULE_VALUE_AMOUNT RULE_VALUE_COUNT
						    <span class="colorRed" id="JS_remain_price"></span>元
**/
Handlebars.registerHelper("sw_status", function(ruleType,ruleValueAmount,ruleValueCount, fn) {
	var buffer = "你可以兑换";
	if(ruleType==0){
		buffer +="总数量为<font color='red'>"+ruleValueCount+"</font>的礼品";
		buffer +="，你还可兑换数量: <span class='colorRed JS_remain_total'>"+ruleValueCount+"</span>";
	}else if(ruleType==1){
		ruleValueAmount = ruleValueAmount/100;
		buffer +="总价值为<font color='red'>"+ruleValueAmount+"</font>的礼品";
		buffer +="，还可以兑换金额: <span class='colorRed JS_remain_total'>"+ruleValueAmount+"</span>元";
	}else if(ruleType==3){
		buffer +="<font color='red'>不限</font>数量或金额的礼品。";
	}else if(ruleType == 2){
		ruleValueAmount = ruleValueAmount/100;
		buffer +="总价值为<font color='red'>"+ruleValueAmount+"</font>元，总数量<font color='red'>"+ruleValueCount+"</font>的礼品，";
		buffer +="还可以兑换金额: <span class='colorRed JS_remain_total'>"+ruleValueAmount+"</span>元，兑换数量：<span class='colorRed JS_remain_totalCount'>"+ruleValueCount+"</span>";
	}
	return new Handlebars.SafeString(buffer);
});
/**
 *  判断OPER_TYPE类型是否为CREATE_MUTEX_CHK_NO_PASS, 判断OFFER_STATE是否为1（已过期）
 */
Handlebars.registerHelper('isOfferValid', function(operType, offerState, no_pass_reason, options) {
	var offerWarning = '';
	if(operType == 'CREATE_MUTEX_CHK_NO_PASS') {
		offerWarning = "<em class='offerWarning'>该业务无法办理</em><i class='ui-tiptext-icon icon-warning offerWarning' title='" + no_pass_reason + "'></i>";
	} else if(offerState == '1') {
		offerWarning = "<em class='offerWarning'>该业务已过期</em><i class='ui-tiptext-icon icon-warning offerWarning' title='该业务已过期'></i>";
	}
	return new Handlebars.SafeString(offerWarning);
});
/**
 *  判断OFFER_TYPE类型是否为OFFER_VAS_COMB
 */
Handlebars.registerHelper('offerVasComb', function(text,options) {
	if(text == 'OFFER_VAS_COMB')
		return options.fn(this);
	return options.inverse(this);
});

/**
 * 对产品属性进行排版，每行三列
 */
Handlebars.registerHelper('mod3DivFront', function(index,arrayLength){

	if( (index-1)%3 == 0)
		return new Handlebars.SafeString('<div class="new-prod-row">');


});
Handlebars.registerHelper('mod3DivEnd', function(index,arrayLength){
if((arrayLength)%3 != 0){
	if(index == arrayLength)
		return new Handlebars.SafeString('</div>');
	if( (index)%3 == 0)
		return new Handlebars.SafeString('</div>');
}else{
	if( (index)%3 == 0)
		return new Handlebars.SafeString('</div>');
}

});

/**
 * 对推荐目录进行排版，每行两列
 */
Handlebars.registerHelper('mod2TrFront', function(index,arrayLength){

	if( (index-1)%2 == 0)
		return new Handlebars.SafeString('<tr>');


});
Handlebars.registerHelper('mod2TrEnd', function(index,arrayLength){
	if((arrayLength)%2 != 0){
		if(index == arrayLength)
			return new Handlebars.SafeString('</tr>');
		if( (index)%2 == 0)
			return new Handlebars.SafeString('</tr>');
	}else{
		if( (index)%2 == 0)
			return new Handlebars.SafeString('</tr>');
	}
});

Handlebars.registerHelper("debug", function(optionalValue) { 
  if (optionalValue) {
    console.log("Value"); 
    console.log("===================="); 
    console.log(optionalValue); 
  } 
});

/**
 * 集团统一视图
 */
Handlebars.registerHelper('nl2brandshowvalue', function(text) {  
  var nl2br = (text + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + '<br>' + '$2');
  var orgText = nl2br.__replaceAll("\\s", "");  
  if(nl2br.length > 39){
	  nl2br = nl2br.substr(0,39) +'...<a class="dtlFont" onclick="showDesc(\''+orgText+'\')" href="javascript:void(0);" >详细</a>';
  }	
  return new Handlebars.SafeString(nl2br);
});

Handlebars.registerHelper('showGroupLevel', function(level) {  
	var buffer;
	if(level == 5){
		buffer = "<span class='ui-star star10'></span>";
	}else if(level == 4){
		buffer = "<span class='ui-star star8'></span>";
	}else if(level == 3){
		buffer = "<span class='ui-star star6'></span>";
	}else if(level == 2){
		buffer = "<span class='ui-star star4'></span>";
	}else if(level == 1){
		buffer = "<span class='ui-star star2'></span>";
	}else{
		buffer = "<span class='ui-star star0'></span>";
	}		
	return new Handlebars.SafeString(buffer);
});

Handlebars.registerHelper('showPic', function(offerPicUrl){
	var buffer;
	buffer = "<img id='" + offerPicUrl + "' src='aiccsp2/res/theme/images/groupView/c_" + offerPicUrl + ".png'  class='detialImg' onerror='' height='80px' width='90px'/>";
	return new Handlebars.SafeString(buffer);
});

String.prototype.__replaceAll  = function(s1,s2){  
	return this.replace(new RegExp(s1,"gm"),s2);  
};   

// 营销案联带策划可选必选标志
Handlebars.registerHelper("selectFlag", function(content) {
	// SELECT_FLAG: 0必选 1默选 2可选 3不可选
	var str = '';
	if(content == 0){
		str = ' checked=checked disabled=disabled title=必选 ';
	} else if (content == 1){
		str = ' checked=checked ';
	} else if (content == 2){
		str = '';
	} else if (content ==3){
		str = ' disabled=disabled title=不可选 ';
	}
	return str;
});

//add by wuxt 用于分页组件tpl模板
//先减后判断等于
Handlebars.registerHelper('if_eq_subtract', function(value,substraction,options) {
	  if ((value-substraction) == options.hash.compare)
	    return options.fn(this);
	  return options.inverse(this);
	});
//先减后判断大于
Handlebars.registerHelper('if_gt_subtract', function(value,substraction,options) {
	  if (value-substraction > options.hash.compare)
	    return options.fn(this);
	  return options.inverse(this);
	});
//先减后判断小于
Handlebars.registerHelper('if_lt_subtract', function(value,substraction,options) {
	  if (value-substraction < options.hash.compare)
	    return options.fn(this);
	  return options.inverse(this);
	});


//先减后除再判断等于
Handlebars.registerHelper('if_eq_f_subtract_divide', function(value,substraction,divide,options) {
	  if (Math.floor((value-substraction)/divide) == options.hash.compare)
	    return options.fn(this);
	  return options.inverse(this);
	});
//先减后除再判断大于
Handlebars.registerHelper('if_gt_f_subtract_divide', function(value,substraction,divide,options) {
	  if (Math.floor((value-substraction)/divide) > options.hash.compare)
	    return options.fn(this);
	  return options.inverse(this);
	});
//先减后除再判断小于
Handlebars.registerHelper('if_lt_f_subtract_divide', function(value,substraction,divide,options) {
	  if (Math.floor((value-substraction)/divide) < options.hash.compare)
	    return options.fn(this);
	  return options.inverse(this);
	});
//先减后除再判断大于等于
Handlebars.registerHelper('unless_lt_f_subtract_divide', function(value,substraction,divide,options) {
	  if (Math.floor((value-substraction)/divide) < options.hash.compare)
		  return options.inverse(this);
	    return options.fn(this);
	});
//先减后除再判断小于等于
Handlebars.registerHelper('unless_gt_f_subtract_divide', function(value,substraction,divide,options) {
	  if (Math.floor((value-substraction)/divide) > options.hash.compare)
		  return options.inverse(this);
	    return options.fn(this); 
	});

//同减同除再判断等于
Handlebars.registerHelper('if_eq_f_s_subtract_divide', function(value1,value2,substraction,divide,options) {
	  if (Math.floor((value1-substraction)/divide) == Math.floor((value2-substraction)/divide))
	    return options.fn(this);
	  return options.inverse(this);
	});
//同减同除再判断大于
Handlebars.registerHelper('if_gt_f_s_subtract_divide', function(value1,value2,substraction,divide,options) {
	 if (Math.floor((value1-substraction)/divide) > Math.floor((value2-substraction)/divide))
	    return options.fn(this);
	  return options.inverse(this);
	});
//同减同除再判断小于
Handlebars.registerHelper('if_lt_f_s_subtract_divide', function(value1,value2,substraction,divide,options) {
	if (Math.floor((value1-substraction)/divide) < Math.floor((value2-substraction)/divide))
	    return options.fn(this);
	  return options.inverse(this);
	});
//同减同除再判断大于等于
Handlebars.registerHelper('unless_lt_f_s_subtract_divide', function(value1,value2,substraction,divide,options) {
	  if (Math.floor((value1-substraction)/divide) < Math.floor((value2-substraction)/divide))
		  return options.inverse(this);
	    return options.fn(this);

	});
//同减同除再判断小于等于
Handlebars.registerHelper('unless_gt_f_s_subtract_divide', function(value,substraction,divide,options) {
	 if (Math.floor((value1-substraction)/divide) > Math.floor((value2-substraction)/divide))
		  return options.inverse(this);
	    return options.fn(this);

	});

Handlebars.registerHelper("each_with_num", function(value,fn) {
	var buffer = "";
	var array=[];
	for (var i = 0, j = value; i < j; i++) {
		var item = {};
		item.num=i+1;
		//item.cur=index;
		buffer += fn(item);
		array[i]=item;
	}
	return buffer;
});

//乘以减去
Handlebars.registerHelper('divide_multiply', function(multiply,value,num) {
	return Math.floor(value/num)*multiply;

	});
//乘以减去
Handlebars.registerHelper('multiply_sub_calcul', function(multiply,value,cal,sub) {
	return ((value-sub)%cal)*multiply;

	});

//除以乘以加上
Handlebars.registerHelper('divide_multiply_add', function(value,divide,multiply,add) {
	return Math.floor(value/divide)*multiply+add;

	});

Handlebars.registerHelper("each_with_num_subtract_divide_multiply_add1", function(value,subtract,divide,multiply,add,total,fn) {
	var min=Math.floor((value-subtract)/divide)*multiply+add;
	//alert(min);
	//alert(total);
	var buffer = "";
	var array=[];
	for (var i = min, j = total; i <= j; i++) {
		var item = {};
		item.num=i;
		//item.cur=index;
		buffer += fn(item);
		array[i]=item;
	}
	return buffer;
});

Handlebars.registerHelper("each_with_num_subtract_divide_multiply_add2", function(value,subtract,divide,multiply,add,cur,fn) {
	var min=Math.floor((value-subtract)/divide)*multiply+add;
	var max=min+cur;
	//alert("each_with_num_subtract_divide_multiply_add2       "+min);
	//alert(max);
	var buffer = "";
	var array=[];
	for (var i = min, j = max; i < j; i++) {
		var item = {};
		item.num=i;
		//item.cur=index;
		buffer += fn(item);
		array[i]=item;
	}
	return buffer;
});

Handlebars.registerHelper("isOdd4Map", function() {
	var str = (noteFlag)?'class="ui-table-split"':'';
	noteFlag = !noteFlag;
	return new Handlebars.SafeString(str);
});

Handlebars.registerHelper("if_half", function(context,options) {
	if (options.hash.compare%2==0){
	  if (context == options.hash.compare/2){
		  return options.fn(this);
	  }
	  return options.inverse(this);
	}else{
		  if (context == (options.hash.compare+1)/2){
			  return options.fn(this);
		  }
		  return options.inverse(this);
	}
});