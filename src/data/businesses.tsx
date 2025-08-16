import type { ReactElement } from 'react';
import { Diamond, Star } from 'lucide-react';

export interface Business {
  name: string;
  type: string;
  reviewUrl: string;
  icon: ReactElement;
}

export const businesses: Record<string, Business> = {
  'dda-jewels': {
    name: 'DDA Jewels',
    type: 'Gold Jewellery',
    reviewUrl: 'https://g.page/r/CaOdDJElz7lZEBM/review',
    icon: <Diamond className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
  },
  'deen-dayal': {
    name: 'Deen Dayal Anand Kumar Saraf',
    type: 'Silver Jewellery',
    reviewUrl: 'https://g.page/r/CcHmi1ubP54SEBM/review',
    icon: <Star className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
  },
};

export type BusinessKey = keyof typeof businesses;
