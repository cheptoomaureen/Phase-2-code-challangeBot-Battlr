// SortBar.js

import React from 'react';

const SortBar = ({ sortBots }) => {
  return (
    <div className="sort-bar">
      <label htmlFor="sortBy">Sort by:</label>
      <select id="sortBy" onChange={(e) => sortBots(e.target.value)}>
        <option value="health">Health</option>
        <option value="damage">Damage</option>
        <option value="armor">Armor</option>
      </select>
    </div>
  );
};

export default SortBar;
