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
    
    return <div className="text-center">
            <div className="form-signin">
                <h1 className="h3 mb-3 font-weight-normal">Введите имя пользователя</h1>
                <input className="form-control" type="text" placeholder="Имя пользователя" value={username} onChange={handleChangeName} />
                <input className="btn btn-lg btn-success btn-block" type="submit" value="Отправить" onClick={acceptUsername} />
            </div>
        </div>
    
}

export default EnterUserName