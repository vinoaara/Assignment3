                d3.json("json/ForLinechart.json", function(data) {
                InitChart(data);
            });
            function InitChart(dt) {

            var data=dt[0];
            var data2=dt[1];
            console.log(dt[0]);
            


            var vis = d3.select("#visualisation"),
            WIDTH = 1000,
            HEIGHT = 500,
            MARGINS = {
            top: 20,
            right: 20,
            bottom: 20,
            left: 50
        },

        xScale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([1960,2020]),

        yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([15,90]),

        xAxis = d3.svg.axis()
        .scale(xScale),

        yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left");



        

        vis.append("svg:g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
        .call(xAxis);

        vis.append("svg:g")
        .attr("class", "y axis")
        .attr("transform", "translate(" + (MARGINS.left) + ",0)")
        .call(yAxis);

        var lineGen = d3.svg.line()
        .x(function(d) {
        return xScale(d.year);
    })
    .y(function(d) {
    return yScale(d.value);
})
.interpolate("basis");

vis.append('svg:path')
.attr('d', lineGen(data))
.attr('stroke', 'green')
.attr('stroke-width', 2)
.attr('fill', 'none');

vis.append('svg:path')
.attr('d', lineGen(data2))
.attr('stroke', 'blue')
.attr('stroke-width', 2)
.attr('fill', 'none');




}
// InitChart();
