import { useState, useEffect } from 'react';
import BusinessSelector from './components/BusinessSelector';
import TemplateManager from './components/TemplateManager';
import ReviewActions from './components/ReviewActions';
import ShareTool from './components/ShareTool';
import { businesses, type BusinessKey } from './data/businesses';
import initialTemplates from './data/templates';

const ReviewLauncher = () => {
  const [selectedBusiness, setSelectedBusiness] = useState<BusinessKey>('dda-jewels');
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const [copySuccess, setCopySuccess] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [templates, setTemplates] = useState<Record<BusinessKey, string[]>>(initialTemplates);
  const [staffName, setStaffName] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('templates');
    if (stored) {
      try {
        setTemplates(JSON.parse(stored) as Record<BusinessKey, string[]>);
      } catch (err) {
        console.error('Failed to parse templates from localStorage', err);
        setTemplates(initialTemplates);
      }
    } else {
      setTemplates(initialTemplates);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('templates', JSON.stringify(templates));
  }, [templates]);

  const handleLaunchReview = async () => {
    let reviewText = templates[selectedBusiness][selectedTemplate];
    const business = businesses[selectedBusiness];

    if (staffName.trim()) {
      const thanksMessages = [
        `A big thank you to ${staffName} for all their help.`,
        `${staffName} was incredibly helpful throughout my visit.`,
        `Kudos to ${staffName} for the excellent service.`,
        `Thanks to ${staffName} for making my experience great.`,
      ];
      const randomThanks =
        thanksMessages[Math.floor(Math.random() * thanksMessages.length)];
      reviewText += ` ${randomThanks}`;
    }

    try {
      if ('clipboard' in navigator) {
        await navigator.clipboard.writeText(reviewText);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = reviewText;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        const successful = document.execCommand('copy');
        document.body.removeChild(textarea);
        if (!successful) throw new Error('Copy command failed');
      }

      const reviewWindow = window.open(
        business.reviewUrl,
        '_blank',
        'noopener,noreferrer'
      );

      if (reviewWindow) {
        reviewWindow.opener = null;
        setCopySuccess(
          'Review copied and review box opened! Paste your review and submit.'
        );
        setTimeout(() => setCopySuccess(''), 4000);
      } else {
        setCopySuccess('Popup blocked. Please allow popups for this site.');
        setTimeout(() => setCopySuccess(''), 4000);
      }
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
            'wholesale rate',
            'genuine rates',
            'fair market prices',
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
            'wholesale',
            'silver utensils',
            'silver coins',
            'silver murti',
            'silver idols',
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
      const randomKeywords = keywords.sort(() => 0.5 - Math.random()).slice(0, 3);
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

  const handleAddTemplate = (template: string) => {
    setTemplates((prev) => ({
      ...prev,
      [selectedBusiness]: [...prev[selectedBusiness], template],
    }));
  };

  const handleRemoveTemplate = (index: number) => {
    if (templates[selectedBusiness].length > 1) {
      setTemplates((prev) => ({
        ...prev,
        [selectedBusiness]: prev[selectedBusiness].filter((_, i) => i !== index),
      }));
      if (selectedTemplate >= templates[selectedBusiness].length - 1) {
        setSelectedTemplate(0);
      }
    }
  };

  const handleWhatsAppShare = () => {
    const appUrl = window.location.href;
    const message = `✨ Help us grow! Use this Review Launcher to easily post reviews for our jewellery stores:\n\n${appUrl}\n\nJust copy the review and paste it on Google Maps. Thank you for your support! 💍✔️`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    const newWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
  };

  useEffect(() => {
    setSelectedTemplate(0);
  }, [selectedBusiness]);

  const currentTemplates = templates[selectedBusiness];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-yellow-100 p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-1 sm:mb-2 md:mb-4">
            Review Launcher
          </h1>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg">
            Streamline your Google Maps review process
          </p>
        </div>

        <BusinessSelector
          businesses={businesses}
          selectedBusiness={selectedBusiness}
          onSelect={setSelectedBusiness}
        />

        <TemplateManager
          templates={currentTemplates}
          selectedTemplate={selectedTemplate}
          setSelectedTemplate={setSelectedTemplate}
          onRandomize={handleRandomizeTemplate}
          onGenerateAI={generateAITemplate}
          onAddTemplate={handleAddTemplate}
          onRemoveTemplate={handleRemoveTemplate}
          isGenerating={isGenerating}
        />

        <ReviewActions
          onLaunch={handleLaunchReview}
          copySuccess={copySuccess}
          staffName={staffName}
          setStaffName={setStaffName}
        />

        <ShareTool onShare={handleWhatsAppShare} />
      </div>
    </div>
  );
};

export default ReviewLauncher;
