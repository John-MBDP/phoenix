import {
  BottomNavigation,
  Box,
  BottomNavigationAction
} from "@material-ui/core";
import HomeIcon from "@mui/icons-material/Home";
import MessageIcon from "@mui/icons-material/Message";
import SearchIcon from "@mui/icons-material/Search";
import styles from "../../styles/Home.module.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function BottomNav({ children }) {
  return (
    <div className={styles.bottomNav}>
      <BottomNavigationAction label="Recents" icon={<HomeIcon />} />
      <BottomNavigationAction label="Favorites" icon={<MessageIcon />} />
      <BottomNavigationAction label="Archive" icon={<SearchIcon />} />
      <BottomNavigationAction label="Archive" icon={<AccountCircleIcon />} />
    </div>
  );
}
BottomNav.link = ({ label, icon }) => {
  return <div>AASDASDAS</div>;
};
