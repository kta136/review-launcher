const ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';
const MODEL = 'llama-3.1-8b-instant';

interface GenerateParams {
  businessName: string;
  businessType: 'gold' | 'silver';
  staffName?: string;
}

interface CacheEntry {
  value: string;
  timestamp: number;
}

const KEYWORDS: Record<GenerateParams['businessType'], string[]> = {
  gold: [
    'hallmark gold',
    'bridal sets',
    'purity',
    'certification',
    'craftsmanship',
    'wedding jewellery',
    'wholesale rate',
    'fair pricing',
  ],
  silver: [
    '925 silver',
    'pure silver',
    'traditional designs',
    'silver ornaments',
    'handcrafted',
    'silver coins',
    'silver utensils',
  ],
};

class GroqService {
  private cacheKey({ businessName, businessType, staffName }: GenerateParams) {
    return `groq-review:${businessName}:${businessType}:${staffName ?? ''}`;
  }

  async generateReview(params: GenerateParams): Promise<string> {
    const key = this.cacheKey(params);
    const cached = localStorage.getItem(key);
    if (cached) {
      try {
        const entry = JSON.parse(cached) as CacheEntry;
        if (Date.now() - entry.timestamp < 60 * 60 * 1000) {
          return entry.value;
        }
      } catch {
        /* ignore corrupted cache */
      }
    }

    const apiKey = import.meta.env.VITE_GROQ_API_KEY as string | undefined;
    if (!apiKey) {
      throw new Error('Missing GROQ API key');
    }

    const staffLine = params.staffName ? `Staff Member: ${params.staffName}\n` : '';
    const staffBullet = params.staffName
      ? '- Naturally includes and thanks the staff member by name\n'
      : '';
    const keywords = KEYWORDS[params.businessType].join(', ');

    const prompt = `You are a helpful assistant that generates authentic Google Maps reviews for jewelry businesses.\n\nBusiness: ${params.businessName}\nType: ${params.businessType}\n${staffLine}Generate a positive, authentic-sounding Google Maps review that:\n- Mentions the business naturally\n${staffBullet}- Uses specific jewelry terminology appropriate for ${params.businessType}\n- Sounds genuine and personal\n- Is 2-3 sentences long\n- Includes specific positive aspects\n\nExample keywords for ${params.businessType}: ${keywords}\n\nGenerate only the review text, no other content.`;

    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 200,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content?.trim();
    if (!content) {
      throw new Error('Invalid Groq response');
    }

    const entry: CacheEntry = { value: content, timestamp: Date.now() };
    localStorage.setItem(key, JSON.stringify(entry));

    return content;
  }
}

export const groqService = new GroqService();
export type { GenerateParams };
export default groqService;
