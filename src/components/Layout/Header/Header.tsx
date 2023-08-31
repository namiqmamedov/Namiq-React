import { Container } from "@mui/material";
import BlogSearch from "../../UI/BlogSearch/BlogSearch";
import MuiDrawer from "../../UI/MuiDrawer/MuiDrawer";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-light" data-bs-theme="light">
      <Container>
        <div className="nav-main flex w-full items-center">
            <div className="navbar-collapse" id="navbarColor03">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <a className="nav-link active !text-[17px]" href="#">
                    Home
                    <span className="visually-hidden">(current)</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link  !text-[17px]" href="#">
                    About Me
                  </a>
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
