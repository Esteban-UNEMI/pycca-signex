import type { LucideProps } from 'lucide-react';
import {
  ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronDown, ChevronRight, CircleHelp, Heart, LayoutDashboard, Menu, Package, Palette, Search,
  Settings2, ShoppingBag, ShoppingCart, Sparkles, Star, Store, SunMedium, Moon, Truck, Users, X, SlidersHorizontal,
  CreditCard, BarChart3, Boxes, MapPin, Plus, MoreHorizontal, Pencil, Trash2, Eye, LogOut, Bell, Tag, ShieldCheck, SearchX, Info, Clock3, Phone, Navigation, Play,
} from 'lucide-react';

const icons = { ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronDown, ChevronRight, CircleHelp, Heart, LayoutDashboard, Menu, Package, Palette, Search, SearchX, Info, Settings2, ShoppingBag, ShoppingCart, Sparkles, Star, Store, SunMedium, Moon, Truck, Users, X, SlidersHorizontal, CreditCard, BarChart3, Boxes, MapPin, Plus, MoreHorizontal, Pencil, Trash2, Eye, LogOut, Bell, Tag, ShieldCheck, Clock3, Phone, Navigation, Play };

export type IconName = keyof typeof icons;

export function Icon({ name, size = 20, ...props }: LucideProps & { name: IconName }) {
  const LucideIcon = icons[name];
  return <LucideIcon size={size} strokeWidth={1.8} {...props} />;
}
