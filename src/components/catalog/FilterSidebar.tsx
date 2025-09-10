import React from 'react';

type Props = {
  genres: string[];
  selectedGenres: string[];
  onToggleGenre: (genre: string) => void;
  onClear: () => void;
};

const FilterSidebar: React.FC<Props> = ({ genres, selectedGenres, onToggleGenre, onClear }) => {
  return (
    <aside className="w-full lg:w-64 bg-white border border-gray-200 rounded-xl p-4 dark:bg-dark-purple/20 dark:border-purple/30">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-black dark:text-white">Filters</h3>
        <button onClick={onClear} className="text-sm text-purple hover:underline">Clear</button>
      </div>
      <div>
        <h4 className="text-sm font-medium text-gray-700 dark:text-grey mb-2">Genres</h4>
        <div className="flex flex-wrap gap-2">
          {genres.map((g) => {
            const active = selectedGenres.includes(g);
            return (
              <button
                key={g}
                onClick={() => onToggleGenre(g)}
                className={`px-3 py-1 rounded-lg border text-sm transition-all ${
                  active
                    ? 'bg-purple text-white border-purple'
                    : 'bg-white text-black border-gray-300 hover:bg-gray-50 dark:bg-transparent dark:text-white dark:border-purple/30'
                }`}
              >
                {g}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
