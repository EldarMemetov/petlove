import { useState } from 'react';

export default function SearchField({ onSearch }) {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(value);
  };

  const handleClear = () => {
    setValue('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} className="search-field">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search..."
      />
      {value && (
        <button type="button" onClick={handleClear}>
          ✕
        </button>
      )}
      <button type="submit">🔍</button>
    </form>
  );
}
