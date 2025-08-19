import { X, Check } from 'lucide-react';

interface StaffSelectorProps {
  staffName: string;
  onChange: (name: string) => void;
}

const StaffSelector = ({ staffName, onChange }: StaffSelectorProps) => (
  <div className="bg-gray-900/70 border border-indigo-800 rounded-lg shadow-lg p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 md:mb-8">
    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-indigo-200 mb-3 sm:mb-4">
      Staff Member (optional)
    </h2>
    <div className="relative">
      <input
        type="text"
        value={staffName}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter staff name"
        className="w-full p-3 sm:p-4 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent pr-10 text-sm sm:text-base"
      />
      {staffName && (
        <button
          onClick={() => onChange('')}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
          aria-label="Clear staff name"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
    {staffName && (
      <p className="text-sm text-green-400 mt-2 flex items-center gap-1">
        <Check className="w-4 h-4" />
        Included in review
      </p>
    )}
  </div>
);

export default StaffSelector;

