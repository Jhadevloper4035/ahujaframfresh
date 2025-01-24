import React from "react";
import { Link } from "react-router-dom";
import {
  DashboardOutlined,
  AppstoreOutlined,
  FolderAddOutlined,
  TagsOutlined,
  PlusOutlined,
  TeamOutlined,
  ShoppingCartOutlined,
  LockOutlined,
  GiftOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

const AdminSidebar = () => (
  <div className="d-flex flex-column flex-shrink-0 p-3 text-white">
    <Link
      to="/admin/dashboard"
      className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
    >
      <span className="fs-4">Admin Panel</span>
    </Link>
    <hr />
    <ul className="nav nav-pills flex-column mb-auto" style={{ width: "100%" }}>
      <li className="nav-item">
        <Link to="/admin/dashboard" className="nav-link text-white">
          <DashboardOutlined /> Dashboard
        </Link>
      </li>
      <li>
        <Link to="/admin/products" className="nav-link text-white">
          <AppstoreOutlined /> All Products
        </Link>
      </li>
      <li>
        <Link to="/admin/category" className="nav-link text-white">
          <FolderAddOutlined /> Category
        </Link>
      </li>
      <li>
        <Link to="/admin/sub" className="nav-link text-white">
          <TagsOutlined /> SubCategory
        </Link>
      </li>
      <li>
        <Link to="/admin/product" className="nav-link text-white">
          <PlusOutlined /> Product
        </Link>
      </li>
      <li>
        <Link to="/user/passwords" className="nav-link text-white">
          <TeamOutlined /> All Users
        </Link>
      </li>
      <li>
        <Link to="/admin/orders" className="nav-link text-white">
          <ShoppingCartOutlined /> Orders
        </Link>
      </li>
      <li>
        <Link to="/admin/passwords" className="nav-link text-white">
          <LockOutlined /> Passwords
        </Link>
      </li>
      <li>
        <Link to="/admin/coupon" className="nav-link text-white">
          <GiftOutlined /> Coupons
        </Link>
      </li>
    </ul>
    <hr />
    <div className="dropdown">
      <Link
        to="#"
        className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
        id="dropdownUser1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <UserOutlined /> <strong>Admin</strong>
      </Link>
      <ul
        className="dropdown-menu dropdown-menu-dark text-small shadow"
        aria-labelledby="dropdownUser1"
      >
        <li>
          <Link className="dropdown-item" to="#">
            <UserOutlined /> Profile
          </Link>
        </li>
        <li>
          <Link className="dropdown-item" to="#">
            <SettingOutlined /> Settings
          </Link>
        </li>
        <li>
          <hr className="dropdown-divider" />
        </li>
        <li>
          <Link className="dropdown-item" to="#">
            <LogoutOutlined /> Sign out
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default AdminSidebar;
