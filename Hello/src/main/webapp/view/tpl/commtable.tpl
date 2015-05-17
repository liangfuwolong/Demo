<div class="ui-table-container">
<table class="ui-table">
	<thead tableid="{{id}}">
		<tr>
			{{#if_eq need_checkbox compare=1}}
				<th>
					<input class="ui-checkbox"  value="" type="checkbox"/>
				</th>
			{{/if_eq}}
			{{#if_eq show_index compare=1}}
				<th>
					序号
				</th>
			{{/if_eq}}
			{{#each heads}}
					{{#if_eq is_show compare=1}}	
						<th><a style="cursor:pointer;text-decoration:none;" headid={{head_id}} onclick="headClick(this);" >{{head_name}}&nbsp;&nbsp;&nbsp;</a></th>
					{{else}}
						<th class="fn-hide">{{head_name}}</th>
					{{/if_eq}}
			{{/each}}
		</tr>
	</thead>
	<tbody tableid="{{id}}">
		{{#if_eq bodys.length compare=0}}
			<tr><td colspan="{{col_count}}"><div class="no-data"></div></td></tr>
		{{else}}
			{{#each_with_index bodys}}
					<tr>
						{{#if_eq ../need_checkbox compare=1}}
							<td>
								<input class="ui-checkbox"  value="" type="checkbox">
							</td>
						{{/if_eq}}
						{{#if_eq ../show_index compare=1}}
							<td>
								{{index}}
							</td>
						{{/if_eq}}
						{{#each body_row}}
							{{#if_eq is_show compare=1}}					
								{{#if_eq need_edit compare=1}}	
									<td title='{{body_title}}' onclick="editcell(this);">
										<label>{{body_cell}}</label>
										<input type="text" value="{{body_cell}}" head_id="{{head_id}}" onchange="editDataChange(this);" class="fn-hide"/>
									</td>
								{{else}}
									{{#if_eq isButton compare=1}}	
										<td >
											{{#each buttons}}
												<a class='table-button' onclick='{{clickFunc}}(this);'>{{butText}}</a>
											{{/each}}
										</td>
									{{else}}
										<td title='{{body_title}}'>
											<label pk={{pk}}>{{body_cell}}</label>
										</td>
									{{/if_eq}}
								{{/if_eq}}
								
							{{else}}
								<td class="fn-hide"><label pk={{pk}}>{{body_cell}}</label></td>
							{{/if_eq}}
						{{/each}}
					</tr>
			{{/each_with_index}}
		{{/if_eq}}
	</tbody>
	<tfoot class="editcontrol fn-hide" tableid="{{id}}">
		<tr>
		   <td colspan="{{col_count}}" class="text-align:center;">
			<a   class="ui-button ui-button-mwhite" onclick="defaulEditDataSubmit(this,'{{editsubmit}}');">保存</a>
			&nbsp;&nbsp;&nbsp;<a   class="ui-button ui-button-mwhite" onclick="defaulEditDataCancel(this);">取消</a>
		   </td>
		</tr>
	</tfoot>
</table>
</div>
</div>