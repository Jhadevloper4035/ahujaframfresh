import React from "react";
import { Select } from "antd";

const { Option } = Select;

const ProductCreateForm = ({
  handleSubmit,
  handleChange,
  setValues,
  values,
  handleCategoryChange,
  subOptions,
  showSub,
}) => {
  // Destructure values
  const {
    sku,
    name,
    price,
    discount,
    isNew,
    saleCount,
    shipping,
    stock,
    category,
    subs,
    shortDescription,
    fullDescription,
    categories,
    rating,
    measure
  } = values;

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">

        <div className="form-group col-md-6 mt-3">
          <label className=" mb-1 " style={{textTransform : "uppercase"}} >SKU</label>
          <input
            type="text"
            name="sku"
            className="form-control"
            value={sku}
            onChange={handleChange}
          />
        </div>

        {/* Name Field */}
        <div className="form-group col-md-6 mt-3">
          <label className=" mb-1 " style={{textTransform : "uppercase"}} >Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={name}
            onChange={handleChange}
          />
        </div>

        {/* Price Field */}
        <div className="form-group col-md-6 mt-3">
          <label className=" mb-1 " style={{textTransform : "uppercase"}} >Price</label>
          <input
            type="number"
            name="price"
            className="form-control"
            value={price}
            onChange={handleChange}
          />
        </div>

        <div className="form-group col-md-6 mt-3">
          <label className=" mb-1 " style={{textTransform : "uppercase"}} >Discount (%)</label>
          <input
            type="number"
            name="discount"
            className="form-control"
            value={discount}
            onChange={handleChange}
          />
        </div>

        {/* Is New Field */}
        <div className="form-group col-md-6 mt-3">
          <label className=" mb-1 " style={{textTransform : "uppercase"}} >Is New</label>
          <select
            name="isNew"
            className="form-control"
            value={isNew}
            onChange={handleChange}
          >
            <option value={false}>No</option>
            <option value={true}>Yes</option>
          </select>
        </div>

        <div className="form-group col-md-6 mt-3">
          <label className=" mb-1 " style={{textTransform : "uppercase"}} >Rating</label>
          <input
            type="number"
            name="rating"
            className="form-control"
            value={rating}
            onChange={handleChange}
          />
        </div>
  



        {/* Sale Count Field */}
        <div className="form-group col-md-6 mt-3">
          <label className=" mb-1 " style={{textTransform : "uppercase"}} >Sales Count</label>
          <input
            type="number"
            name="saleCount"
            className="form-control"
            value={saleCount}
            onChange={handleChange}
          />
        </div>

        {/* Shipping Field */}
        <div className="form-group col-md-6 mt-3">
          <label className=" mb-1 " style={{textTransform : "uppercase"}} >Shipping</label>
          <select
            name="shipping"
            className="form-control"
            value={shipping}
            onChange={handleChange}
          >
            <option>Please select</option>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>

        {/* Stock Field */}
        <div className="form-group col-md-6 mt-3">
          <label className=" mb-1 " style={{textTransform : "uppercase"}} >Stock</label>
          <input
            type="number"
            name="stock"
            className="form-control"
            value={stock}
            onChange={handleChange}
          />
        </div>


        <div className="form-group col-md-6 mt-3">
          <label className=" mb-1 " style={{textTransform : "uppercase"}}>Measure</label>
          <input
            type="text"
            name="measure"
            className="form-control"
            value={measure}
            onChange={handleChange}
          />
        </div>



        {/* Category Field */}
        <div className="form-group col-md-6 mt-3">
          <label className=" mb-1 " style={{textTransform : "uppercase"}} >Category</label>
          <select
            name="category"
            className="form-control"
            onChange={handleCategoryChange}
          >
            <option>Please select</option>
            {categories.length > 0 &&
              categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
          </select>
        </div>

        {/* Subcategory Field */}
        {showSub && (
          <div className="form-group col-md-6 mt-3">
            <label className=" mb-1 " style={{textTransform : "uppercase"}} >Sub Category</label>
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Please select"
              value={subs}
              onChange={(value) => setValues({ ...values, subs: value })}
            >
              {subOptions.length > 0 &&
                subOptions.map((s) => (
                  <Option key={s._id} value={s._id}>
                    {s.name}
                  </Option>
                ))}
            </Select>
          </div>
        )}

        {/* Short Description Field */}
        <div className="form-group col-md-6 mt-3">
          <label className=" mb-1 " style={{textTransform : "uppercase"}} >Short Description</label>
          <input
            type="text"
            name="shortDescription"
            className="form-control"
            value={shortDescription}
            onChange={handleChange}
          />
        </div>

        {/* Full Description Field */}
        <div className="form-group col-md-12 mt-3">
          <label className=" mb-1 " style={{textTransform : "uppercase"}} >Full Description</label>
          <textarea
            name="fullDescription"
            className="form-control"
            value={fullDescription}
            onChange={handleChange}
            rows="4"
          />
        </div>
      </div>


      <div className="mt-4">
        <button className="btn btn-outline-info btn-block">Create New</button>
      </div>
    </form>
  );
};

export default ProductCreateForm;
