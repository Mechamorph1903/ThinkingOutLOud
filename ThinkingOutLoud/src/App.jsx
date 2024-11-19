import { useState, useRef } from 'react'
import { Outlet, Link } from 'react-router-dom'
import './App.css'
import logo from "./assets/logo.png";
import thought from "./assets/thought.png";
import {Tooltip} from 'react-tooltip';


function App() {
  const searchBarRef = useRef(null);
  const [count, setCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");  // Add searchQuery state

  const handleSearchDown = (e) => {
    if (e.key === 'Enter') {
      const searchBarValue = searchBarRef.current.value;
      setSearchQuery(searchBarValue);
      console.log(searchBarValue);
    }
  }

  return (
    <div className='main-container'>
      <nav>
        <div className='logo'>
        <h3>ThinkOutLoud</h3>
        <span><img src={logo} alt="" width={20} height={20} /></span>
        
        </div>
        <input type="text" placeholder='Search for Post...' id='postSearch' ref={searchBarRef} onKeyDown={handleSearchDown}/>
        <span id='links'>
        <Link to="/" className='link'>Home</Link>
        <hr />
        <Link to="/profile" className='link'>Profile</Link>
        <hr />
        <Link to="/attribution" className='link'>Attribution</Link>
        </span>
      </nav>

      <div className='content-display'>
        <Outlet context={{ searchQuery }}/>
        <Link to="create"><div className='createPostImg' ><img src={thought} alt="" /></div></Link>
        <Tooltip anchorSelect=".createPostImg" place="top">Post a Thought</Tooltip>
      </div>
    </div>
  )
}

export default App
