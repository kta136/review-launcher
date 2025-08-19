import { useState, useEffect } from 'react';
import BusinessSelector from './components/BusinessSelector';
import StaffSelector from './components/StaffSelector';
import TemplateManager, { integrateStaffName } from './components/TemplateManager';
import ReviewActions from './components/ReviewActions';
import ShareTool from './components/ShareTool';
import { businesses, type BusinessKey } from './data/businesses';
import initialTemplates from './data/templates';
import groqService from './services/groq';

const fallbackKeywords = {
  gold: [
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
    'designer gold jewellery',
    'kdm gold',
    'custom gold jewelry',
    'gold bangles',
    'gold earrings',
    'trusted gold jeweller',
    'family jewellers',
    'gold necklace',
  ],
  silver: [
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
    'sterling silver jewellery',
    'silver gifts',
    'silver jewellery shop',
    'silver pooja items',
    'silver anklets',
    'silver bangles',
  ],
} as const;

const fallbackOpenings = [
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

const fallbackMiddles = [
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

const fallbackEndings = [
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

const generateFallbackTemplate = (
  businessName: string,
  type: 'gold' | 'silver',
) => {
  const keywords = [...fallbackKeywords[type]];
  const randomKeywords = keywords.sort(() => 0.5 - Math.random()).slice(0, 3);
  const opening =
    fallbackOpenings[Math.floor(Math.random() * fallbackOpenings.length)];
  const middle =
    fallbackMiddles[Math.floor(Math.random() * fallbackMiddles.length)];
  const ending =
    fallbackEndings[Math.floor(Math.random() * fallbackEndings.length)];
  const keywordsText = randomKeywords.join(', ');

  return `${opening} ${businessName}! Their ${keywordsText} collection is exceptional. ${middle} The staff is knowledgeable and helpful throughout the process. ${ending}`;
};

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
    const reviewText = integrateStaffName(
      templates[selectedBusiness][selectedTemplate],
      staffName,
    );
    const business = businesses[selectedBusiness];

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

  const generateAITemplate = async () => {
    setIsGenerating(true);
    const business = businesses[selectedBusiness];
    const type = selectedBusiness === 'dda-jewels' ? 'gold' : 'silver';

    try {
      const template = await groqService.generateReview({
        businessName: business.name,
        businessType: type,
        staffName: staffName.trim() || undefined,
      });

      setTemplates((prev) => ({
        ...prev,
        [selectedBusiness]: [template, ...prev[selectedBusiness]],
      }));
      setSelectedTemplate(0);
      setCopySuccess('✨ AI template generated and selected!');
    } catch (err) {
      console.error('Groq generation failed', err);
      const template = generateFallbackTemplate(business.name, type);
      setTemplates((prev) => ({
        ...prev,
        [selectedBusiness]: [template, ...prev[selectedBusiness]],
      }));
      setSelectedTemplate(0);
      setCopySuccess('⚠️ Using fallback template');
    } finally {
      setIsGenerating(false);
      setTimeout(() => setCopySuccess(''), 3000);
    }
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-indigo-900 text-white p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-indigo-200 mb-1 sm:mb-2 md:mb-4">
            Review Launcher
          </h1>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg">
            Streamline your Google Maps review process
          </p>
        </div>

        <BusinessSelector
          businesses={businesses}
          selectedBusiness={selectedBusiness}
          onSelect={setSelectedBusiness}
        />

        <StaffSelector staffName={staffName} onChange={setStaffName} />

        <TemplateManager
          templates={currentTemplates}
          selectedTemplate={selectedTemplate}
          onRandomize={handleRandomizeTemplate}
          onGenerateAI={generateAITemplate}
          onAddTemplate={handleAddTemplate}
          onRemoveTemplate={handleRemoveTemplate}
          isGenerating={isGenerating}
          staffName={staffName}
        />

        <ReviewActions onLaunch={handleLaunchReview} copySuccess={copySuccess} />

        <ShareTool onShare={handleWhatsAppShare} />
      </div>
    </div>
  );
};

export default ReviewLauncher;
