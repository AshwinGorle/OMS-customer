"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog"; // Replace with your ShadCN modal component
import { Input } from "@/components/ui/Input"; // Replace with your ShadCN input component
import { Button } from "@/components/ui/Button"; // Replace with your ShadCN button component

import OffersCarousel from "@/components/user/OffersCarousel";
import ActionButtons from "@/components/menu/ActionButtons";
import CategoriesSection from "@/components/user/CategoriesSection";
import DishesSection from "@/components/user/DishesSection";
import EmptyCategory from "@/components/user/EmptyCategory";
import OrdersButton from "@/components/user/OrdersButton";
import OrdersDialog from "@/components/user/orders/OrdersDialog";
import OrderSuccessDialog from "@/components/user/orders/OrderSuccessDialog";

import { useOrders } from "@/hooks/useOrders";
import { useGetAllDishes } from "@/hooks/dish/useGetAllDishes";
import { useGetAllCategories } from "@/hooks/category/useGetAllCategories";
import { useGetTable } from "@/hooks/table/useGetTable";
import { useGetAllOffers } from "@/hooks/offer/useGetAllOffers";
import { baseUrl } from "@/config";
import { Spinner } from "@/components/ui/spinner";

export default function UserPage() {
  const { hotelId, tableId } = useParams();
  console.log("table ", tableId, " hotel ", hotelId);
  const router = useRouter();
  const { loading: dishesLoading, dishes } = useGetAllDishes("dish", hotelId);
  const { loading: categoryLoading, categories } = useGetAllCategories(
    "category",
    hotelId
  );
  const { loading: tableLoading, table } = useGetTable(tableId);
  const { loading: offerLoading, offers } = useGetAllOffers("offer", hotelId);

  console.log("offers : ", offers);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isOrdersDialogOpen, setIsOrdersDialogOpen] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");

  const {
    orders,
    addToOrder,
    updateQuantity,
    removeItem,
    clearOrders,
    getTotalItems,
  } = useOrders();

  // Check localStorage for customerName on page load
  useEffect(() => {
    if (table) {
      let customer = localStorage.getItem("customer");
      if (table.status == "occupied") {
        if (!customer) {
          console.log("redirect 1");
          // router.push(
          //   `${baseUrl}/occupied?hotelId=${hotelId}&tableId=${tableId}&tableNumber=${table.sequence}&customerName=${table?.customer?.name || "no name"}`// this page shows customers that this table is reserved by other customer
          // );
          return;
        } else {
          customer = JSON.parse(customer);
          if (customer._id.toString() != table.customer._id.toString()) {
            console.log("redirect 2");
            // router.push(
            //   `${baseUrl}/occupied?hotelId=${hotelId}&tableId=${tableId}&tableNumber=${table.sequence}&customerName=${table?.customer?.name || "no name"}`
            // );
          }
        }
      } else {
        const storedCustomerName = localStorage.getItem("customerName");
        if (!storedCustomerName) {
          setIsNameModalOpen(true);
        }
      }
    }
  }, [table]);

  const handleSaveName = () => {
    if (customerName.trim()) {
      localStorage.setItem("customerName", customerName);
      setIsNameModalOpen(false);
    }
  };

  const handleProceedOrder = () => {
    setIsOrdersDialogOpen(false);
    setIsSuccessDialogOpen(true);
    clearOrders();
  };

  if (!tableId || !table) return <Spinner />;

  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      {/* Customer Name Modal */}
      <Dialog open={isNameModalOpen} onOpenChange={setIsNameModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter Your Name</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Your Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
            <Button onClick={handleSaveName} className="w-full">
              Save Name
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="p-4 space-y-6">
        <OffersCarousel offers={offers} />
        <ActionButtons />
        <CategoriesSection
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryClick={setSelectedCategory}
        />
        {selectedCategory ? (
          <DishesSection
            dishes={dishes}
            selectedCategory={selectedCategory}
            onAddToOrder={addToOrder}
          />
        ) : (
          <EmptyCategory />
        )}
      </div>

      {tableId && hotelId && (
        <OrdersButton
          onOrdersClick={() => setIsOrdersDialogOpen(true)}
          onBillClick={() => console.log("View bill")}
          itemCount={getTotalItems()}
          tableId={tableId}
          hotelId={hotelId}
        />
      )}

      <OrdersDialog
        open={isOrdersDialogOpen}
        onOpenChange={setIsOrdersDialogOpen}
        orders={orders}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onProceedOrder={handleProceedOrder}
      />

      <OrderSuccessDialog
        open={isSuccessDialogOpen}
        onOpenChange={setIsSuccessDialogOpen}
      />
    </div>
  );
}
