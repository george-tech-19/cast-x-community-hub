import type { Product } from './products';

const CAMEROON_WARM_BEIGE_XAF_PRICE = 12500;
const CAMEROON_XAF_RATE = 562.5;

const isWarmBeigeProduct = (product: Product): boolean =>
  product.name.toUpperCase().includes('WARM BEIGE');

export const getDiscountedPrice = (product: Product, countryCode: string): number => {
  if (countryCode?.toUpperCase() === 'CM' && isWarmBeigeProduct(product)) {
    return CAMEROON_WARM_BEIGE_XAF_PRICE / CAMEROON_XAF_RATE;
  }

  return product.price;
};

export const getDiscountPercentage = (product: Product, countryCode: string): number => {
  if (countryCode?.toUpperCase() !== 'CM' || !isWarmBeigeProduct(product)) {
    return 0;
  }

  const discountedPrice = getDiscountedPrice(product, countryCode);
  return ((product.price - discountedPrice) / product.price) * 100;
};
