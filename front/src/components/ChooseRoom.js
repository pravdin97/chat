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
        <div>
            <label>
                Ссылка на комнату:
                <input type="text" onChange={handleChangeLink}/>
            </label>
            <input type="submit" value="ОК" onClick={acceptLink}/>

            {
                roomlist !== undefined ?
                roomlist.map(room =>      
                    <input type="submit" key={room.link} value={room.name} onClick={event => chooseRoom(event.target.value)}/>
                        
                ) : <div>There are no rooms yet</div>
            }
        </div>
    )
}

export default ChooseRoom