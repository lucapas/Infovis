//Data
var data = [
	[
	{axis:"x1",value:1},
	{axis:"x2",value:2},
	{axis:"x3",value:3},
	{axis:"x4",value:4},
	{axis:"x5",value:10},
	],[
	{axis:"x1",value:2},
	{axis:"x2",value:2},
	{axis:"x3",value:10},
	{axis:"x4",value:4},
	{axis:"x5",value:4},
	],[
	{axis:"x1",value:10},
	{axis:"x2",value:1},
	{axis:"x3",value:2},
	{axis:"x4",value:2},
	{axis:"x5",value:4},
	],[
	{axis:"x1",value:3},
	{axis:"x2",value:2},
	{axis:"x3",value:2},
	{axis:"x4",value:10},
	{axis:"x5",value:1},
	],[
	{axis:"x1",value:2},
	{axis:"x2",value:10},
	{axis:"x3",value:4},
	{axis:"x4",value:5},
	{axis:"x5",value:3},
	],[
	{axis:"x1",value:2},
	{axis:"x2",value:6},
	{axis:"x3",value:2},
	{axis:"x4",value:4},
	{axis:"x5",value:3},
	],[
	{axis:"x1",value:1},
	{axis:"x2",value:1},
	{axis:"x3",value:1},
	{axis:"x4",value:1},
	{axis:"x5",value:1},
	],[
	{axis:"x1",value:5},
	{axis:"x2",value:1},
	{axis:"x3",value:7},
	{axis:"x4",value:3},
	{axis:"x5",value:4},
	],[
	{axis:"x1",value:5},
	{axis:"x2",value:8},
	{axis:"x3",value:1},
	{axis:"x4",value:1},
	{axis:"x5",value:7},
	],[
	{axis:"x1",value:6},
	{axis:"x2",value:5},
	{axis:"x3",value:1},
	{axis:"x4",value:5},
	{axis:"x5",value:2},
	],[
	{axis:"x1",value:4},
	{axis:"x2",value:5},
	{axis:"x3",value:3},
	{axis:"x4",value:2},
	{axis:"x5",value:1},
	],[
	{axis:"x1",value:8},
	{axis:"x2",value:8},
	{axis:"x3",value:7},
	{axis:"x4",value:1},
	{axis:"x5",value:5},
	],[
	{axis:"x1",value:6},
	{axis:"x2",value:7},
	{axis:"x3",value:5},
	{axis:"x4",value:5},
	{axis:"x5",value:4},
	],[
	{axis:"x1",value:8},
	{axis:"x2",value:3},
	{axis:"x3",value:4},
	{axis:"x4",value:7},
	{axis:"x5",value:3},
	],[
	{axis:"x1",value:3},
	{axis:"x2",value:3},
	{axis:"x3",value:5},
	{axis:"x4",value:3},
	{axis:"x5",value:3},
	],[
	{axis:"x1",value:3},
	{axis:"x2",value:5},
	{axis:"x3",value:3},
	{axis:"x4",value:4},
	{axis:"x5",value:5},
	],[
	{axis:"x1",value:6},
	{axis:"x2",value:6},
	{axis:"x3",value:6},
	{axis:"x4",value:9},
	{axis:"x5",value:9},
	],[
	{axis:"x1",value:2},
	{axis:"x2",value:7},
	{axis:"x3",value:7},
	{axis:"x4",value:2},
	{axis:"x5",value:1},
	],[
	{axis:"x1",value:9},
	{axis:"x2",value:1},
	{axis:"x3",value:2},
	{axis:"x4",value:4},
	{axis:"x5",value:1},
	],[
	{axis:"x1",value:1},
	{axis:"x2",value:5},
	{axis:"x3",value:1},
	{axis:"x4",value:2},
	{axis:"x5",value:1},
	]
];
var cfg = {
 w: 600,				//Width of the circle
 h: 600,				//Height of the circle
 margin: {top: 20, right: 20, bottom: 20, left: 20}, //The margins of the SVG
 levels: 3,				//How many levels or inner circles should there be drawn
 maxValue: 0, 			//What is the value that the biggest circle will represent
 labelFactor: 1.25, 	//How much farther than the radius of the outer circle should the labels be placed
 wrapWidth: 60, 		//The number of pixels after which a label needs to be given a new line
 opacityArea: 0.35, 	//The opacity of the area of the blob
 dotRadius: 4, 			//The size of the colored circles of each blog
 opacityCircles: 0.1, 	//The opacity of the circles of each blob
 strokeWidth: 2, 		//The width of the stroke around each blob
 roundStrokes: false,	//If true the area and stroke will follow a round path (cardinal-closed)
 TranslateX: 300,
 TranslateY: 300,
 color: d3.scaleOrdinal(d3.schemeCategory10)
};

var StarCordinates =
{
	fun:function(cfd,data){
		var svg = d3.select("#svgcontainer")
		   .append("svg")
		   .attr("width", cfg.w)
		   .attr("height", cfg.h)
		   .append("g")
		   .attr("transform", "translate(" + cfg.TranslateX + "," + cfg.TranslateY + ")");

		var allAxis = (data[0].map(function(i, j){return i.axis})),	//Names of each axis
			total = allAxis.length,					//The number of different axes
			radius = Math.min(cfg.w/3, cfg.h/3), 	//Radius of the outermost circle
			angleSlice = Math.PI * 2 / total;		//The width in radians of each "slice"

		var maxValue = Math.max(cfg.maxValue, d3.max(data, function(i){return d3.max(i.map(function(o){return o.value;}))}));
		//Scale for the radius
		var rScale = d3.scaleLinear()
			.range([0, radius])
			.domain([0, maxValue]);


		var axis = svg.selectAll(".axis")
			.data(allAxis)
			.enter()
			.append("g")
			.attr("class", "axis");
		//Append the lines
		var data2=[];
		axis.append("line")
			.attr("x1", 0)
			.attr("y1", 0)
			.attr("x2", function(d, i){
		    var temp=rScale(maxValue*1.1) * Math.cos(angleSlice*i - Math.PI/2);
		    data2[i]={"x":temp,"y":0};
		    return temp; })
			.attr("y2", function(d, i){
		    var temp=rScale(maxValue*1.1) * Math.sin(angleSlice*i - Math.PI/2);
		    data2[i]["y"]=temp;
		    return temp; })
			.attr("class", function(d,i) { return "line line-" + i; })
		  .attr("number", function(d,i) { return i;})
			.style("stroke", "black")
			.style("stroke-width", "2px");

			console.log(maxValue);
			console.log(data2);

			axis.append("text")
		  		.attr("class", "legend")
		  		.style("font-size", "11px")
		  		.attr("text-anchor", "middle")
		  		.attr("dy", "0.35em")
		  		.attr("x", function(d, i){ return rScale(maxValue * cfg.labelFactor) * Math.cos(angleSlice*i - Math.PI/2); })
		  		.attr("y", function(d, i){ return rScale(maxValue * cfg.labelFactor) * Math.sin(angleSlice*i - Math.PI/2); })
		  		.text(function(d){return d});


		//creo i triangoli in mezzo agli assi che servono per scambiare la posizione dei 2 assi
		var scaleX = d3.scaleLinear()
		          .domain([-30,30])
		          .range([0,600]);

		var scaleY = d3.scaleLinear()
		          .domain([0,50])
		          .range([500,0]);

		var poly = svg.selectAll(".polygon")
			.data(data2)
			.enter()
			.append("g")
			.attr("class", "polygon");

		poly.append("polygon")
		    .attr("points",function(d,i){
					//la if serve per non sforare l'ultimo elemento
					if(data2.length==i+1){
						return "0,0 "+data2[i]["x"]+","+data2[i]["y"]+" "+data2[0]["x"]+","+data2[0]["y"]+"";
					}
					else{
						return "0,0 "+data2[i]["x"]+","+data2[i]["y"]+" "+data2[i+1]["x"]+","+data2[i+1]["y"]+"";
					}
				})
		    .attr("fill","transparent")
				.attr("number", function(d,i) { return i;})
				.on("click", function(d,i){
					d3.select("svg").remove();
					//la if serve per non sforare l'ultimo elemento
					var j;
					for (j = 0; j < data.length; j++) {
						if(data[j].length==i+1){
							var temp=data[j][i];
							data[j][i]=data[j][0];
							data[j][0]=temp;
						}
						else{
							var temp=data[j][i];
							data[j][i]=data[j][i+1];
							data[j][i+1]=temp;
						}
					}
					console.log(data);
					StarCordinates.fun(cfg,data);

				})
				/*.on("mouseover", function(d,i){
					d3.select(this).attr("fill","orange");
				})
				.on("mouseout", function(d,i){
					d3.select(this).attr("fill","transparent");
				})*/;

// creo i punti del diagramma
				var jsonCircles = [];
				var dataLineCircle = [];


				 for(var elem_data in data){
					 var x_axis=0;
					 var y_axis=0;
					 var dataTemp=[];
					 dataTemp[0]={"x":0,"y":0};
					 for(var z in data[elem_data]){
						 var x_elem=(data[elem_data][z]["value"]/maxValue*data2[z]["x"]);
						 var y_elem=(data[elem_data][z]["value"]/maxValue*data2[z]["y"]);
						 x_axis=x_axis+ x_elem;
						 y_axis=y_axis+ y_elem;
						 dataTemp[parseInt(z)+1]={"x":x_axis,"y":y_axis};
					 }
					 dataLineCircle[elem_data]=dataTemp;
					 jsonCircles[elem_data]={"x_axis":x_axis,"y_axis":y_axis,"radius":5};
				 }
				 console.log(dataLineCircle);

			 var circles = svg.selectAll(".circle")
			 .data(jsonCircles)
			 .enter()
			 .append("g")
			 .attr("class","circle");

			 circles.append("circle")
		    .attr("cx", function (d) { return d.x_axis; })
		    .attr("cy", function (d) { return d.y_axis; })
		    .attr("r", function (d) { return d.radius; })
				.attr('fill', 'red')
				.attr('stroke', 'black')
				.attr('number',function(d,i) { console.log(i); return i;})
				.on("mouseover", function(d,i){
					svg.append("text")
					.attr('id',"testo"+i)
					.attr('x',d3.select(this).attr('cx')-5)
					.attr('y',d3.select(this).attr('cy')-10)
					.text(i);
					//.text(i+":"+(data[i].map(function(i, j){return i.value})));
					for(var j in dataLineCircle[i]){
						if(((dataLineCircle[i].length)-1)!=j){
							svg.append("line")
							.attr('id',"lineCircle"+j)
							.attr("x1", dataLineCircle[i][j]["x"])
							.attr("y1", dataLineCircle[i][j]["y"])
							.attr("x2", dataLineCircle[i][parseInt(j)+1]["x"])
							.attr("y2", dataLineCircle[i][parseInt(j)+1]["y"])
							.style("stroke", "yellow")
							.style("stroke-width", "2px");

							svg.append("text")
							.attr('id',"testoLine"+j)
							.attr('x',(dataLineCircle[i][j]["x"]+dataLineCircle[i][parseInt(j)+1]["x"]) / 2)
							.attr('y',(dataLineCircle[i][j]["y"]+dataLineCircle[i][parseInt(j)+1]["y"]) / 2)
							.text(data[i][j].value);

						}
					}

				})
				.on("mouseout", function(d,i){
					d3.select("#testo"+i).remove();
					for(var j in dataLineCircle[i]){
						d3.select("#lineCircle"+j).remove();
						d3.select("#testoLine"+j).remove();
					}
				});
				/*circles.append("text")
				.attr('id', function(d,i){return "testo"+i})
				.attr("x", function (d) { return d.x_axis-5; })
		    .attr("y", function (d) { return d.y_axis-10; })
				.text(function(d,i){return i});*/
	}
}
StarCordinates.fun(cfg,data);
