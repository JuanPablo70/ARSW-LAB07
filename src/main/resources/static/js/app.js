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
            $('#h2-author').text(authorName + "'s blueprints:");
            var i = 0;
            var count = 0;
            for (const element of mappedBlueptint) {
                var view = document.createElement('button');
                view.id = 'button'+i;
                view.innerHTML = 'Open';
                var markup = "<tr><td>" + element.name + "</td><td>" + element.points + "</td>" + "<td>" + view.outerHTML + "</td>" + "</tr>";
                $("#table").append(markup);
                $("#button"+i).click(function() {
                    Blueprints.drawGraph(authorName, element.name);
                });
                i++;
                count += element.points;
            }
            $('#h2-tpoints').text('Total user points: ' + count);
        });
        console.log('mappedBlueptint :>> ', mappedBlueptint);
    };

    function _drawBp(blueprint) {
        $(document).ready(function() {
            $('#h2-cbp').text('Current blueprint: ' + blueprint.name);
            var c = document.getElementById("myCanvas");
            var ctx = c.getContext("2d");
            ctx.clearRect(0, 0, c.width, c.height);
            ctx.beginPath();
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
        });
    };

    return {
        setAuthorName: function(name) {
            authorName = name.value;
            this.getBlueprints(authorName, _mapping);
        },
        getBlueprints: function(authname, callback) {
            //apimock.getBlueprintsByAuthor(authname, callback);
            apiclient.getBlueprintsByAuthor(authname, callback);
        },
        drawGraph: function (authorName, blueprint) {
            //apimock.getBlueprintsByNameAndAuthor(authorName, blueprint, _drawBp);
            apiclient.getBlueprintsByNameAndAuthor(authorName, blueprint, _drawBp);
        }
    };
      
})();