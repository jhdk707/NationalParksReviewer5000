// natlprksapi.js
const apiKey = process.env.API_KEY;
const url = `https://developer.nps.gov/api/v1/parks?api_key=${apiKey}`;

export const getNationalParks = async (searchTerm) => {
  const response = await fetch(url);
  const data = await response.json();
  const parks = data.data;

  if (searchTerm) {
    return parks.filter((park) => {
      return (
        park.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        park.states.toLowerCase().includes(searchTerm.toLowerCase()) ||
        park.activities.some((activity) =>
          activity.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    });
  } else {
    return parks;
  }
};
