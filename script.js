



let geojson = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {
          "name": "Africa"
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [[[-6, 36], [33, 30], [43, 11], [51, 12], [29, -33], [18, -35], [7, 5], [-17, 14], [-6, 36]]]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "name": "Australia"
        },
        "geometry": {
          "type": "Polygon",
          "coordinates": [[[143, -11], [153, -28], [144, -38], [131, -31], [116, -35], [114, -22], [136, -12], [140, -17], [143, -11]]]
        }
      },
      {
        "type": "Feature",
        "properties": {
          "name": "Timbuktu"
        },
        "geometry": {
          "type": "Point",
          "coordinates": [-3.0026, 16.7666]
        }
      }
    ]
};


  
let projectionType = d3.geoEquirectangular();


let geoGenerator = d3.geoPath()
    // .pointRadius(35)
    .projection(projectionType)


function drawBayOutline(geojsonData) {
    projectionType.fitExtent([[0, 0], [800, 800]], geojsonData)
    let u = d3.select('#map g.bayoutline')
        .selectAll('path')
        //.features in order to access array of objects
        .data(geojsonData.features)
    console.log('ex', geojsonData.features);

    u.enter()
        .append('path')
        .attr('d', geoGenerator);
}

function drawShops(csvData) {
  console.log('inside drawShops!!!!', csvData[0].coordinates);
  projectionType.fitExtent([[0, 0], [800, 800]], csvData)
  let u = d3.select('#map g.shops')
      .selectAll('path')
      //csv file returns arary of objects, so need for .features
      .data(csvData)

  u.enter()
      .append('path')
      .attr('d', geoGenerator);
}





d3.json('bayarea.geojson')
    .then(function(bayOutlineData) {
        // console.log('DATA ->', data);
        // console.log('first elem ->', data.features[0]);
        drawBayOutline(bayOutlineData)
});


let yelpData = []



d3.csv("yelp.csv")
.then(function(shopData) {
    console.log('isArray?', Array.isArray(shopData));
    console.log('DATA ->', shopData);
    // console.log('typeof ->', typeof data);
    console.log('first elem ->', shopData[0]);
    // drawShops(shopData)
    yelp = shopData;
});

let circles = [];

let drag = d3.drag()
  .on('drag', handleDrag);

function handleDrag(element) {
  element.subject.x = element.x;
  element.subject.y = element.y;
  update();
}

function initDrag() {
  d3.select('svg')
    .selectAll('circle')
    .call(drag);
}

function updateData() {
  circles = [];
  for(let i = 0; i < 2; i++) {
    circles.push({
      id: i,
      x: Math.random() * 800,
      y: Math.random() * 800
    });
  }
}

function update() {
  d3.select('svg')
    .selectAll('circle')
    .data(circles)
    .join('circle')
    .attr('cx', function(d) { return d.x; })
    .attr('cy', function(d) { return d.y; })
    .attr('r', 30);

  
}

updateData();
update();
initDrag();

