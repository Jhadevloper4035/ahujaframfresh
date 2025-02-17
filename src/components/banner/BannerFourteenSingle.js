import PropTypes from "prop-types";
import clsx from "clsx"
import { Link } from "react-router-dom";

const BannerFourteenSingle = ({ data, spaceBottomClass }) => {
  return (
      <div className={clsx("single-banner", spaceBottomClass)}>
        <Link to={process.env.PUBLIC_URL + "/exclusive-cheese"}>
          <img src={process.env.PUBLIC_URL + data.image} alt="" />
        </Link>
        <div className="banner-content banner-pink">
          <h3>{data.title}</h3>
          <h4>
            {data.subtitle} <span>{data.price}</span>
          </h4>
        </div>
      </div>
  );
};

BannerFourteenSingle.propTypes = {
  data: PropTypes.shape({}),
  spaceBottomClass: PropTypes.string
};

export default BannerFourteenSingle;
