/* eslint-disable react-refresh/only-export-components */
import { useState } from 'react';
import { Plus, Shuffle, Sparkles, RefreshCw, Trash2 } from 'lucide-react';

export const integrateStaffName = (template: string, staffName: string) => {
  const name = staffName.trim();
  if (!name) return template;

  const replacementPatterns = [
    { regex: /\bstaff\b/i, text: `staff, especially ${name}` },
    { regex: /\bteam\b/i, text: `team, particularly ${name}` },
  ];

  for (const { regex, text } of replacementPatterns) {
    if (regex.test(template)) {
      return template.replace(regex, text);
    }
  }

  const endings = [
    `Special thanks to ${name} for the excellent assistance.`,
    `${name} made the visit even better with top-notch service.`,
    `Thanks to ${name} for being so helpful and professional.`,
    `If you go, ask for ${name} – they were wonderful.`,
    `${name}'s support really stood out during my visit.`,
  ];

  const ending = endings[Math.floor(Math.random() * endings.length)];
  return `${template} ${ending}`;
};

interface TemplateManagerProps {
  templates: string[];
  selectedTemplate: number;
  onRandomize: () => void;
  onGenerateAI: () => void;
  onAddTemplate: (template: string) => void;
  onRemoveTemplate: (index: number) => void;
  isGenerating: boolean;
  staffName: string;
}

const TemplateManager = ({
  templates,
  selectedTemplate,
  onRandomize,
  onGenerateAI,
  onAddTemplate,
  onRemoveTemplate,
  isGenerating,
  staffName,
}: TemplateManagerProps) => {
  const [showAddTemplate, setShowAddTemplate] = useState(false);
  const [newTemplate, setNewTemplate] = useState('');

  const highlightedTemplate = () => {
    const text = integrateStaffName(templates[selectedTemplate], staffName);
    if (!staffName.trim()) return text;
    const escaped = staffName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const parts = text.split(new RegExp(`(${escaped})`, 'gi'));
    return parts.map((part, i) =>
      part.toLowerCase() === staffName.trim().toLowerCase() ? (
        <mark key={i} className="bg-fuchsia-600 text-white">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const handleAdd = () => {
    if (newTemplate.trim()) {
      onAddTemplate(newTemplate.trim());
      setNewTemplate('');
      setShowAddTemplate(false);
    }
  };

  return (
    <div className="bg-gray-900/70 border border-indigo-800 rounded-lg shadow-lg p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 md:mb-8">
      <div className="flex justify-between items-center mb-3 sm:mb-4">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-indigo-200">
          Review Templates
        </h2>
        <div className="flex gap-2 sm:gap-3 flex-wrap">
          <button
            onClick={onGenerateAI}
            disabled={isGenerating}
            className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 md:px-5 py-2 sm:py-3 bg-fuchsia-600 text-white rounded-lg hover:bg-fuchsia-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] min-w-[44px] text-sm sm:text-base"
          >
            {isGenerating ? (
              <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 animate-spin" />
            ) : (
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            )}
            {isGenerating ? 'Generating...' : 'AI Generate'}
          </button>
          <button
            onClick={onRandomize}
            className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 md:px-5 py-2 sm:py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors min-h-[44px] min-w-[44px] text-sm sm:text-base"
          >
            <Shuffle className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            Random
          </button>
          <button
            onClick={() => setShowAddTemplate(true)}
            className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 md:px-5 py-2 sm:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors min-h-[44px] min-w-[44px] text-sm sm:text-base"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            Add
          </button>
        </div>
      </div>

      <div className="relative mt-3 sm:mt-4">
        <div className="bg-gray-800 p-4 sm:p-6 rounded-lg border border-gray-700 min-h-32">
          <p className="text-gray-300 leading-relaxed text-sm sm:text-base md:text-lg">
            {highlightedTemplate()}
          </p>
        </div>
        {templates.length > 1 && (
          <button
            onClick={() => onRemoveTemplate(selectedTemplate)}
            className="absolute top-2 right-2 p-2 sm:p-3 text-red-400 hover:bg-red-900/30 rounded flex items-center justify-center min-h-[44px] min-w-[44px]"
            title="Remove this template"
          >
            <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </button>
        )}
      </div>

      {showAddTemplate && (
        <div className="mt-4 sm:mt-6 p-4 sm:p-6 md:p-8 bg-gray-800 rounded-lg border border-gray-700">
          <h3 className="font-semibold text-base sm:text-lg md:text-xl mb-2 sm:mb-3 text-indigo-200">
            Add New Template
          </h3>
          <textarea
            value={newTemplate}
            onChange={(e) => setNewTemplate(e.target.value)}
            placeholder="Enter your new review template..."
            className="w-full p-3 sm:p-4 border border-gray-700 rounded-lg h-24 resize-none bg-gray-900 text-white placeholder-gray-400 focus:ring-2 focus:ring-fuchsia-500 focus:border-transparent text-sm sm:text-base"
          />
          <div className="flex gap-2 sm:gap-3 mt-3">
            <button
              onClick={handleAdd}
              className="px-4 sm:px-5 md:px-6 py-2 sm:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors min-h-[44px] min-w-[44px] text-sm sm:text-base"
            >
              Add Template
            </button>
            <button
              onClick={() => {
                setShowAddTemplate(false);
                setNewTemplate('');
              }}
              className="px-4 sm:px-5 md:px-6 py-2 sm:py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors min-h-[44px] min-w-[44px] text-sm sm:text-base"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateManager;
