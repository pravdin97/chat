import React, { useState, useEffect } from 'react'
import { getAllRooms, connectViaLink, joinRoom } from '../api'

function ChooseRoom({recieveRoom}) {
    // список комнат
    let [roomlist, setRoomlist] = useState()

    // ссылка на комнату
    let [link, setLink] = useState() 
    
    // загрузка всех комнат
    useEffect(() => {
        getAllRooms(setRoomlist)
    }, [])

    function handleChangeLink(event) {
        setLink(event.target.value)
    }

    // подключиться к комнате по ссылке
    function acceptLink() {
        connectViaLink(link, 
            () => alert('Ссылка некорректна'),
            recieveRoom)
    }

    // подключиться к комнате, выбрав из списка
    function chooseRoom(room) {
        joinRoom(room)
        recieveRoom(room)
    }

    return(
        <div className="container">
            <label>
                Ссылка на комнату:
                <input className="form-control" type="text" onChange={handleChangeLink}/>
            </label>
            <input className="m-2 btn btn-success" type="submit" value="ОК" onClick={acceptLink}/>

            <div className="container">
                <h2>Список доступных комнат</h2>
                <ul className="list-group">
                {
                    roomlist !== undefined ?
                    roomlist.map(room =>      
                        <input key={room.link} className="list-group-item list-group-item-action" type="submit"  value={room.name} onClick={event => chooseRoom(event.target.value)}/>
                    ) : <div>There are no rooms yet</div>
                }
                </ul>
            </div>
        </div>
    )
}

export default ChooseRoom