
import { Fragment } from "react";
import { getEventById, getFeaturedEvents } from "../../helpers/api-util";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";

function EventDetailPage(props) {
  const event= props.selectedEvent

  if (!event) {
    return (
      // changing this to a Loading message instead of an error message b/c
      // now in getStaticPaths we are NOT preloading all pages/events so we
      // expect certain events to not initially exist before next generates the
      // page. For those events that do exist (but not pregenerated) we don't want
      // an error message (even temporarily) to display.
      <div className='center'>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export async function getStaticProps(context) {
 const eventId = context.params.eventId

 const event= await getEventById(eventId)

 return {
   props: {
     selectedEvent: event
   },
   // the event details page has more important information users would need
   // if there are changes (date, time, location) than just the event name
   // displayed on Homepage. therefore a shorter revalidate time is better.
   // If a new request comes in and the page was regenerated < 30seconds ago,
   // it will be regenerated again.
   revalidate: 30
 }
}

export async function getStaticPaths() {
 // instead of fetching all events and prerendering all event detail pages
 // it might be better to fetch and prerender only the featured events
  
 // const events = await getAllEvents()

  const events = await getFeaturedEvents()

  const paths = events.map(event => ({ params: {eventId: event.id}}))

  return {
    paths: paths,
    // we could set fallback to 'blocking' and then Next would wait until the 
    // non-pregenerated page is loaded. It would take a little longer but we 
    // wouldn't need to display the loading message while it loads.
    fallback: true
  }
}

export default EventDetailPage;
