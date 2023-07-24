import './App.css';
import Home from "./containers/home/Home.js"
import Search from "./containers/search/Search.js"
import Account from "./containers/account/Account.js"
import Navbar from "./components/Navbar.js"
import Footer from "./components/Footer.js"
import Rental from "./containers/rental/Rental.js"
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <div className="app">
      <Router>
        <nav>
          <Navbar />
        </nav>
        <main>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/search" element={<Search />}/>
            <Route path="/rental/:id/:index" element={<Rental />}/>
            <Route path="/account" element={<Account />}/>
          </Routes>
        </main>
        
        <footer>
          <Footer />
        </footer>
      </Router>
    </div>
    
  );
}

export default App;
