import { useContext, useState, useEffect } from 'react'
import './ProjectsList.css'

//ASSETS
import LikedFilled from '../../assets/liked-filled.svg'
import LikeOutline  from '../../assets/like.svg'

//COMPONENTS
import Button from '../Button/Button.jsx'

//CONTEXT
import { AppContext } from '../../contexts/AppContexts.jsx'

//UTILS
import { getApiData } from '../../services/apiServices'

function ProjectsList () {
    const [projects, setProjects] = useState([])
    const [favProjects, setFavProject] = useState ([])
    const appContext = useContext(AppContext)
    const handleSavedFavProjects = (id) => {
            setFavProject((prevFavProjects ) => {
                if (prevFavProjects.includes(id) ){
                    const filterArray = prevFavProjects.filter((projectId) => projectId !== id)
                    sessionStorage.setItem('favProjects', JSON.stringify(filterArray))
                    return prevFavProjects.filter((projectsId) => projectId !== id)
                } else {
                    sessionStorage.setItem('favProjects', JSON.stringify([...prevFavProjects, id]))
                    return [...prevFavProjects, id]
                }
            })
        }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const projectsResponse = await getApiData('projects')
                setProjects(projectsResponse)
            } catch {
                setProjects([])
            }
        }

        fetchData()
    }, [])

    useEffect(() => {
        const savedFavProjects = JSON.parse(sessionStorage.getItem('favProjects'))
        if (savedFavProjects) {
            setFavProject(savedFavProjects)
        }
    }, [])

    return (
        <div className="projects-section ">
           <div className='projects-hero'>
                <h2>{appContext.languages[appContext.language].projects.title}</h2>
                <p>{appContext.languages[appContext.language].projects.subtitle}</p>
            </div> 
            <div className='projects-grid'>
                {
                    projects ?
                    projects.map((project) => (
                        <div className='projects-card d-flex al-center jc-center fd-column' key={project.id}>
                            <div className='thumb tertiary-background' style={{ backgroundImage: `url(${project.thumb})`}}></div>
                            <h3>{project.title}</h3>
                            <p>{project.subtitle}</p>
                            <Button buttonStyle="unstyled" onClick={() => handleSavedFavProjects(project.id)}>
                                <img src={favProjects.includes(project.id) ? LikedFilled : LikeOutline} height='20px'/>
                            </Button>
                        </div>
                    ))
                    :
                    null
                }
            </div>
        </div>
  )
}

export default ProjectsList 