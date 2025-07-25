import { useContext } from 'react'
import './AboutText.css'

//CONTEXT
import { AppContext } from '../../contexts/AppContexts.jsx'

function AboutText() {
    const appContext = useContext(AppContext)
  return (
           <div className='about-container'>
                <div className='about-section'>   
                    <div className='about-left'>
                        <h2>{appContext.languages[appContext.language].about.title}</h2>
                    </div>
                    <div className='about-right'>
                        <p className='primary-color'>{appContext.languages[appContext.language].about.p1}</p>
                        <p >{appContext.languages[appContext.language].about.p2}</p>
                        <p >{appContext.languages[appContext.language].about.p3}</p>
                    </div>
                </div>
            </div>
  )
}

export default AboutText 