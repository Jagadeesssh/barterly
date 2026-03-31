export interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  productId: string;
  owner: string;
  messages: Message[];
  lastUpdated: string;
}

export interface Swap {
  id: string;
  product: Product;
  status: 'Pending' | 'Accepted' | 'Declined';
  dateOffered: string;
}

export interface Product {
  id: string;
  _id?: string;
  title: string;
  description: string;
  category: string;
  image: string;
  owner: string;
  lookingFor: string;
  condition: 'New' | 'Like New' | 'Good' | 'Fair';
  price?: string;
  yearsOld?: string;
}

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Vintage Film Camera',
    description: 'Beautiful Canon AE-1 with a 50mm lens. Works perfectly.',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800',
    owner: 'Alex Rivers',
    lookingFor: 'Mechanical Keyboard or iPad',
    condition: 'Like New',
  },
  {
    id: '2',
    title: 'Electric Guitar',
    description: 'Fender Squier Stratocaster. Great for beginners.',
    category: 'Music',
    image: 'https://images.unsplash.com/photo-1550291652-6ea9114a47b1?auto=format&fit=crop&q=80&w=800',
    owner: 'Sam Smith',
    lookingFor: 'Acoustic Guitar',
    condition: 'Good',
  },
  {
    id: '3',
    title: 'Smart Watch Series 7',
    description: '45mm Aluminum Case with Midnight Sport Band.',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1544117518-30df578096a4?auto=format&fit=crop&q=80&w=800',
    owner: 'Jordan Lee',
    lookingFor: 'AirPods Pro 2',
    condition: 'New',
  },
  {
    id: '4',
    title: 'Designer Leather Jacket',
    description: 'Genuine leather, size M. Barely worn.',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800',
    owner: 'Taylor Swift',
    lookingFor: 'Designer Boots size 8',
    condition: 'Like New',
  },
  {
    id: '5',
    title: 'Coffee Espresso Machine',
    description: 'Brevilla Barista Express. Makes amazing lattes.',
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=800',
    owner: 'Casey Ray',
    lookingFor: 'High-end Blender',
    condition: 'Good',
  },
  {
    id: '6',
    title: 'Mountain Bike',
    description: '21-speed mountain bike, perfect for trails.',
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=800',
    owner: 'Morgan J.',
    lookingFor: 'Gym Equipment',
    condition: 'Fair',
  },
  {
    id: '7',
    title: 'Queen Size Wooden Bed',
    description: 'Sturdy oak wood bed frame in excellent condition.',
    category: 'Bed',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=800',
    owner: 'Riley Stone',
    lookingFor: 'Dining table set',
    condition: 'Good',
  },
  {
    id: '8',
    title: 'Smart LED Light Bulb Set',
    description: 'Set of 4 color-changing RGB bulbs, controllable via app.',
    category: 'Lights',
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=800',
    owner: 'Jamie Fox',
    lookingFor: 'Wireless headphones',
    condition: 'New',
  },
  {
    id: '9',
    title: 'Gaming Laptop RTX 4070',
    description: 'Powerful gaming laptop, used lightly for 3 months.',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=800',
    owner: 'Alex Rivers',
    lookingFor: 'Mirrorless Camera',
    condition: 'Like New',
  },
  {
    id: '10',
    title: 'Digital Air Fryer',
    description: '6-quart air fryer, perfect for quick and healthy meals.',
    category: 'Kitchen',
    image: 'https://images.unsplash.com/photo-1626885901323-9ee821bb4632?auto=format&fit=crop&q=80&w=800',
    owner: 'Sara Connor',
    lookingFor: 'A good coffee grinder',
    condition: 'Good',
  },
  {
    id: '11',
    title: 'iPhone 14 Pro - 256GB',
    description: 'Used for a year, 95% battery health. Midnight color.',
    category: 'Mobiles',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800',
    owner: 'Chris Lee',
    lookingFor: 'Samsung Galaxy S23 Ultra',
    condition: 'Like New',
  },
  {
    id: '12',
    title: 'M2 MacBook Air',
    description: '16GB RAM, 512GB SSD. Flawless condition with box.',
    category: 'Laptop',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800',
    owner: 'Emma Watson',
    lookingFor: 'iPad Pro with Magic Keyboard',
    condition: 'New',
  },
  {
    id: '13',
    title: 'North Face Borealis Backpack',
    description: 'Durable hiking and school backpack. Black.',
    category: 'Bags',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800',
    owner: 'Leo Vance',
    lookingFor: 'Travel duffel bag',
    condition: 'Fair',
  },
  {
    id: '14',
    title: 'Samsonite Hard-Shell Suitcase',
    description: 'spinner carry-on suitcase. Minor scratches on the back.',
    category: 'Travel',
    image: 'https://images.unsplash.com/photo-1565026057447-bc90829ce004?auto=format&fit=crop&q=80&w=800',
    owner: 'Maya Brooks',
    lookingFor: 'Camping Gear',
    condition: 'Good',
  },
];
