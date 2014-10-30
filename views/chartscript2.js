/* Kucera's Compound Interest Chart v1.01
 */

var years = 40;     //number of years investing
var init = 1000;    //amount of money initially invested
var growth = 0.1;   //amount of yearly growth
var monthly = 500;  //amount of payment each month
var interest = 0; //the interest being returned
var dataset = [];   //this will display the money each year.
var addition = 0;
var balance = init;


for(var i=1; i <= years; i++) {
    dataset.push(calculateInterest(init, growth, i));
}

var colors = d3.scale.linear()
    .domain([0, dataset.length * .33, dataset.length * .66, dataset.length])
    .range(["#A0E142", "#95E56F", "#819090", "#6E8531"])

/* function calculateInterest(init, growth, years) {
    init = init + (addition);
    interest = init * (Math.pow((1 + growth), (years)));
    addition = (monthly * 12);
    return interest;
}; */

function calculateInterest(init, growth, years) {
    interest = (balance * (growth));
    balance = balance + interest + (monthly * 12);
    var roundedBalance = Math.round(balance);
    return roundedBalance;
};

//the temp color we need for transitions
var tempcolor;

//spacing and sizing
var margin = { top: 30, right: 30, bottom: 100, left:150 } //the margins of the chart
var height = 300,
    width = 300,
    barWidth = 50,
    barOffset = 5;

//scaling
var yScale = d3.scale.linear()
        .domain([0, d3.max(dataset)])
        .range([0, height]);

var xScale = d3.scale.ordinal()
        .domain(d3.range(0, dataset.length))
        .rangeBands([0, width], 0.2)

var myChart = d3.select('#chartDiv').append('svg')
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

var vGuideScale = d3.scale.linear()
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
        
        
var hAxis = d3.svg.axis()
    .scale(xScale)
    .orient('bottom')
    .tickValues(xScale.domain().filter(function(d, i) {
        return !(i % (dataset.length/5));
    }))

var hGuide = d3.select('svg').append('g')
    hAxis(hGuide)
    hGuide.attr('transform', 'translate(' + margin.left + ', ' + (height + margin.top) + ')')
    hGuide.selectAll('path')
        .style({ fill: 'none', stroke: "#000"})
    hGuide.selectAll('line')
        .style({ stroke: "#000"})
    .append("text")
        .text("Frequency")
        .style("text-anchor", "end")