import { render, screen, fireEvent } from '@testing-library/react';
import BusinessSelector from './BusinessSelector';
import type { Business, BusinessKey } from '../data/businesses';
import { describe, it, expect, vi } from 'vitest';

describe('BusinessSelector', () => {
  it('calls onSelect with the business key when a business is clicked', () => {
    const businesses: Record<BusinessKey, Business> = {
      'dda-jewels': {
        name: 'Business One',
        type: 'Type One',
        reviewUrl: '',
        icon: <div />,
      },
      'deen-dayal': {
        name: 'Business Two',
        type: 'Type Two',
        reviewUrl: '',
        icon: <div />,
      },
    };

    const handleSelect = vi.fn();
    render(
      <BusinessSelector
        businesses={businesses}
        selectedBusiness="dda-jewels"
        onSelect={handleSelect}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /Business Two/i }));
    expect(handleSelect).toHaveBeenCalledWith('deen-dayal');
  });
});
