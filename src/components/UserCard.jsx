import axios from 'axios'
import { BASE_URL } from '../utils/constants'

const UserCard = ({ user, onSwipe }) => {
  console.log('request sent',user)
  const { _id, firstName, lastName, photoUrl, age, gender, about, skills } = user

  const handleSendRequest = async (status) => {
    try {
      const url = BASE_URL + '/request/send/' + status + '/' + _id;
      console.log("Request URL:", url);  // Check the final URL in the console
      await axios.post(BASE_URL + '/request/send/' + status + '/' + _id, {}, { withCredentials: true })
      onSwipe(status, _id)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="card w-96 bg-base-100 shadow-xl transition-transform duration-300 animate-fade-in">
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
              <span key={idx} className="badge badge-outline badge-accent">
                {skill}
              </span>
            ))}
          </div>
        )}
        <div className="card-actions mt-6">
          <button className="btn btn-error" onClick={() => handleSendRequest('ignored')}>
            Ignore
          </button>
          <button className="btn btn-success" onClick={() => handleSendRequest('interested')}>
            Interested
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserCard
