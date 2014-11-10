/* Kucera's Compound Interest Chart v1.01
 */

var years = 40;     //number of years investing
var init = 1000;    //amount of money initially invested
var growth = 0.08;   //amount of yearly growth
var monthly = 500;  //amount of payment each month
var interest = 0; //the interest being returned
var dataset = [];   //this will display the money each year.
var addition = 0;
var balance = init;

//spacing and sizing
var margin = { top: 10, right: 30, bottom: 100, left:150 } //the margins of the chart
var height = 340,
    width = 400,
    barWidth = 50,
    barOffset = 5;

    
var bars //because reasons
    
//the axis
var hAxis;
var hGuide;
var myChart;
var xScale;
var vGuideScale;

var tooltip = d3.select('body').append('div')
        .style('position', 'absolute')
        .style('padding', '0 10px')
        .style('background', 'white')
        .style('opacity', 0)


assignPlaceHolders();
updateChart();

function createChart(){

var colors = d3.scale.linear()
    .domain([0, dataset.length * .33, dataset.length * .66, dataset.length])
    .range(["#A0E142", "#95E56F", "#819090", "#6E8531"])

//the temp color we need for transitions
var tempcolor;

//scaling
var yScale = d3.scale.linear()
        .domain([0, d3.max(dataset)])
        .range([0, height]);

xScale = d3.scale.ordinal()
        .domain(d3.range(0, dataset.length))
        .rangeBands([0, width], 0.2)

myChart = d3.select('#chart').append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate('+ margin.left +', '+ margin.top +')')
    .style('background', '#EAE3CB')
    .selectAll('rect').data(dataset)
    .enter().append('rect')
        .style('fill', function(d,i) {
            return colors(i);
        })
        .attr('width', xScale.rangeBand())
        .attr('height', 0)
        .attr('x', function(d,i) {
            return xScale(i);
        })
        .attr('y', height)

        
    .on('mouseover', function(d) {
        tempColor = this.style.fill;
        d3.select(this)
            .style('opacity', .5)
            .style('fill', 'yellow')
            
            tooltip.transition()
            .style('opacity', .9)

        tooltip.html(d)
            .style('left', (d3.event.pageX - 35) + 'px')
            .style('top',  (d3.event.pageY + 50) + 'px')
    })

    .on('mouseout', function(d) {
        d3.select(this)
            .style('opacity', 1)
            .style('fill', tempColor)
    })
myChart.transition()
    .attr('height', function(d) {
        return yScale(d);
    })
    .attr('y', function(d) {
        return height - yScale(d);
    })
    .delay(function(d, i) {
        return i * 20;
    })
    .duration(1000)
    .ease('elastic')

vGuideScale = d3.scale.linear()
    .domain([0, d3.max(dataset)])
    .range([height, 0])
    
var vAxis = d3.svg.axis()
    .scale(vGuideScale)
    .orient('left')
    .ticks(10)

var vGuide = d3.select('svg').append('g')
    vAxis(vGuide)
    vGuide.attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')
    vGuide.selectAll('path')
        .style({ fill: 'none', stroke: "#000"})
    vGuide.selectAll('line')
        .style({ stroke: "#000"})

d3.select("g").insert("text")
        .text("USD")
        //.style("text-anchor", "end")
        .style("text-anchor", "middle")
        .attr("transform", "translate(-125," + height/2 + ") scale(1.5) rotate(270)")
        

        
d3.select("g").insert("text")
        .text("Years")
        //.style("text-anchor", "end")
        .style("text-anchor", "middle")
        .attr("transform", "translate(" + width/2 + "," + (height + margin.bottom/1.5) + ") scale(1.5)")
        

hAxis = d3.svg.axis()
    .scale(xScale)
    .orient('bottom')
    .tickValues(xScale.domain().filter(function(d, i) {
        return !(i % (dataset.length/5));
    }))

hGuide = d3.select('svg').append('g')
    hAxis(hGuide)
    hGuide.attr('transform', 'translate(' + margin.left + ', ' + (height + margin.top) + ')')
    hGuide.selectAll('path')
        .style({ fill: 'none', stroke: "#000"})
    hGuide.selectAll('line')
        .style({ stroke: "#000"})
    .append("text")
        .text("Frequency")
        .style("text-anchor", "end") 
} //end of createChart

function calculateInterest(init, growth, years) {
    interest = (balance * (growth));
    balance = balance + interest + (monthly * 12);
    var roundedBalance = Math.round(balance);
    return roundedBalance;
};



 function updateChart() {
    if(canUpdateValues("init")) {
        init = document.getElementById("init").value;
    }
    if(canUpdateValues("monthly")) {
        monthly = document.getElementById("monthly").value;
    }
    if(canUpdateValues("years")) {
        years = document.getElementById("years").value;
    }
    destroyChart();
    vGuideScale = d3.scale.linear();
    reloadChartData();
}

function reloadChartData() {
    generateDataSet();

    createChart();
    console.log(init);
    console.log(monthly);
    console.log(years);
}

function generateDataSet() {
   dataset = [];
   balance = parseInt(init);
   for(var i=1; i <= years; i++) {
        
        dataset.push(calculateInterest(init, growth, i));
    }

}

function canUpdateValues(name) {
    return((document.getElementById(name).value != ""));

}

function destroyChart() {
    d3.select("svg > *").remove();
    d3.select("svg").remove();
    balance = 0;
}

function redraw(){
  var items = myChart.selectAll('bar').data(dataset);
  items.enter().append('bar').call(dataset);
  items.exit().remove();
  items.call(dataset);
}
function assignPlaceHolders() {
    
    document.getElementById("monthly").placeholder = monthly;
    document.getElementById("init").placeholder = init;
    document.getElementById("years").placeholder = years;
}

//add the event handler; for some reason it is automatically called once at the beginning.
document.getElementById("updateButton").addEventListener("click", updateChart);