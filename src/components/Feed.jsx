import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { addFeed, removeUserFromFeed } from '../utils/feedSlice'
import UserCard from './UserCard'

const Feed = () => {
  const feed = useSelector((store) => store.feed)
  const dispatch = useDispatch()

  const getFeed = async () => {
    if (feed && feed.length > 0) return

    try {
      const res = await axios.get(BASE_URL + '/feed', {
        withCredentials: true,
      })
      dispatch(addFeed(res?.data?.data))
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    getFeed()
  }, [])

  const handleSwipe = (status, userId) => {
    dispatch(removeUserFromFeed(userId))
  }

  if (!feed || feed.length === 0) {
    return <div className="text-center mt-10 text-xl">No more profiles.</div>
  }

  const currentUser = feed[0]

  return (
    <div className="flex justify-center mt-10">
      {/* ⬅️ key={currentUser._id} is the real fix */}
      <UserCard key={currentUser._id} user={currentUser} onSwipe={handleSwipe} />
    </div>
  )
}

export default Feed
