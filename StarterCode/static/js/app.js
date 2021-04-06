// d3.json("./samples.json").then((importedData) => {
//   // console.log(importedData);
//   var data = importedData;

//   var names = data.names;
  // var metadata = data.metadata;
  // var samples = data.samples;

//   // console.log(samples);

// });

function init() {
  d3.json("./samples.json").then((importedData) => {
    var names = importedData.names;
    var metaData = importedData.metadata;
    var samples = importedData.samples;

    var display = d3.select("#selDataset")
    names.forEach((sample) => {
      display.append("option")
      .text(sample)
      .property("value", sample);
    })
    
    display.on("change", updateMetadata)
    // display.on("change", buildChart)

    var firstSample = names[0];

    var displayPanel = d3.select("#sample-metadata");
    // console.log(metaData)
    sample = d3.select("#selDataset").property("value")
    // console.log(sample)
    
    var filteredData = metaData.filter(row => row.id == firstSample)[0];
    Object.entries(filteredData).forEach(([key, value]) => {
      displayPanel.append("h6")
      .text(`${key}: ${value}`);
    });

    var displayBar = d3.select("#bar");
    var otu_Ids = samples[0]["otu_ids"].slice(0,10).map(id => "otu"+String(id)).reverse()
    var sample_Values = samples[0]["sample_values"].slice(0,10).reverse()
    var otu_Labels = samples[0]["otu_Labels"]

    // console.log(sample_Values)
    
    var trace1 = {
      type: "bar",
      orientation: "h",
      // mode: "lines",
      // name: otu_Ids,
      x: sample_Values,
      y: otu_Ids,
      // line: {
      //   color: "#17BECF"
      // }
    };
    Plotly.newPlot("bar", [trace1]);
  });
}; 

    // buildChart(firstSample);

function updateChart() {
  d3.json("./samples.json").then((importedData) => {
    var displayBar = d3.select("#bar");
    sample = d3.select("#selDataset").property("value")

    var samples = importedData.samples
    var filteredSamples = samples.filter(row => row.id == sample)[0];

    console.log(filteredSamples)

    var otu_Ids = filteredSamples[0]["otu_ids"].slice(0,10).map(id => "otu"+String(id)).reverse()
    var sample_Values = filteredSamples[0]["sample_values"].slice(0,10).reverse()
    var otu_Labels = filteredSamples[0]["otu_Labels"]

    // console.log(sample_Values)
    
    var trace1 = {
      type: "bar",
      orientation: "h",
      // mode: "lines",
      // name: otu_Ids,
      x: sample_Values,
      y: otu_Ids,
      // line: {
      //   color: "#17BECF"
      // }
    };
    Plotly.newPlot("bar", [trace1]);
  });
}



function updateMetadata() {
  d3.json("./samples.json").then((importedData) => {
    var displayPanel = d3.select("#sample-metadata");
    displayPanel.html("");
    var metaData = importedData.metadata;
    // console.log(metaData)
    sample = d3.select("#selDataset").property("value")
    // console.log(sample)
    
    var filteredData = metaData.filter(row => row.id == sample)[0];
    Object.entries(filteredData).forEach(([key, value]) => {
      displayPanel.append("h6")
      .text(`${key}: ${value}`);
      })
  })
};

// On change to the DOM, call getData()
// d3.selectAll("#selDataset").on("change", getData);

// // Function called by DOM changes
// function getData() {
//   var dropdownMenu = d3.select("#selDataset");
//   // Assign the value of the dropdown menu option to a variable
//   var dataset = dropdownMenu.property("value");
//   // Initialize an empty array for the country's data
//   var data = [];

//   if (dataset == 'us') {
//       data = us;
//   }
//   else if (dataset == 'uk') {
//       data = uk;
//   }
//   else if (dataset == 'canada') {
//       data = canada;
//   }
//   // Call function to update the chart
//   updatePlotly(data);
// }

// // Update the restyled plot's values
// function updatePlotly(newdata) {
//   Plotly.restyle("bar", "values", [newdata]);

  
init();
// metaData_table();
