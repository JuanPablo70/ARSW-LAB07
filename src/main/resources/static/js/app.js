var Blueprints = (function() {
    var authorName;

    var data = {
        house: { name: 'house', points: 233 },
        gear: { name: 'gear', points: 342 }
    };

    function _mapping(blueprints) {
        const reformattedArray = blueprints.map((e) => {
            return {
                name: e.name,
                points: e.points.length
            }
        });
        _mappingTable(reformattedArray);
    };

    function _mappingTable(array) {
        $(document).ready(function(){
            for (const key in array) {
                const element = array[key];
                var markup = "<tr><td>" + element.name + "</td><td>" + element.points + "</td></tr>";
                $("#table").append(markup)
            }
        })
    };


    return {
        setAuthorName: function(name) {
            authorName = name.value;
            this.getBlueprints(authorName, _mapping);
        },
        getBlueprints: function(authname, callback) {
            apimock.getBlueprintsByAuthor(authname, callback);
        }
    };
      
})();