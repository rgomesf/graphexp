var infobox = (function(){
	"use strict";

	//private variables
	var _table_IDinfo = {};
	var _table_DBinfo = {};
	var _table_Graphinfo = {};
	var _side_image = {};
	//console.log("infobox loaded.");

	////////////////////////
	// Public function
	function create(label_graph,label_graphElem){
		var graph_bar = d3.select(label_graph);
		graph_bar.append("h2").text("Graph Info")
		_table_Graphinfo = graph_bar.append("table").attr("id","tableGraph");
		init_table(_table_Graphinfo,["Type","Count"]);

		//side_bar.append("p").text("")
		var graphElem_bar = d3.select(label_graphElem);
		graphElem_bar.append("h2").text("Node Info")
		_table_IDinfo = graphElem_bar.append("table").attr("id","tableIdDetails");
		init_table(_table_IDinfo,["Key","Value"]);
		_table_DBinfo = graphElem_bar.append("table").attr("id","tableDBDetails");
		init_table(_table_DBinfo,["Key","Value","VertexProperty"]);

	}

	function init_table(table_handle,entries){
		var table_head = table_handle.append("thead");
	  	var row = table_head.append("tr");
	  	for (var key in entries){
	 		row.append("th").text(entries[key]);
	 	}
	 	var table_body = table_handle.append("tbody");
	  	var row = table_body.append("tr");
	  	for (var key in entries){
	 		row.append("td").text("");
	 	}
	}

	function display_graph_info(data){
		_table_Graphinfo.select("tbody").remove();
	  	var info_table = _table_Graphinfo.append("tbody");
	  	var data_to_display = data[0][0];
	  	append_keysvalues(info_table,{"Node labels":""},"bold");
	  	append_keysvalues(info_table,data_to_display,"normal");
	  	data_to_display = data[1][0];
	  	append_keysvalues(info_table,{"Nodes properties":""},"bold");
	  	append_keysvalues(info_table,data_to_display,"normal");
	  	var data_to_display = data[2][0];
	  	append_keysvalues(info_table,{"Edge labels":""},"bold");
	  	append_keysvalues(info_table,data_to_display,"normal");
	  	data_to_display = data[3][0];
	  	append_keysvalues(info_table,{"Edge properties":""},"bold");
	  	append_keysvalues(info_table,data_to_display,"normal");
	}

	function append_keysvalues(table_body,data,type){
		for (var key in data){
			var info_row = table_body.append("tr");
	 		var key_text = info_row.append("td").text(key);
	 		var value_text = info_row.append("td").text(data[key]);
	 		if (type=="bold") {
	 			key_text.style('font-weight','bolder');}
		}
	}

	function display_info(node_data){
		// remove previous info		
		_display_IDinfo(node_data)
		_display_DBinfo(node_data);
		//_display_WIKIinfo(node_data,_side_summary,_side_image,_bottom_info);
	    console.log('Node ID: '+node_data.id);
	}

	//////////////////////
	// Private functions
	function _display_IDinfo(d){
		_table_IDinfo.select("tbody").remove();
	  	var info_table = _table_IDinfo.append("tbody");
	  	// Keep only the entries in id_keys, to display
	  	var id_keys = ["id","label"];
	  	var data_dic = {}
	  	for (var key in id_keys){
	  		data_dic[id_keys[key]] = d[id_keys[key]]
	  	}
	  	append_keysvalues(info_table,data_dic)
	}


	function _display_DBinfo(d){
		_table_DBinfo.select("tbody").remove();
	 	var info_table = _table_DBinfo.append("tbody");
	 	for (var key in d.properties){
	 		for (var subkey in d.properties[key]){
	 			console.log(subkey)
	 			console.log(d.properties[key])
	 			console.log(d.properties[key][subkey])
	 			var new_info_row = info_table.append("tr");
	 			new_info_row.append("td").text(key);
	 			new_info_row.append("td").text(d.properties[key][subkey].value);
	 			new_info_row.append("td").text(d.properties[key][subkey].id);// TODO: handle VertexProperty
	 		}
	 	}
	}



	return {
		create : create,
		display_info : display_info,
		display_graph_info : display_graph_info
	};

})();