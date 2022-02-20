import { Avatar } from "@material-ui/core";
import Link from "next/link";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const Payment = ({ id, profile_pic, session_id, amount_cents, name }) => {
  return (
    <div>
      <div className="card">
        <div>
          <Avatar
            alt="Remy Sharp"
            src={profile_pic || "/images/huTao.png"}
            style={{ height: "50px", width: "50px" }}
          />
        </div>
        <div className="content">
          <div className="header">
            <h4>{`Transaction #${id}`}</h4>
          </div>
          <p>{name}</p>
        </div>
        <div className="price">
          <h3>{`$${amount_cents / 100}`}</h3>
        </div>
        <ChevronRightIcon />
      </div>
      <style jsx>{`
        h4,
        h3,
        p {
          margin: 0;
        }
        .card {
          display: flex;
          flex-direction: row;
          font-family: roboto;
          padding-top: 1rem;
          align-items: center;
        }
        .price {
          font-weight: bold;
          color: #ff0056;
          padding-right: 0.5rem;
        }
        .header {
          display: flex;
          justify-content: space-between;
        }
        .content {
          flex-grow: 10;
          padding-left: 1rem;
        }
        .body {
          display: flex;
        }
      `}</style>
    </div>
  );
};

export default Payment;
