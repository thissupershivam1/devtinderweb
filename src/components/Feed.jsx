import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { addFeed, removeUserFromFeed } from '../utils/feedSlice'
import UserCard from './UserCard'

const Feed = () => {
  const feed = useSelector((store) => store.feed)
  const dispatch = useDispatch()
  const [currentIndex, setCurrentIndex] = useState(0)

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
    setCurrentIndex((prev) => prev + 1)
  }

  if (!feed || feed.length === 0) {
    return <div className="text-center mt-10 text-xl">Loading feed...</div>
  }

  if (currentIndex >= feed.length) {
    return <div className="text-center mt-10 text-xl">No more profiles.</div>
  }

  return (
    <div className="flex justify-center mt-10">
      <UserCard user={feed[currentIndex]} onSwipe={handleSwipe} />
    </div>
  )
}

export default Feed
