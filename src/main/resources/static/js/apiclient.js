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

    function _updateBlueprint(blueprint){
        const putPromise = $.ajax({
            url: "/blueprints/"+blueprint.author+"/"+blueprint.name,
            type: 'PUT',
            data: JSON.stringify(blueprint),
            contentType: "application/json"
        });
        putPromise.then(
            function () {
                console.log("OK PUT");
            },
            function () {
                console.log("ERROR PUT");
            }
        );
        return putPromise;
    }

	return {
		getBlueprintsByAuthor:function(authname,callback){
			callback(_getAllBlueprints(authname));
		},

		getBlueprintsByNameAndAuthor:function(authname,bpname,callback){
			callback(_getBluprint(authname, bpname));
		},
        putBlueprint:function(blueprint, callback){
            //callback(_updateBlueprint(blueprint));
            return new Promise((resolve, reject) => {
                resolve(_updateBlueprint(blueprint).then(callback(blueprint)));
            });
            //callback(blueprint);
        }
	}	
})();