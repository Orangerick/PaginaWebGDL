export type ServicePackage = {
  id: string;
  name: string;
  basePrice: number;
  hours: number;
  extraHourPrice: number;
  description: string;
  features: string[];
};

export type PeoplePricing = {
  tier1: number; // 10-100
  tier2: number; // 100-200
  tier3: number; // 200-300
  tier4: number; // 300+
};

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  measurements: string;
  tags: string[];
  color: string;
  amazonLink?: string;
  imageUrl: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type FAQ = {
  q: string;
  a: string;
};
