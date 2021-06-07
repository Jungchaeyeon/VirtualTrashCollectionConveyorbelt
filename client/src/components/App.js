import React, { Suspense } from 'react';
// pages for this product
import NavBar from "./views/NavBar/NavBar";
import Section from "./views/NavBar/Section";
import Footer from "./views/Footer/Footer"


//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {

  return (
    
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar/>
      <Section/>
      {/* <Footer /> */}
    </Suspense>
  );
}

export default App;
