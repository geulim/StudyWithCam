import PropTypes from "prop-types";

const Card = ({ title, onClick, children }) => {
  return (
    <div className="card mb-3 cursor-pointer" onClick={onClick}>
      <div className="card-body py-2  d-flex align-items-center">
        {/* children */}
        <div className="flex-grow-1 d-flex justify-content-center">{title}</div>
        {children && <div>{children}</div>}
      </div>
    </div>
  );
};

export default Card;
