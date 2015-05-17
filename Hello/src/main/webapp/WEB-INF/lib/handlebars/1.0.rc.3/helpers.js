/* Handlebars Helpers - Dan Harper (http://github.com/danharper) */
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
 * 自定义方法：主要解决在广告里放其他连接
 * eg ：
 * href="{{ishttp colorID modelID brandID}}" 
 */
Handlebars.registerHelper("ishttp", function(colorID ,modelID ,brandID, fn) {
	colorID = colorID+"";
	var buffer = "";
	if( colorID.indexOf("http") < 0 ){  //没有连接
		buffer = "product.jsp?uid=b00001&colorID="+colorID+"&modelID="+modelID+"&brandID="+brandID;
	}else{  
		buffer = colorID;
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