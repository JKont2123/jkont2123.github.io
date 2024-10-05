// Create and render the bar chart
// async function to load data from datasets/videogames_long.csv using d3.csv and then make visualizations
async function render() {
    // load data
    const videogames = await d3.csv("./dataset/videogames_wide.csv");
  
    const vlSpec = vl
      .markBar()
      .data(videogames)
      .title("Global Sales by Genre and Platform")
      .encode(
        vl.y().fieldN('Genre'),
        vl.x().fieldQ('Global_Sales').stack(null),
        vl.tooltip().fieldN('Genre'),   
        vl.facet().fieldN("Platform").columns(4).sort({"op":"count","field":"Name","order":"descending"})
      )

      .width(300)
      .toSpec();
  
    vegaEmbed("#view", vlSpec).then((result) => {
      const view = result.view;
      view.run();
    })

    const vlSpec2 = vl
    .markCircle()
      .data(videogames)
      .title("Sales Over Time by Platform and Genre")
      .encode(
        vl.x().fieldT('Year'),
        vl.y().fieldN('Genre'),
        vl.color().fieldN('Genre'),
        vl.size().fieldQ('Global_Sales'),
        vl.tooltip().fieldN('Global_Sales'),    
        vl.facet().fieldN("Platform").columns(4).sort({"op":"count","field":"Name","order":"descending"})
      )

      .width(500)
      .toSpec();
  
    vegaEmbed("#view2", vlSpec2).then((result) => {
      const view = result.view;
      view.run();
    })

    const vlSpec3 = vl
      .markLine()
      .data(videogames)
      .title("Regional Sales vs. Platform")
      .encode(
          vl.x().fieldN('Platform'),
          vl.y().fieldQ(vl.repeat('layer')).scale({domain: [0, 50]}).title("Regional Sales"),
          vl.color().datum(vl.repeat('layer'))
      )
      .width(1500)
      .height(700)
      .repeat(vl.layer(['NA_Sales', 'EU_Sales', 'JP_Sales', 'Other_Sales']))
      .toSpec();
  
    vegaEmbed("#view3", vlSpec3).then((result) => {
      const view = result.view;
      view.run();
    })
    
    const vlSpec4 = vl
      .markBar()
      .data(videogames)
      .title("Genre Popularity by Year")
      .encode(
        vl.x().fieldT('Year'),
        vl.y().fieldN('Genre').aggregate('count').title("Number of Games"),
        vl.facet().fieldN("Genre").columns(4).sort({"op":"count","field":"Name","order":"descending"})
      )

      .width(300)
      .toSpec();
  
    vegaEmbed("#view4", vlSpec4).then((result) => {
      const view = result.view;
      view.run();
    })
  }

  render();