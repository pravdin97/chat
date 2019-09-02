import React, { useState } from 'react';
import './App.css';
import EnterUserName from './components/EnterUserName'
import ChooseRoom from './components/ChooseRoom'
import Chat from './components/Chat'

function App() {
  // текущий пользователь
  let [user, setUser] = useState()

  // текущая комната
  let [room, setRoom] = useState()

  function leaveRoom() {
    setRoom(undefined)
  }

  return (
    <div className="App">
      { user === undefined ? 
        <EnterUserName recieveUser={setUser} /> :
          room === undefined ?
          <ChooseRoom recieveRoom={setRoom}/> :
            <Chat room={room} user={user} onLeave={leaveRoom}/>
      }
    </div>
  );
}

export default App;
