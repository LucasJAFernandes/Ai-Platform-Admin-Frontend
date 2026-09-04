'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Wrench,
  ChevronLeft,
  ChevronRight,
  HardDriveDownload,
} from 'lucide-react';
import { mockmodules } from '@/mocks/tenant-creation';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/atoms/card';
import { Button } from '@/components/atoms/button';
import { Badge } from '@/components/atoms/badge';
import { Module } from '@/lib/types/tenant-creation.types';

interface ModulesOptionsProps {
  cartItems?: Module[];
  onCartUpdate?: (items: Module[]) => void;
}

export default function ModulesOptions({
  cartItems = [],
  onCartUpdate,
}: ModulesOptionsProps) {
  const [selectedModules, setSelectedModules] = useState<string[]>([]);

  const scrollRefs = {
    drive: useRef<HTMLDivElement>(null),
    ai: useRef<HTMLDivElement>(null),
    other: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      const moduleIds = cartItems
        .filter((item) => mockmodules.some((m: Module) => m.id === item.id))
        .map((item) => item.id);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedModules(moduleIds);
    } else {
      setSelectedModules([]);
    }
  }, [cartItems]);

  const getSelectedModulesData = (moduleIds: string[]): Module[] => {
    return moduleIds
      .map((id) => mockmodules.find((m: Module) => m.id === id))
      .filter((module): module is Module => module !== undefined);
  };

  const updateCartItems = (moduleIds: string[]) => {
    const selectedModulesData = getSelectedModulesData(moduleIds);
    const nonModuleItems = cartItems.filter(
      (item) => !mockmodules.some((m: Module) => m.id === item.id),
    );
    const moduleItems = selectedModulesData.map((module) => ({
      ...module,
      type: 'module',
      quantity: 1,
      addedAt: new Date().toISOString(),
      totalPrice: module.priceValue,
    }));
    const updatedCart = [...nonModuleItems, ...moduleItems];
    if (onCartUpdate) {
      onCartUpdate(updatedCart);
    }
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
  };

  const toggleModule = (moduleId: string) => {
    setSelectedModules((prev) => {
      const newSelection = prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId];
      updateCartItems(newSelection);

      return newSelection;
    });
  };

  const handleLearnMore = (moduleId: string) => {
    console.log(`Saber mais sobre: ${moduleId}`);
  };

  const handleContactSales = () => {
    console.log('Contatar equipe de vendas');
  };

  const scroll = (
    category: keyof typeof scrollRefs,
    direction: 'left' | 'right',
  ) => {
    const container = scrollRefs[category].current;
    if (container) {
      const scrollAmount = 300;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const categories = [
    { id: 'drive', name: 'Drive', icon: HardDriveDownload, color: 'blue' },
    { id: 'ai', name: 'AI', icon: Sparkles, color: 'yellow' },
    { id: 'other', name: 'Other', icon: Wrench, color: 'green' },
  ];

  const renderModuleCard = (module: Module) => {
    const IconComponent = module.icon;
    const isSelected = selectedModules.includes(module.id);
    const isContactSales = module.id === 'developer-pack';

    return (
      <Card
        key={module.id}
        className={`relative flex flex-col min-w-[300px] min-h-[300px] max-w-[300px] h-full transition-all dark:bg-zinc-900 border-2 
                    ${
                      isSelected
                        ? 'border-green-500 dark:border-green-400 shadow-lg shadow-green-200 dark:shadow-green-900/30'
                        : 'border-gray-200 dark:border-zinc-700 hover:border-blue-300 dark:hover:border-blue-700'
                    }`}
      >
        {module.badge && (
          <Badge className="absolute -top-0 -right-2 bg-blue-500 text-white">
            {module.badge}
          </Badge>
        )}

        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div
              className={`p-2 ${
                module.category === 'drive'
                  ? 'bg-blue-100 dark:bg-blue-900/30'
                  : module.category === 'ai'
                    ? 'bg-yellow-100 dark:bg-yellow-900/30'
                    : 'bg-green-100 dark:bg-green-900/30'
              } rounded-lg`}
            >
              <IconComponent
                className={`w-6 h-6 ${
                  module.category === 'drive'
                    ? 'text-blue-600 dark:text-blue-400'
                    : module.category === 'ai'
                      ? 'text-yellow-600 dark:text-yellow-400'
                      : 'text-green-600 dark:text-green-400'
                }`}
              />
            </div>
          </div>
          <CardTitle className="text-lg font-semibold mt-3">
            {module.name}
          </CardTitle>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
            {module.description}
          </p>
        </CardHeader>

        <CardContent className="flex-grow">
          <div className="mt-2">
            <span className="text-2xl font-bold">{module.price}</span>
            <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
              {module.period}
            </span>
          </div>
        </CardContent>

        <CardFooter className="flex gap-2 pt-4 border-t border-gray-100 dark:border-zinc-800">
          {isContactSales ? (
            <>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => handleLearnMore(module.id)}
              >
                Know more
              </Button>
              <Button
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                onClick={handleContactSales}
              >
                Contact Sales
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => handleLearnMore(module.id)}
              >
                Know more
              </Button>
              <Button
                className={`flex-1 text-white ${
                  isSelected
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
                onClick={() => toggleModule(module.id)}
              >
                {isSelected ? 'Remove' : 'Add to Cart'}
              </Button>
            </>
          )}
        </CardFooter>
      </Card>
    );
  };

  return (
    <div className="mt-2 ml-1 mr-1 space-y-8">
      {categories.map((category) => {
        const categoryModules = mockmodules.filter(
          (m: Module) => m.category === category.id,
        );

        if (categoryModules.length === 0) return null;

        return (
          <div key={category.id} className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div
                  className={`p-2 rounded-lg bg-${category.color}-100 dark:bg-${category.color}-900/30`}
                >
                  <category.icon
                    className={`w-5 h-5 text-${category.color}-600 dark:text-${category.color}-400`}
                  />
                </div>
                <h2 className="text-xl font-semibold">
                  {category.name}
                  <span className="ml-2 text-sm font-normal text-gray-500">
                    ({categoryModules.length}{' '}
                    {categoryModules.length === 1 ? 'module' : 'modules'})
                  </span>
                </h2>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    scroll(category.id as keyof typeof scrollRefs, 'left')
                  }
                  className="rounded-full"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    scroll(category.id as keyof typeof scrollRefs, 'right')
                  }
                  className="rounded-full"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div
              ref={scrollRefs[category.id as keyof typeof scrollRefs]}
              className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              {categoryModules.map((module: Module) =>
                renderModuleCard(module),
              )}
            </div>
          </div>
        );
      })}

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
