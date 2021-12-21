// allows you to customize all elements that make up the html document
import Document, { Html, Head, Main, NextScript} from 'next/document'

class MyDocument extends Document {
    render() {
        return (
            // could add certain attributes to customize Html document
            <Html lang='en'>
                <Head />
                <body>
                    {/* can also add other elements like divs, etc. */}
                    {/* this div is outside of the application component tree and could be used by a React portal 
                    we could select this div w/React portal to portal modals or overlays to this element */}
                    <div id="overlays" />
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument