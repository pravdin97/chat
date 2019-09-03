import React, { useEffect, useState } from 'react'
import { getMessageHistory, sendMessage, onlineUsers, leaveRoom, getRoomLink } from '../api'

function Chat({user, room, onLeave}) {
    
    let [messages, setMessages] = useState()

    let [msgText, setMsgText] = useState()

    let [online, setOnline] = useState()

    let [link, setLink] = useState()

    useEffect(() => {
        getMessageHistory(room, setMessages)
        getRoomLink(room, setLink)
    }, [room])

    function handleChangeMessageText(event) {
        setMsgText(event.target.value)
    }

    function acceptMsgText() {
        if (msgText !== '') {
            sendMessage(
                room, 
                {user: user, text: msgText, date: new Date()}, 
                (data) => setMessages(data) 
            )
            document.getElementById('text').value=''
        }
    }

    function updateOnline() {
        onlineUsers(room, setOnline)
    }

    function leave() {
        leaveRoom()
        onLeave()
    }
    
    return <div className="container">
        <div className="row">
            <div className="col-md-6 col-xl-4 px-0">
                <div>
                    <h2>{room}</h2>
                    <p>Ссылка: {link}</p>
                    <input className="m-2 btn btn-danger" type="button" value="Выйти" onClick={leave} />
                </div>
                <div>
                    <input className="m-3 btn btn-info" type="button" value="Обновить список онлайн" onClick={updateOnline}/>
                    <h6 className="font-weight-bold mb-3 text-center text-lg-left">Онлайн</h6>
                    <ul className="list-unstyled white z-depth-1 px-3 pt-3 pb-0">
                    {
                        online !== undefined ?
                        online.map((o, index) => 
                            <li className="lighten-3 p-2" key={index}>{o.name}</li>
                        ) :
                        null
                    }
                    </ul>
                </div>                
            </div>
            
            <div className="col-md-6 col-xl-8 pr-md-4 px-lg-auto px-0">
            {/* список сообщений */}
                <ul>
                {
                    messages !== undefined ?
                    messages.map( 
                        (msg, index) => 
                        // <li className="d-flex justify-content-between mb-4" key={index}>
                                
                            // {/* [{new Date(msg.date).getHours()}:{new Date(msg.date).getMinutes()}:{new Date(msg.date).getSeconds()}]
                            // &nbsp;{msg.user.name}:&emsp;{msg.text} */}
                        
                        <div class="chat-body white p-3 ml-2 z-depth-1 border">
                            <div class="header">
                            <strong class="primary-font">{msg.user.name}</strong>
                            <small class="pull-right text-muted"><i class="far fa-clock"></i>&nbsp;{new Date(msg.date).getHours()}:{new Date(msg.date).getMinutes()}:{new Date(msg.date).getSeconds()}</small>
                            </div>
                            
                            
                            <p class="mb-0">{msg.text}</p>
                            {/* <hr class="w-100" /> */}
                        </div>

                        // {/* </li>  */}
                        ) :
                    <div>Сообщений пока нет :(</div>
                }
                </ul>
                {/* поле ввода текста сообщения */}
                <div className="enterMessage">
                    <label>
                        Текст сообщения:
                    </label>
                    <input className="form-control" type="text" id="text" onChange={handleChangeMessageText}/>
                    <input className="m-2 btn btn-primary" type="submit" value="Отправить" onClick={acceptMsgText}/>
                </div>
            </div>
        </div>
    </div>
}

export default Chat