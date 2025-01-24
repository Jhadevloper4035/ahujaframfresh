import React, { useEffect, useState } from "react";
import AdminDashboard from "../adminDashboard.js";
import { Button } from "antd";
import cogoToast from "cogo-toast";
import { getSingleCategory, updateCategory } from "../../../functions/category.js";
import { useSelector } from "react-redux";
import { LockOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import CategoryForm from "../../../components/forms/categoryForm.js";

const UpdateCategory = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    getSingleCategory(slug).then((c) => {
      setName(c.data.name); // Assuming setName updates the state with the category name
    });
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateCategory(slug, { name }, user.user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        cogoToast.success("Category updated successfully", { position: "bottom-left" });
        navigate("/admin/category");
      })
      .catch((err) => {
        setLoading(false);
        cogoToast.warn(`${err}`, { position: "bottom-left" });
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-2 bg-light vh-100">
          <AdminDashboard />
        </div>

        {/* Main content */}
        <div className="col-md-10">
          <div className="container py-4">
            {loading ? (
              <div className="text-center my-4">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <h1 className="text-center mb-4">Update Product Category</h1>
            )}

            {/* Form */}
            <div className="card shadow-sm p-4">
              <CategoryForm
                handlesubmit={handlesubmit}
                name={name}
                setName={setName}
                Button={Button}
                LockOutlined={LockOutlined}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateCategory;
