import Layout from '../components/Layout';
import '../styles/globals.css';
export default function App(_a) {
    var Component = _a.Component, pageProps = _a.pageProps;
    return (<Layout>
      <Component {...pageProps}/>
    </Layout>);
}
