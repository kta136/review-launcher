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
  setSelectedTemplate: (index: number) => void;
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
  setSelectedTemplate,
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
        <mark key={i} className="bg-yellow-200">
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
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 md:mb-8">
      <div className="flex justify-between items-center mb-3 sm:mb-4">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">
          Review Templates
        </h2>
        <div className="flex gap-2 sm:gap-3 flex-wrap">
          <button
            onClick={onGenerateAI}
            disabled={isGenerating}
            className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 md:px-5 py-2 sm:py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] min-w-[44px] text-sm sm:text-base"
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
            className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 md:px-5 py-2 sm:py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors min-h-[44px] min-w-[44px] text-sm sm:text-base"
          >
            <Shuffle className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            Random
          </button>
          <button
            onClick={() => setShowAddTemplate(true)}
            className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 md:px-5 py-2 sm:py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors min-h-[44px] min-w-[44px] text-sm sm:text-base"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            Add
          </button>
        </div>
      </div>

      <div className="mb-3 sm:mb-4">
        <select
          value={selectedTemplate}
          onChange={(e) => setSelectedTemplate(parseInt(e.target.value))}
          className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm sm:text-base min-h-[44px]"
        >
          {templates.map((template, index) => (
            <option key={index} value={index}>
              Template {index + 1}: {template.substring(0, 50)}...
            </option>
          ))}
        </select>
      </div>

      <div className="relative">
        <div className="bg-gray-50 p-4 sm:p-6 rounded-lg border min-h-32">
          <p className="text-gray-800 leading-relaxed text-sm sm:text-base md:text-lg">
            {highlightedTemplate()}
          </p>
        </div>
        {templates.length > 1 && (
          <button
            onClick={() => onRemoveTemplate(selectedTemplate)}
            className="absolute top-2 right-2 p-2 sm:p-3 text-red-500 hover:bg-red-100 rounded flex items-center justify-center min-h-[44px] min-w-[44px]"
            title="Remove this template"
          >
            <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
          </button>
        )}
      </div>

      {showAddTemplate && (
        <div className="mt-4 sm:mt-6 p-4 sm:p-6 md:p-8 bg-gray-50 rounded-lg border">
          <h3 className="font-semibold text-base sm:text-lg md:text-xl mb-2 sm:mb-3">
            Add New Template
          </h3>
          <textarea
            value={newTemplate}
            onChange={(e) => setNewTemplate(e.target.value)}
            placeholder="Enter your new review template..."
            className="w-full p-3 sm:p-4 border border-gray-300 rounded-lg h-24 resize-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm sm:text-base"
          />
          <div className="flex gap-2 sm:gap-3 mt-3">
            <button
              onClick={handleAdd}
              className="px-4 sm:px-5 md:px-6 py-2 sm:py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors min-h-[44px] min-w-[44px] text-sm sm:text-base"
            >
              Add Template
            </button>
            <button
              onClick={() => {
                setShowAddTemplate(false);
                setNewTemplate('');
              }}
              className="px-4 sm:px-5 md:px-6 py-2 sm:py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors min-h-[44px] min-w-[44px] text-sm sm:text-base"
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
