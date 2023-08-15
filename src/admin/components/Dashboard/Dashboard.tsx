
const Sidebar = () => {
  return (
<div id="viewport">
    <Sidebar/>
  <div id="content">
    <nav className="navbar navbar-default text-end">
      <div className="container-fluid">
        <ul className="nav navbar-nav navbar-right !justify-end !w-full">
          <li>
            <a href="#"><i className="zmdi zmdi-notifications text-danger"></i>
            </a>
          </li>
          <li><a href="#">Namiq</a></li>
        </ul>
      </div>
    </nav>
    <div className="container-fluid  h-screen bg-white">
      <h1>Simple Sidebar</h1>
      <p>
        Make sure to keep all page content within the 
        <code>#content</code>.
      </p>
    </div>
  </div>
</div>
  )
}

export default Sidebar