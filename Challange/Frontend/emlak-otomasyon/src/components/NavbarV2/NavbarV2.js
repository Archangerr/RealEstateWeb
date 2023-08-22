import React from 'react';
import { Link } from 'react-router-dom';

const NavbarV2 = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        EmlakApp
      </Link>
      
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/EmlakListingPagination">Emlak Pagination</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/EmlakAdd">Add Emlak</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/Search">Search</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/ParametersAdd">Parameters</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/MapPage">MapPage</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/Map">Map</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/ProfilePage">ProfilePage</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavbarV2;