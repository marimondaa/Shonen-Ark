import React from 'react';

type Props = {
  sort: string;
  onChange: (value: string) => void;
  query: string;
  onQueryChange: (value: string) => void;
};

const SortBar: React.FC<Props> = ({ sort, onChange, query, onQueryChange }) => {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-xl p-3 flex flex-col sm:flex-row gap-3 items-center justify-between dark:bg-dark-purple/20 dark:border-purple/30">
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <label htmlFor="sort" className="text-sm text-gray-700 dark:text-grey">Sort By</label>
        <select
          id="sort"
          value={sort}
          onChange={(e) => onChange(e.target.value)}
          className="px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple dark:bg-transparent dark:text-white dark:border-purple/30 border"
        >
          <option value="START_DATE_DESC" className="text-black">Newest</option>
          <option value="TRENDING_DESC" className="text-black">Trending</option>
          <option value="POPULARITY_DESC" className="text-black">Most Popular</option>
          <option value="SCORE_DESC" className="text-black">Top Rated</option>
        </select>
      </div>
      <div className="flex-1 w-full">
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search anime..."
          className="w-full px-4 py-2 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple dark:bg-transparent dark:text-white dark:border-purple/30 border"
        />
      </div>
    </div>
  );
};

export default SortBar;
