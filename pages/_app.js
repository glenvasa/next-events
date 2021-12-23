import Head from 'next/head'

import '../styles/globals.css'
import Layout from '../components/layout/layout'
import Notification from '../components/ui/notification'

function MyApp({ Component, pageProps }) {
  return <Layout>
    {/* use to inject meta data into head element across all pages */}
    <Head>
      {/* title and meta description below would apply to all pages unless overwritten with a title tag in a specific page */}
      <title>Next Events</title>
      <meta name='description' content='NextJS Events' />
      <meta name='viewport' content='initial-scale=1.0, width=device-width' />
    </Head>
     <Component {...pageProps} />
     {/* <Notification title='Test' message='This is a test.' status='error'/> */}
  </Layout>
 
}

export default MyApp
