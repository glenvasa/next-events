import Head from 'next/head'

import { getFeaturedEvents} from '../helpers/api-util'
import EventList from '../components/events/event-list'
import NewsletterRegistration from '../components/input/newsletter-registration'

function HomePage(props){

    return <div>
        <Head>
            <title>NextJS Events</title>
            <meta name="description" content="Find a lot of great events that allow you to evolve..."/>
        </Head>
        <NewsletterRegistration />
        <EventList items={props.events}/>
    </div>
}

export async function getStaticProps() {
    const featuredEvents = await getFeaturedEvents()
    return {
        props: {
            events: featuredEvents
        },
        // every 1/2 hour this page is regenerated for a new incoming request
        // home page w/featured events probably won't change that often so
        // 1800 seconds is reasonable revalidate time
        // we don't want to use getServerSideProps w/ this page b/c it would be
        // overkill to regenerate the page for every request.
        // Also if we don't add revalidate property, then we would have to redeploy
        // the app every time we changed the featured events on the homepage.
        revalidate: 1800
    }
}

export default HomePage