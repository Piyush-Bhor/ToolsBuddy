
import React, { useState, useEffect } from "react";
import useFetch from '../../hooks/useFetch';
import Avatar from '../../assets/avatar-icon.png';
import { AiOutlineSend } from "react-icons/ai";
import { IconContext } from "react-icons";
import Icon from '../../assets/re.png';

function Messages() {
    const url = "/profile/readAllIncomingMessages/647e6256cf9632b4ec39bbe1";
    const [messages, setMessages] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [errorMessage, setErrorMessage] = useState();

    const fetchData = () =>{
        setMessages([]);
        setIsLoaded(false);
        setErrorMessage('');

        fetch(url, {
            accept: 'application/json',
          })
        
        .then(response => {
            if(!response.ok){
                throw Error('Could not fetch the data');
            }
            else{
                setIsLoaded(false);
                return response.json()
            }
        })

        .then(data =>{
            setIsLoaded(true);
            setMessages(data);
        })

        .catch(error => {
            setErrorMessage(error.message);
            setIsLoaded(true);
        })
    }

    useEffect(()=>{
        fetchData();
    },[url])

    useEffect(()=>{
        console.log(messages);
    },[messages])

    return (
        
        <div className="messages">
            <section>
                <h1>Messages</h1>
                <div className="inside">
                    <aside>
                        <h4>Conversations</h4>
                        <div >
                            <div className="convo-info">
                                <img src={Icon}></img>
                                <div>
                                    <p>Queen Elizabeth</p>
                                    <p className="snippet">Hi, I'm interested in renting this telescope...</p>
                                    
                                </div>
                            </div>
                            
                        </div>
                    </aside>
                    
                    <article>
                        <h4>Queen Elizabeth</h4>
                        <div className="incoming">
                            <img src={Icon}></img>
                            <div class="talk-bubble tri-right left-top">
                                <div class="talktext">
                                    <p>Hi, I'm interested in renting this telescope to find black holes</p>
                                </div>
                            </div>
                        </div>
                        

                        <div className="messaging-input">
                            <input className="messaging" placeholder="Enter your message..."></input>
                            
                            <button className="send"><AiOutlineSend /></button>
                        </div>
                        
                        {/* {!isLoaded && !errorMessage && <p>Loading...</p>}
                        {errorMessage && !messages && <p> {errorMessage}</p>}

                        { messages && (messages.map((message, i)=>{
            
                        return(
                            
                        <div className="message-list" key={i}>
                            <p className="individual-message">
                                {message.content}
                            </p> 
                            
                        </div>
                        )}))} */}
                        
                    </article>
                </div>
                
            </section>
        </div>
    );
}

export default Messages;