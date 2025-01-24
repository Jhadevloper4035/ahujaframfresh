import React, { useEffect, useState } from "react";
import AdminDashboard from "../adminDashboard.js";
import { LockOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";
import cogoToast from "cogo-toast";
import { createSub, getSub, removeSub } from "../../../functions/sub.js";
import { getCategories } from "../../../functions/category.js";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CategoryForm from "../../../components/forms/categoryForm.js";
import LocalSearch from "../../../components/forms/searchForm.js";

const CreateSub = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [parent, setParent] = useState("");
  const [subs, setSubs] = useState([]);
  const [keyword, setKeyword] = useState("");

  const { user } = useSelector((state) => ({ ...state }));

  // Load categories and subcategories on component mount
  useEffect(() => {
    loadCategories();
    loadSubs();
  }, []);

  // Fetch categories
  const loadCategories = () => {
    getCategories().then((res) => setCategories(res.data));
  };

  // Fetch subcategories
  const loadSubs = () => {
    getSub().then((res) => setSubs(res.data));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    createSub({ name, parent }, user.user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        cogoToast.success(`Subcategory "${res.data.name}" created successfully!`, {
          position: "top-right",
        });
        loadSubs();
      })
      .catch((err) => {
        setLoading(false);
        cogoToast.error(err.response?.data || "Error creating subcategory", {
          position: "top-right",
        });
      });
  };

  // Handle subcategory deletion
  const handleRemove = (slug) => {
    if (window.confirm("Are you sure you want to delete this subcategory?")) {
      setLoading(true);

      removeSub(slug, user.user.token)
        .then((res) => {
          setLoading(false);
          cogoToast.success(`Subcategory "${res.data.name}" deleted successfully!`, {
            position: "top-right",
          });
          loadSubs();
        })
        .catch((err) => {
          setLoading(false);
          cogoToast.error(err.response?.data || "Error deleting subcategory", {
            position: "top-right",
          });
        });
    }
  };

  // Filter subcategories based on keyword
  const searched = (keyword) => (s) => s.name.toLowerCase().includes(keyword);

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-2">
          <AdminDashboard />
        </div>

        {/* Main Content */}
        <div className="col-md-10">

        <div className="py-4 px-3">

        {loading ? (
              <h1 className="text-danger text-center">Loading...</h1>
            ) : (
              <h1 className="text-center text-uppercase" style={{ marginBottom: "20px" }}>
                Create Product sub Category
              </h1>
            )}

<hr className="mb-4" />



          

          {/* Category Selection */}
          <div className="form-group">
            <label className="fw-bold">Select Category</label>
            <select
              name="category"
              className="form-control"
              onChange={(e) => setParent(e.target.value)}
              value={parent}
            >
              <option value="">-- Select a Category --</option>
              {categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <br />

          {/* Subcategory Form */}
          <CategoryForm
            handlesubmit={handleSubmit}
            name={name}
            setName={setName}
          />

          <br />

          {/* Search */}
          <LocalSearch keyword={keyword} setKeyword={setKeyword} />

          <hr />

          {/* Subcategory List */}
          {subs.filter(searched(keyword)).map((s) => (
            <div
              key={s._id}
              className="alert alert-secondary d-flex justify-content-between align-items-center"
            >
              <span>{s.name}</span>
              <div>
                <span
                  onClick={() => handleRemove(s.slug)}
                  className="btn btn-sm"
                >
                  <DeleteOutlined className="text-danger" />
                </span>
                <Link to={`/admin/sub/${s.slug}`}>
                  <span className="btn btn-sm">
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
  );
};

export default CreateSub;
