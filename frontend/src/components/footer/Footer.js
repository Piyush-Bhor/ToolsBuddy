import './footer.css';
import { AiOutlineGithub } from "react-icons/ai";
import { AiOutlineTwitter } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";

function Footer() {
    return (
      <div className="footer">
        <p style={{fontWeight:"bold"}}>Get in Touch</p>
        <div className="socials">
          <AiOutlineGithub/>
          <AiOutlineTwitter/>
          <AiFillLinkedin/>
        </div>
        <p>&copy; PYCS 2023</p>
        
      </div>
    );
  }
  
  export default Footer;