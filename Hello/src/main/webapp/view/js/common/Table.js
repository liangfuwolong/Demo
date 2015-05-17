
/************数据示例
 * 
/**dataAction 查询code,如qryChannelBusiAreaByCondition
 */

/**countAction 查询数量的codeqryChannelBusiAreaCount
 */
 
/**
 * param查询参数
 */

/**
 * showField= [
		             	{id:'businessCircleId',name:'商圈编号'},
		             	{id:'businessCircleName',name:'商圈名称'},
		             	{id:'businessCircleType',name:'商圈类型',type:'enum'},
		             	{id:'businessMainStreet',name:'街道'},
		             	{id:'createDate',name:'创建时间',type:'date',order:'true',col:'create_Date'},
		             	{id:'state',name:'状态',type:'enum',hide:'true'}
		             ]
 */



/************常用api
/**
 * pagesize()一页显示的数据行
 * ispage(true)是否显示分页控件
 *  bind('click',function(){})  注册单击事件，在show方法之前使用，注册双击事件为doubleclick
 * query(id) 数据查询
 */


function TableQuery(id,dataAction,countAction,showField,enumData,extObj){
	var pageTplPath = globle.getTpl("commpage");
	var sheetpage=5;//每个sheet页默认显示5个page
	var pagesize=10;//买个page默认显示10条数据
	var curpage=1;//默认显示第一个page的数据
	var totalCount=0;
	var ispage=true;
	
	var table;
	var tableJson={};
	this.dataAction = dataAction;
	this.countAction = countAction;
    tableJson.id=id;
    tableJson.param={};
    tableJson.editRows=[];
    tableJson.pks=[];
    tableJson.isQryCountFinished=false;
	this.showField = showField;
	var enumObj = enumData;
	var extData=extObj;
	
	this.setEnumData = function(data){
		enumObj = data;
	}
	
	this.saveEnumtData = function(data){
		enumObj = $.extend(enumObj,data);
	}
	
	
	this.initExtData=function(){
		if(extData && extData.pagesize){
			pagesize = extData.pagesize;
		}
		

		if(extData && typeof(extData.pageext)!='undefined'){
			tableJson.pageext = extData.pageext;
		}else{
			tableJson.pageext=1;
		}
		
		if(extData && typeof(extData.isSync)!='undefined'&&extData.isSync==true){
			tableJson.isSync = true;
		}else{
			tableJson.isSync=false;
		}
		
		/*if(extData && extData.order&& (extData.order==true||extData.order.toUpperCase()=="TRUE")){
			tableJson.allowOrder = extData.order;
		}*/
		
		if(extData && extData.editcontrol){
			tableJson.editcontrol=extData.editcontrol;
		}
		
		if(extData && extData.editsubmit){
			tableJson.editsubmit=extData.editsubmit;
		}
	}
	
	this.setExtData=function(data){
		extData = $.extend(extData,data);
		this.initExtData();
	}
	
	this.initExtData();
	
	
	if(dataAction==null||typeof(dataAction)=='undefined'||dataAction==""){
		debug("查询方法未定义");
		return false;
	}else{
		this.dataAction=globle.getAction(dataAction);
	}
	if(countAction==null||typeof(countAction)=='undefined'||countAction==""){
		this.countAction="";
	}else{
		this.countAction=globle.getAction(countAction);
	}
	
	if(countAction==""){
		ispage=false;
	}

	
	this.pagesize=function(data){
		pagesize=data;
	}
	
	this.sheetpage=function(data){
		sheetpage=data;
	}
	
	this.ispage=function(data){
		ispage=data;
	}
	
	this.id=function(data){
		id=data;
	}
	this.setShowField=function(showFields)
	{
		this.showField=showFields;
	}
	this.setDataAction=function(dataAction)
	{
		this.dataAction=globle.getAction(dataAction);
	}
	this.setCountAction=function(countAction)
	{
		this.countAction=globle.getAction(countAction);
	}
	this.query=function(param,flag,getBeans){
		tableJson.editRows=[];
		Comm.block("#"+tableJson.id,"正在努力加载,请稍后...");
		if(id==null||id==""||typeof(id)=='undefined'){
			debug("未定义查询结果显示区域");
			return ;
		}
		
		if(param==null||typeof(param)=='undefined'||param==""){
			tableJson.param={};
		}else{
			tableJson.param=param;
		}
		
		var isPageQuery=false;
		if(typeof(flag) =='undefined' || !flag){
			curpage = 1;
		}else{
			isPageQuery=true;
		}
		
		if(ispage){
			tableJson.param.start=(curpage-1)*pagesize+1;
			tableJson.param.end=tableJson.param.start+pagesize-1;
		}else{
			tableJson.param.start=-1;
			tableJson.param.end=-1;
		}
		//debug(JSON.stringify(param));
		
		tableJson.nodata=false;
		if(typeof(tableJson.beforequery)!='undefined'&&typeof(eval(tableJson.beforequery)) == "function"){
			tableJson.beforequery(tableJson);
		}
		
		tableJson.qryDataFinished=true;
		tableJson.qryCountFinished=true;
		//查询数量
		if(ispage){
			if(!isPageQuery){
				tableJson.qryCountFinished=false;
				if(tableJson.isSync){
					Rose.log("2222");
					Rose.ajax.postJsonSync(this.countAction,tableJson.param,function(json,status){
						tableJson.qryCountFinished=true;
						for (var item in json){
							totalCount=json[item];
							tableJson.totalCount=totalCount;
						}
						if(tableJson.totalCount==0){
							tableJson.nodata=true;
						}
						initPage();
						showPage(2);
					});
				}else{
					Rose.ajax.postJson(this.countAction,tableJson.param,function(json,status){
						tableJson.qryCountFinished=true;
						for (var item in json){
							totalCount=json[item];
							tableJson.totalCount=totalCount;
						}
						if(tableJson.totalCount==0){
							tableJson.nodata=true;
						}
						initPage();
						showPage(2);
					});
				}
			}else{
				initPage();
			}
		}

		//查询数据
		tableJson.qryDataFinished=false;
		Rose.ajax.postJson(this.dataAction,tableJson.param,function(json,status){
			Comm.unblock("#"+tableJson.id);
			tableJson.qryDataFinished=true;
			if(status){
				tableJson.beans=json.beans;
				if(getBeans)
					tableJson.beans=json[getBeans];
				table=new Table(tableJson,showField,enumObj,extData);
				table.show();
				showPage(1);
			}
		});
	
		
	};
	
	
	this.initPage=function(){
		if(ispage){
			//显示分页组件
			if($('#'+tableJson.id+' .pagediv').length>0){
				$('#'+tableJson.id+' .pagediv').html("");
			}else{
				$('#'+tableJson.id).append("<div class='pagediv fn-hide' align='center'></div>");
			}
			var pagejson={};
			pagejson.tableid=tableJson.id;
        	pagejson.curpage=curpage;
        	pagejson.sheetpage=sheetpage;
        	pagejson.prepage="prepage";
        	pagejson.gopage="gopage";
        	pagejson.nextpage="nextpage";
        	pagejson.directpage="directpage";
        	pagejson.pagekeyup="pagekeyup";
        	pagejson.totalpage=Math.floor((totalCount-1)/pagesize)+1;
        	pagejson.totalCount=totalCount;
        	pagejson.ext=tableJson.pageext;
        	Rose.ajax.getHtml(pageTplPath, function(html, status) {
                if(status){
                	var page = Handlebars.compile(html);
                	$('#'+tableJson.id+' .pagediv').html(page(pagejson));
                }
        	});
		}
	};
	
	var initPage =this.initPage;
	
	this.beforepage=function(){
		if(tableJson.beforepage){
			tableJson.beforepage(curpage);
		}
	};
	
	this.showPage=function(a){
		if(tableJson.qryDataFinished&&tableJson.qryCountFinished){
			$('#'+tableJson.id+' .pagediv').show();
		}
		
	};
	
	var showPage=this.showPage;
	
	this.afterpage=function(){
		if(tableJson.afterpage){
			tableJson.afterpage(curpage);
		}
	};
	
	this.setCurPage=function(i){
		this.beforepage();
		curpage=i;
		$('#'+tableJson.id+" .ui-paging-current").removeClass("ui-paging-current");
		$.each($('#'+tableJson.id+" .ui-paging-item"),function(i,v){
			if($(v).text()==curpage){
				$(this).addClass("ui-paging-current");
			}
		});
		this.query(tableJson.param,true);
		this.afterpage();
	};
	
	this.prepage=function(){
		if(curpage==1){
			return;
		}
		this.setCurPage(Number(curpage)-1);
	};
	
	this.nextpage=function(){
		if(curpage==Math.floor((totalCount-1)/pagesize)+1){
			return;
		}
		this.setCurPage(Number(curpage)+1);
	};
	
	this.gopage=function(i){
		this.setCurPage(i);
	};
	
	this.directpage=function(i){
		this.gopage(i);
	};
	
	var expCols;
	
	this.setExpCols=function(expCols1){
		expCols=expCols1;
	}
	
	this.setField=function(filedObj){
		showField=filedObj;
	}
	
	//注册事件
	this.bind=function(eventName,func){
		if(eventName.toUpperCase() =="CLICK"){
			tableJson.click=func;
		}
		else if(eventName.toUpperCase() =="DOUBLECLICK"){
			tableJson.doubleClick=func;
		}else if(eventName.toUpperCase() =="BEFOREPAGE"){
			tableJson.beforepage=func;
		}else if(eventName.toUpperCase() =="AFTERPAGE"){
			tableJson.afterpage=func;
		}else if(eventName.toUpperCase() =="AFTERSHOW"){
			tableJson.aftershow=func;
		}else if(eventName.toUpperCase() =="BEFOREQUERY"){
			tableJson.beforequery=func;
		}else{
			debug("组件不支持该事件的注册");
		}
		
	};
	
	this.checkRows = function(){
		if(table){
			if($('#'+tableJson.id+' thead tr input[type="checkBox"]').attr("checked") == "checked"){
				return table.getAllRows();
			}
			var rows=  [];
			
			$("#"+tableJson.id+" tbody tr input[type='checkbox']").each(function(){
				if($(this).attr("checked") == "checked"){
					rows.push(table.getRowData($(this).parent().parent().index()));
				}
			});
			return rows;
			
		}else{
			return [];
		}
	}
	

	//加了进度条
	this.exp1=function(srvcode,fileName,sheetName,count){
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
		var tmpObj={};
		if(expCols!=""&&expCols!=null&&typeof(expCols)!='undefined'){
			tmpObj=expCols;
			tmpObj.sheetName=sheetName;
		}else{
			tmpObj.sheetName=sheetName;
			for(var i=0;i<showField.length;i++){
				var fid=showField[i]["id"];
				var fname=showField[i]["name"];
				tmpObj[fid]=fname;
			}
		}
		var a=[];
		a.push(tmpObj);
		//全部导出
		tableJson.param.start=-1;
		tableJson.param.end=-1;
		var b=[];
		b.push(tableJson.param);
		var json={}; 
		json["ExportHeaders"]=encodeURIComponent($.stringifyJSON(a));
		json["params"]=encodeURIComponent($.stringifyJSON(b));
		Comm.downExcel(srvcode,fileName,'',json,function(){
    		$("#num")[0].innerHTML =100+"%";
    		window.clearInterval(clearCase);
    		setTimeout('$("#fl").hide()', 1000 ) ;      	
		});
	};
	
	/*this.exp=function(srvcode,fileName,sheetName){
		this.exp1(srvcode, fileName, sheetName, totalCount);
	};*/
	
	this.exp=function(srvcode,fileName,sheetName){
		if(sheetName==""||sheetName==null||typeof(sheetName)=='undefined'){
			sheetName=fileName;
		}
		var tmpObj={};
		if(expCols!=""&&expCols!=null&&typeof(expCols)!='undefined'){
			tmpObj=expCols;
			tmpObj.sheetName=sheetName;
		}else{
			tmpObj.sheetName=sheetName;
			for(var i=0;i<showField.length;i++){
				var fid=showField[i]["id"];
				var fname=showField[i]["name"];
				tmpObj[fid]=fname;
			}
		}
		var a=[];
		a.push(tmpObj);
		//全部导出
		tableJson.param.start=-1;
		tableJson.param.end=-1;
		var b=[];
		b.push(tableJson.param);
		var json={}; 
		json["ExportHeaders"]=encodeURIComponent($.stringifyJSON(a));
		json["params"]=encodeURIComponent($.stringifyJSON(b));
		Comm.block(null,"正在努力导出数据,请稍后...");
		Comm.downExcel(srvcode,fileName,'',json,function(){
			Comm.unblock(null);
		});
	};
	
	this.getRowIndex=function(){
		return table.getRowIndex();
	}
	 this.getRowData=function(i){
			return table.getRowData(i);
	}
	 
	 this.getTable=function(){
		 return table;
	 }
	 
	 this.setTable=function(extTable){
		  table = extTable;
	 }
	
	 this.getCount=function(){
		 return totalCount;
	 }
	 
	 this.getEditData=function(){
		 var data=[];
		 //info(tableJson.editRows);
		 for(var i=0;i<tableJson.editRows.length;i++){
			 var index=tableJson.editRows[i];
			 var tr=$("#"+tableJson.id+" tbody tr").get(index);
			 var tmpObj={};
			 //info(this.getTable().getTableJson().pk);
			// Rose.log($(tr).html());
			// info($('#'+$(tr).attr("id")+' label[pk="1"]').text());
			 $(tr).find("label").each(function(){
				 if($(this).attr("pk")!=null&&$(this).attr("pk")!=""){
					 tmpObj[$(this).attr("pk")]=$(this).text();
				 }
			 });
			
			 $(tr).find("input").each(function(){
				 if($(this).is(":visible")&&$(this).attr("head_id")!=null){
					 tmpObj[$(this).attr("head_id")]=$(this).val();
					 tmpObj["rowId"]=index;
				 }
			 });
			 data.push(tmpObj);
		 }
		 return data;
	 }
	 
	 this.setEditRows=function(index){
		var hasContain=false;
		for(var i=0;i<tableJson.editRows.length;i++){
			if(index==tableJson.editRows[i]){
				hasContain=true;
			}
		}
		if(!hasContain){
			tableJson.editRows.push(index);
		}
		//info(tableJson.editRows)
	 };
	 
	 this.showEditArea=function(){
		 if(extData&&extData.editcontrol){
			 $(extData.editcontrol).show();
		 }else{
			 $("#"+tableJson.id+" .editcontrol").show();
		 }
	 }
	 
	 this.hideEditArea=function(){
		 if(extData&&extData.editcontrol){
			 $(extData.editcontrol).hide();
		 }else{
			 $("#"+tableJson.id+" .editcontrol").hide();
		 }
		$("#"+tableJson.id+" tbody tr").find("input[type='text']").hide();
		$("#"+tableJson.id+" tbody tr").find("label").show();
		tableJson.editRows=[];
	 }
	 
	 //以下为服务端所有数据排序tablequery.order()，客户端当前页排序请调用table.order();
	 this.order=function(obj){
			var headid=$(obj).attr("headid");
			if(headid){
				if(tableJson.headMap[headid].order!="1"){
					return;
				}
				if(tableJson.orderFlag=="ASC"){
					tableJson.orderFlag="DESC";
					//$(obj).removeClass().addClass("down");
				}else{
					tableJson.orderFlag="ASC";
					//$(obj).removeClass().addClass("up");
				}
				tableJson.orderCol=headid;
				var orderCol="";
				if(tableJson.headMap[headid].col){
					orderCol=tableJson.headMap[headid].col;
				}else{
					var tmpstr=headid+"";
					var deststr="";
					for(var i=0;i<tmpstr.length;i++){
						var curstr=tmpstr.charAt(i);
						if(/^[A-Z]+$/.test(curstr)){
							deststr+="_";
						}
						deststr+=curstr;
					}
					orderCol=deststr;
				}
				//alert(orderCol);
				tableJson.param.order=" order by "+orderCol+" "+tableJson.orderFlag+" ";
				this.query(tableJson.param);
			}
	 }
 
		//把当前table放到全局容器里
	 globle.setTableQuery(tableJson.id,this);
	
}

/************数据示例
 * 
/**beans
 * [
 		{channel_id:'100001',channel_name:'文一路张飞店',channel_type:'80002',create_date:'2004-08-08'},
 		{channel_id:'100002',channel_name:'文三路李逵店',channel_type:'80002',create_date:'2004-08-08'},
 		{channel_id:'100003',channel_name:'文一路松江店',channel_type:'80003',create_date:'2004-02-08'},
 		{channel_id:'100004',channel_name:'文一路张飞寒亭店',channel_type:'80004',create_date:'2014-08-08'},
 		{channel_id:'100005',channel_name:'文三路阿菲店',channel_type:'80005',create_date:'2004-08-08'},
 		{channel_id:'100006',channel_name:'文一路阿玛尼店',channel_type:'80002',create_date:'2004-06-08'},
  ]
 */

/**showField
 [
 	{id:'channel_id',name:'渠道编号',hide:'true'},
 	{id:'channel_name',name:'渠道名称'},
 	{id:'channel_type',name:'渠道类型',type:'enum'},
 	{id:'create_date',name:'创建时间',type:'date'}
 ]
 */

/**enumData
 * {
    "channel_type": [
        {
            "codeName": "直营店", 
            "codeValue": "80001", 
        }, 
        {
            "codeName": "授权店", 
            "codeValue": "80002", 
        }
    ]
}
其中channel_type必须是某一列的字段名
 */

/************常用api
/**
 * getRowIndex()获取当前选中行的索引 从0开始
 * getRowData(index)获取第几行数据，返回bean
 * bind('click',function(){})  注册单击事件，在show方法之前使用，注册双击事件为doubleclick
 * show(id) 数据展示
 */

function Table(tableJson,showField,enumData,extData){
	this.showField = showField;
	var tableTplPath = globle.getTpl("commtable");
		//1、数据准备
		if(enumData&&typeof(enumData)!='undefined'){
			var newEnumData={};
			for(var colId in enumData){
				var tmpObj={};
				if(!enumData[colId] || typeof(enumData[colId])=='undefined')continue;
				for(var i=0;i<enumData[colId].length;i++){
					var key=enumData[colId][i].codeValue;
					tmpObj[key]=enumData[colId][i].codeName;
				}
				newEnumData[colId]=tmpObj;
			}
		}
		
		tableJson.col_count=0;
		if(extData && extData.need_checkbox){
			tableJson.need_checkbox = 1;
			tableJson.col_count+=1;
		}
		if(extData && extData.show_index){
			tableJson.show_index = 1;
			tableJson.col_count+=1;
		}
		var splitLength=8;
		if(extData && extData.split){
			splitLength = extData.split;
		}
		
		var multiSelect=false;
		if(extData && extData.multiSelect){
			multiSelect = extData.multiSelect;
		}
		
		//2、解析head
		this.parseHead=function(showField){
			var heads= [];
			var headMap={};
			if(showField!=null&&typeof(showField)!='undefined'){
				for(var i=0;i<showField.length;i++){
					head={};
					head.head_id=showField[i].id;
					 head.head_name=showField[i].name;
					 if(typeof(showField[i].buttons)!='undefined'){
						 head.buttons=showField[i].buttons;
						 head.funcs=showField[i].func;
					 }
					 if(typeof(showField[i].type)!='undefined'){
						 head.show_type=showField[i].type;
					 }
					 if(typeof(showField[i].format)!='undefined'){
						 head.format=showField[i].format;
					 }
					 head.is_show='1';
					 tableJson.col_count+=1;
					 if(typeof(showField[i].hide)!='undefined'){
						 if(showField[i].hide==true||showField[i].hide.toUpperCase()=="TRUE"){
							 head.is_show='0';
							 tableJson.col_count-=1;
						 }
					 }
					 head.is_split='0';
					 if(typeof(showField[i].split)!='undefined'){
						 if(showField[i].split==true||showField[i].split.toUpperCase()=="TRUE"){
							 head.is_split='1';
						 }
					 }
					 head.need_edit='0';
					 if(typeof(showField[i].edit)!='undefined'){
						 if(showField[i].edit==true||showField[i].edit.toUpperCase()=="TRUE"){
							 head.need_edit='1';
						 }
					 }
					 if(typeof(showField[i].pk)!='undefined'){
						 if(showField[i].pk==true||showField[i].pk.toUpperCase()=="TRUE"){
							 head.pk=showField[i].id;
							 tableJson.pks.push(showField[i].id);
						 }
					 }
					 head.order='0';
					 if(typeof(showField[i].order)!='undefined'){
						 if(showField[i].order==true||showField[i].order.toUpperCase()=="TRUE"){
							 head.order='1';
						 }
					 }
					 head.col=showField[i].col;
					 heads.push(head);
					 headMap[head.head_id]=head;
				}
			}
			tableJson.heads=heads;
			tableJson.headMap=headMap;
		}
		this.parseHead(showField);
		
		//2、解析body
		this.parseBody=function(beans){
			var bodys=[];
			$.each(beans,function(i,bean){
				var bodyRowArray=[];
				$.each(tableJson.heads,function(j,head){
					var bodyCell={};
					//默认照常显示，枚举值要做翻译
					var tmpValue=bean[head.head_id];
					var useEnum=false;
					 if(typeof(head.show_type)!='undefined'){
						 if(head.show_type=='enum'){
							 if(typeof(newEnumData[head.head_id])!='undefined'){
								 var tmpObj=newEnumData[head.head_id];
								 if(typeof(tmpObj[tmpValue])!='undefined'){
									 useEnum=true;
									 bodyCell.body_cell=tmpObj[tmpValue];
								 }else if(typeof(tmpObj.defaultValue)!='undefined'){
									 useEnum=true;
									 bodyCell.body_cell=tmpObj.defaultValue;
								 }
								 else
								 {
									 useEnum=true;
//									 if(typeof(extData.showTempValue)!='undefined'){
//										 bodyCell.body_cell=tmpValue;
//									 }else{
//										 bodyCell.body_cell='';
//									 }
									 bodyCell.body_cell='';
								 }
							 }
						 }
						 
						 if(!useEnum){
							 bodyCell.body_cell=tmpValue;
						 }
						 if(head.show_type=='float'){
							 if(typeof(tmpValue)!='undefined'){
								bodyCell.body_cell=parseFloat(tmpValue.toString());
							 }
						 }
					 }else{
						 bodyCell.body_cell=tmpValue;
					 }
					 //bodytitle
					 if(head.is_split=='1'){
						 if(typeof(bodyCell.body_cell)!='undefined'&&(bodyCell.body_cell+'').length>splitLength){
							 bodyCell.body_title=bodyCell.body_cell;
							 bodyCell.body_cell=(bodyCell.body_cell+'').substr(0,splitLength)+'..';
						 }
					 }
					 //字段展示规则
					 if(head.format){
						 var clickFunc=eval(head.format);
							//alert(clickEvent);
							
						 bodyCell.body_cell = clickFunc(bodyCell.body_cell,bean);
							
							
						}
					 //字段展示规则
					 if(head.buttons){
						
						 bodyCell.isButton = "1";
						 bodyCell.buttons=[];
						 $(head.buttons).each(function(index,butObj)
						 {	
							 if(head.format)
							 {
								 var clickFunc=eval(head.format);
									//alert(clickEvent);
									
								 var text = clickFunc(bodyCell.body_cell,bean);
								 bodyCell.buttons.push({butText:text,clickFunc:head.funcs[0]});
									
							 }
							 else
							{
								 if(bean[butObj])
								 {
									 bodyCell.buttons.push({butText:bean[butObj],clickFunc:head.funcs[index]});
								 }
								 else
								{
									 bodyCell.buttons.push({butText:butObj,clickFunc:head.funcs[index]});
								}
							}
							
						 });
						  
							
					}
					bodyCell.need_edit=head.need_edit;
					bodyCell.is_show=head.is_show;
					bodyCell.pk=head.pk;
					bodyCell.head_id=head.head_id;
					bodyRowArray.push(bodyCell);
				});
				var bodyRow={};
				bodyRow.body_row=bodyRowArray;
		
				bodys.push(bodyRow);
			});
			tableJson.bodys=bodys;
		}
		this.parseBody(tableJson.beans);
		
		
		/*var click;
		var doubleClick;	*/
		var rowIndex=-1;
		var getRowData=function(i){
			return tableJson.beans[i];
		};
		this.getAllRows = function(){
			return tableJson.beans;
		}
		
		/*var allowOrder=false;
		var orderCol="";
		var orderFlag="ASC";*/
		
		this.show = function(){
			Rose.ajax.getHtml(tableTplPath, function(html, status) {
	            if(status){
					var compile = Handlebars.compile(html);
					//Rose.log(JSON.stringify(tableJson));
					if($('#'+tableJson.id+' .tablediv').length>0){
						$('#'+tableJson.id+' .tablediv').html("");
					}else{
						if(extData && extData.height){
							$('#'+tableJson.id).prepend("<div class='tablediv' style='height:"+extData.height+"'></div>");
						}else{
							$('#'+tableJson.id).prepend("<div class='tablediv'></div>");
						}
						
					}
					//Rose.log(compile(tableJson));
					//alert(compile(tableJson));
					$('#'+tableJson.id+' .tablediv').html(compile(tableJson));
					//放置按钮区域
					if(extData && extData.button){
						//alert(extData.button);
						$($("#"+extData.button).html()).appendTo($('#'+tableJson.id+' .ui-table-btn-div'));
						$('#'+tableJson.id+' .ui-table-btn-div a').removeClass().addClass("ui-button ui-button-swhite");
					}
					//注册样式
					$('#'+tableJson.id+' tbody tr:nth-child(even)').addClass("ui-table-split");
					$('#'+tableJson.id+' tbody tr:nth-child(odd)').mouseover(function(){
						if(!tableJson.nodata){
							if(!$(this).attr("class")){
								$(this).addClass("ui-table-selected");
							}
						}
						//rowIndex=$(this).index();
					}).mouseout(function(){
						if($(this).attr("class") == "ui-table-selected"){
							$(this).removeClass("ui-table-selected");
						}
					});
					$('#'+tableJson.id+' tbody tr:nth-child(even)').mouseover(function(){
						if($(this).attr("class") == "ui-table-split"){
							$(this).removeClass("ui-table-split").addClass("ui-table-selected");
						}
						//rowIndex=$(this).index();
					}).mouseout(function(){
						if($(this).attr("class") == "ui-table-selected"){
							$(this).removeClass("ui-table-selected").addClass("ui-table-split");
						}
					});
					//排序样式
					if(tableJson.orderCol&&tableJson.orderFlag){
						if(tableJson.orderFlag=="ASC"){
							$("#"+tableJson.id+" thead th a[headid='"+tableJson.orderCol+"']").removeClass().addClass("up");
						}else{
							$("#"+tableJson.id+" thead th a[headid='"+tableJson.orderCol+"']").removeClass().addClass("down");
						}
					}
					//注册事件
					if(typeof(tableJson.click)!='undefined'&&typeof(eval(tableJson.click)) == "function"){
						$('#'+tableJson.id+' tbody tr').click(function(event){
							if(tableJson.nodata){
								return;
							}
							if(tableJson.need_checkbox&&tableJson.need_checkbox==1){
								var eClass = event.target.className;
								if(eClass != "ui-checkbox" || !multiSelect){
									$("#"+tableJson.id+" .ui-checkbox").each(function(){
										$(this).attr("checked",false);
									});
									$(this).find(".ui-checkbox").attr("checked",true);
								}
							}
							//设置当前行
							rowIndex=$(this).index();
							//去除中间插入的行元素
							var isBreak = false;
							$('.table-ext-insert').each(function(index,obj)
							{
								if(rowIndex > $(obj).index())
								{
									rowIndex--;
								}
								else if(rowIndex == $(obj).index())
								{
									isBreak = true;
									return false;
								}
									
							});
							if(isBreak)
							{
								return;
							}
							var row=getRowData(rowIndex);
							tableJson.click(rowIndex,row);
							//debug(JSON.stringify(row));
							if(event && event.stopPropagation){
								  //W3C取消冒泡事件
								event.stopPropagation();
								  }else{
								  //IE取消冒泡事件
								 	 window.event.cancelBubble = true;
								  }
						});
					}
					if(typeof(tableJson.doubleClick)!='undefined'&&typeof(eval(tableJson.doubleClick)) == "function"){
							$('#'+tableJson.id+' tbody tr').dblclick(function(){
								//设置当前行
								rowIndex=$(this).index();
								var row=getRowData(rowIndex);
								tableJson.doubleClick(rowIndex,row);
								//debug(JSON.stringify(row));
							});
						
					}
					if($('#'+tableJson.id+' thead tr input[type="checkBox"]')){
						$('#'+tableJson.id+' thead tr input[type="checkBox"]').change(function(event){
							if($(this).attr("checked") == "checked"){
								$('#'+tableJson.id+' tbody tr input[type="checkBox"]').attr("checked","checked");
							}else{
								$('#'+tableJson.id+' tbody tr input[type="checkBox"]').removeAttr("checked","checked");
							}
							if(event && event.stopPropagation){
								  //W3C取消冒泡事件
								 //event.preventDefault();
								event.stopPropagation();
								  }else{
								  //IE取消冒泡事件
								 	 window.event.cancelBubble = true;
								  }
							//return;
						});
					}
					if(typeof(tableJson.aftershow)!='undefined'&&typeof(eval(tableJson.aftershow)) == "function"){
						tableJson.aftershow(tableJson.beans.length,tableJson.beans);
					}
					
	            }
			});
		};
		
		
		this.getRowIndex=function(){
			if(rowIndex==-1){
				//debug("未选中数据");
				return -1;
			}
			return rowIndex;
		};
		
		this.getRowData=function(i){
			return getRowData(i);
		};
		
		//以下为客户端当前页排序table.order()，服务端所有数据排序请调用tablequery.order();
		this.order=function(obj){
			var headid=$(obj).attr("headid");
			if(headid){
				if(tableJson.headMap[headid].order!="1"){
					return;
				}
				if(tableJson.orderFlag=="ASC"){
					tableJson.orderFlag="DESC";
					//$(obj).removeClass().addClass("down");
				}else{
					tableJson.orderFlag="ASC";
					//$(obj).removeClass().addClass("up");
				}
				tableJson.orderCol=headid;
				//Rose.log(JSON.stringify(tableJson.beans));
				tableJson.beans.sort(function(a,b){
					if(tableJson.orderFlag=="ASC"){
						if(!a[tableJson.orderCol]){return 0};
						return a[tableJson.orderCol].localeCompare(b[tableJson.orderCol]);
					}else{
						if(!b[tableJson.orderCol]){return 0};
						return b[tableJson.orderCol].localeCompare(a[tableJson.orderCol]);
					}
				});
				//Rose.log(JSON.stringify(tableJson.beans));
				this.parseBody(tableJson.beans);
				this.show();
				
			}
		};
		
		
		this.getTableJson=function(){
			return tableJson;
		}
		
}


function headClick(obj){
	var tableid=$(obj).parent().parent().parent().attr("tableid");
	var tableQry=globle.getTableQuery(tableid);
	if(tableQry){
		//tableQry.getTable().order(obj);
		tableQry.order(obj);
	}
}

function prepage(obj){
	var tableid=$(obj).parent().attr("tableid");
	globle.getTableQuery(tableid).prepage();
}

function nextpage(obj){
	var tableid=$(obj).parent().attr("tableid");
	globle.getTableQuery(tableid).nextpage();
}

function gopage(obj,page){
	var i=$(obj).text();
	if(page){
		i=page;
	}
	var tableid=$(obj).parent().attr("tableid");
	globle.getTableQuery(tableid).gopage(i);
}

function directpage(obj){
	var i=$(obj).parent().find("input").val();
	if(i==""||i==null){
		return;
	}
	var tableid=$(obj).parents(".ui-paging").attr("tableid");
	globle.getTableQuery(tableid).directpage(i);
}

function pagekeyup(obj,totalpage){
	obj.value=obj.value.replace(/\D/g,'');
	if(obj.value>totalpage||obj.value<=0){
		obj.value="";
	}
}

function editcell(obj){
	$(obj).find("label").hide();
	$(obj).find("input").show();
	var tableid=$(obj).parents("tbody").attr("tableid");
	globle.getTableQuery(tableid).showEditArea();
}

function defaulEditDataSubmit(obj,editsubmit){
	var tableid=$(obj).parents("tfoot").attr("tableid");
	var data=globle.getTableQuery(tableid).getEditData();
	if(editsubmit){
		window[editsubmit](data);
	}
}

function defaulEditDataCancel(obj){
	var tableid=$(obj).parents("tfoot").attr("tableid");
	globle.getTableQuery(tableid).hideEditArea();
}

function editDataChange(obj){
	var index=$(obj).parents("tr").index();
	var tableid=$(obj).parents("tbody").attr("tableid");
	globle.getTableQuery(tableid).setEditRows(index);
}






