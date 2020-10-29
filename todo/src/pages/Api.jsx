import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Api () {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    axios.get('https://api.randomuser.me/')
      .then(res => {
        setUser(res.data.results[0])
        setIsLoaded(true)
      })
      .catch(err => setError(err))
  }, [])

  if (error) return <div>Error: {error.message}</div>
  else if (!isLoaded) return <div>Loading...</div>
  else {
    return (
      <div>
        <img src={user.picture.medium} alt={user.name.first} />
        <div>{user.name.first} {user.name.last}</div>
        <div>{user.gender}</div>
        <div>{user.email}</div>
        <div>{user.phone}</div>
      </div>
    )
  }
}

/*
  {
    results:
      [{
        gender: 'female',
        name: { title: 'Miss', first: 'Anna', last: 'Marin' },
        location: {
          street: { number: 7484, name: 'Calle de Pedro Bosch' },
          city: 'Logroño',
          state: 'Castilla la Mancha',
          country: 'Spain',
          postcode: 47233,
          coordinates: { latitude: '-24.6802', longitude: '149.0846' },
          timezone: {
            offset: '+7:00',
            description: 'Bangkok, Hanoi, Jakarta'
          }
        },
        email: 'anna.marin@example.com',
        login: {
          uuid: '185db974-633f-4679-a654-3b511e1a0c8a',
          username: 'crazyelephant725',
          password: 'francois',
          salt: 'po7zBKyA',
          md5: '85717cbc5ef69a6526a3af91b993f7b9',
          sha1: '5c782a741616119dcffb9e224ea3d2a2e35e308c',
          sha256: 'fb4ef3360425121979589d5f993f71bf060537b736daa545bae6a47606862287'
        },
        dob: { date: '1962-01-17T09:16:34.356Z', age: 58 },
        registered: { date: '2004-03-24T01:26:27.636Z', age: 16 },
        phone: '980-607-562',
        cell: '620-809-700',
        id: { name: 'DNI', value: '28286957-A' },
        picture: {
          large: 'https://randomuser.me/api/portraits/women/8.jpg',
          medium: 'https://randomuser.me/api/portraits/med/women/8.jpg',
          thumbnail: 'https://randomuser.me/api/portraits/thumb/women/8.jpg'
        },
        nat: 'ES'
      }],
    info: { seed: 'f1569135781075e7', results: 1, page: 1, version: '1.3' }
  }
*/
