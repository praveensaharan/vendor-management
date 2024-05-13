import React, { useState, useEffect } from "react";
import { Table, Pagination, Button, Modal, Select } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const { Option } = Select;
const url = "https://vendor123.azurewebsites.net/";
const View = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [deleteRecord, setDeleteRecord] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${url}api/vendors?skip=${
          (pagination.current - 1) * pagination.pageSize
        }&limit=${pagination.pageSize}`
      );
      const { vendors, total } = response.data;
      setPosts(vendors);
      setPagination((prevPagination) => ({
        ...prevPagination,
        total,
      }));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [location]);

  useEffect(() => {
    const delaySearch = setTimeout(() => {
      fetchData();
    }, 500);
    return () => clearTimeout(delaySearch);
  }, [pagination.current, pagination.pageSize]);

  const handlePaginationChange = (page, pageSize) => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      current: page,
      pageSize,
    }));
    navigate(`?page=${page}`);
  };

  const handleEdit = (record) => {
    navigate(`/update/${record.id}`);
  };

  const handleDelete = (record) => {
    setDeleteRecord(record);
    setDeleteConfirmVisible(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`${url}api/vendors/${deleteRecord.id}`);
      setDeleteConfirmVisible(false);
      fetchData();
    } catch (error) {
      console.error("Error deleting vendor:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelDelete = () => {
    setDeleteRecord(null);
    setDeleteConfirmVisible(false);
  };

  const columns = [
    {
      title: "Vendor Name",
      dataIndex: "vendorName",
      key: "vendorName",
      className: "text-sky-600 font-semibold",
    },
    {
      title: "Bank Account No",
      dataIndex: "bankAccountNo",
      key: "bankAccountNo",
      className: "text-gray-700",
    },
    {
      title: "Bank Name",
      dataIndex: "bankName",
      key: "bankName",
      className: "text-gray-700",
    },
    {
      title: "Actions",
      key: "actions",
      className: "",
      render: (text, record) => (
        <span>
          <Button
            className="mr-2"
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          />
        </span>
      ),
    },
  ];

  return (
    <>
      <section className="bg-gray-100">
        <div className="container mx-auto p-4 sm:p-8">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl font-bold text-gray-600 mb-4"
          >
            Vendor List
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="table-container overflow-x-auto rounded-lg shadow-lg"
          >
            <Table
              dataSource={posts}
              columns={columns}
              loading={loading}
              pagination={false}
              bordered
              className="rounded-lg"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex justify-center mt-4"
          >
            <Pagination
              current={pagination.current}
              pageSize={pagination.pageSize}
              total={pagination.total}
              onChange={handlePaginationChange}
              className="text-blue-600"
            />
          </motion.div>
        </div>
      </section>
      <Modal
        title="Confirm Delete"
        visible={deleteConfirmVisible}
        onOk={handleConfirmDelete}
        onCancel={handleCancelDelete}
        confirmLoading={loading}
      >
        <p>Are you sure you want to delete this vendor?</p>
      </Modal>
    </>
  );
};

export default View;
