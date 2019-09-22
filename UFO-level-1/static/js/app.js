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
    console.log(data2Show);
}

// Show all data
showData(sightsData);
// Select the button
let filterBtn = d3.select("#filter-btn");

// Act on click of button
filterBtn.on("click", function() {
    
    // Get the date
    let dateFrom = d3.select("#datetimefrom").property("value");

    // Fulter by date
    filtereddata = sightsData.filter(sight => sight.datetime === dateFrom);

    // Show filtered data
    showData(filtereddata);
});