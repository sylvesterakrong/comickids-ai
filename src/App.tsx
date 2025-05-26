import _App from './pages/_app';
import Footer from './components/Footer';
import { Analytics } from "@vercel/analytics/react"

const App = () => (
    <div className="min-h-screen flex flex-col">
        <Analytics />
        <_App />
        <Footer />
    </div>
);

export default App;
