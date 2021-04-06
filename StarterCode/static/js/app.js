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
    
    // display.on("change", updateMetadata)
    // display.on("change", buildChart)

    // var firstSample = names[0];

    // var displayPanel = d3.select("#sample-metadata");
    // // console.log(metaData)
    sample = d3.select("#selDataset").property("value")
    updateMetadata(sample)
    updateChart(sample)
    // // console.log(sample)
    
    // var filteredData = metaData.filter(row => row.id == firstSample)[0];
    // Object.entries(filteredData).forEach(([key, value]) => {
    //   displayPanel.append("h6")
    //   .text(`${key}: ${value}`);
    // });

    // var otu_Ids = samples[0]["otu_ids"].slice(0,10).map(id => "otu"+String(id)).reverse()
    // var sample_Values = samples[0]["sample_values"].slice(0,10).reverse()
    // var otu_Labels = samples[0]["otu_Labels"]

    // // console.log(sample_Values)
    
    // var trace1 = {
    //   type: "bar",
    //   orientation: "h",
    //   // mode: "lines",
    //   // name: otu_Ids,
    //   x: sample_Values,
    //   y: otu_Ids,
    //   // line: {
    //   //   color: "#17BECF"
    //   // }
    // };
    // Plotly.newPlot("bar", [trace1]);
  });
}; 

    // buildChart(firstSample);


function optionChanged(value) {
  console.log(value)
  updateMetadata(value)
  updateChart(value)
};

function updateChart(sample) {
  d3.json("./samples.json").then((importedData) => {
    var displayBar = d3.select("#bar");
    // sample = d3.select("#selDataset").property("value")

    var samples = importedData.samples
    var filteredSamples = samples.filter(row => row.id == sample)[0];

    console.log(filteredSamples)

    var otu_Ids = filteredSamples["otu_ids"].slice(0,10).map(id => "otu"+String(id)).reverse()
    var sample_Values = filteredSamples["sample_values"].slice(0,10).reverse()
    var otu_Labels = filteredSamples["otu_Labels"]

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



function updateMetadata(sample) {
  d3.json("./samples.json").then((importedData) => {
    var displayPanel = d3.select("#sample-metadata");
    displayPanel.html("");
    var metaData = importedData.metadata;
    // console.log(metaData)
    // sample = d3.select("#selDataset").property("value")
    console.log("sample",sample)
    
  
    var filteredData = metaData.filter(row => row.id == sample)[0];
    Object.entries(filteredData).forEach(([key, value]) => {
      displayPanel.append("h6")
      .text(`${key}: ${value}`);
      })
  })
};

  
init();

