function list(territories) {
  const count = territories.length;
  const data = [];

  territories.forEach(t => data.push(formatTerritory(t)));

  return { count, data };
}

function one(territory) {
  return {
    data: formatTerritory(territory),
    error: false
  };
}

function formatTerritory(territory) {
  return {
    id: territory._id,
    name: territory.name,
    start: territory.start,
    end: territory.end,
    area: territory.area,
    painted_area: territory.painted_area || 0
  };
}

module.exports = {
  list,
  one
};
