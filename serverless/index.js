const handler = require("./handler");

const jsonData = JSON.stringify({
  points: [
    { lat: 46.24198447485354, lng: 6.0256542816338605, ts: 1606516113330 },
    { lat: 46.24063076210158, lng: 6.030039239718037, ts: 1606516324169 },
  ],
});

const data = handler.handle({
  body: jsonData,
});

console.log(data);
