import React from 'react';
import './Home.css'; 

function Home() {

    const rectangle1Style = {
        width: '20%', 
        height: '40%', 
        left: '10%', 
        top: '45%', 
        position: 'absolute',
        background: 'linear-gradient(159deg, #000000 0%, #4D2DB7 100%)',
        borderRadius: 25,
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center'
      };
    
      const rectangle2Style = {
        width: '20%', 
        height: '40%',
        left: '40%' ,
        top: '45%', 
        position: 'absolute',
        background: 'linear-gradient(159deg, #000000 0%, #4D2DB7 100%)',
        borderRadius: 25,
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center'
      };
    
      const rectangle3Style = {
        width: '20%', 
        height: '40%', 
        right: '10%', 
        top: '45%', 
        position: 'absolute',
        background: 'linear-gradient(159deg, #000000 0%, #4D2DB7 100%)',
        borderRadius: 25,
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center'
      };
    

  return (
    <div className="bgimage">
      <div className="menu">
        <div className="leftmenu">
          <h4> muse. </h4>
        </div>
        <div className="rightmenu">
          <ul>
            <li id="firstlist">Home</li>
            <li>Chords & Scale</li>
            <li>Ear Training</li>
            <li>Quiz</li>
            <li>Login</li>
         
          </ul>
        </div>
      </div>

      <div class="text">
            <h1>Deep In Musician</h1>
        </div>

    <div className="Rectangle4" style={rectangle1Style} >
        <a href="#" style={{ color: 'white', fontSize: '18px', textDecoration: 'none' }}>Chords & Scale</a> </div>

    <div className="Rectangle5" style={rectangle2Style} >
      <a href="#" style={{ color: 'white', fontSize: '18px', textDecoration: 'none' }}>Ear Training</a>      </div>

     <div className="Rectangle6" style={rectangle3Style} >
      <a href="#" style={{ color: 'white', fontSize: '18px', textDecoration: 'none' }}>Quiz</a>      </div>
       
    </div>

    
  );
}

export default Home;
