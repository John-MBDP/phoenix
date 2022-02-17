import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteIcon from "@mui/icons-material/Favorite";
const ViewLikesCounter = ({ views = 0, likes = 0 }) => {
  return (
    <div className="container">
      <div className="inner-container">
        <VisibilityIcon sx={{ fontSize: "16px" }} />
        <p>{views}</p>
      </div>
      <div className="inner-container">
        <FavoriteIcon
          sx={{
            color: "#ff0056",
            fontSize: "16px",
            lineHeight: "12px"
          }}
        />
        <p>{likes}</p>
      </div>
      <style jsx>{`
        p {
          margin-left: 0.2em;
        }
        .icon-red {
          color: #ff0056;
        }
        .inner-container {
          display: flex;
          align-items: center;
          font-size: 0.8em;
          font-weight: 500;
          padding: 0 0.2rem;
        }
        .container {
          height: 1rem;
          line-height: 1rem;
          display: flex;
          justify-content: center;
          margin-bottom: 1rem;
        }
      `}</style>
    </div>
  );
};

export default ViewLikesCounter;
