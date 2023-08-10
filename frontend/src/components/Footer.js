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
            <h4>Tools Buddy</h4>
            <p>Tool Buddy is a cutting-edge app that connects people looking to borrow tools with those 
              who have them to lend. Our platform fosters a vibrant community of tool enthusiasts, 
              empowering them to save money, earn money, and forge meaningful connections with like-minded
              individuals.</p>
            <AiOutlineGithub className="footer-icon"/>
            <AiOutlineTwitter className="footer-icon"/>
            <AiFillLinkedin className="footer-icon"/>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>
              <li>About</li>
              <li>Search</li>
              <li>Account</li>
            </ul>
          </div>
          <div>
          <h4>Legal</h4>
            <ul>
              <li>Acknowledgements</li>
              <li>Terms & Conditions</li>
              <li>Contact Us</li>
            </ul>
          </div>
        </div>
        <div className="copy">
          <p>&copy; Tools Buddy 2023</p>
        </div>
        
        
      </div>
    );
  }
  
  export default Footer;