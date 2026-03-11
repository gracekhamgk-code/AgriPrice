
export interface CropPrice {
  id: string;
  name: string;
  price: string;
  unit: string;
  change: string;
  trend: 'up' | 'down' | 'stable';
  color: string;
  categoryId?: string;
}

export interface ChartData {
  day: string;
  price: number;
}

export interface RegionalPrice {
  city: string;
  price: string;
  isHighest: boolean;
  trend: 'up' | 'down' | 'stable';
  crop: string;
  status?: string;
}

export interface Category {
  id: string;
  name: string;
  iconName: string;
}

export interface Region {
  id: string;
  name: string;
}

export enum NavigationTab {
  Home = 'Home',
  Market = 'Market',
  News = 'News',
  Profile = 'Profile'
}
