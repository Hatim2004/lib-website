import { Outlet } from "react-router-dom";
import Appbar from "../components/Appbar";
import { useState, useEffect } from "react";

export default function Root() {
  const [basketCount, setBasketCount] = useState(0);
  const [favoritesCount, setFavoritesCount] = useState(0);

  const fetchBasketCount = () => {
    fetch('https://api-05ii.onrender.com/loans')
      .then(res => res.json())
      .then(data => setBasketCount(data.length))
      .catch(console.error);
  };

  const fetchFavoritesCount = () => {
    fetch('https://api-05ii.onrender.com/favorites')
      .then(res => res.json())
      .then(data => setFavoritesCount(data.length))
      .catch(console.error);
  };

  useEffect(() => {
    fetchBasketCount();
    fetchFavoritesCount();
  }, []);

  return (
    <>
      <Appbar basketCount={basketCount} favoritesCount={favoritesCount} />
      <Outlet context={{ fetchBasketCount, fetchFavoritesCount }} />
    </>
  );
}
