export type Category = {
  id: string;
  name: string;
  eyebrow: string;
  image: string;
  accent: string;
};

export type Product = {
  id: string;
  name: string;
  department: string;
  category: string;
  description: string;
  seller: string;
  price: number;
  compareAt?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  stock: number;
  featured?: boolean;
};

export type Department = {
  id: string;
  name: string;
  slug: string;
  eyebrow: string;
  image: string;
  subcategories: string[];
};

export type CartLine = Product & { quantity: number };

export type DemoOrder = {
  id: string;
  createdAt: string;
  customer: { name: string; email: string; phone: string };
  fulfillment: 'delivery' | 'pickup';
  city: string;
  address?: string;
  total: number;
  status: 'pending' | 'preparing' | 'ready_for_pickup' | 'shipped' | 'delivered';
  items: CartLine[];
};

export type ThemeSettings = {
  brand: string;
  accent: string;
  surface: string;
  radius: 'soft' | 'round' | 'sharp';
  density: 'comfortable' | 'compact';
};
