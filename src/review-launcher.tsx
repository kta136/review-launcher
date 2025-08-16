import { useState, useEffect, type ReactElement } from 'react';
import {
  Copy,
  ExternalLink,
  Plus,
  Trash2,
  Shuffle,
  MessageCircle,
  Star,
  Diamond,
  Sparkles,
  RefreshCw,
} from 'lucide-react';

// Define the shape of a single business
interface Business {
  name: string;
  type: string;
  reviewUrl: string;
  icon: ReactElement;
}

// Define the businesses object with a specific type
const businesses: Record<string, Business> = {
  'dda-jewels': {
    name: 'DDA Jewels',
    type: 'Gold Jewellery',
    reviewUrl: 'https://g.page/r/CaOdDJElz7lZEBM/review',
    icon: <Diamond className="w-5 h-5" />,
  },
  'deen-dayal': {
    name: 'Deen Dayal Anand Kumar Saraf',
    type: 'Silver Jewellery',
    reviewUrl: 'https://g.page/r/CcHmi1ubP54SEBM/review',
    icon: <Star className="w-5 h-5" />,
  },
};

// Create a type that represents only the valid keys of the businesses object
type BusinessKey = keyof typeof businesses;

const ReviewLauncher = () => {
  const [selectedBusiness, setSelectedBusiness] =
    useState<BusinessKey>('dda-jewels');
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const [copySuccess, setCopySuccess] = useState('');
  const [showAddTemplate, setShowAddTemplate] = useState(false);
  const [newTemplate, setNewTemplate] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Initial templates for both businesses, typed with our BusinessKey
  const [templates, setTemplates] = useState<Record<BusinessKey, string[]>>({
    'dda-jewels': [
      'Absolutely stunning collection at DDA Jewels! Their hallmark gold jewellery is of exceptional quality with beautiful designs. Perfect for bridal gold sets and traditional occasions. Highly recommended for authentic gold ornaments with proper certification. The craftsmanship is outstanding and the staff is very knowledgeable about their products.',
      'DDA Jewels offers the finest hallmark gold jewellery in town! Their bridal gold sets are breathtaking and the quality is unmatched. Great selection of traditional and modern designs. The gold purity is certified and the prices are reasonable. Excellent customer service and beautiful showroom ambiance.',
      'Love shopping at DDA Jewels for their premium hallmark gold jewellery! The collection includes amazing bridal gold sets, elegant necklaces, and traditional ornaments. The gold quality is certified and authentic. Staff is helpful and the overall experience is fantastic. Perfect place for all gold jewellery needs!',
    ],
    'deen-dayal': [
      'Exceptional experience at Deen Dayal Anand Kumar Saraf! Their 925 hallmark silver collection is absolutely beautiful. Pure silver ornaments with intricate designs and excellent craftsmanship. Perfect for traditional occasions and daily wear. Highly recommend for authentic silver jewellery with proper certification.',
      'Outstanding quality pure silver ornaments at Deen Dayal Anand Kumar Saraf! Their 925 hallmark silver pieces are stunning and well-crafted. Great variety in traditional and contemporary designs. The silver purity is certified and the service is excellent. Best place for authentic silver jewellery shopping.',
      'Amazing collection of 925 hallmark silver at Deen Dayal Anand Kumar Saraf! The pure silver ornaments are beautifully designed and of superior quality. Perfect craftsmanship and authentic certification. Wonderful shopping experience with knowledgeable staff. Highly recommended for all silver jewellery needs!',
    ],
  });

  const handleLaunchReview = async () => {
    const reviewText = templates[selectedBusiness][selectedTemplate];
    const business = businesses[selectedBusiness];

    try {
      await navigator.clipboard.writeText(reviewText);
      window.open(business.reviewUrl, '_blank');
      setCopySuccess(
        'Review copied and review box opened! Paste your review and submit.',
      );
      setIsCopied(true);
      setTimeout(() => {
        setCopySuccess('');
        setIsCopied(false);
      }, 4000);
    } catch (error) {
      console.error(error);
      setCopySuccess('Failed to launch review');
      setTimeout(() => setCopySuccess(''), 3000);
    }
  };

  const handleRandomizeTemplate = () => {
    const currentTemplates = templates[selectedBusiness];
    const randomIndex = Math.floor(Math.random() * currentTemplates.length);
    setSelectedTemplate(randomIndex);
  };

  const generateAITemplate = () => {
    setIsGenerating(true);

    const business = businesses[selectedBusiness];
    const keywords =
      selectedBusiness === 'dda-jewels'
        ? [
            'hallmark gold jewellery',
            'bridal gold sets',
            'authentic gold ornaments',
            'certified gold',
            'traditional designs',
            'modern jewelry',
            'gold purity',
            'craftsmanship',
            'wedding jewelry',
            'gold collection',
          ]
        : [
            '925 hallmark silver',
            'pure silver ornaments',
            'silver craftsmanship',
            'traditional silver',
            'contemporary designs',
            'silver purity',
            'authentic silver',
            'silver collection',
            'handcrafted silver',
            'premium silver',
          ];

    const openings = [
      'Absolutely amazing experience at',
      'Outstanding quality and service at',
      'Highly recommend',
      'Exceptional collection at',
      'Fantastic shopping experience at',
      'Impressed by the quality at',
      'Beautiful selection available at',
      'Top-notch service and products at',
      'Wonderful experience shopping at',
      'Excellent quality and variety at',
    ];

    const middles = [
      'The quality is unmatched and the designs are stunning.',
      'Perfect blend of traditional and modern styles.',
      'Excellent craftsmanship and attention to detail.',
      'Beautiful designs with authentic certification.',
      'Great variety and competitive pricing.',
      'Outstanding customer service and product quality.',
      'Impressive collection with certified authenticity.',
      'Professional staff and genuine products.',
      'Remarkable quality and beautiful presentation.',
      'Exceptional value and premium quality.',
    ];

    const endings = [
      'Will definitely shop here again!',
      'Highly recommended for all jewelry needs.',
      'Perfect place for authentic jewelry shopping.',
      'Excellent choice for quality jewelry.',
      'Great experience, will return soon!',
      'Best place for certified jewelry.',
      'Outstanding service and products.',
      'Definitely worth visiting!',
      'Impressed with everything!',
      'Five stars well deserved!',
    ];

    setTimeout(() => {
      const randomKeywords = keywords
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
      const opening = openings[Math.floor(Math.random() * openings.length)];
      const middle = middles[Math.floor(Math.random() * middles.length)];
      const ending = endings[Math.floor(Math.random() * endings.length)];

      const template = `${opening} ${business.name}! Their ${randomKeywords.join(', ')} collection is exceptional. ${middle} The staff is knowledgeable and helpful throughout the process. ${ending}`;

      setTemplates((prev) => ({
        ...prev,
        [selectedBusiness]: [template, ...prev[selectedBusiness]],
      }));

      setSelectedTemplate(0);
      setIsGenerating(false);
      setCopySuccess('✨ AI template generated and selected!');
      setTimeout(() => setCopySuccess(''), 3000);
    }, 2000);
  };

  const handleAddTemplate = () => {
    if (newTemplate.trim()) {
      setTemplates((prev) => ({
        ...prev,
        [selectedBusiness]: [...prev[selectedBusiness], newTemplate.trim()],
      }));
      setNewTemplate('');
      setShowAddTemplate(false);
    }
  };

  const handleRemoveTemplate = (index: number) => {
    if (templates[selectedBusiness].length > 1) {
      setTemplates((prev) => ({
        ...prev,
        [selectedBusiness]: prev[selectedBusiness].filter(
          (_: string, i: number) => i !== index,
        ),
      }));
      if (selectedTemplate >= templates[selectedBusiness].length - 1) {
        setSelectedTemplate(0);
      }
    }
  };

  const handleWhatsAppShare = () => {
    const appUrl = window.location.href;
    const message = `馃専 Help us grow! Use this Review Launcher to easily post reviews for our jewellery stores:\n\n${appUrl}\n\nJust copy the review and paste it on Google Maps. Thank you for your support! 馃拵鉁╜`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  useEffect(() => {
    setSelectedTemplate(0);
  }, [selectedBusiness]);

  const currentTemplates = templates[selectedBusiness];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Review Launcher
          </h1>
          <p className="text-gray-600">
            Streamline your Google Maps review process
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6 transition-shadow duration-150 hover:shadow-xl">
          <h2 className="text-xl font-semibold mb-4">Select Business</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(businesses).map(([key, business]) => (
              <button
                key={key}
                onClick={() => setSelectedBusiness(key as BusinessKey)}
                className={`p-4 rounded-lg border-2 transition-all duration-150 flex items-center gap-3 ${
                  selectedBusiness === key
                    ? 'border-amber-500 bg-amber-50 text-amber-800'
                    : 'border-gray-200 hover:border-amber-300 hover:bg-amber-25'
                }`}
              >
                {business.icon}
                <div className="text-left">
                  <div className="font-semibold">{business.name}</div>
                  <div className="text-sm opacity-75">{business.type}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6 transition-shadow duration-150 hover:shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Review Templates</h2>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={generateAITemplate}
                disabled={isGenerating}
                className={`flex items-center gap-2 px-3 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed ${isGenerating ? 'motion-safe:animate-pulse' : ''}`}
              >
                {isGenerating ? (
                  <RefreshCw className="w-4 h-4 motion-safe:animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
                {isGenerating ? 'Generating...' : 'AI Generate'}
              </button>
              <button
                onClick={handleRandomizeTemplate}
                className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-150"
              >
                <Shuffle className="w-4 h-4" />
                Random
              </button>
              <button
                onClick={() => setShowAddTemplate(true)}
                className="flex items-center gap-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-150"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>
          </div>

          <div className="mb-4">
            <select
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(parseInt(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            >
              {currentTemplates.map((template: string, index: number) => (
                <option key={index} value={index}>
                  Template {index + 1}: {template.substring(0, 50)}...
                </option>
              ))}
            </select>
          </div>

          <div className="relative">
            <div className="bg-gray-50 p-4 rounded-lg border min-h-32">
              <p className="text-gray-800 leading-relaxed">
                {currentTemplates[selectedTemplate]}
              </p>
            </div>
            {currentTemplates.length > 1 && (
              <button
                onClick={() => handleRemoveTemplate(selectedTemplate)}
                className="absolute top-2 right-2 p-1 text-red-500 hover:bg-red-100 rounded transition-colors duration-150"
                title="Remove this template"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>

          {showAddTemplate && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
              <h3 className="font-semibold mb-2">Add New Template</h3>
              <textarea
                value={newTemplate}
                onChange={(e) => setNewTemplate(e.target.value)}
                placeholder="Enter your new review template..."
                className="w-full p-3 border border-gray-300 rounded-lg h-24 resize-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
              <div className="flex gap-2 mt-3">
                <button
                  onClick={handleAddTemplate}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-150"
                >
                  Add Template
                </button>
                <button
                  onClick={() => {
                    setShowAddTemplate(false);
                    setNewTemplate('');
                  }}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-150"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6 transition-shadow duration-150 hover:shadow-xl">
          <h2 className="text-xl font-semibold mb-4">Launch Review</h2>
          <div className="grid grid-cols-1 gap-4">
            <button
              onClick={handleLaunchReview}
              className={`flex items-center justify-center gap-3 p-4 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors duration-150 font-semibold text-lg ${isCopied ? 'motion-safe:animate-pulse' : ''}`}
            >
              <Copy className="w-5 h-5" />
              <ExternalLink className="w-5 h-5" />
              Copy & Open Review
            </button>
          </div>

          {copySuccess && (
            <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-lg text-center motion-safe:animate-fade-in">
              {copySuccess}
            </div>
          )}

          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="text-blue-800 text-sm">
              <strong>Instructions:</strong>
            </p>
            <ol className="text-blue-800 text-sm mt-2 space-y-1">
              <li>
                1. Click "Copy & Open Review" to copy the review and launch the
                review box
              </li>
              <li>2. Paste the copied review and add your star rating</li>
              <li>3. Click "Post" to submit your review!</li>
            </ol>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 transition-shadow duration-150 hover:shadow-xl">
          <h2 className="text-xl font-semibold mb-4">Share This Tool</h2>
          <p className="text-gray-600 mb-4">
            Share this Review Launcher with others to help them easily post
            reviews too!
          </p>
          <button
            onClick={handleWhatsAppShare}
            className="flex items-center gap-3 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-150 font-semibold"
          >
            <MessageCircle className="w-5 h-5" />
            Share via WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewLauncher;
