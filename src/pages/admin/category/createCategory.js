import React, { useEffect, useState } from "react";
import AdminDashboard from "../adminDashboard.js";
import { LockOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";
import cogoToast from "cogo-toast";
import {
  createCategory,
  getCategories,
  removeCategory,
} from "../../../functions/category.js";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CategoryForm from "../../../components/forms/categoryForm.js";
import LocalSearch from "../../../components/forms/searchForm.js";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  const [categories, setCategories] = useState([]);

  const [keyword, setKeyword] = useState(""); // For filtering categories

  useEffect(() => {
    loadcategories();
  }, []);

  const loadcategories = () => {
    getCategories().then((c) => {
      setCategories(c.data);
    });
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createCategory({ name }, user.user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        cogoToast.success(`Category "${res.data.name}" created successfully`, { position: "top-right" });
        loadcategories();
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
        cogoToast.warn("Error creating category", { position: "top-right" });
      });
  };

  const handleRemove = async (slug) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setLoading(true);
      removeCategory(slug, user.user.token)
        .then((res) => {
          setLoading(false);
          cogoToast.warn(`Category "${res.data.name}" deleted`, { position: "top-right" });
          loadcategories();
        })
        .catch((err) => {
          setLoading(false);
          cogoToast.warn("Error deleting category", { position: "top-right" });
        });
    }
  };

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword.toLowerCase());

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminDashboard />
        </div>
        <div className="col-md-10">
          
          <div className="py-4 px-3">
            {loading ? (
              <h1 className="text-danger text-center">Loading...</h1>
            ) : (
              <h1 className="text-center text-uppercase" style={{ marginBottom: "20px" }}>
                Create Product Category
              </h1>
            )}

            <hr className="mb-4" />

            {/* Category Form */}
            <CategoryForm
              handlesubmit={handlesubmit}
              name={name}
              setName={setName}
              Button={Button}
              LockOutlined={LockOutlined}
            />

            {/* Search Filter */}
            <div className="my-4">
              <LocalSearch keyword={keyword} setKeyword={setKeyword} />
            </div>

            <hr />

            {/* Category List */}
            <div>
              {categories.filter(searched(keyword)).map((c) => (
                <div
                  className="alert alert-secondary d-flex justify-content-between align-items-center"
                  key={c._id}
                >
                  <div>{c.name}</div>
                  <div>
                    <span
                      onClick={() => handleRemove(c.slug)}
                      className="btn btn-sm"
                      title="Delete"
                    >
                      <DeleteOutlined className="text-danger" />
                    </span>
                    <Link to={`/admin/category/${c.slug}`}>
                      <span className="btn btn-sm" title="Edit">
                        <EditOutlined className="text-warning" />
                      </span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
