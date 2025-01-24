
import AdminDashboard from "../../components/nav/AdminNav.js";


const AdminDashboards = () => {

  return (
    <div className="container-fluid p-0" style={ {backgroundColor : "#c9c9c9"}} >
      <div className="row">
        <div className="col-md-2 bg-dark " 
        style={{padding :"10px" , position : "fixed" , height: "100vh"}} >
          <AdminDashboard />
        </div>
      
      </div>
    </div>
  );
};

export default AdminDashboards;
