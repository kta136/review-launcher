import { Copy, ExternalLink } from 'lucide-react';

interface ReviewActionsProps {
  onLaunch: () => void;
  copySuccess: string;
  staffName: string;
  setStaffName: (value: string) => void;
}

const ReviewActions = ({
  onLaunch,
  copySuccess,
  staffName,
  setStaffName,
}: ReviewActionsProps) => (
  <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 md:mb-8">
    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4">
      Launch Review
    </h2>

    <div className="mb-4">
      <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
        Staff member who helped you (optional)
      </label>
      <input
        type="text"
        value={staffName}
        onChange={(e) => setStaffName(e.target.value)}
        placeholder="Enter staff name"
        className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm sm:text-base min-h-[44px]"
      />
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <button
        onClick={onLaunch}
        className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 p-4 sm:p-6 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-semibold text-lg sm:text-xl md:text-2xl min-h-[44px] min-w-[44px] sm:col-span-2 md:col-span-3"
      >
        <Copy className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
        <ExternalLink className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
        Copy & Open Review
      </button>
    </div>

    {copySuccess && (
      <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-green-100 text-green-800 rounded-lg text-center text-sm sm:text-base">
        {copySuccess}
      </div>
    )}

    <div className="mt-4 sm:mt-6 p-4 sm:p-6 md:p-8 bg-blue-50 rounded-lg">
      <p className="text-blue-800 text-xs sm:text-sm md:text-base">
        <strong>Instructions:</strong>
      </p>
      <ol className="text-blue-800 text-xs sm:text-sm md:text-base mt-2 sm:mt-3 space-y-1">
        <li>
          1. Click "Copy & Open Review" to copy the review and launch the review box
        </li>
        <li>2. Paste the copied review and add your star rating</li>
        <li>3. Click "Post" to submit your review!</li>
      </ol>
    </div>
  </div>
);

export default ReviewActions;
