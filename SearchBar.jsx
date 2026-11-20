import { SearchIcon } from './icons.jsx';

export default function SearchBar({ value, onChange, id = 'library-search' }) {
  return (
    <label className="search">
      <SearchIcon />
      <input
        id={id}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Escape') onChange('');
        }}
        placeholder="Search animations by name"
        aria-label="Search animations by name"
        autoComplete="off"
        spellCheck={false}
      />
    </label>
  );
}
