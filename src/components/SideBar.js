import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
// import './SideBar.css'
import * as s from "./SideBar.sc";

export default function SideBar(props) {
  const user = useContext(UserContext);
  const [initialSidebarState, setInitialSidebarState] = useState(true);

  function toggleSidebar(e) {
    console.log("toggling state...");
    console.log(initialSidebarState);
    e.preventDefault();
    setInitialSidebarState(!initialSidebarState);
  }

  function resetSidebarToDefault(e) {
    setInitialSidebarState(true);
  }

  let sidebarContent = (
    <>
      <div className="logo">
        <a href="/articles" rel="external">
          <img
            className="zeeguuLogo"
            src="/static/images/zeeguuWhiteLogo.svg"
            alt="Zeeguu Logo - The Elephant"
          />
        </a>
      </div>

      <div className="arrowHolder">
        <span className="toggleArrow" onClick={toggleSidebar}>
          ▲
        </span>
      </div>

      <div className="navigationLink">
        <Link to="/articles" onClick={resetSidebarToDefault}>
          Articles
        </Link>
      </div>
      <div className="navigationLink">
        <Link to="/words/history" onClick={resetSidebarToDefault}>
          Words
        </Link>
      </div>
      <div className="navigationLink">
        <Link to="/exercises" onClick={resetSidebarToDefault}>
          Exercises
        </Link>
      </div>
      <div className="navigationLink">
        <Link to="/account_settings" onClick={resetSidebarToDefault}>
          Settings
        </Link>
      </div>
    </>
  );

  if (!initialSidebarState) {
    return (
      <s.SideBarToggled>
        {sidebarContent}
        <s.MainPageContentToggled>{props.children}</s.MainPageContentToggled>
      </s.SideBarToggled>
    );
  }

  return (
    <s.SideBarDefault>
      {sidebarContent}
      <s.MainPageContentDefault>{props.children}</s.MainPageContentDefault>
    </s.SideBarDefault>
  );
}
