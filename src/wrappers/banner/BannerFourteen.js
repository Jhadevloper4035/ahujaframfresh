import PropTypes from "prop-types";


const BannerFourteen = ({ spaceTopClass, spaceBottomClass }) => {

  return ( <> </>
    // <div className={clsx("banner-area", spaceTopClass, spaceBottomClass)} style={{ marginTop : "60px"}} >
    //   <div className="container" >
    //     <div className="row">
    //       {bannerData?.map((single, key) => (
    //         <div className="col-lg-12 col-md-4" key={key}>
    //           <BannerFourteenSingle
    //             data={single}
    //             spaceBottomClass="mb-30"
    //           />
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // </div>
  );
};

BannerFourteen.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default BannerFourteen;
