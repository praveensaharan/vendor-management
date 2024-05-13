import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Typography } from "antd";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

const Home = () => {
  return (
    <section className="bg-gray-100 h-screen flex justify-center items-center">
      <div className="max-w-4xl mx-auto p-6 sm:p-12 bg-white rounded-lg shadow-xl">
        <Title level={2} className="text-center mb-8">
          Welcome to the Vendor Management System
        </Title>
        <Paragraph className="text-center text-gray-700 mb-8">
          Manage your vendors easily with our Vendor Management System. Add new
          vendors or update existing ones with just a few clicks.
        </Paragraph>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link to="/add">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size="large"
              block
              className="hover:bg-blue-700"
            >
              Add New Vendor
            </Button>
          </Link>
          <Link to="/update/124">
            <Button
              icon={<EditOutlined />}
              size="large"
              block
              disabled
              className="hover:bg-gray-700 hover:text-white text-gray-900"
            >
              Update Existing Vendor
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;
