var values = [
    {price: 700, sqft: 3000, br: 3, pets: ['cats', 'dogs']},
    {price: 445, sqft: 1700, br: 2, pets: []},
    {price: 421, sqft: 1455, br: 2, pets: ['cats', 'dogs']},
    {price: 411, sqft: 1314, br: 2, pets: ['dogs']},
    {price: 275, sqft: 1200, br: 1, pets: ['cats']},
    {price: 500, sqft: 650, br: 1, pets: []},
];

// draw bubbles
var svg = d3.select('svg');
var selection = svg.selectAll('g')
    .data(values)
    .enter().append('g')
    .attr('transform', 'translate(50,10)');
selection.append('circle')
    .attr('cx', (d,i) => d.price/2)
    .attr('cy', (d,i) => (4000 - d.sqft)/(4000/400))
    .attr('r', (d,i) => d.br*10)
    .style('fill', (d,i) => color(d.pets))
    .style('opacity', '0.5')
    .append('svg:title').text( (d,i) => print(d));
function color(pets) {
    var dogs = pets.indexOf('dogs') != -1;
    var cats = pets.indexOf('cats') != -1;
    if (dogs) return cats ? 'purple' : 'blue';
    else cats ? 'red' : 'grey';
}
function print(home) {
    return `${home.price}k, ${home.sqft}sqft, ${home.br}BRs`;
}
// draw chart axis
var width = 400;
var height = 400;
// X-axis
var xScale = d3.scaleLinear().domain([0,width*2]).range([40,width + 40]);
var xAxis = d3.axisBottom(xScale);
svg.append('g')
    .attr('transform','translate(10,410)')
    .call(xAxis);

// Y-axis
var yScale = d3.scaleLinear().domain([0,height*10]).range([height,0]);
var yAxis = d3.axisRight(yScale);
svg.append('g')
    .attr('transform', 'translate(50,10)')
    .call(yAxis);

// chart labels
svg.append("text")             
    .attr("transform", "translate(" + (width/2 + 50) + " ," + (height +  50) + ")")
    .style("text-anchor", "middle")
    .text("Price ($1000)");
svg.append('text')
    .attr('transform', 'translate(0,' + height/2 +')')
    .style('text-anchor','start')
    .text('SQFT');