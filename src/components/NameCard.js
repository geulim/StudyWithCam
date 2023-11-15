const NameCard = ({ name, ranking, onClick, children }) => {
  return (
    <div className="card mb-3" onClick={onClick}>
      <div className="card-body py-2  d-flex align-items-center">
        {/* children */}
        <div className="flex-grow-1 d-flex justify-content-center">
          {name}
          {/* 랭킹 */}
        </div>
        {children && <div>{children}</div>}
      </div>
    </div>
  );
};

export default NameCard;
