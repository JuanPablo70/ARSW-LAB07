apiclient=(function(){
    
    function _getAllBlueprints(authorName){
        const json = $.ajax({url: "blueprints/"+authorName, type: "GET", dataType: "json", async: false});
        //console.log(json.responseJSON);
        return json.responseJSON;
    }

    function _getBluprint(authorName, bpname){
        const json = $.ajax({url: "blueprints/"+authorName+"/"+bpname, type: "GET", dataType: "json", async: false});
        //console.log(json.responseJSON);
        return json.responseJSON;
    }

	return {
		getBlueprintsByAuthor:function(authname,callback){
			callback(_getAllBlueprints(authname));
		},

		getBlueprintsByNameAndAuthor:function(authname,bpname,callback){
			callback(_getBluprint(authname, bpname));
		}
	}	
})();