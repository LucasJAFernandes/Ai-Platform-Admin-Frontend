'use client';

import { useState, useEffect } from 'react';
import { Sparkles, Users, HardDriveDownload } from 'lucide-react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/atoms/card';
import { Button } from '@/components/atoms/button';
import { Badge } from '@/components/atoms/badge';

import type { Module } from '@/lib/types/tenant-creation.types';

type Addon = Module;

const addonsData: Addon[] = [
  {
    id: 'addon-1',
    category: 'drive',
    name: 'Google Drive',
    description:
      'Adapt your meetings with Google Drive integration, allowing you to access and share your files seamlessly during conversations.',
    price: '€ 18,40',
    priceValue: 18.4,
    period: '/month',
    icon: HardDriveDownload,
    badge: 'Users preferential',
  },
  {
    id: 'addon-2',
    category: 'ai',
    name: 'AI advanced',
    description:
      'IA model advanced for allows you to have a more natural conversation with the bot.',
    price: '€ 20,49',
    priceValue: 20.49,
    period: '/month',
    icon: Sparkles,
  },
  {
    id: 'addon-3',
    category: 'other',
    name: 'Support 24/7',
    description:
      'Support with a assist team available 24/7 to help you with any questions.',
    price: '€ 46,50',
    priceValue: 46.5,
    period: '/month',
    icon: Users,
  },
  {
    id: 'addon-4',
    category: 'drive',
    name: 'Google Drive Pro',
    description:
      'Enhanced Google Drive integration with advanced sharing permissions.',
    price: '€ 25,90',
    priceValue: 25.9,
    period: '/month',
    icon: HardDriveDownload,
  },
  {
    id: 'addon-5',
    category: 'ai',
    name: 'AI Transcription',
    description: 'Real-time AI-powered transcription of all meetings.',
    price: '€ 22,90',
    priceValue: 22.9,
    period: '/month',
    icon: Sparkles,
  },
  {
    id: 'addon-6',
    category: 'other',
    name: 'Premium Support',
    description: 'Priority support with dedicated account manager.',
    price: '€ 89,00',
    priceValue: 89.0,
    period: '/month',
    icon: Users,
  },
];

interface AddonsOptionsProps {
  cartItems?: Addon[];
  onCartUpdate?: (items: Addon[]) => void;
}

export default function AddonsOptions({
  cartItems = [],
  onCartUpdate,
}: AddonsOptionsProps) {
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      const addonIds = cartItems.map((item) => item.id);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedAddons(addonIds);
    } else {
      setSelectedAddons([]);
    }
  }, [cartItems]);

  const getSelectedAddonsData = (addonIds: string[]): Addon[] => {
    return addonIds
      .map((id) => addonsData.find((a) => a.id === id))
      .filter((addon): addon is Addon => addon !== undefined);
  };

  const updateCartItems = (addonIds: string[]) => {
    const selectedAddonsData = getSelectedAddonsData(addonIds);
    const addonItems = selectedAddonsData.map((addon) => ({
      ...addon,
      quantity: 1,
      addedAt: new Date().toISOString(),
      totalPrice: addon.priceValue,
    }));
    if (onCartUpdate) {
      onCartUpdate(addonItems);
    }
  };

  const toggleAddon = (addonId: string) => {
    setSelectedAddons((prev) => {
      const newSelection = prev.includes(addonId)
        ? prev.filter((id) => id !== addonId)
        : [...prev, addonId];
      updateCartItems(newSelection);

      return newSelection;
    });
  };

  const handleLearnMore = (addonId: string) => {
    console.log(`Saber mais sobre: ${addonId}`);
  };

  return (
    <div className="mt-2 ml-1 mr-1">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {addonsData.map((addon) => {
          const IconComponent = addon.icon;
          const isSelected = selectedAddons.includes(addon.id);

          return (
            <Card
              key={addon.id}
              className={`relative flex flex-col h-full transition-all hover:shadow-lg dark:bg-zinc-900 border-2 
                                ${
                                  isSelected
                                    ? 'border-green-500 dark:border-green-400 shadow-lg shadow-green-200 dark:shadow-green-900/30'
                                    : 'border-purple-500 dark:border-purple-400 shadow-purple-200 dark:shadow-purple-900/30'
                                }`}
            >
              {addon.badge && (
                <Badge className="absolute z-20 -top-2 -right-2 bg-purple-500 text-white">
                  {addon.badge}
                </Badge>
              )}

              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <IconComponent className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                </div>
                <CardTitle className="text-lg font-semibold mt-3">
                  {addon.name}
                </CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                  {addon.description}
                </p>
              </CardHeader>

              <CardContent className="flex-grow">
                <div className="mt-2">
                  <span className="text-2xl font-bold">{addon.price}</span>
                  <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                    {addon.period}
                  </span>
                </div>
              </CardContent>

              <CardFooter className="flex gap-2 pt-4 border-t border-gray-100 dark:border-zinc-800">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleLearnMore(addon.id)}
                >
                  Know more
                </Button>
                <Button
                  className={`flex-1 text-white ${
                    isSelected
                      ? 'bg-red-600 hover:bg-red-700'
                      : 'bg-purple-600 hover:bg-purple-700'
                  }`}
                  onClick={() => toggleAddon(addon.id)}
                >
                  {isSelected ? 'Remove' : 'Add to Cart'}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
