// SearchSortBar component - provides search and sorting controls
import { SortOption } from '../types/files';

interface SearchSortBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  sortMethod: SortOption;
  onSortMethodChange: (method: string) => void;
  sortDirection: string;
  onSortDirectionChange: () => void;
}

export function SearchSortBar({
  searchTerm,
  onSearchChange,
  sortMethod,
  onSortMethodChange,
  sortDirection,
  onSortDirectionChange,
}: SearchSortBarProps) {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  const handleSortMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSortMethodChange(e.target.value);
  };

  return (
    <div
      data-testid="search-sort-bar"
      className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
    >
      {/* Search Input */}
      <div className="flex-1">
        <label htmlFor="search" className="sr-only">
          Search files
        </label>
        <input
          id="search"
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search files..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="search"
        />
      </div>

      {/* Sort Method Dropdown */}
      <div>
        <label htmlFor="sort-method" className="sr-only">
          Sort by
        </label>
        <select
          id="sort-method"
          value={sortMethod}
          onChange={handleSortMethodChange}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="sort by"
        >
          <option value={SortOption.NAME}>Name</option>
          <option value={SortOption.DATE}>Date</option>
        </select>
      </div>

      {/* Sort Direction Button */}
      <button
        onClick={onSortDirectionChange}
        className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="sort direction"
        title={`Sort ${sortDirection === 'asc' ? 'ascending' : 'descending'}`}
      >
        {sortDirection === 'asc' ? '↑' : '↓'}
      </button>
    </div>
  );
}
