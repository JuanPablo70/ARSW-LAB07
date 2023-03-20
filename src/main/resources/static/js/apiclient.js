apiclient=(function(){
    
    function _getAllBlueprints(authorName){
        const json = $.ajax({url: "blueprints/"+authorName, type: "GET", dataType: "json", async: false});
        //console.log(json.responseJSON);
        return json;
    }

    function _getBluprint(authorName, bpname){
        const json = $.ajax({url: "blueprints/"+authorName+"/"+bpname, type: "GET", dataType: "json", async: false});
        //console.log(json.responseJSON);
        return json;
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
			callback(_getAllBlueprints(authname).responseJSON);
		},

		getBlueprintsByNameAndAuthor:function(authname,bpname,callback){
			callback(_getBluprint(authname, bpname).responseJSON);
		},
        putBlueprint:function(blueprint, callback0, callback1){
            _updateBlueprint(blueprint).then(() => {
                callback1(_getAllBlueprints(blueprint.author).responseJSON)
            })
            .then(callback0(blueprint));
        }
	}	
})();