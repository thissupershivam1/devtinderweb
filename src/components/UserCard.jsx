import { useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'

const UserCard = ({ user, onSwipe }) => {
  const [animation, setAnimation] = useState('')
  const [isAnimating, setIsAnimating] = useState(false)

  const { _id, firstName, lastName, photoUrl, age, gender, about, skills } = user

  const handleSendRequest = async (status) => {
    if (isAnimating) return

    setIsAnimating(true)
    const anim = status === 'ignored' ? 'animate-swipeLeft' : 'animate-swipeRight'
    setAnimation(anim)

    setTimeout(async () => {
      try {
        await axios.post(`${BASE_URL}/request/send/${status}/${_id}`, {}, { withCredentials: true })
      } catch (err) {
        console.error(err)
      }
      onSwipe(status, _id) // <- trigger Redux AFTER animation
    }, 500)
  }

  return (
    <div className={`card w-96 bg-base-100 shadow-xl transition-transform duration-300 animate-fadeIn ${animation}`}>
      <figure>
        <img
          src={photoUrl || 'https://placehold.co/400x300?text=No+Image'}
          alt="User"
          className="object-cover w-full h-64"
        />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title text-2xl">{firstName + ' ' + lastName}</h2>
        {age && gender && <p className="text-sm text-gray-500">{`${age}, ${gender}`}</p>}
        {about && <p className="mt-2">{about}</p>}
        {skills && skills.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center mt-2">
            {skills.map((skill, idx) => (
              <span key={idx} className="badge badge-outline badge-accent">{skill}</span>
            ))}
          </div>
        )}
        <div className="card-actions mt-6">
          <button className="btn btn-error" onClick={() => handleSendRequest('ignored')} disabled={isAnimating}>
            Ignore
          </button>
          <button className="btn btn-success" onClick={() => handleSendRequest('interested')} disabled={isAnimating}>
            Interested
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserCard
