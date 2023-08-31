import { useEffect } from 'react'
import MouseSpotlight from '../components/UI/MouseSpotlight/MouseSpotlight'

const Error = () => {
    useEffect(() => {
        document.title = 'Page not found | Namiq'
    }, [])
  return (
    <MouseSpotlight/>
  )
}

export default Error