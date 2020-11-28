function getDistanceHaversine(point1, point2) {
  const R = 6371e3; // metres
  const φ1 = (point1.lat * Math.PI) / 180; // φ, λ in radians
  const φ2 = (point2.lat * Math.PI) / 180;
  const Δφ = ((point2.lat - point1.lat) * Math.PI) / 180;
  const Δλ = ((point2.lng - point1.lng) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // in metres
}

const transportEstimation = function (avgSpeed) {
  if (avgSpeed <= 5.5) {
    return "walking";
  } else if (avgSpeed <= 11) {
    return "jogging";
  } else if (avgSpeed < 28) {
    return "biking";
  } else {
    return "driving";
  }
};

exports.handle = function (event, context) {
  let distances = [];
  let speeds = [];
  const data = JSON.parse(event.body);
  for (let i = 1; i < data.points.length; i++) {
    console.log(data.points[i].ts);
    const time = Math.abs((data.points[i].ts - data.points[i - 1].ts) / 1000);
    console.log(time);
    const dist = getDistanceHaversine(data.points[i - 1], data.points[i]);
    distances.push(dist);
    speeds.push((dist / time) * 3.6); // m/s to km/h
  }
  const avgSpeed = speeds.reduce((a, b) => a + b, 0) / speeds.length;
  return {
    body: JSON.stringify({
      distances: distances,
      speeds: speeds,
      avgSpeed: avgSpeed,
      transport: transportEstimation(avgSpeed),
      totalDistance: distances.reduce((a, b) => a + b, 0) / 1000,
    }),
    statusCode: 200,
  };
};
