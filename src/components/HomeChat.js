import React, { useEffect, useRef, useState } from 'react'
import '../style/styleHome.css'
import * as _ from "lodash"
import avt from '../image/person.jpg'

import logo from '../image/logo.png'
import OutlinedInput from '@mui/material/OutlinedInput';

// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function HomeChat() {
    const sdt = localStorage.getItem("phone");
    const name = localStorage.getItem("name");
    const [value, setvalue] = useState("")
    const refDisplay = useRef(null)
    const [sockets, setsocket] = useState()
    const connectionUrl = "ws://chat.crm.tekmedi.com/";
    const [conID, setConID] = useState('a2214bc9881d43b7adae648eede9685e')
    const [ticketID, setTicketID] = useState('')
    // const [QAs, setQAs] = useState('')
    // const [ASs, setASs] = useState('')
    // const [clientId, setclientId] = useState('')
    // const [as, setAS] = useState([])
    useEffect(() => {
        const socket = new WebSocket(connectionUrl);
        setsocket(socket)
        socket.onopen = function (event) {


            socket.send(JSON.stringify(
                {
                    configuration:
                    {
                        isConfig: true,
                        name: name,
                        phone: sdt
                    },
                    clientID: "a2214bc9881d43b7adae648eede9685e",
                    connectionId: conID,
                    clientType: 0,
                    messageType: 0,
                    fileName: null,

                }));
        };

        socket.onclose = function (event) {
            console.log("a");


        };


        socket.onmessage = function (event) {

            console.log("Recieve: ", event)


            var a = JSON.parse(event.data);
            console.log("a", a);
            if (a.Code === "200") {
                setTicketID(a.Data.TicketId)

                // setclientId(a.Data.ClientId);
                setConID(a.Data.ConnectionID);


            }
            if (a.Code === "201") {
                const newmess = {

                    mgs: a.AutoFAQs,
                    clientType: 2,
                    MessageType: 0,
                    sendTime: "13h12"

                }
                setlistchat(listchat => [...listchat, newmess])
                setTimeout(() => {

                    refDisplay.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
                }, 50)
            }
        };

    }, [sdt])

    useEffect(() => {
        if (_.isEmpty(sdt)) {
            window.location.href = "/"
        }
    }, [])

    const send = () => {
        if (value !== '') {
            const newmess = {

                mgs: value,
                clientType: 0,
                MessageType: 0,
                sendTime: "13h12"

            }
            setlistchat(listchat.concat(newmess))
            sockets.send(JSON.stringify(
                {
                    connectionId: conID,
                    message: value,
                    messageType: '',
                    ticketId: ticketID,
                    isAutoAnswer: true,
                    clientType: 1,
                })
            );
            setTimeout(() => {

                refDisplay.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
            }, 50)
            setvalue('')
        }

    }
    // const handsend = () => {
    //     const newmess = [{

    //         mgs: QAs,
    //         clientType: 0,
    //         MessageType: 0,
    //         sendTime: "13h12"

    //     }, {

    //         mgs: ASs,
    //         clientType: 2,
    //         MessageType: 0,
    //         sendTime: "13h12"

    //     }]



    //     setlistchat(listchat => [...listchat, newmess])

    // }
    const [listchat, setlistchat] = useState([
        {
            id: 1,
            mgs: [`Chatbot TEKMEDI xin chào ${name}!`],
            clientType: 1,
            MessageType: 0,
            sendTime: "13h12"

        },
        {
            id: 1,
            mgs: [`Mời bạn nhập câu hỏi.`],
            clientType: 1,
            MessageType: 0,
            sendTime: "13h12"

        },

    ]
    )
    const keydownsend = (e) => {
        if (e.key === "Enter") {
            const newmess = {

                mgs: value,
                clientType: 0,
                MessageType: 0,
                sendTime: "13h12"

            }
            setlistchat(listchat.concat(newmess))
            sockets.send(JSON.stringify(
                {
                    connectionId: conID,
                    message: value,
                    messageType: '',
                    ticketId: ticketID,
                    isAutoAnswer: true,
                    clientType: 1,
                })
            );
            setTimeout(() => {

                refDisplay.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
            }, 50)
            setvalue('')
        }

    }

    return (
        <div className='home-chat'>

            <div className='chat-header'>
                <img className='img-avt' alt="Remy Sharp" src={avt} />
                <p className='title-name'>CHATBOT TEKMEDI</p>
                <img className='img-logo' alt="Remy Sharp" src={logo} />

            </div>
            <div className='chat-history' >
                <div ref={refDisplay}>
                    {listchat.map(mgs => {
                        if (mgs.clientType === 0) {
                            return (
                                <div >
                                    <div className='chat-agent'>
                                        <p> {mgs.mgs}</p>
                                        <p className='sendtime'>"13h12"</p>
                                    </div>

                                </div>

                            )
                        }

                        else if (mgs.clientType === 1) {
                            return (

                                <div >
                                    <div className='chat-bot'>
                                        <p > {mgs.mgs}</p>
                                        <p className='sendtime' >13h12</p>
                                    </div>
                                </div>


                            )
                        }
                        else if (mgs.clientType === 2) {
                            return (

                                <div >
                                    <div className='chat-bot'>
                                        {mgs.mgs.map(ms => (<div>
                                            {ms.Question !== null ?
                                                <div className='btnQA' onClick={(e) => {
                                                    const newmess = {

                                                        mgs: [ms.Question],
                                                        clientType: 0,
                                                        MessageType: 0,
                                                        sendTime: "13h12"

                                                    }
                                                   const newmes=  {

                                                        mgs: [ms.Answer],
                                                        clientType: 1,
                                                        MessageType: 0,
                                                        sendTime: "13h12"

                                                    }



                                                     setlistchat(listchat => [...listchat, newmess])
                                                    setlistchat(listchat => [...listchat, newmes])
                                                    setTimeout(() => {

                                                        refDisplay.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
                                                    }, 50)
                                                }}
                                                ><p className='btnQS'>{ms.Question}</p></div> 
                                                : <p>{ms.Answer}</p>}
                                        </div>))}

                                        <p className='sendtime' >13h12</p>
                                    </div>
                                </div>


                            )
                        }
                    })}

                </div>

            </div>
            {/* <div className='listQA'></div> */}
            <div className='chat-input'>
                <OutlinedInput className='input' placeholder="Please enter text" onChange={(e) => { setvalue(e.target.value) }} value={value} onKeyDown={(e) => { keydownsend(e) }} />
                <span className="material-icons send_icon" onClick={send} >
                    send
                </span>
            </div>
        </div>
    )
}

export default HomeChat




