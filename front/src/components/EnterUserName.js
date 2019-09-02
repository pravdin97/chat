import React, {useState} from 'react'
import { createUser } from '../api'

function EnterUserName(props) {
    let [username, setUsername] = useState('')

    function handleChangeName(event) {
        setUsername(event.target.value)
    }

    function acceptUsername() {
        createUser(username, props.recieveUser)
    }
    
    return(
        <div className="enterUsername">
            <label>
                Имя пользователя:
                <input type="text" value={username} onChange={handleChangeName} />
            </label>
            <input type="submit" value="Отправить" onClick={acceptUsername} />
        </div>
    )
}

export default EnterUserName