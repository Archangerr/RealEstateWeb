import React from 'react';
import { Link } from 'react-router-dom';

const NavbarV2 = () => {
  return (
    <nav>
      <ul>
        <li>
        <Link to="/EmlakListingPagination">Go Emlak Pagination</Link>
        </li>
        <li>
        <Link to="/EmlakListing">Go Emlak </Link>
        </li>
        <li>
        <Link to="/Search">Search </Link>
        </li>
        
      </ul>
    </nav>
  );
}

export default NavbarV2;