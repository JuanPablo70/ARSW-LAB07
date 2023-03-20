var Blueprints = (function() {
    
    var authorName; 
    var currentBlueprint;


    function _mapping(blueprints) {
        console.log('blueprints:>> ', blueprints);
        const reformattedArray = blueprints.map((e) => {
            return {
                name: e.name,
                points: e.points.length
            }
        });
        _mappingTable(reformattedArray);
    };

    function _mappingTable(mappedBlueprint) {
        $(document).ready(function(){
            $('#h2-author').text(authorName + "'s blueprints:");
            var i = 0;
            var count = 0;
            var table = $("#table");
            var firstRow = $("#firstRow");
            console.log('firstRow :>> ', firstRow.html());
            table.html("");
            table.append(firstRow);
            for (const element of mappedBlueprint) {
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
        //console.log('mappedBlueptint :>> ', mappedBlueprint);
    };

    function _drawBp(blueprint) {
        $(document).ready(function() {
            currentBlueprint = blueprint;
            console.log(currentBlueprint);
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
        },
        updateBlueprint: function () {
            apiclient.putBlueprint(currentBlueprint, _drawBp, _mapping);
            
        },
        init: function(){
      
            console.info('initialized');
            var c = document.getElementById("myCanvas");
            
            //if PointerEvent is suppported by the browser:
            if(window.PointerEvent) {
              c.addEventListener("pointerdown", function(event){
                console.log(currentBlueprint);
                if (currentBlueprint !== undefined) {
                    var coords = c.getBoundingClientRect();
                    var x = Math.round(event.pageX - coords.left);
                    var y = Math.round(event.pageY - coords.top);
                    //alert('pointerdown at '+ Math.round(event.pageX - coords.left) +','+ Math.round(event.pageY - coords.top));
                    currentBlueprint.points.push({x, y});
                    console.log('Después de añadir los puntos: ');
                    console.log(currentBlueprint);
                    _drawBp(currentBlueprint);
                }
              });
            }
            else {
              c.addEventListener("mousedown", function(event){
                console.log(currentBlueprint);
                if (currentBlueprint !== undefined) {
                    var coords = c.getBoundingClientRect();
                    var x = Math.round(event.pageX - coords.left);
                    var y = Math.round(event.pageY - coords.top);
                    //alert('pointerdown at '+ Math.round(event.pageX - coords.left) +','+ Math.round(event.pageY - coords.top));
                    currentBlueprint.points.push({x, y});
                    console.log('Después de añadir los puntos: ');
                    console.log(currentBlueprint);
                }
                });
            }
          }
    };
      
})();