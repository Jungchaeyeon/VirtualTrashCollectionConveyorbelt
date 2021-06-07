import React,{ useEffect } from 'react'


function PeteDetailPage() {
    
    useEffect(() => {
      console.log("this is PetePage")
      
    }, [])

    return (
        <div className="div">
        <section className="section">
            <video className="video" width="100%" height="100%" muted autoPlay loop>
                <source src="/Videos/convey.mp4" type="video/mp4"/>
            </video>
            {/* <div className="card">
                
                <div className="face back">
                    <div className="info">
                        <h1 className="backcontent">PET BOTTLE SEPARATION CONVEYORBELT</h1>
                    </div>
                </div>
            </div> */}
        </section>
    </div>
    )
}

export default PeteDetailPage
