// Assign the data from `data.js` to a descriptive variable
const sightsData = data;

// Function that shows data in HTML table.
function showData(data2Show){

    //  Using D3 select the table
    let table = d3.select("table>tbody");

    // Clean previous information
    table.html("");

    // Show the information
    data2Show.forEach(row => {
        new_row = table.append("tr");
        new_row.append("td").text(row.datetime);
        new_row.append("td").text(row.city);
        new_row.append("td").text(row.state);
        new_row.append("td").text(row.country);
        new_row.append("td").text(row.shape);
        new_row.append("td").text(row.durationMinutes);
        new_row.append("td").text(row.comments);
    });
}

function filterAndShow(Data, filterArray) {
// filter by each filter in the array
    filterArray.forEach(f => Data = Data.filter(f)); 

// show the filtered data
    showData(Data);
}

// Function that gathers all data from HTML form and return an
// array with filters for those attributes for which a value
// was specified
function gatherData() {
    let filterArray = [];
    
    // Select input elements and populate filter array
    let dateFrom = d3.select("#datetimefrom").property("value");
    if (dateFrom.length > 0) {
        dateFrom = moment(dateFrom, 'YYYY-MM-DD').format('M/D/YYYY')
        filterArray.push(sight => sight.datetime === dateFrom);
    }

    let city = d3.select("#city").property("value").toLowerCase();
    if (city.length > 0) filterArray.push(sight => sight.city === city);

    let state = d3.select("#state").property("value");
    if (state.length > 0) filterArray.push(sight => sight.state === state);

    let country = d3.select("#country").property("value");
    if (country.length > 0) filterArray.push(sight => sight.country === country);

    let shape = d3.select("#shape").property("value");
    if (shape.length > 0) filterArray.push(sight => sight.shape === shape);

    return (filterArray);
}


// Show all data
showData(sightsData);

// Associate buttons
let filterBtn = d3.select("#filter-btn");
let cleanBtn = d3.select("#clean-btn");

// Act on Submit click
filterBtn.on("click", function() {
    let filterArray = gatherData();
    filterAndShow(sightsData, filterArray);
});

// Act on Clean click
cleanBtn.on("click", function() {

    d3.select("#datetimefrom").node().value = "";
    d3.select("#city").node().value = "";
    d3.select("#state").node().value = "";
    d3.select("#country").node().value = "";
    d3.select("#shape").node().value = "";

    showData(sightsData);
});

