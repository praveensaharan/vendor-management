import React, { useState } from "react";
import { Drawer, Menu, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import logo from "../assets/ven.png";
import logo1 from "../assets/vendorb.png";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth(); // Initialize the auth instance

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/login"); // Redirect to the login page after sign-out
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  return (
    <nav className="bg-gray-50 mb-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/">
              <img src={logo} alt="logo" className="h-10 w-18" />
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/"
                className="text-gray-900 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>
              <Link
                to="/add"
                className="text-gray-900 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Add
              </Link>
              <button
                onClick={handleLogout}
                className="text-gray-900 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
          <div className="block md:hidden">
            <Button
              type="primary"
              onClick={showDrawer}
              icon={<MenuOutlined />}
            />
            <Drawer
              title="Menu"
              placement="right"
              closable={false}
              onClose={onClose}
              visible={visible}
            >
              <Menu
                theme="dark"
                mode="inline"
                onClick={onClose}
                defaultSelectedKeys={["home"]}
              >
                <Menu.Item key="home">
                  <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item key="add">
                  <Link to="/add">Add</Link>
                </Menu.Item>
                <Menu.Item key="logout">
                  <button onClick={handleLogout}>Logout</button>
                </Menu.Item>
              </Menu>
            </Drawer>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
