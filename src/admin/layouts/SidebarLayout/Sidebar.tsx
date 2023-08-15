import { Link } from "react-router-dom"

const Sidebar = () => {
  return (
    <div id="sidebar">
    <header>
      <Link className="!pb-0" to="#">Blog App</Link>
    </header>
    <ul className="nav">
      <li>
        <a href="#">
          <i className="zmdi zmdi-view-dashboard"></i> Dashboard
        </a>
      </li>
      <li>
        <a href="#">
          <i className="zmdi zmdi-link"></i> Shortcuts
        </a>
      </li>
      <li>
        <a href="#">
          <i className="zmdi zmdi-widgets"></i> Overview
        </a>
      </li>
      <li>
        <a href="#">
          <i className="zmdi zmdi-calendar"></i> Events
        </a>
      </li>
      <li>
        <a href="#">
          <i className="zmdi zmdi-info-outline"></i> About
        </a>
      </li>
      <li>
        <a href="#">
          <i className="zmdi zmdi-settings"></i> Services
        </a>
      </li>
      <li>
        <a href="#">
          <i className="zmdi zmdi-comment-more"></i> Contact
        </a>
      </li>
    </ul>
  </div>
  )
}

export default Sidebar