import React, { useState, useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";

const url = "https://vendor123.azurewebsites.net/api/vendors";

const UpdateVendorForm = () => {
  const [vendor, setVendor] = useState(null);
  const { id } = useParams();
  const vendorId = id; // Assign id to vendorId
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    console.log("Vendor ID:", id); // Check if vendorId is fetched properly
    // Fetch vendor details
    fetchVendor();
  }, [vendorId]); // Add vendorId to the dependency array

  const fetchVendor = async () => {
    try {
      const response = await axios.get(`${url}/${vendorId}`);
      setVendor(response.data);
    } catch (error) {
      console.error("Error fetching vendor:", error);
    }
  };

  const onFinish = async (values) => {
    try {
      const response = await axios.put(`${url}/${vendorId}`, values);
      if (response.status === 200) {
        message.success("Vendor updated successfully", () => {
          navigate(`/`);
        });
      }
    } catch (error) {
      console.error("Error updating vendor:", error);
    }
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="flex justify-center items-center h-screen mt-40 mb-24"
    >
      {vendor && (
        <Form
          {...formItemLayout}
          name="updateVendorForm"
          onFinish={onFinish}
          initialValues={vendor}
          scrollToFirstError
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-3xl"
        >
          <h2 className="text-center text-3xl mb-6 font-bold text-gray-800">
            Update Vendor
          </h2>
          <Form.Item
            name="vendorName"
            label="Vendor Name"
            rules={[
              {
                required: true,
                message: "Please input your Vendor Name!",
              },
            ]}
          >
            <Input
              className="w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:bg-white focus:border-blue-500"
              placeholder="Enter vendor name"
            />
          </Form.Item>

          <Form.Item
            name="bankAccountNo"
            label="Bank Account No"
            rules={[
              {
                required: true,
                message: "Please input your Bank Account No!",
              },
            ]}
          >
            <Input
              className="w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:bg-white focus:border-blue-500"
              placeholder="Enter bank account number"
            />
          </Form.Item>

          <Form.Item
            name="bankName"
            label="Bank Name"
            rules={[
              {
                required: true,
                message: "Please input your Bank Name!",
              },
            ]}
          >
            <Input
              className="w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:bg-white focus:border-blue-500"
              placeholder="Enter bank name"
            />
          </Form.Item>

          <Form.Item
            name="addressLine1"
            label="Address Line 1"
            rules={[
              {
                required: true,
                message: "Please input your Address Line 1!",
              },
            ]}
          >
            <Input
              className="w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:bg-white focus:border-blue-500"
              placeholder="Enter address line 1"
            />
          </Form.Item>

          <Form.Item
            name="addressLine2"
            label="Address Line 2"
            rules={[
              {
                message: "Please input your Address Line 2!",
              },
            ]}
          >
            <Input
              className="w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:bg-white focus:border-blue-500"
              placeholder="Enter address line 2"
            />
          </Form.Item>

          <Form.Item
            name="city"
            label="City"
            rules={[
              {
                message: "Please input your City!",
              },
            ]}
          >
            <Input
              className="w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:bg-white focus:border-blue-500"
              placeholder="Enter city"
            />
          </Form.Item>

          <Form.Item
            name="country"
            label="Country"
            rules={[
              {
                message: "Please input your Country!",
              },
            ]}
          >
            <Input
              className="w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:bg-white focus:border-blue-500"
              placeholder="Enter country"
            />
          </Form.Item>

          <Form.Item
            name="zipCode"
            label="Zip Code"
            rules={[
              {
                message: "Please input your Zip Code!",
              },
            ]}
          >
            <Input
              className="w-full px-4 py-3 leading-tight text-gray-700 bg-gray-200 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:bg-white focus:border-blue-500"
              placeholder="Enter zip code"
            />
          </Form.Item>

          <Form.Item {...tailFormItemLayout} className="text-center">
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 rounded-lg shadow-lg transition duration-300 ease-in-out"
            >
              Update
            </Button>
          </Form.Item>
        </Form>
      )}
    </motion.div>
  );
};

export default UpdateVendorForm;
