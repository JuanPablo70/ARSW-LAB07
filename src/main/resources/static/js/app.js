var Blueprints = (function() {
    var authorName;


    function _mapping(blueprints) {
        const reformattedArray = blueprints.map((e) => {
            return {
                name: e.name,
                points: e.points.length
            }
        });
        _mappingTable(reformattedArray);
    };

    function _mappingTable(mappedBlueptint) {
        $(document).ready(function(){
            for (const element of mappedBlueptint) {
                var markup = "<tr><td>" + element.name + "</td><td>" + element.points + "</td></tr>";
                $("#table").append(markup)
            }
        })
    };

    function _drawBp(blueprint) {
        $(document).ready(function() {
            var c = document.getElementById("myCanvas");
            var ctx = c.getContext("2d");
            const points = blueprint.points;
            for (i = 0; i < points.length; i++) {
                if (i == points.length-1) {
                    ctx.moveTo(points[i].x, points[i].y);
                    ctx.lineTo(points[0].x, points[0].y);
                    ctx.stroke();
                } else {
                    ctx.moveTo(points[i].x, points[i].y);
                    ctx.lineTo(points[i+1].x, points[i+1].y);
                    ctx.stroke();
                }
            }
        })
    }

    return {
        setAuthorName: function(name) {
            authorName = name.value;
            this.getBlueprints(authorName, _mapping);
        },
        getBlueprints: function(authname, callback) {
            apimock.getBlueprintsByAuthor(authname, callback);
            apimock.getBlueprintsByNameAndAuthor("johnconnor", "house", _drawBp);
        }
        
    };
      
})();