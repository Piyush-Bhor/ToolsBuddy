import './home.css';
import Hero from '../../assets/working.png'

function Home() {
  return (
    <div className="home">
      <div className="searchbar">
        <p className="hero-text">Borrow and lend tools.</p>
        <form>
          <input type="text" placeholder="Search..." />
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="hero">
        <img alt="woodworking" src={Hero}></img>
      </div>
      
      <div className="listings">

      </div>
    </div>
  );
}

export default Home;
