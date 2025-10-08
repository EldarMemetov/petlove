import { useState } from 'react';

export default function SearchField({ onSearch }) {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(value.trim());
  };

  const handleClear = () => {
    setValue('');
    onSearch('');
  };

  return (
    <form className="search-field" onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search..."
      />
      {value && (
        <button type="button" className="clear-btn" onClick={handleClear}>
          ✕
        </button>
      )}
      <button type="submit" className="search-btn">
        🔍
      </button>
    </form>
  );
}
