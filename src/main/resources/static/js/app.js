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
                puntos: e.points.length
            }
        });
        return reformattedArray;
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