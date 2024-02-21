import React, {Component, useEffect} from "react";

const Home = () => {
  
  useEffect(() => {
    console.log('Home page 1')
  }, [])

  return (
  <div>
    <div> Home page 1</div>
  </div>
  )
};
export default Home;