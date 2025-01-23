import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, AppState } from "../app/redux/store"; // Import AppDispatch and AppState
import { fetchNavbarData } from "../app/redux/navBarSlice";

const NavbarComponent: React.FC = () => {
  const dispatch: AppDispatch = useDispatch(); // Use the typed dispatch
  const { navbarData, loading, error } = useSelector(
    (state: AppState) => state.navbar
  );

  useEffect(() => {
    dispatch(fetchNavbarData()); // Dispatch the action to fetch navbar data
  }, [dispatch]);

  if (loading) return <p>Loading navbar...</p>;
  if (error) return <p>Error loading navbar: {error}</p>;

  return (
    <nav>
      <ul>
        {navbarData?.map((item) =>
          item.IsShown ? (
            <li key={item.id}>
              <a href={item.Link}>{item.Label}</a>
            </li>
          ) : null
        )}
      </ul>
    </nav>
  );
};

export default NavbarComponent;
