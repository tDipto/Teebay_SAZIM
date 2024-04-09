import React from "react";
import { Button, Menu, Navbar } from "react-daisyui";
import { Link } from "react-router-dom";

const NavbarComponent = () => {
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
            <Menu.Item>
              <Link to="/product">Sell</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/profile">Profile</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/registration">Registration</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/login">Login</Link>
            </Menu.Item>
          </Menu>
        </div>
      </Navbar>
    </>
  );
};

export default NavbarComponent;
