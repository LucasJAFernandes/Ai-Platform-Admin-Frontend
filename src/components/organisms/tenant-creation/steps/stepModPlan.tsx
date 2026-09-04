'use client';

import { useState } from 'react';
import { Button } from '@/components/atoms/button';
import { PlanOptions } from '@/components/molecules/planOptions';
import ModulesOptions from '@/components/molecules/modulesOptions';
import AddonsOptions from '@/components/molecules/addonsOptions';
import { TenantFormData } from '@/lib/types/tenant-creation.types';
import { ShoppingCart } from 'lucide-react';
import ShopSideList from '@/components/organisms/shopSideList';
import { Badge } from '@/components/atoms/badge';
import { Module } from '@/lib/types/tenant-creation.types';

interface CartStructure {
  modules: Module[];
  addons: Module[];
  planId: number | null;
}
interface Props {
  updateField: (field: keyof TenantFormData, value: number) => void;
  handleNext: () => void;
}

export default function PlanMod({ updateField, handleNext }: Props) {
  const [activeTab, setActiveTab] = useState<'plans' | 'modules' | 'addons'>(
    'plans',
  );
  const [planId, setPlanId] = useState<number | undefined>(undefined);
  const [activeChat, setActiveChat] = useState(false);
  const [cartStructure, setCartStructure] = useState<CartStructure>({
    modules: [],
    addons: [],
    planId: null,
  });
  const [chatWidth, setChatWidth] = useState(250);

  const cartItemsCount =
    cartStructure.modules.length + cartStructure.addons.length;

  const handleCartUpdate = (items: Module[], type: 'module' | 'addon') => {
    setCartStructure((prev) => {
      const safeItems = Array.isArray(items) ? items : [];
      return {
        ...prev,
        [type === 'module' ? 'modules' : 'addons']: safeItems,
      };
    });
  };

  const handlePlanUpdate = (planKey: string | undefined) => {
    if (!planKey) {
      setPlanId(undefined);
      return;
    }
    const parsedId = parseInt(planKey, 10);
    if (Number.isNaN(parsedId)) {
      return;
    }
    updateField('plan_id', parsedId);
    setPlanId(parsedId);
  };

  const getFlatCartItems = () => {
    const moduleItems = (cartStructure.modules || []).map((module) => ({
      ...module,
      type: 'module' as const,
      quantity: 1,
      addedAt: new Date().toISOString(),
      totalPrice: module.priceValue,
    }));

    const addonItems = (cartStructure.addons || []).map((addon) => ({
      ...addon,
      type: 'addon' as const,
      quantity: 1,
      addedAt: new Date().toISOString(),
      totalPrice: addon.priceValue,
    }));
    return [...moduleItems, ...addonItems];
  };

  const handleRemoveItem = (itemId: string) => {
    const itemInModules = cartStructure.modules.find((m) => m.id === itemId);
    const itemInAddons = cartStructure.addons.find((a) => a.id === itemId);

    if (itemInModules) {
      const updatedModules = cartStructure.modules.filter(
        (m) => m.id !== itemId,
      );
      handleCartUpdate(updatedModules, 'module');
    } else if (itemInAddons) {
      const updatedAddons = cartStructure.addons.filter((a) => a.id !== itemId);
      handleCartUpdate(updatedAddons, 'addon');
    }
  };

  return (
    <div className="min-h-screen p-6">
      {activeChat && (
        <ShopSideList
          inside={true}
          planId={planId}
          cartItems={getFlatCartItems()}
          onWidthChange={setChatWidth}
          onRemoveItem={handleRemoveItem}
          onCheckout={handleNext}
        />
      )}
      <div className="mt-6 grid grid-cols-1 ml-10 mr-10">
        <div
          defaultValue="plans"
          className="bg-zinc-200 dark:bg-zinc-800 rounded-xl border border-gray-200 dark:border-zinc-700"
          style={{ marginRight: activeChat ? `${chatWidth - 30}px` : '0px' }}
        >
          <div className="relative flex items-center justify-between border-b border-gray-200 dark:border-zinc-700 rounded-t-xl">
            <div className="flex p-2 bg-gray-100 dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-700 rounded-t-xl w-full">
              <Badge
                onClick={() => setActiveTab('plans')}
                className={`mx-3 ${activeTab === 'plans' ? 'dark:bg-zinc-500 dark:text-zinc-100' : 'bg-zinc-300 text-zinc-900 cursor-pointer'} `}
              >
                Plans
              </Badge>
              <Badge
                onClick={() => setActiveTab('modules')}
                className={`mx-3 ${activeTab === 'modules' ? 'dark:bg-zinc-500 dark:text-zinc-100' : 'bg-zinc-300 text-zinc-900 cursor-pointer'} `}
              >
                Modules
              </Badge>
              <Badge
                onClick={() => setActiveTab('addons')}
                className={`mx-3 ${activeTab === 'addons' ? 'dark:bg-zinc-500 dark:text-zinc-100' : 'bg-zinc-300 text-zinc-900 cursor-pointer'} `}
              >
                Addons
              </Badge>
            </div>
            <Button
              variant="gradient"
              onClick={() => setActiveChat(!activeChat)}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full w-10 h-10 p-0"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 shadow-lg">
                  {cartItemsCount}
                </span>
              )}
            </Button>
          </div>
          <div className="p-6">
            {activeTab === 'plans' && (
              <PlanOptions optional={true} onPlanSelect={handlePlanUpdate} />
            )}
          </div>

          <div className="p-6">
            {activeTab === 'modules' && (
              <ModulesOptions
                cartItems={cartStructure.modules}
                onCartUpdate={(items) => handleCartUpdate(items, 'module')}
              />
            )}
          </div>

          <div className="p-6">
            {activeTab === 'addons' && (
              <AddonsOptions
                cartItems={cartStructure.addons}
                onCartUpdate={(items) => handleCartUpdate(items, 'addon')}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
