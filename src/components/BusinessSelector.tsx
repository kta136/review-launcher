import type { Business, BusinessKey } from '../data/businesses';

interface BusinessSelectorProps {
  businesses: Record<BusinessKey, Business>;
  selectedBusiness: BusinessKey;
  onSelect: (key: BusinessKey) => void;
}

const BusinessSelector = ({ businesses, selectedBusiness, onSelect }: BusinessSelectorProps) => (
  <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 md:mb-8">
    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4">
      Select Business
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
      {Object.entries(businesses).map(([key, business]) => (
        <button
          key={key}
          onClick={() => onSelect(key as BusinessKey)}
          className={`p-4 sm:p-6 md:p-8 rounded-lg border-2 transition-all duration-200 flex items-center gap-3 min-h-[44px] min-w-[44px] ${
            selectedBusiness === key
              ? 'border-amber-500 bg-amber-50 text-amber-800'
              : 'border-gray-200 hover:border-amber-300 hover:bg-amber-25'
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
