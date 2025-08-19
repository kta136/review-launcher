import type { Business, BusinessKey } from '../data/businesses';

interface BusinessSelectorProps {
  businesses: Record<BusinessKey, Business>;
  selectedBusiness: BusinessKey;
  onSelect: (key: BusinessKey) => void;
}

const BusinessSelector = ({ businesses, selectedBusiness, onSelect }: BusinessSelectorProps) => (
  <div className="bg-gray-900/70 border border-indigo-800 rounded-lg shadow-lg p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 md:mb-8">
    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-indigo-200 mb-3 sm:mb-4">
      Select Business
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
      {(Object.entries(businesses) as [BusinessKey, Business][]).map(([key, business]) => (
        <button
          key={key}
          onClick={() => onSelect(key)}
          className={`p-4 sm:p-6 md:p-8 rounded-lg border-2 transition-all duration-200 flex items-center gap-3 min-h-[44px] min-w-[44px] ${
            selectedBusiness === key
              ? 'border-fuchsia-500 bg-fuchsia-900/30 text-fuchsia-200'
              : 'border-indigo-800 hover:border-fuchsia-500 hover:bg-fuchsia-900/20 text-indigo-200'
          }`}
        >
          {business.icon}
          <div className="text-left">
            <div className="font-semibold text-base sm:text-lg md:text-xl">
              {business.name}
            </div>
            <div className="text-xs sm:text-sm md:text-base opacity-75">
              {business.type}
            </div>
          </div>
        </button>
      ))}
    </div>
  </div>
);

export default BusinessSelector;
