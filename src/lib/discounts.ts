import type { Product } from './products';

/**
 * Discount configuration for specific countries and products
 */
interface DiscountConfig {
  countryCode: string;
  discounts: Array<{
    productMatch: (product: Product) => boolean;
    discountPercentage: number;
  }>;
}

const discountConfigs: DiscountConfig[] = [
  {
    countryCode: 'CM', // Cameroon
    discounts: [
      {
        // 15% discount on Grey T-Shirt
        productMatch: (product) => product.name.includes('GREY'),
        discountPercentage: 15,
      },
      {
        // 10% discount on other T-Shirts
        productMatch: (product) => product.category === 'T-Shirts' && !product.name.includes('GREY'),
        discountPercentage: 10,
      },
    ],
  },
];

/**
 * Calculate discounted price based on product and country code
 * @param product - The product to check
 * @param countryCode - The user's country code (e.g., 'CM' for Cameroon)
 * @returns The discounted price, or the original price if no discount applies
 */
export const getDiscountedPrice = (product: Product, countryCode: string): number => {
  const config = discountConfigs.find((c) => c.countryCode === countryCode);
  
  if (!config) {
    return product.price;
  }

  const discount = config.discounts.find((d) => d.productMatch(product));
  
  if (!discount) {
    return product.price;
  }

  return product.price * (1 - discount.discountPercentage / 100);
};

/**
 * Check if a product has a discount for a given country
 * @param product - The product to check
 * @param countryCode - The user's country code
 * @returns The discount percentage, or 0 if no discount applies
 */
export const getDiscountPercentage = (product: Product, countryCode: string): number => {
  const config = discountConfigs.find((c) => c.countryCode === countryCode);
  
  if (!config) {
    return 0;
  }

  const discount = config.discounts.find((d) => d.productMatch(product));
  
  return discount?.discountPercentage ?? 0;
};
