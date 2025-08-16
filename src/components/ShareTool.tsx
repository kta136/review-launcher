import { MessageCircle } from 'lucide-react';

interface ShareToolProps {
  onShare: () => void;
}

const ShareTool = ({ onShare }: ShareToolProps) => (
  <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8">
    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4">
      Share This Tool
    </h2>
    <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-3 sm:mb-4">
      Share this Review Launcher with others to help them easily post reviews too!
    </p>
    <button
      onClick={onShare}
      className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 md:px-8 py-3 sm:py-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold text-base sm:text-lg md:text-xl min-h-[44px] min-w-[44px]"
    >
      <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" />
      Share via WhatsApp
    </button>
  </div>
);

export default ShareTool;
