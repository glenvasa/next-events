export async function getAllEvents() {
  const response = await fetch(
    "https://next-events-d4733-default-rtdb.firebaseio.com/events.json"
  );
  const data = await response.json();

  const events = [];

  for (const key in data) {
    events.push({
      id: key,
      ...data[key]
    //   date: data[key].date,
    //   description: data[key].description,
    //   image: data[key].image,
    //   isFeatured: data[key].isFeatured,
    //   location: data[key].location,
    //   title: data[key].title,
    });
  }

  return events
}

export async function getFeaturedEvents() {
    const allEvents = await getAllEvents()
  return allEvents.filter((event) => event.isFeatured);
}
