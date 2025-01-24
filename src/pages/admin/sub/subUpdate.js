import React, { useEffect, useState } from "react";
import AdminDashboard from "../adminDashboard.js";
import { LockOutlined } from "@ant-design/icons";
import { Button } from "antd";
import cogoToast from "cogo-toast";
import { getSubSingle, updateSub } from "../../../functions/sub.js";
import { getCategories } from "../../../functions/category.js";
import { useSelector } from "react-redux";
import CategoryForm from "../../../components/forms/categoryForm.js";
import { useNavigate, useParams } from "react-router-dom";

const UpdateSubcat = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [parent, setParent] = useState("");
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    loadCategories();
    loadSub();
  }, []);

  const loadCategories = () => {
    getCategories().then((c) => {
      setCategories(c.data);
    });
  };

  const loadSub = () => {
    getSubSingle(slug).then((s) => {
      setName(s.data.name);
      setParent(s.data.parent);
    });
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateSub(slug, { name, parent }, user.user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        cogoToast.success(`Subcategory updated successfully: ${res.data.name}`, {
          position: "top-right",
        });
        navigate("/admin/sub");
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
        cogoToast.warn(`Error: ${err.message}`, { position: "top-right" });
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-2 bg-light vh-100">
          <AdminDashboard />
        </div>

        {/* Main Content */}
        <div className="col-md-10">
          <div className="container py-4">
            {loading ? (
              <div className="text-center my-4">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <h1 className="text-center mb-4">Update Subcategory</h1>
            )}

            {/* Form Section */}
            <div className="card shadow-sm p-4">
              <div className="mb-3">
                <label htmlFor="category-select" className="form-label">
                  Select Category
                </label>
                <select
                  id="category-select"
                  name="category"
                  className="form-select"
                  value={parent}
                  onChange={(e) => setParent(e.target.value)}
                >
                  <option value="">Select Category</option>
                  {categories.length > 0 &&
                    categories.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                </select>
              </div>

              {/* Category Form */}
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

export default UpdateSubcat;
