import React, { useState } from 'react';

export const Searchbar = ({ onSubmit }) => {
    const [query, setQuery] = useState('');

    const handleChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(query);
        setQuery('');
    };

  return (
    <header className="searchbar">
        <form className="form" onSubmit={handleSubmit}>
            <button type="submit" className="button">
            <span className="button-label">Search</span>
            </button>

            <input
            className="input"
            type="text"
            value={query}
            onChange={handleChange}
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
            />
        </form>
    </header>
  );
};
