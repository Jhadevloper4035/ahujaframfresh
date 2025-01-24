import React from "react";
import { Button } from "antd";
import { LockOutlined } from "@ant-design/icons";

const CategoryForm = ({ handlesubmit, name, setName }) => (
  <form onSubmit={handlesubmit} className="category-form">
    {/* Form Group */}
    <div className="form-group mb-4">
      <label 
        htmlFor="categoryName" 
        className="form-label text-uppercase fw-bold"
      >
        Category Name
      </label>
      <input
        id="categoryName"
        type="text"
        className="form-control"
        placeholder="Enter Category "
        value={name}
        autoFocus
        onChange={(e) => setName(e.target.value)}
      />
    </div>

    {/* Submit Button */}
    <Button
      type="primary"
      shape="round"
      block
      icon={<LockOutlined />}
      size="large"
      htmlType="submit"
      disabled={name.trim().length === 0}
    >
      Create
    </Button>
  </form>
);

export default CategoryForm;
