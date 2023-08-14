import React, { useState, useRef, useEffect } from 'react';
import { Configuration, OpenAIApi } from 'openai';
import ruleBasedRules from './content2.json';
import './ChatBotBtn.css';
import raw from './context.txt';
const ChatBotBtn = () => {

    const [userMessage, setUserMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([
        { role: 'incoming', content: 'Hi there 👋\nHow can I help you today?' },
    ]);
    const chatInputRef = useRef(null);

    // adjusting size of text area with respect to chat msgs
    useEffect(() => {
        chatInputRef.current.style.height = `${chatInputRef.current.scrollHeight}px`;
    }, [userMessage]);

    useEffect(() => {
        chatboxRef.current.scrollTo(0, chatboxRef.current.scrollHeight);
    }, [chatMessages]);

    const createChatLi = (message, className) => {
        const chatLi = {
            role: className,
            content: message,
        };
        return chatLi;
    };


    const processUserQuery = (userQuery) => {
        const matchedRule = ruleBasedRules.find((rule) =>
            rule.question.toLowerCase().includes(userQuery.toLowerCase())

        );

        return matchedRule ? matchedRule.context : null;
    };



    async function generateResponse_roberta(query, context) {

        if (null == context) {
            const fileResponse = await fetch(raw);
            context = await fileResponse.text();
        }

        const data = {
            "inputs": {
                "question": query,
                "context": context
            }
        };
        //https://huggingface.co/autoevaluate/extractive-question-answering
        const model1 = "https://api-inference.huggingface.co/models/autoevaluate/extractive-question-answering";
        const response = await fetch(
            model1,
            {
                headers: { Authorization: "Bearer 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" },
                method: "POST",
                body: JSON.stringify(data),
            }
        );
        const result = await response.json();


        console.log("Query: ", query);
        // console.log("context: ", context);
        console.log("Answer: ", result.answer);


        setChatMessages((prevMessages) => [
            ...prevMessages,
            createChatLi(result.answer, 'incoming'),
        ]);




    }


    const getOpenAIChatCompletion = async (userMessage) => {


        let messages1 = [
            {
                "role": "system",
                "content": "When I ask any question , you will reply with a document that contains maximum 5 tools name. no description\n"
            },
            {
                "role": "user",
                "content": userMessage
            },
            {
                "role": "assistant",
                "content": "1. Screwdriver\n2. Wood glue\n3. Clamps\n4. Sandpaper\n5. Paint or varnish"
            },
            {
                "role": "assistant",
                "content": "1. Hammer\n2. Screwdriver\n3. Pliers\n4. Level\n5. Wood filler"
            },
            {
                "role": "assistant",
                "content": "1. Wrench\n2. Screwdriver\n3. Power drill\n4. Wood glue\n5. Sandpaper"
            }
        ];
        let messages = [
            {
                "role": "system",
                "content": "When I ask any question , you will reply with a document that contains maximum 5 tools name. no description\n"
            },
            {
                "role": "user",
                "content": userMessage
            },


        ];
        const configuration = new Configuration({
            apiKey: "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",
        });
        const openai = new OpenAIApi(configuration);

        const completion = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: messages,
            temperature: 1.0,
            max_tokens: 509,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });

        const result = completion.data.choices[0].message.content;
        console.log("Query: ", userMessage);
        // console.log("context: ", context);
        console.log("Answer: ", result);

        setChatMessages((prevMessages) => [
            ...prevMessages,
            createChatLi(result, 'incoming'),
        ]);


    };


    const handleChat = () => {


        const trimmedMessage = userMessage.trim();
        if (!trimmedMessage) return;

        setUserMessage('');


        setChatMessages((prevMessages) => [
            ...prevMessages,
            createChatLi(trimmedMessage, 'outgoing'),
        ]);



        //const context = processUserQuery(trimmedMessage);

        getOpenAIChatCompletion(trimmedMessage)
        //  generateResponse_roberta(trimmedMessage, context);
    };

    const handleInputChange = (event) => {
        setUserMessage(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey && window.innerWidth > 800) {
            event.preventDefault();
            handleChat();
        }
    };
    const toggleChatbot = () => {
        document.body.classList.toggle("show-chatbot");
    };
    const chatboxRef = useRef(null);


    const autoQuestion = (question) => {
        setUserMessage(question);

    };



    return (
        <div className="chatbot-button">
            <button className="chatbot-toggler" onClick={toggleChatbot}>
                <span className="material-symbols-rounded">  <svg fill="#ffffff" width="65px" height="65px" viewBox="-5.04 -5.04 34.08 34.08" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" strokeWidth="0.00024000000000000003" transform="matrix(-1, 0, 0, 1, 0, 0)rotate(0)"><g id="SVGRepo_bgCarrier" strokeWidth="0" transform="translate(1.1999999999999993,1.1999999999999993), scale(0.9)"><rect x="-5.04" y="-5.04" width="34.08" height="34.08" rx="17.04" fill="#0083a5" strokeWidth="0"></rect></g><g id="SVGRepo_tracerCarrier" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.24000000000000005"></g><g id="SVGRepo_iconCarrier"><path d="M21 10.975V8a2 2 0 0 0-2-2h-6V4.688c.305-.274.5-.668.5-1.11a1.5 1.5 0 0 0-3 0c0 .442.195.836.5 1.11V6H5a2 2 0 0 0-2 2v2.998l-.072.005A.999.999 0 0 0 2 12v2a1 1 0 0 0 1 1v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a1 1 0 0 0 1-1v-1.938a1.004 1.004 0 0 0-.072-.455c-.202-.488-.635-.605-.928-.632zM7 12c0-1.104.672-2 1.5-2s1.5.896 1.5 2-.672 2-1.5 2S7 13.104 7 12zm8.998 6c-1.001-.003-7.997 0-7.998 0v-2s7.001-.002 8.002 0l-.004 2zm-.498-4c-.828 0-1.5-.896-1.5-2s.672-2 1.5-2 1.5.896 1.5 2-.672 2-1.5 2z"></path></g></svg>
                </span>
                <span className="material-symbols-outlined"><svg width="54px" height="54px" viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"><rect x="-2.4" y="-2.4" width="28.80" height="28.80" rx="14.4" fill="#0085a6"  ></rect></g><g id="SVGRepo_tracerCarrier" strokeLinejoin="round"  ></g><g id="SVGRepo_iconCarrier"> <path d="M16 8L8 16M8.00001 8L16 16" stroke="#ffffff" strokeWidth="1.5" strokeLinejoin="round" ></path> </g></svg></span>
            </button>
            <div className="chatbot">
                <header>
                    <h2>Chatbot</h2>
                    <p>powered by OpenAI</p>
                    <span className="close-btn material-symbols-outlined">close</span>
                </header>
                <ul className="chatbox" ref={chatboxRef}>
                    <button id="send-btn" className="material-symbols-rounded qsize" onClick={() => autoQuestion("What tools I need to fix Study Table ?")}>
                        What tools I need to fix Study Table ?
                    </button>
                    <br />
                    <button id="send-btn" className="material-symbols-rounded qsize" onClick={() => autoQuestion("What tool removes dirt from yard ?")}>
                        What tool removes dirt from yard ?
                    </button>

                    {chatMessages.map((message, index) => (
                        <li key={index} className={`chat ${message.role}`}>
                            {message.role === 'incoming' && (
                                <span>
                                    <svg fill="#ffffff" width="40px" height="40px" viewBox="-5.04 -5.04 34.08 34.08" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" strokeWidth="0.00024000000000000003" transform="matrix(-1, 0, 0, 1, 0, 0)rotate(0)"><g id="SVGRepo_bgCarrier" strokeWidth="0" transform="translate(1.1999999999999993,1.1999999999999993), scale(0.9)"><rect x="-5.04" y="-5.04" width="34.08" height="34.08" rx="17.04" fill="#0083a5" strokeWidth="0"></rect></g><g id="SVGRepo_tracerCarrier" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.24000000000000005"></g><g id="SVGRepo_iconCarrier"><path d="M21 10.975V8a2 2 0 0 0-2-2h-6V4.688c.305-.274.5-.668.5-1.11a1.5 1.5 0 0 0-3 0c0 .442.195.836.5 1.11V6H5a2 2 0 0 0-2 2v2.998l-.072.005A.999.999 0 0 0 2 12v2a1 1 0 0 0 1 1v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a1 1 0 0 0 1-1v-1.938a1.004 1.004 0 0 0-.072-.455c-.202-.488-.635-.605-.928-.632zM7 12c0-1.104.672-2 1.5-2s1.5.896 1.5 2-.672 2-1.5 2S7 13.104 7 12zm8.998 6c-1.001-.003-7.997 0-7.998 0v-2s7.001-.002 8.002 0l-.004 2zm-.498-4c-.828 0-1.5-.896-1.5-2s.672-2 1.5-2 1.5.896 1.5 2-.672 2-1.5 2z"></path></g></svg>
                                </span>
                            )}
                            <p>{message.content}</p>
                        </li>
                    ))}
                </ul>
                <div className="chat-input">
                    <textarea
                        placeholder="Enter a message..."
                        spellCheck="false"
                        required
                        ref={chatInputRef}
                        value={userMessage}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                    ></textarea>
                    <span id="send-btn" className="material-symbols-rounded" onClick={handleChat}>
                        send
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ChatBotBtn;
