
import React, { useState, useEffect } from "react";
function Test() {
    const [username, setUsername] = useState("");
    const [incomingMessages, setIncomingMessages] = useState([]);
    const [outgoingMessages, setOutgoingMessages] = useState([]);
    const [itemsLend, setItemsLend] = useState("");
    const [itemsRented, setItemsRented] = useState("");


    async function handleForm(e){
        e.preventDefault();
        let messages = {
            incomingMessages: incomingMessages, 
            outgoingMessages: outgoingMessages
        }
        
        // post
        await fetch("http://localhost:8080/auth/oauth/callback", {
            method:'post',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                itemName: username,
                itemsRented: itemsRented,
                messages: messages,
                itemsLend: itemsLend
            })
        })
        .catch(error => {
            console.log(error);
        });
        console.log()
    }

    return (
        
        <div className="test">
            <h1>Test</h1>
            <section>
                
                <form method="post" onSubmit={handleForm} className="listing-form">
                    <div className="inputs">

                        <label for="username">username</label>
                        <input id="username" 
                        value = { username }
                        onChange={(e) => setUsername(e.target.value)}
                         />

                        <label for="itemsRented">itemsRented</label>
                        <input id="itemsRented" 
                        value = { itemsRented }
                        onChange={(e) => setItemsRented(e.target.value)} 
                        />

                        <label for="incomingMessages">incomingMessages</label>
                        <input id="incomingMessages" 
                        value = { incomingMessages }
                        onChange={(e) => setIncomingMessages(e.target.value)} 
                        />

                        <label for="outgoingMessages">outgoingMessages</label>
                        <input id="outgoingMessages" 
                        value = { outgoingMessages }
                        onChange={(e) => setOutgoingMessages(e.target.value)} 
                        />

                        <label for="itemsLend">itemsLend</label>
                        <input id="itemsLend" 
                        value = { itemsLend }
                        onChange={(e) => setItemsLend(e.target.value)} />

                        <button type="submit">Submit</button>
                    </div>
                    
                </form>
            </section>
        </div>
    );
}

export default Test;