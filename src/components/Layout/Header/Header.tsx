import { Container } from "@mui/material";
import BlogSearch from "../../UI/BlogSearch/BlogSearch";
import MuiDrawer from "../../UI/MuiDrawer/MuiDrawer";
import { NavLink, useNavigate } from "react-router-dom";
import '../../../styles/header.css'

const Header = () => {
  const navigate = useNavigate();

  function handleClick() {
    navigate('');
    
    window.location.reload();
  }
  return (
    <nav className="navbar navbar-expand-lg bg-light" data-bs-theme="light">
      <Container>
        <div className="nav-main flex w-full items-center">
            <div className="navbar-collapse" id="navbarColor03">
              <ul className="navbar-nav me-auto">
              <li className="nav-item">
                  <NavLink to="/" className="nav-link !text-[17px]" onClick={() => handleClick()} >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/about" className="nav-link !text-[17px]">
                    About Me
                  </NavLink>
                </li>
              </ul>
              <BlogSearch />
            </div>

            <MuiDrawer />
        </div>
      </Container>
    </nav>
  );
};

export default Header;
