function init() {
  d3.json("samples.json").then((importedData) => {
    var names = importedData.names;
    var metaData = importedData.metadata;
    var samples = importedData.samples;

    var display = d3.select("#selDataset")
    names.forEach((sample) => {
      display.append("option")
      .text(sample)
      .property("value", sample);
    })
    
    sample = d3.select("#selDataset").property("value")
    updateMetadata(sample)
    updateChart(sample)
    updateBubble(sample)
    
  });
}; 



function optionChanged(value) {
  updateMetadata(value)
  updateChart(value)
  updateBubble(value)
};

function updateChart(sample) {
  d3.json("./samples.json").then((importedData) => {
    var displayBar = d3.select("#bar");

    var samples = importedData.samples
    var filteredSamples = samples.filter(row => row.id == sample)[0];

    var otu_Ids = filteredSamples["otu_ids"].slice(0,10).map(id => "otu"+String(id)).reverse()
    var sample_Values = filteredSamples["sample_values"].slice(0,10).reverse()
    var otu_Labels = filteredSamples["otu_labels"]
    
    var trace1 = {
      type: "bar",
      orientation: "h",
      // mode: "lines",
      // name: otu_Ids,
      x: sample_Values,
      y: otu_Ids,
      text: otu_Labels
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
    // console.log("sample",sample)
    
  
    var filteredData = metaData.filter(row => row.id == sample)[0];
    Object.entries(filteredData).forEach(([key, value]) => {
      displayPanel.append("h6")
      .text(`${key}: ${value}`);
      })
  })
};

function updateBubble(sample) {
  d3.json("./samples.json").then((importedData) => {
    var displayBar = d3.select("#bubble");
    // sample = d3.select("#selDataset").property("value")

    var samples = importedData.samples
    var filteredSamples = samples.filter(row => row.id == sample)[0];

    // console.log(filteredSamples)

    var otu_Ids = filteredSamples["otu_ids"]
    var sample_Values = filteredSamples["sample_values"]
    var otu_Labels = filteredSamples["otu_labels"]

    console.log(otu_Ids)
    
    var trace1 = {
      type: "scatter",
      // orientation: "h",
      mode: "markers",
      // name: ,
      x: otu_Ids,
      y: sample_Values,
      text: otu_Labels,
      marker: {
        size: sample_Values,
        color: otu_Ids
      }
    };
    var layout = {
      xaxis: {
        title: "OTU ID"
      }
    };

    Plotly.newPlot("bubble", [trace1], layout);
  });
}
  
init();

