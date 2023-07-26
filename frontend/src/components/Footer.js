import './components.css';
import { AiOutlineGithub, AiOutlineTwitter, AiFillLinkedin, AiOutlineArrowUp } from "react-icons/ai";

function Footer() {

  const scrollToTop = () =>{
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
    });
  };

    return (
      <div className="footer">
        <button className="up" onClick={scrollToTop}><AiOutlineArrowUp /></button>
        <div className="footer-grid">
          <div className="socials">
            <h4>Rental App</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
              sed do eiusmod tempor incididunt ut labore et dolore magna 
              aliqua. Ut enim ad minim veniam.</p>
            <AiOutlineGithub className="footer-icon"/>
            <AiOutlineTwitter className="footer-icon"/>
            <AiFillLinkedin className="footer-icon"/>
          </div>
          <div>
            <h4>Links</h4>
            <ul>
              <li>About</li>
              <li>Search</li>
              <li>Account</li>
            </ul>
          </div>
          <div>
          <h4>Links</h4>
            <ul>
              <li>About</li>
              <li>Search</li>
              <li>Account</li>
            </ul>
          </div>
        </div>
        <hr/>
        <div className="copy">
          <p>&copy; PYCS 2023</p>
        </div>
        
        
      </div>
    );
  }
  
  export default Footer;