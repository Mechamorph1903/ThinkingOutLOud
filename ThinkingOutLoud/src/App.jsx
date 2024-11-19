import { useState, useRef } from 'react'
import { Outlet, Link } from 'react-router-dom'
import './App.css'
import newpost from "./assets/newPost.webp";
import thought from "./assets/thought.png";
import {Tooltip} from 'react-tooltip';


function App() {
  const searchBarRef = useRef(null);
  const [count, setCount] = useState(0);

  const handleSearchDown = (e) => {
    if (e.key === 'Enter') {
      const searchBarValue = searchBarRef.current.value;
      console.log(searchBarValue);
    }
  }

  return (
    <div className='main-container'>
      <nav>
        <div className='logo'>
          {/* <span><img src={bubble1} alt="" width={20} height={20} /></span> */}
        <h3>ThinkOutLoud</h3>
        </div>
        <input type="text" placeholder='Search for Post...' id='postSearch' ref={searchBarRef} onKeyDown={handleSearchDown}/>
        <span>
        <Link to="/">Home</Link>
        <hr />
        <Link to="/profile">Profile</Link>
        <hr />
        <Link to="/attribution">Attribution</Link>
        </span>
      </nav>

      <div className='content-display'>
        <Outlet/>
        <Link to="create"><div className='createPostImg' ><img src={thought} alt="" /></div></Link>
        <Tooltip anchorSelect=".createPostImg" place="top">Post a Thought</Tooltip>
      </div>
    </div>
  )
}

export default App
