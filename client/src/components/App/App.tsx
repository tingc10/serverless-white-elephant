import React, { useEffect, useRef } from 'react';
import './App.css';
import { useCreateUserMutation, useCreateRoomMutation, useGetUserRoomsLazyQuery } from '../../generated';

function App() {
  const userIdRef = useRef<HTMLInputElement>(null)
  const roomNameRef = useRef<HTMLInputElement>(null)
  const searchRoomsRef = useRef<HTMLInputElement>(null)
  const [createUserMutation, { data: userData }] = useCreateUserMutation()
  const [createRoomMutation, { data: createRoomData }] = useCreateRoomMutation()
  const [getUserRooms, { data: userRoomsData }] = useGetUserRoomsLazyQuery()

  const handleCreateUser = (event: React.FormEvent) => {
    event.preventDefault();
    try {
      createUserMutation({
        variables: {
          userId: userIdRef?.current?.value || '',
        }
      })

    } catch (e) {
      console.log(e)
    }
  }
  const handleCreateRoom = (event: React.FormEvent) => {
    event.preventDefault()
    createRoomMutation({
      variables: {
        roomName: roomNameRef?.current?.value || '',
        hostId: userIdRef?.current?.value || '',
      }
    })
  }
  const handleGetUserRooms = (event: React.FormEvent) => {
    event.preventDefault()
    getUserRooms({
      variables: {
        userId: searchRoomsRef?.current?.value || '',
      }
    })
  }
  useEffect(() => {

  },)
  return (
    <div className="App">
      <form onSubmit={handleCreateUser}>
        <label>
          UserId: <input type="text" ref={userIdRef}/>
        </label>
      </form>
      <div>
        {userData ? `New User Id: ${userData?.addUser}` : ''}
      </div>
      <form onSubmit={handleCreateRoom}>
        <label>
          Room Name: <input type="text" ref={roomNameRef}/>
        </label>
      </form>
      <div>
        {createRoomData ? `New Room: ${createRoomData?.createRoom.roomName}` : ''}
      </div>
      <form onSubmit={handleGetUserRooms}>
        <label>
          Get rooms for user: <input type="text" ref={searchRoomsRef}/>
        </label>
      </form>
      <div>
        {userRoomsData ? `Rooms: ${userRoomsData?.getUserRooms.map(room => room.roomCode).join(', ')}` : ''}
      </div>
      
    </div>
  );
}

export default App;
