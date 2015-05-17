(function() {
    if (!window.globle){
    	window.globle = {};
    	globle.domain="/Hello";//开发环境
    	globle.env="view";
    	globle.actionPref="service?isconvert=true&action=";
    	globle.pagePref="page/";
    	globle.downloadPref="upload?action=MyDownLoad&notCover=true";
    	globle.importPref="upload?action=MyImport&notCover=true";
    	globle.importOriginalPref="upload?action=MyOriginalImport&notCover=true";
    	globle.uploadPref="upload?action=MyUpload&notCover=true";
    	globle.debug=false;
    	globle.tableQueryList={};
    	globle.cardQueryList={};
    	globle.searchDivCount=0;
    	globle.focusSearchContentInx=-1;
    	globle.hasOperatePermission=false;
    	globle.hasOperatePermission2=false;
    	globle.minSearchKeyCount=0;
    	globle.maxSearchCount=100;
    }
    
})();

globle.getContextPath = function(){
	    return globle.CONTEXT_PATH;
	};
	
	globle.getAction = function(action){
			return globle.actionPref+action;
	};
	
	globle.getPage = function(page){
		return globle.pagePref+page;
	};
	
	globle.getContext=function(){
		var curWwwPath=window.document.location.href;
		var pathName = window.document.location.pathname;
		var pos = curWwwPath.indexOf(pathName);
		 var localhostPath = curWwwPath.substring(0, pos);
			var path=localhostPath;
		if(pathName.indexOf(globle.domain)==0){
			//说明是开发环境
			path+=globle.domain;
		}
		path+="/"+globle.env+"/";
		return path;
	}
	
	globle.getTpl = function(tpl){
		return globle.getContext()+"tpl/"+tpl+".tpl";
	};
	
	globle.getSeaJs = function(js){
		return globle.getContext()+"sea-modules/"+js+".js";
	};
	
	globle.imp = function(parseClass,fileType,impUrl,isLimitSize,showError,ext1,ext2,ext3){
		var url = impUrl||'importPref';
		if(!parseClass){
			alert("未定义文件导入解析类");
			return false;
		}
		if(!fileType){
			fileType="excel";
		}
		if(!isLimitSize)
			isLimitSize="false";
		if(!showError)
			showError="false";
		var ret = globle[url]+"&parse="+parseClass+"&type="+fileType+"&isLimitSize="+isLimitSize+"&showError="+showError;
		
		if(typeof(ext1)!="undefined" && ""!=ext1)
			ret = ret+"&ext1="+ext1;
		if(typeof(ext2)!="undefined" && ""!=ext2)
			ret = ret+"&ext2="+ext2;
		if(typeof(ext3)!="undefined" && ""!=ext3)
			ret = ret+"&ext3="+ext3;
		
		return ret;
	};
	
	globle.download = function(downClass,param){
		if(!downClass){
			alert("未定义文件下载类");
			return false;
		}
		
		return globle.downloadPref+"&parse="+downClass+"&code="+param;
	};
	
	globle.up = function(ftpcode){
		var tmpstr="";
		if(!ftpcode){
			ftpcode="CM_COMMON";
		}
		tmpstr=globle.uploadPref+"&ftpPathCode="+ftpcode;
		/*if(fileName!='undefined'){
			tmpstr+="&fileName="+fileName;
		}*/
		return tmpstr;
	};
	
	globle.param= function(param){
		if(param==null||typeof(param)=='undefined'){
			param="";
		}
		return param;
	}
	
	globle.setTableQuery = function(tableId,tableQueryObj){
		globle.tableQueryList[tableId]=tableQueryObj;
	};	
	
	globle.getTableQuery = function(tableId){
		return globle.tableQueryList[tableId];
	};	
	
	globle.setCardQuery = function(cardId,cardQueryObj){
		globle.cardQueryList[cardId]=cardQueryObj;
	};	
	
	globle.getCardQuery = function(cardId){
		return globle.cardQueryList[cardId];
	};	
	
	getLength = function(str) {
	    ///<summary>获得字符串实际长度，中文2，英文1</summary>
	    ///<param name="str">要获得长度的字符串</param>
		str=str+'';
	    var realLength = 0, len = str.length, charCode = -1;
	    for (var i = 0; i < len; i++) {
	        charCode = str.charCodeAt(i);
	        if (charCode >= 0 && charCode <= 128) realLength += 1;
	        else realLength += 2;
	    }
	    return realLength;
	};
	
	
function dubug(obj){
	if(globle.debug){
		alert(JSON.stringify(obj));
	}
}

function info(obj){
	alert(JSON.stringify(obj));
}

function equal(objA, objB)

{
    if (typeof arguments[0] != typeof arguments[1])
        return false;

    //数组
    if (arguments[0] instanceof Array)
    {
        if (arguments[0].length != arguments[1].length)
            return false;
        
        var allElementsEqual = true;
        for (var i = 0; i < arguments[0].length; ++i)
        {
            if (typeof arguments[0][i] != typeof arguments[1][i])
                return false;

            if (typeof arguments[0][i] == 'number' && typeof arguments[1][i] == 'number')
                allElementsEqual = (arguments[0][i] == arguments[1][i]);
            else
                allElementsEqual = arguments.callee(arguments[0][i], arguments[1][i]);            //递归判断对象是否相等                
        }
        return allElementsEqual;
    }
    
    //对象
    if (arguments[0] instanceof Object && arguments[1] instanceof Object)
    {
        var result = true;
        var attributeLengthA = 0, attributeLengthB = 0;
        for (var o in arguments[0])
        {
            //判断两个对象的同名属性是否相同（数字或字符串）
            if (typeof arguments[0][o] == 'number' || typeof arguments[0][o] == 'string')
            {
            	if(arguments[0][o]=='' && !arguments[1][o])
        		{
            		continue;
        		}
                result = eval("arguments[0]['" + o + "'] == arguments[1]['" + o + "']");
                if(!result)
                {
                	return result;
                }

            }
            else {
                //如果对象的属性也是对象，则递归判断两个对象的同名属性
                //if (!arguments.callee(arguments[0][o], arguments[1][o]))
                if (!arguments.callee(eval("arguments[0]['" + o + "']"), eval("arguments[1]['" + o + "']")))
                {
                    result = false;
                    return result;
                }
            }
            ++attributeLengthA;
        }
        
        for (var o in arguments[1]) {
            ++attributeLengthB;
        }
        
        
        return result;
    }
    return arguments[0] == arguments[1];
}


/**
 * cache.
 * page data cache in cache.
 */
(function($) {

$.cache = {};
$.extend($.cache, {

	map : {},

	push : function(key, value) {
		$.cache.map[key] = value;
	},

	remove : function(key) {
		delete($.cache.map[key]);
	},

	clear : function() {
		$.cache.map = {};
	},

	get : function(key) {
		return $.cache.map[key];
	}

});

})(jQuery);
		
	
/**
 * action定义
 */
var srvMap = (function(){
	    var srcPref ="service?isconvert=true&action=";
	    var dataObj = {}
	    
	    return {
	        add: function(uid, srvSrc) {
	        	dataObj[uid] = srcPref + srvSrc;         
	        },
	        get: function(uid) {
	            return dataObj[uid];
	        },
	        dataObjs:function(){
	            return dataObj;
	        }
	        
	    };
	})(jQuery);
	//兼容一期代码
	window.dataObj = srvMap.dataObjs();

	/**
	 * tpl 定义
	 */
	var tplMap = (function(){
	    var version = '20131225';
	    var tplPref = globle.getContextPath()+'/pc/tpl/';
	    
	    var tpl = {
	    };
	    
	    return {
	        add: function(uid,tplSrc) {
	            tpl[uid] = tplPref + tplSrc;
	        },
	        get: function(uid) {
	            return tpl[uid];
	        },
	        tpls: function() {
	            return tpl;
	        }
	    };
	    
	})(jQuery);
	//兼容一期代码
	window.tpl = tplMap.tpls();

	var lastDate = new Date();
	var timename = null;
	
/**
 * 通用模块
 */
Comm = {
		/**
		 *打开弹出层
		 * @title 标题
		 * @url url地址
		 * @width 宽度
		 * @height 高度
		 * @json 传递参数
		 */
		showDialog : function(id,title, url, width, height, json) {
		    art.dialog.data('data', json);
		    art.dialog.open(url, {
		        id:id,
		        title : title,
		        lock : true,
		        width : width + 'px',
		        height : height + 'px',
		        opacity : .2
		    }, true);
		},
		
		
		/**
		 *关闭窗口
		 */
		closeDialog : function(id) {
		    if (id)
		        art.dialog.list[id].close();
		    art.dialog.close();
		},
		
	
	/**
	 * 完成退出
	 */
	resultlogout:function(){
		Rose.ajax.getJson(window.dataArray.loginOut, '',function(json, status) {
			if(status){
				// Bce.panel.bce_forward('business?service=page/business&menuType=2');
				//window.location.reload();
			}
		});
	},
	
	
	/**
	 * block层
	 * @el元素
	 * @text 显示内容
	 */
	block : function(el, text) {
	    var _text = text || "提交中,请稍等...";
	    var _msg = '<h1><i class="ui-i-new-loading"></i><span style="line-height: 60px;vertical-align: middle;">'+_text+'</span></h1>' ;
	    if (el) {
	        $(el).block({
	            message : _msg,
	            css : {
	                padding : '0px',
	                width : '260px',
	                border : '0px solid #aaa',
	                background:'#E8E8E8'
	            }
	        });
	    } else {
	        $.blockUI({
	            message : _msg,
	            css : {
	                padding : '0px',
	                width : '260px',
	                border : '0px solid #aaa',
	                background:'#E8E8E8'
	            }
	        });
	    }
	},
	
	
	/**
	 * unblock
	 * @el 元素
	 */
	unblock : function(el) {
	    if (el)
	        $(el).unblock();
	    $.unblockUI();
	},
	
	/**
	 * 同步查询静态配置数据
	 */
	qryStaticData:function(codeType){
		var datas=[];
		var param={};
		param.codeType=codeType;
		Rose.ajax.postJsonSync("service?action=getStaticDataByCodeType&isconvert=true",param,function(json,status){
				if(status){
					datas= json.beans;
				}
		});
		
		return datas;
	},
	
	/**
	 * 同步查询静态配置数据
	 */
	qryOpRoles:function(){
		var datas=[];
		var param={};
		Rose.ajax.postJsonSync("service?action=getRolesByOpId&isconvert=true","",function(json,status){
				if(status){
					datas= json.beans;
				}
		});
		
		return datas;
	},
	
	/**
	 * 同步查询静态配置数据，不建议使用此方法
	 */
	qryStaticDatas:function(codeTypes){
		var datas;
		var param={};
		param.codeTypes=codeTypes;
		Rose.ajax.postJsonSync("service?action=getStaticDataByCodeTypes&isconvert=true",param,function(json,status){
				datas= json;
		});
		
		return datas;
	},
	qryOrgNameByOrgId:function(orgId){
		var datas;
		var param={};
		param.orgid=orgId;
		Rose.ajax.postJsonSync("service?action=getOrgNameByOrgId&isconvert=true",param,function(json,status){
				datas= json;
		});
		
		return datas;
	},
	getOperNameByOperId:function(operId){
		var datas;
		var param={};
		param.opid=operId;
		Rose.ajax.postJsonSync("service?action=getOperNameByOperId&isconvert=true",param,function(json,status){
				datas= json;
		});
		
		return datas;
	},
	/**
	 * 根据url获取菜单编号
	 */
	getFuncIdByPage:function(pageCode){
		var func_id="";
		var param={};
		param.parameter0=pageCode;
		Rose.ajax.postJsonSync("service?action=getFuncIdByPage&isconvert=true",param,function(json,status){
				func_id= json.value;
		});
		
		return func_id;
	},
	
	/**
	 * 下载Excel文件; 依赖jquery.js ,jqueryExtend.js
	 * @param {String} fileName 文件名
	 */
	downExcel:function(srvcode,fileName,keyValues,params,callback){
		var url="service?action="+srvcode+"&isconvert=true&export=excel&filename="+encodeURIComponent(fileName)+
		"&keyvalues="+encodeURIComponent($.stringifyJSON(keyValues));
		downFile(url,params,callback);
	},
	
	/**
	 * 模糊搜索
	 */
	autoComplete:function(srvCode,param1,fieldName,textId,callback,afterSearchFunc,keyWordLength,maxResultLengh){
		
		var klengh=globle.minSearchKeyCount;
		if(typeof(keyWordLength)!='undefined'&&keyWordLength!=null){
			klengh=keyWordLength;
		}
		var maxLengh=globle.maxSearchCount;
		if(maxResultLengh){
			maxLengh=maxResultLengh;
		}
		
		Rose.ajax.postJson(globle.getAction(srvCode), param1, function(data, status) {
			
			if(afterSearchFunc){
				afterSearchFunc(data);
			}
			
		 	if(data && data!='error' && data.length>0){
		 		//去除重复数据 减轻页面缓存
//		 		var data_temp = new Array();
//		 		var data3=[];
//		 		$(data).each(function(index,obj)
// 				{
//		 			if(obj)
//	 				{
//		 				Array.prototype.contains = function(obj) { 
//		 					  var i = this.length; 
//		 					  while (i--) { 
//		 					    if (this[i] === obj) { 
//		 					      return true; 
//		 					    } 
//		 					  } 
//		 					  return false; 
//		 					} ;
//		 				if(!data_temp.contains(obj[fieldName]))
//		 				{
//		 					var temp = {};
//		 					data_temp.push(obj[fieldName]);
//		 					temp[fieldName] = obj[fieldName];
//		 					data3.push(temp);
//		 				}
//		 				delete Array.prototype.contains;
//	 				}
//		 			
// 				});
//		 		data_temp = null;
//		 		data = null;
//		 		
		 		var autoComplete = new AutoComplete(data, fieldName,maxLengh);
		 		autoComplete.customizeStyle('searchBackgroundDiv', 'searchFocusDiv', 'searchBlurDiv', 
						function(obj) {
							if(fieldName.indexOf('#') != -1)
							{
								var fieldName1 = fieldName.split('#')[0];
								var fieldName2 = fieldName.split('#')[1];
								var innerText = '【'+obj[fieldName1]+'】'+ obj[fieldName2];
								return innerText;
							}
							else
							{
								var innerText = obj[fieldName];
								return innerText;
							}
							
						}
				);
				autoComplete.bind(textId, 
						function(searchResult) {
							var result = null;
							if(fieldName.indexOf('#') != -1)
							{
								var fieldName2 = fieldName.split('#')[1];
								searchResult.sort(orderByAscLength(fieldName2));
								
							}
							else
								searchResult.sort(orderByAscLength(fieldName));
							return searchResult;
					}, 
					function(json) {
						if(callback){
							$('#'+textId).css('color','#000');
							callback(json);
						}
					}, 
					klengh,fieldName);
				$(document).click(function(event){
					var eid = event.target.id;
					if((eid != textId) && (eid.indexOf("autoCompleteDiv") < 0)){
						autoComplete.clear();
					}
				});
				eval('window.'+textId+'Auto = autoComplete ');
				//obj = autoComplete;
			}
		 });
		//return autoComplete;
	},
	initAutoSearch:function(textId,srvCode,getParamFuc,field,selCallback){
		$("#"+textId).keyup(function(event){
			var event = event || window.event;
			if((event.keyCode==40||event.keyCode==38)&&$(".autoCompleteServerDiv").length>0){
				Rose.log("进入本地上下选择模式");
				return;
			}
			var keyword=$(this).val();
			if(keyword && (keyword.length >= 2)){
				lastDate = new Date();
				if(timename == null) {
					timename = setInterval(function(){
						var currDate = new Date();	
						var slotTime = currDate - lastDate;	
						if(slotTime >= 800)
						{		
							if(timename != null)
							{
								clearInterval(timename);//删除定时任务
								timename = null;
							}
							var keyword = $("#"+textId).val();
							if(keyword && (keyword.length >= 2)){
								Rose.log("启动搜索："+keyword);
								var param=getParamFuc();
								Comm.searchContent(srvCode,param,textId,field,function(data){
									if(selCallback){
										selCallback(data);
									}
								});
							}else{
								Rose.log("搜索被拦截，字符个数太少");
								$(".autoCompleteServerDiv").remove();
							}
						}else{
							Rose.log("搜索被拦截，不到时间点");
						}
					},300);
				}
			}else{
				Rose.log("搜索被拦截，字符个数太少");
			}
			
		});
	},
	initFsSearch:function(textId,srvCode,getParamFuc,selCallback){
		$("#"+textId).keyup(function(event){
			var event = event || window.event;
			if((event.keyCode==40||event.keyCode==38)&&$(".autoCompleteServerDiv").length>0){
				Rose.log("进入本地上下选择模式");
				return;
			}
			var keyword=$(this).val();
			if(keyword && (keyword.length >= 2)){
				lastDate = new Date();
				if(timename == null) {
					timename = setInterval(function(){
						var currDate = new Date();	
						var slotTime = currDate - lastDate;	
						if(slotTime >= 800)
						{		
							if(timename != null)
							{
								clearInterval(timename);//删除定时任务
								timename = null;
							}
							var keyword = $("#"+textId).val();
							if(keyword && (keyword.length >= 2)){
								Rose.log("启动搜索："+keyword);
								var param=getParamFuc();
								Comm.searchChannel(srvCode,param,textId,function(data){
									if(selCallback){
										selCallback(data);
									}
								});
							}else{
								Rose.log("搜索被拦截，字符个数太少");
								$(".autoCompleteServerDiv").remove();
							}
						}else{
							Rose.log("搜索被拦截，不到时间点");
						}
					},300);
				}
			}else{
				Rose.log("搜索被拦截，字符个数太少");
			}
			
		});
	},
	searchChannel:function(srvCode,param,textId,callback){
		/*$("#"+textId).keyup(function(event){
			var event = event || window.event;
			var keyword = this.value;
			if(keyword && (keyword.length >= 2)){*/
				//查询数据
				/*if(ret.substr(1,1)!="1"&&ret.substr(2,1)!="1"&&!/.*[\u4e00-\u9fa5]+.*$/.test(keyword)){
					//缓存加载模式中没有拼音
					$(".autoCompleteServerDiv").remove();
					return;
				}*/
		globle.searchDivCount=globle.searchDivCount+1;
		//var keyword=$("#"+textId).val();
				Rose.ajax.postJson(globle.getAction(srvCode), param, function(data, status) {
					if(data&&data.length==0){
						$(".autoCompleteServerDiv").remove();
						return;
					}
					Rose.log("data.length:"+data.length);
					//展示数据
					var searchObject = document.getElementById(textId);
					var divObj = document.createElement("div");
					divObj.id ="autoCompleteServerDiv"+globle.searchDivCount;
					divObj.setAttribute("name","autoCompleteServerDiv");
					//divObj.name="autoCompleteServerDiv";
					divObj.className = "searchBackgroundDiv autoCompleteServerDiv";
					var relLeft=searchObject.offsetLeft;
					var relTop=(searchObject.offsetTop + $(searchObject).innerHeight());
					if($(searchObject).hasClass("dialog-auto-input")){
						relLeft+=3;
						relTop+=45;
					}
					divObj.style.left=relLeft+"px";
					divObj.style.top = relTop + "px";
					divObj.style["z-index"] = 10000;//设置div层的堆叠顺序，一般大于0
					divObj.style.width = (searchObject.offsetWidth-2) + "px";
					divObj.style.display="none";
				    for(var i=0;i<data.length;i++){
				    	var rowDiv = document.createElement("div");
						rowDiv.id = "autoCompleteServerDiv"+globle.searchDivCount +"_"+ i;
						rowDiv.tabIndex = i;
						rowDiv.style.outline = "none";
						rowDiv.title = data[i].organizeName;
						rowDiv.innerHTML="【"+data[i].organizeId+"】"+data[i].organizeName;
						rowDiv.organizeId=data[i].organizeId;
						rowDiv.organizeName = data[i].organizeName;
						rowDiv.secOrgType=data[i].secOrgType;
						rowDiv.orgChannelType=data[i].orgChannelType;
						rowDiv.rowFocusStyle = "searchFocusDiv";
						rowDiv.rowBlurStyle = "searchBlurDiv";
						rowDiv.onfocus = function(){
							this.className = this.rowFocusStyle;
						};
						rowDiv.onblur = function(){
							this.className = this.rowBlurStyle;
						};
						rowDiv.onmouseover = function(){
						  this.focus();
						};
						rowDiv.onmouseout = function(){
						  this.blur();
						};
						rowDiv.onclick = function(){
							callback({organizeId:this.organizeId,organizeName:this.organizeName,orgChannelType:this.orgChannelType,secOrgType:this.secOrgType});
							$("#"+divObj.id).remove();
						};
						divObj.appendChild(rowDiv);
				    }
				    divObj.style.display="block";
					$(".autoCompleteServerDiv").remove();
					$("#"+textId).after($(divObj));
					
				});	
				
			/*}else{
				$(".autoCompleteServerDiv").remove();
			}
		});*/
		/*$("#"+textId).click(function(){
			$(this).keyup();
		});*/
		/*$(document).click(function(event){
			var eid = event.target.id;
			if((eid != textId) && (eid.indexOf("autoCompleteServerDiv") < 0)){
				$(".autoCompleteServerDiv").remove();
			}
		});*/
	},
	searchContent:function(srvCode,param,textId,field,callback){
		/*$("#"+textId).keyup(function(event){
			var event = event || window.event;
			var keyword = this.value;
			if(keyword && (keyword.length >= 2)){*/
				//查询数据
				/*if(ret.substr(1,1)!="1"&&ret.substr(2,1)!="1"&&!/.*[\u4e00-\u9fa5]+.*$/.test(keyword)){
					//缓存加载模式中没有拼音
					$(".autoCompleteServerDiv").remove();
					return;
				}*/
		globle.searchDivCount=globle.searchDivCount+1;
		//var keyword=$("#"+textId).val();
				Rose.ajax.postJson(globle.getAction(srvCode), param, function(data, status) {
					if(data&&data.length==0){
						$(".autoCompleteServerDiv").remove();
						return;
					}
					Rose.log("data.length:"+data.length);
					//展示数据
					var searchObject = document.getElementById(textId);
					var divObj = document.createElement("div");
					divObj.id ="autoCompleteServerDiv"+globle.searchDivCount;
					divObj.setAttribute("name","autoCompleteServerDiv");
					//divObj.name="autoCompleteServerDiv";
					divObj.className = "searchBackgroundDiv autoCompleteServerDiv";
					var relLeft=searchObject.offsetLeft;
					var relTop=(searchObject.offsetTop + $(searchObject).innerHeight());
					if($(searchObject).hasClass("dialog-auto-input")){
						relLeft+=3;
						relTop+=45;
					}
					divObj.style.left=relLeft+"px";
					divObj.style.top = relTop + "px";
					divObj.style["z-index"] = 10000;//设置div层的堆叠顺序，一般大于0
					divObj.style.width = (searchObject.offsetWidth-2) + "px";
					divObj.style.display="none";
				    for(var i=0;i<data.length;i++){
				    	var rowDiv = document.createElement("div");
						rowDiv.id = "autoCompleteServerDiv"+globle.searchDivCount +"_"+ i;
						rowDiv.tabIndex = i;
						rowDiv.style.outline = "none";
						rowDiv.title = data[i][field];
						rowDiv.innerHTML=data[i][field];
						
					
						rowDiv.rowFocusStyle = "searchFocusDiv";
						rowDiv.rowBlurStyle = "searchBlurDiv";
						rowDiv.onfocus = function(){
							this.className = this.rowFocusStyle;
						};
						rowDiv.onblur = function(){
							this.className = this.rowBlurStyle;
						};
						rowDiv.onmouseover = function(){
						  this.focus();
						};
						rowDiv.onmouseout = function(){
						  this.blur();
						};
						rowDiv.onclick = function(){
							callback({organizeId:this.organizeId,organizeName:this.organizeName,orgChannelType:this.orgChannelType,secOrgType:this.secOrgType});
							$("#"+divObj.id).remove();
						};
						divObj.appendChild(rowDiv);
				    }
				    divObj.style.display="block";
					$(".autoCompleteServerDiv").remove();
					$("#"+textId).after($(divObj));
					
				});	
				
			/*}else{
				$(".autoCompleteServerDiv").remove();
			}
		});*/
		/*$("#"+textId).click(function(){
			$(this).keyup();
		});*/
		/*$(document).click(function(event){
			var eid = event.target.id;
			if((eid != textId) && (eid.indexOf("autoCompleteServerDiv") < 0)){
				$(".autoCompleteServerDiv").remove();
			}
		});*/
	},
	/**
	 * 模糊搜索
	 */
	autoCompleteByRsp:function(srvCode,param1,fieldName,textId,callback,afterSearchFunc,keyWordLength,maxResultLengh){
		var klengh=globle.minSearchKeyCount;
		if(typeof(keyWordLength)!='undefined'&&keyWordLength!=null){
			klengh=keyWordLength;
		}
		var maxLengh=globle.maxSearchCount;
		if(maxResultLengh){
			maxLengh=maxResultLengh;
		}
		Rose.ajax.postJson(globle.getAction(srvCode), param1, function(data, status) {
			
			if(afterSearchFunc){
				afterSearchFunc(data);
			}
			data= data.beans;
		 	if(data && data!='error' && data.length>0){
		 		var newData = new Array();
		 		for(var p in data)
	 			{
		 			if(data[p][fieldName] != "")
		 			{
		 				newData.push(data[p]);
		 			}
	 			}
				var autoComplete = new AutoComplete(newData, fieldName,maxLengh);
				autoComplete.customizeStyle('searchBackgroundDiv', 'searchFocusDiv', 'searchBlurDiv', 
					function(obj) {
						if(fieldName.indexOf('#') != -1)
						{
							var fieldName1 = fieldName.split('#')[0];
							var fieldName2 = fieldName.split('#')[1];
							var innerText = '【'+obj[fieldName1]+'】'+ obj[fieldName2];
							return innerText;
						}
						else
						{
							var innerText = obj[fieldName];
							return innerText;
						}
					
					}
				);
				autoComplete.bind(textId, 
					function(searchResult) {
						var result = null;
						if(fieldName.indexOf('#') != -1)
						{
							var fieldName2 = fieldName.split('#')[1];
							searchResult.sort(orderByAscLength(fieldName2));
						}
						else
							searchResult.sort(orderByAscLength(fieldName));
						return searchResult;
					}, 
					function(json) {
						if(callback){
							$('#'+textId).css('color','#000');
							callback(json);
						}
					}, 
					klengh,fieldName);
				$(document).click(function(event){
					var eid = event.target.id;
					if((eid != textId) && (eid.indexOf("autoCompleteDiv") < 0)){
						autoComplete.clear();
					}
				});
				eval('window.'+textId+'Auto = autoComplete ');
			}
		 	
		 });
	},
	
	/**
	 * 根据参数名获取url中的对应参数值
	 * 支持多参数形式，参数名相同取第一个
	 * @param param 参数名
	 * @returns
	 */
	getParameter:function (param)
	{	//Rose.log(param);
		var query = window.location.search;
		var iLen = param.length;
		var iStart = query.indexOf(param);
		if (iStart == -1)
		return "";
		iStart += iLen + 1;
		var iEnd = query.indexOf("&", iStart);
		if (iEnd == -1)
		return query.substring(iStart);
		return query.substring(iStart, iEnd);
	},
	getPageCode:function(){
		 var pathName = window.document.location.pathname;
		 var start = pathName.indexOf("page/");
		 var end =pathName.length-1;
		 if(pathName.indexOf("?")>0){
			 end = pathName.indexOf("?");
		 }
		 var pageCode=pathName.substring(start+5,end+1);
		 return pageCode;
	},
	/**
	 * 获取表单的值转换为json对象
	 * @param devId
	 * @param codeType
	 */
	getFormValue:function (formId)
	{
		var values, index;  
		values = $("#"+formId).serializeArray();  
			
		var obj=
		{
		};
		 for (index = 0; index < values.length; ++index)  
	 	 {  
			 //if( $("#"+formId ''))
			 obj[values[index].name] = values[index].value;
	  	 }
		 return obj;
	}
	,
	/**
	 * 为表单赋值转 
	 * @param json对象
	 */
	setFormValue:function (formId,data)
	{
		for(var name in data)
		{
			$('#'+formId+' input[name='+name+']').val(data[name]);
		}
//		 for (index = 0; index < values.length; ++index)  
//	 	 {  
//			 //if( $("#"+formId ''))
//			 obj[values[index].name] = values[index].value;
//	  	 }
//		 return obj;
	}
	,
	/**
	 * 下拉框翻译封装
	 * @param devId
	 * @param codeType
	 */
	initSelectOpt : function(devId,codeType)
	{
		var json = this.qryStaticData(codeType);
		$(json).each(function(index,obj)
		{
			$("#"+devId).append( $("<option value='"+obj.codeValue+"' class='"+obj.externCodeType+"'>"+obj.codeName+"</option>"));

		});
		
	},
	roleCheck:function (){
		//window.parent.globle.hasOperatePermission=false;
		
		if(window.globle.hasOperatePermission)
		{
			$(".btn-check").css("display","inline-block");
		}
		
		else
		{
			$(".btn-form input").attr("disabled","disabled");  
		    $(".btn-form select").attr("disabled","disabled");
		    $(".btn-form1 input").attr("disabled","disabled");  
		    $(".btn-form1 select").attr("disabled","disabled");
		    $(".btn-check").css("display","none");
		}
		
		if(window.globle.hasOperatePermission2)
		{
			$(".btn-check2").css("display","inline-block");
		}
		
	},
	childRoleCheck:function (){
		//window.parent.globle.hasOperatePermission=false;
		if(window.parent.globle.hasOperatePermission)
		{
			$(".btn-check").css("display","inline-block");
		}
		
		else
		{
			$(".btn-form input").attr("disabled","disabled");  
		    $(".btn-form select").attr("disabled","disabled");
		    $(".btn-form1 input").attr("disabled","disabled");  
		    $(".btn-form1 select").attr("disabled","disabled");
		    $(".btn-check").css("display","none");
		}
		
		if(window.parent.globle.hasOperatePermission2)
		{
			$(".btn-check2").css("display","inline-block");
		}
		
	},
	getExplorer:function() {
		var explorer = window.navigator.userAgent ;
		//ie
		if (explorer.indexOf("MSIE") >= 0) {
			var b_version=navigator.appVersion  ;
			var version=b_version.split(";");   
			var trim_Version=version[1].replace(/[ ]/g,"");  
			if(trim_Version=="MSIE6.0"){
				return "ie6";
			}else if(trim_Version=="MSIE7.0"){
				return "ie7";
			}
			return "ie8+";
		}
		//firefox 
		else if (explorer.indexOf("Firefox") >= 0) {
			return "firefox";
		}
		//Chrome
		else if(explorer.indexOf("Chrome") >= 0){
			return "chrome"
		}
		//Opera
		else if(explorer.indexOf("Opera") >= 0){
			return "Opera";
		}
		//Safari
		else if(explorer.indexOf("Safari") >= 0){
			return "Safari";
		}
		return "未知浏览器";
	},
	
	/**
	 * 获取用户组织相关信息
	 */
	getUserOrgInfo:function(){
		var userdata=[];
		var param=[];
		Rose.ajax.postJsonSync("service?action=getUserOrgInfo&isconvert=true",param,function(json,status){
				if(status){
					userdata=json;
				}
		});
		return userdata;
	},
	
	/**
	 * 上传
	 */
	up:function(fileid,callback){
		var file = $("#"+fileid).val();
		var pos=file.lastIndexOf("\\");
		var fileName= file.substring(pos+1);  
		Rose.ajax.postJson("service?action=preUp&isconvert=true",{parameter0:fileName},function(json,status){
			if(status){
				var fileId=json.FILE_ID;
				var token=json.TOKEN;
				fileName=json.FILE_NAME;
				var url=globle.uploadPref+"&fileId="+fileId+"&token="+token+"&fileName="+fileName;
				Rose.ajax.up(url,fileid,callback);
			}
		}); 
	},
	/**
	 * 上传
	 */
	postFile:function(file,fileId,token,fileName,callback){
		var url=globle.uploadPref+"&fileId="+fileId+"&token="+token+"&fileName="+fileName;
		Rose.ajax.up(url,file,callback);
	},
	/**
	 * 下载
	 */
	download:function(downClass,callback){
		var file = $("#"+fileid).val();
		var pos=file.lastIndexOf("\\");
		var fileName= file.substring(pos+1);  
		Rose.ajax.postJson("service?action=preUp&isconvert=true",{parameter0:fileName},function(json,status){
			if(status){
				var fileId=json.FILE_ID;
				var token=json.TOKEN;
				fileName=json.FILE_NAME;
				var url=globle.uploadPref+"&fileId="+fileId+"&token="+token+"&fileName="+fileName;
				Rose.ajax.up(url,fileid,callback);
			}
		}); 
	},
	closeWindow:function()
	{
		var userAgent = navigator.userAgent;
		if (userAgent.indexOf("Firefox") != -1 || userAgent.indexOf("Presto") != -1) {
		    window.location.replace("about:blank");
		} else {
		    window.opener = null;
		    window.open("", "_self");
		    window.close();
		}
	},
	getPageUrl:function(pagecode,func_id,page){
		var url=globle.getContext();
		if(page){
			url+=page;
		}else{
			url+="page/"+pagecode;
		}
		url+="?func_id="+func_id;
		 var ssoFlag=Comm.getParameter("sso");
		if(ssoFlag&&ssoFlag!=null){
			url+="&sso="+ssoFlag;
		}
		return url;
	},
	redirectChannelPage:function(data){
				if(!data||(data.state&&data.state!=1))	{
					Rose.log("该渠道状态异常，不提供维护页面");
					return;
				}
				if(data.orgChannelType=="80002"){
					 //授权店跳转到渠道综合视图
					 var func_id="";//Comm.getFuncIdByPage("channelSlightInfo");
					 window.location=Comm.getPageUrl("channelSlightInfo",func_id)+"&channel_id="+data.organizeId;
					 
				}else if (data.secOrgType=="800012"){
					var func_id="";
					window.location=Comm.getPageUrl("CoopChannelInfo",func_id)+"&channel_id="+data.organizeId;
				}else if(data.orgChannelType=="80005"){
					 //社会代理人
					 var func_id=""//Comm.getFuncIdByPage("ProcuratorInfo");
					window.location=Comm.getPageUrl("ProcuratorInfo",func_id)+"&channel_id="+data.organizeId;
				 }else if(data.orgChannelType=="80058"||data.orgChannelType=="80059"||data.orgChannelType=="80060"){
					 //竞争对手
					 var func_id=""//Comm.getFuncIdByPage("OpponentInfo");
					 window.location=Comm.getPageUrl("OpponentInfo",func_id)+"&channel_id="+data.organizeId;
				 }else if(data.orgChannelType=="80003"){
					 //加盟店
					 var func_id=""//Comm.getFuncIdByPage("FranchiseInfo");
					if(data.secOrgType=="69628"){
						 window.location=Comm.getPageUrl("DirectSaleStoreInfo",func_id)+"&channel_id="+data.organizeId;
					}else{
						 window.location=Comm.getPageUrl("FranchiseInfo",func_id)+"&channel_id="+data.organizeId;
					}
				 }/*else if(data.orgChannelType=="80001"||data.orgChannelType=="80012"){
					 //直营店
					 var func_id=""//Comm.getFuncIdByPage("DirectSaleStoreInfo");
					 window.location=Comm.getPageUrl("DirectSaleStoreInfo",func_id)+"&channel_id="+data.organizeId;
				 }*/else{
					 Rose.log("该渠道类型"+data.orgChannelType+"不提供维护页面，渠道编号："+data.organizeId+"，渠道名称："+data.organizeName);
				 }
				
	},
	//阻止事件冒泡
	stopEventBubble :function (event){
        var e=event || window.event;

        if (e && e.stopPropagation){
            e.stopPropagation();    
        }
        else{
            e.cancelBubble=true;
        }
    },
    exp:function(srvcode,fieldJson,qryParam,fileName,sheetName){
    	//fieldJson:  {id:'编号',name:'名称'}
    	if(sheetName==""||sheetName==null||typeof(sheetName)=='undefined'){
			sheetName=fileName;
		}
    	fieldJson.sheetName=sheetName;
    	var a=[];
		a.push(fieldJson);
		//全部导出
		qryParam.start=-1;
		qryParam.end=-1;
		var b=[];
		b.push(qryParam);
		var json={}; 
		json["ExportHeaders"]=encodeURIComponent($.stringifyJSON(a));
		json["params"]=encodeURIComponent($.stringifyJSON(b));
		this.block(null,"正在努力导出数据,请稍后...");
		this.downExcel(srvcode,fileName,'',json,function(){
			Comm.unblock(null);
		});
    },
    //加进度条
    exp1:function(srvcode,fieldJson,qryParam,fileName,sheetName,count){
    	var progressBarId=document.getElementById("jinDuTiao");
		if(!progressBarId){
			Rose.log("手动创建div");
			$("<div id='jinDuTiao'></div>").appendTo($("body"));
		}
    	//导入进度条模板
     	Rose.ajax.getHtmlSync(globle.getTpl("ProgressBar"), function(html, statuz) {
           if(statuz){
              // 将模板写在页面当中
              $('#jinDuTiao').html(html);
           }
     	});

     	initProcessBar(count);
    	if(sheetName==""||sheetName==null||typeof(sheetName)=='undefined'){
			sheetName=fileName;
		}
    	fieldJson.sheetName=sheetName;
    	var a=[];
		a.push(fieldJson);
		//全部导出
		qryParam.start=-1;
		qryParam.end=-1;
		var b=[];
		b.push(qryParam);
		var json={}; 
		json["ExportHeaders"]=encodeURIComponent($.stringifyJSON(a));
		json["params"]=encodeURIComponent($.stringifyJSON(b));
		this.downExcel(srvcode,fileName,'',json,function(){
        	$("#num")[0].innerHTML =100+"%";
        	window.clearInterval(clearCase);
        	setTimeout('$("#fl").hide()', 1000 ) ;
		});
    },
    
    /**
     * ==============================工作流相关begin=============================
     */
    //开始流程
    beginWork:function(flowType,channelType,applyData,channelId,isTempOrder,callback){
    	Rose.ajax.postJsonSync(globle.getAction("beginWork"),[{parameter0:flowType,parameter1:channelType,parameter2:applyData,parameter3:isTempOrder,parameter4:channelId}],function(json,status){
    		if(callback){
				callback(json);
			}
		}); 
    },
    //继续流程
    continueWork:function(transOrderId,applyData,isPass,notes,callback){
    	Rose.ajax.postJsonSync(globle.getAction("continueWork"),{parameter0:transOrderId,parameter1:applyData,parameter2:isPass,parameter3:notes},function(json,status){
    		if(callback){
				callback(json);
			}
		}); 
    },
    //终止流程
    cancelWork:function(transOrderId,notes,callback){
    	Rose.ajax.postJson(globle.getAction("cancelWork"),[{parameter0:transOrderId,parameter1:notes}],function(json,status){
    		if(callback){
				callback(json);
			}
		}); 
    },
    //生成所有子元素的json数据
    genChildElementData:function(div,data){
		var childObjs=div.childNodes;
		for(var i=0;i<childObjs.length;i++){
			switch(childObjs[i].tagName){
				case "DIV":
					Comm.genChildElementData(childObjs[i],data);
					break;
				case "INPUT":
					var tmpObj={type:childObjs[i].type};
					switch(childObjs[i].type){
						case "text":
							tmpObj.value=childObjs[i].value;
							data[childObjs[i].id]=tmpObj;
							break;
						case "checkbox":
							//var checkBoxObjs = document.getElementsByName(childObjs[i].getAttribute("name"));
							/*for(var j=0;j<checkBoxObjs.length;j++){
			                    if(checkBoxObjs[j].checked){
			                    	var ckObj={type:childObjs[i].type,value:checkBoxObjs[j].value};
			                    	data[childObjs[i].id]=ckObj;
			                    }
			                }*/
							var checkBoxObjs = document.getElementById(childObjs[i].id);
							 if(checkBoxObjs.checked){
				                    tmpObj.value=checkBoxObjs.value;
									data[childObjs[i].id]=tmpObj;
				                 }
							break;
						case "radio":
							//var radioObjs = document.getElementsByName(childObjs[i].getAttribute("name"));
							var radioObjs = document.getElementById(childObjs[i].id);
							 if(radioObjs.checked){
			                    tmpObj.value=radioObjs.value;
								data[childObjs[i].id]=tmpObj;
			                 }
							break;
						
					}
					break;
				case "SELECT":
					var tmpObj={type:childObjs[i].tagName};
					var selectObj = document.getElementById(childObjs[i].id); 
					if(childObjs[i].selectedIndex == -1)
					{
						tmpObj.viewValue='';
						tmpObj.value='';
					}
					else
					{
						tmpObj.viewValue = childObjs[i][childObjs[i].selectedIndex].text;
						tmpObj.value=selectObj.options[selectObj.selectedIndex].value;
					}
					
					data[childObjs[i].id]=tmpObj;
					break;
				case "TEXTAREA":
					var tmpObj={type:childObjs[i].tagName};
					tmpObj.value=childObjs[i].value;
					data[childObjs[i].id]=tmpObj;
					break;
				case "TABLE":
					var tmpObj={type:childObjs[i].tagName};
					$($(childObjs[i]).find('tr')).each(function(index,obj)
							{
								if(index == 0)
									return true;
								tempObjTdValue = {};
								$($(obj).find('td')).each(function(index,td)
								{
									if($(td).find('a').length > 0)
									{
										return true;
									}
									tempObjTdValue['td-'+index]=$(td).text();
								});
								tmpObj['tr-'+index]=tempObjTdValue;
							//	data[divId][tableId]['tr-'+index]=tempObj;
							});
					data[childObjs[i].id] = tmpObj;
			}
		}
	},
	//生成申请数据
	genApplyData:function(divId){
		var applyDiv="form[fieldset='data']";
		if(divId){
			applyDiv="#"+divId;
		}
		var data={};
		$(applyDiv).each(function(){
			data[this.id]={};
			Comm.genChildElementData(this,data[this.id]);
		});

		return JSON.stringify(data);
	},
	//初始化流程数据
	initWorkData:function(transOrderId,callback,isEdit){
		Rose.ajax.postJson(globle.getAction("initWorkData"),{parameter0:transOrderId},function(json,status){
			var data=json.returnObj;
		//	if(isEdit)
			Comm.initChildElementData(data);
	
			if(callback){
				callback(data);
			}
		}); 
	},
	//初始化所有子元素的值
	initChildElementData:function(fieldSetDatas){
		for(var fieldSetId in fieldSetDatas){
			var fieldSetData=fieldSetDatas[fieldSetId];
			for(var fieldId in fieldSetData){
				var fieldData=fieldSetData[fieldId];
				switch(fieldData.type){
					case "text":
						$("#"+fieldSetId+" #"+fieldId).val(fieldData.value);
						break;
					case "SELECT":
						$("#"+fieldSetId+" #"+fieldId).val(fieldData.value);
						//$("#"+fieldSetId+" #"+fieldId).change();
						var hasValue = false
						$("#"+fieldSetId+" #"+fieldId + " option").each(function(index,obj)
						{
							var opval = $(obj).val();
							if(fieldData.value == opval)
							{
								hasValue = true;
								return false
							}
						});
						if(!hasValue)
						{
							$("#"+fieldSetId+" #"+fieldId).append('<option value="'+fieldData.value+'">'+fieldData.viewValue+'</option>');
							$("#"+fieldSetId+" #"+fieldId).val(fieldData.value);
							$("#"+fieldSetId+" #"+fieldId).attr('nochange','true');
						}
						if(fieldId == 'areaCode_select')
							$("#"+fieldSetId+" #"+fieldId).attr('nochange','true');
						break;
					case "radio":
					case "checkbox":
						$("#"+fieldSetId+" #"+fieldId).attr("checked",true);
						break;
					case "TEXTAREA":
						$("#"+fieldSetId+" #"+fieldId).text(fieldData.value);
						break;
				}
			}		
		}
	},
	
	elementChanged : function(formId)
	{
	  var arrObj = new Array();
	  var elements =$.merge( $.merge($('#'+formId+ ' input'),
			  					$('#'+formId+ ' select')
			  					),$.merge($('#'+formId+ ' textarea'),
			  							$('#'+formId+ ' radio')));
	  var count = elements.length;
	  for(var i=0;i<count;i++)
	  {
	   if(elements[i] == undefined)
	    continue;
	   var obj = document.createElement('span');
	   if($(elements[i]).css('display') == 'none')
		   $(obj).addClass('hide word_warpbreak');
	   else
		   $(obj).addClass('inline word_warpbreak');
	   switch(elements[i].tagName)
	   {
	    case "INPUT" : 
	      if(elements[i].type=='text')
	      {
	    	  //obj.style.width=$(elements[i]).width();
	    	  $(obj).width($(elements[i]).width());
	    	  if($(elements[i]).attr('targetWidth'))
	    		  $(obj).width($(elements[i]).attr('targetWidth'));
		      obj.setAttribute("innerHTML",elements[i].value);
		      $(obj).addClass('overhide');
		      $(obj).text(elements[i].value);
	      }
	      else if(elements[i].type=='radio' ||
	    		  elements[i].type=='checkbox')
		  {
	    	  if(elements[i].checked)
	    	  {
	    		  $(obj).addClass('overhide');
	    		  $(obj).width($(elements[i]).next().width());
			      obj.setAttribute("innerHTML",elements[i].value);
			      $(obj).text($(elements[i]).next().text());
			      //elements[i].innerHTML = '';
	    	  }
	    	  
	    	  $( elements[i]).next().remove();
	    	  
		  }
	      break;
	    case "TEXTAREA" :
	    	if($(elements[i]).text().length > 15)
    		{
	    		$(obj).addClass('area-word-break');
    		}
	    
	      $(obj).width($(elements[i]).width());
	      obj.setAttribute("innerHTML",elements[i].value);
	      $(obj).text(elements[i].value);
	      //elements[i].innerHTML = '';
	      break;
	    case "SELECT" :
	      for(var j=0;j<elements[i].length;j++)
	      {
	       if(elements[i][j].selected)
	       {
	    	   $(obj).addClass('overhide');
	    	   obj.id = elements[i].id+'-span';
	    	   $(obj).width($(elements[i]).width());
	    	 //  obj.className="word_warpbreak";
	    	   var text = elements[i][j].text;
	    	   if(text.indexOf('请选择') != -1 || text.indexOf('全部') != -1)
    		   {
	    		   text="";
    		   }
	    	   obj.setAttribute("innerHTML",text);
	    	   $(obj).text(text);
	    	   break;
	       }
	      }
	      //$(elements[i]).html('');
	      elements[i].options.length = 0;
	      break;      
	   }
	   $(obj).attr('title',$(obj).attr('innerHTML'));
	   elements[i].parentNode.appendChild(obj);
	   arrObj[arrObj.length] = elements[i];
	  }
	  $('#'+formId+ ' .control-hide').hide();
	  //删除表单原控件
	  for(var i=0;i<arrObj.length;i++)
	  {
		  $(arrObj[i]).html('');
		  $(arrObj[i]).remove();
	  }
	  $('img[align=absmiddle]').hide();
	 },
	 /**
     * ==============================工作流相关end=============================
     */
	
	/***
	 * 根据工单导出错误数据
	 * orderId:工单ID
	 * impType:解析类名
	 * fileName:导出文件名
	 * sheetName:导出excel工作空间名
	 */
	expFailDate:function(orderId,impType,fileName,sheetName){
		if(!orderId){
			alert("未定义工单ID");
			return false;
		}
		if(!impType){
			alert("未定义解析类型");
			return false;
		}
		
		Comm.block("#IMP_ORDER_TABLE_ID","文件导出中，请耐心等待!");
		var beans= null;
		Rose.ajax.postJsonSync("service?action=qryChnlImpOrderCfgByCondition&isconvert=true",{bean:{impType:impType}},function(json,status){
			if(status){
				beans = json.beans;
				if(typeof(beans) == "undefined" || beans == null || beans.length == 0){
					art.dialog.tips(impType+"无配置信息！");return;
				}
			}
		});
		var bean = beans[0];
		var field = {};
		var cols = bean.colCfg.split(",");
		var colsNames = bean.colName.split(",");
		for(var i=1;i<cols.length;i++){
			/*$.extend(field,{
				:colsNames[i-1]
			});*/
			field['col'+i] = colsNames[i-1];
		}
		/*$.extend(field,{
			'remark':'错误原因'
		});*/
		field['remark'] = '错误原因';
		Comm.exp("expChnlImpFailDetail",field,{
			bean:{orderId : orderId}
		},fileName,sheetName);
		Comm.unblock("#IMP_ORDER_TABLE_ID");
	},
	/***
	 * 导出指标信息
	 */
	expKpiInfo:function(data){		
		//Comm.block(el,"文件导出中，请耐心等待!");
		if(typeof(data) != "object"){
			data = {};
		}
		var field = {
	        "kpiId": "指标编号",
	        "kpiName" : "指标名称",
			"description" : "口径"
	     };
		Comm.exp1("expKpiInfo",field,{
			bean:data
		},"指标信息","指标信息");
		//Comm.unblock(el);
	},
	include: function(file,callback) 
	{ 
		 
		this.jsLoader(file,callback ) ;

	},
	jsLoader : function(scripts,callback,parent,type){
	    type = type || "parallel";//默认为并行模式
	    if(type=="seriel"){
	        this.JSLoader.call.seriel(scripts,callback,parent);
	    }else{
	        this.JSLoader.call.paralle(scripts,callback,parent);
	    }
	},
	JSLoader : {
		    browser : {
		        ie : /msie/.test(window.navigator.userAgent.toLowerCase()),
		        moz : /gecko/.test(window.navigator.userAgent.toLowerCase()),
		        opera : /opera/.test(window.navigator.userAgent.toLowerCase()),
		        safari : /safari/.test(window.navigator.userAgent.toLowerCase())
		    },
		    call : (function() {
		        var _file_array = new Array();//保存已添加的文件
		        /**
		         * 判断文件是否存在
		         * @param tag 元素名称
		         * @param url 文件url
		         * @return 如果存在，返回true；否则，返回false
		         */
		        function hasFile(tag, url) {
		            var contains = false;
		            var files = document.getElementsByTagName(tag);
		            var type = tag == "script" ? "src" : "href";
		            for ( var i = 0, len = files.length; i < len; i++) {
		                if (files[i].getAttribute(type) == url) {
		                    contains = true;
		                    break;
		                }
		            }
		            for(var i=0,len=_file_array.length;i<len;i++){
		                if(url==_file_array[i]){
		                    contains = true;
		                    break;
		                }
		            }
		            return contains;
		        }
		        /**
		         * 串行加载所有js文件
		         * 如果所加载的js文件不存在页面中，则js文件一个接一个加载完成只至最后一个js文件加载完成后，执行回调函数
		         * 如果所加载的js文件已经加载过，则直接执行回调函数。
		         * @param scripts:['jsFile']
		         * @param callback:回调函数[可选]
		         * @paren parent:js文件加载的位置，默认为head
		         */
		        function serielLoadScripts(scripts, callback,parent) {
		            removeExist(scripts);
		            if(scripts.length==0){
		                if(callback) callback();
		                return;
		            }
		            parent = parent || 'head';
		            var head = document.getElementsByTagName(parent)[0]
		                    || document.documentElement;
		            var s = new Array();
		            var last = scripts.length - 1;
		            var recursiveLoad = function(i) { // 递归
		                if(!hasFile("script", scripts[i])){
		                    s[i] = document.createElement("script");
		                    s[i].setAttribute("type", "text/javascript");
		                    s[i].onload = s[i].onreadystatechange = function() {
		                        if (!Comm.JSLoader.browser.ie || this.readyState == "loaded"
		                                || this.readyState == "complete") {
		                            this.onload = this.onreadystatechange = null;
		                            this.parentNode.removeChild(this);
		                            if (i != last)
		                                recursiveLoad(i + 1);
		                            else if (typeof (callback) == "function")
		                                callback();
		                        }
		                    };
		                    s[i].setAttribute("src", scripts[i]);
		                    head.appendChild(s[i]);
		                }else{
		                    if(callback){
		                        callback();
		                    }
		                }
		            };
		            recursiveLoad(0);
		        }
		        /**
		         * 同步加载JS文件
		         * 如果所加载的js文件不存在页面中，则将在所有js文件加载完成以后才执行回调函数。
		         * 如果所加载的js文件已经加载过，则直接执行回调函数。
		         * @param scripts:['jsFile']
		         * @param callback:回调函数[可选]
		         */
		        function parallelLoadScripts(scripts, callback,parent) {
		            removeExist(scripts);
		            if(scripts.length==0){
		                if(callback) callback();
		                return;
		            }
		            parent = parent || 'head';
		            var head = document.getElementsByTagName(parent)[0]|| document.documentElement;
		            var s = new Array();
		            var loaded = 0;
		            for ( var i = 0; i < scripts.length; i++) {
		                if(!hasFile("script", scripts[i])){
		                    s[i] = document.createElement("script");
		                    s[i].setAttribute("type", "text/javascript");
		                    s[i].setAttribute("src", scripts[i]);
		                    s[i].onload = s[i].onreadystatechange = function() {
		                        if (!Comm.JSLoader.browser.ie || this.readyState == "loaded"
		                                || this.readyState == "complete") {
		                            loaded++;
		                            this.onload = this.onreadystatechange = null;
		                            this.parentNode.removeChild(this);
		                            if (loaded == scripts.length&& typeof (callback) == "function"){
		                                callback();
		                            }
		                        }
		                    };
		                    head.appendChild(s[i]);
		                    _file_array.push(scripts[i]);
		                }
		            }
		        }
		         
		        function cssLoad(csses,callback){
		            removeExist(csses);
		            if(csses.length==0&&callback){
		                callback();
		                return;
		            }
		            var head = document.getElementsByTagName('head')[0]|| document.documentElement;
		            var s = new Array();
		            var loaded = 0;
		            for ( var i = 0; i < csses.length; i++) {
		                if (!hasFile("css", csses[i])) {
		                    s[i] = document.createElement("link");
		                    s[i].setAttribute("type", "text/css");
		                    s[i].setAttribute('rel', 'stylesheet');
		                    s[i].setAttribute('href', csses[i]);
		                    s[i].onload = s[i].onreadystatechange = function() {
		                        if (!this.JSLoader.browser.ie || this.readyState == "loaded"
		                                || this.readyState == "complete") {
		                            loaded++;
		                            this.onload = this.onreadystatechange = null;
		                            if (loaded == scripts.length
		                                    && typeof (callback) == "function") {
		                                callback();
		                            }
		                        }
		                    };
		                    head.appendChild(s[i]);
		                    _file_array.push(csses[i]);
		                }
		            }
		        }
		         
		        function removeExist(arr){
		            for(var i=0,len=arr.length;i<len;i++){
		                for(var k=0,len_k=_file_array.length;k<len_k;k++){
		                    if(arr[i]==_file_array[k]){
		                        arr.splice(i,1);
		                    }
		                }
		            }
		        }
		         
		        return {
		            seriel : serielLoadScripts,
		            paralle : parallelLoadScripts,
		            css:cssLoad
		        };
		    })()
		},
/**
 * 获取日期 count:-2=前天 -1=昨天 0=今天  1=明天 2=后天
 */
	getDateStr:function(count) {
	    var dd = new Date();
	    dd.setDate(dd.getDate()+count);//获取AddDayCount天后的日期
	    var y = dd.getFullYear();
	    var m = dd.getMonth()+1;//获取当前月份的日期
	    var d = dd.getDate();
	    if(m<10){
	    	m="0"+m;
	    }
	    if(d<10){
	    	d="0"+d;
	    }
	    return y+"-"+m+"-"+d;
	}
}

//验证是否符合号码规范  
function checkPhone(strPhone) { 
var phoneReg = /^1[3|4|5|7|8][0-9]\d{8}$/; 
var phone = /^0\d{2,3}-?\d{7,8}$/;
  if( phoneReg.test(strPhone) ){ 
	  return true; 
  }
  else
 {
	if(phone.test(strPhone))
	{
		return true; 
	}
 }
  return false; 

} 