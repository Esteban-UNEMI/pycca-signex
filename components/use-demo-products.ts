'use client';
import { Product } from '@/lib/types';
import { products } from '@/lib/data';
import { keys, useLocalEntity } from '@/lib/local-repository';
export function useDemoProducts(seed: Product[]) { return useLocalEntity(keys.products, products).value; }
