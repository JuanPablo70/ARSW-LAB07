apiclient=(function(){
    var mockdata=[];

	mockdata["johnconnor"]=[{author:"johnconnor","points":[{"x":50,"y":100}, {"x":125,"y":50}, {"x":200,"y":100}, {"x":200,"y":250}, {"x":50,"y":250}],"name":"house"},
	 						{author:"johnconnor","points":[{"x":340,"y":240},{"x":15,"y":215}],"name":"gear"}];

	mockdata["maryweyland"]=[{author:"maryweyland","points":[{"x":140,"y":140},{"x":115,"y":115}],"name":"house2"},
	 						 {author:"maryweyland","points":[{"x":140,"y":140},{"x":115,"y":115}],"name":"gear2"}];


    function _getAllBlueprints(authorName){
        const variable = $.ajax({url: "blueprints/"+authorName, type: "GET", dataType: "json"});
        console.log(variable);
        console.log(variable.length);
        console.log(variable.responseText);
        //console.log($.getJSON("blueprints/"+authorName));
    }

	return {
		getBlueprintsByAuthor:function(authname,callback){
            _getAllBlueprints(authname);
			//callback(mockdata[authname]);
		},

		getBlueprintsByNameAndAuthor:function(authname,bpname,callback){
			callback(mockdata[authname].find(function(e){return e.name===bpname}));
		}
	}	
})();