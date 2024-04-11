import React from "react";
import { Button, Menu, Navbar } from "react-daisyui";
import { Link, useNavigate } from "react-router-dom";

const NavbarComponent = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  // const client = useApolloClient();
  const handleLogout = () => {
    localStorage.removeItem("token");
    // client.clearStore();
    navigate("/login");
  };
  return (
    <>
      <Navbar>
        <div className="flex-1">
          <Link to="/">
            <Button tag="a" color="ghost" className="normal-case text-xl">
              Teebay
            </Button>
          </Link>
        </div>
        <div className="flex-none">
          <Menu horizontal={true} className="px-1">
            <Menu.Item>
              <Link to="/">Home</Link>
            </Menu.Item>
            {token ? (
              <>
                <Menu.Item>
                  <Link to="/product">Sell</Link>
                </Menu.Item>
                <Menu.Item>
                  <Link to="/profile">Profile</Link>
                </Menu.Item>
                <Menu.Item>
                  <div onClick={handleLogout}>Logout</div>
                </Menu.Item>
              </>
            ) : (
              <>
                <Menu.Item>
                  <Link to="/registration">Registration</Link>
                </Menu.Item>
                <Menu.Item>
                  <Link to="/login">Login</Link>
                </Menu.Item>
              </>
            )}
            <Menu.Item>
              <Link to="/profile">Profile</Link>
            </Menu.Item>
          </Menu>
        </div>
      </Navbar>
    </>
  );
};

export default NavbarComponent;
