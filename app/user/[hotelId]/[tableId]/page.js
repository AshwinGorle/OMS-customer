"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input"; // Replace with your ShadCN input component
import { Button } from "@/components/ui/button"; // Replace with your ShadCN button component

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
import OccupiedDialog from "../../component/OccupiedDialog";

import SearchDish from "@/components/user/SearchDish";
import UserPageSkeleton from "@/components/user/skeletons/UserPageSkeleton";
import { Spinner } from "@/components/ui/spinner";
import TableLoader from "./component/TableLoader";
import { useDispatch } from "react-redux";
import { orderActions } from "@/redux/slices/orderSlice";
export default function UserPage() {
  const dispatch = useDispatch();
  const { hotelId, tableId } = useParams();
  const [openOccupiedDialog, setOpenOccupiedDialog] = useState(false);

  //State to decide when to call the offer, dishes and categories
  const [loadContent, setLoadContent] = useState(false); // we will note load dishes, offers, category until it becomes true

  //calling data hooks
  const { loading: tableLoading, table } = useGetTable(tableId);
  console.log("table in component :", table , tableLoading)
  const { loading: dishesLoading, dishes } = useGetAllDishes(
    "dish",
    hotelId,
    loadContent,
    setLoadContent
  );
  const { loading: offerLoading, offers } = useGetAllOffers(
    "offer",
    hotelId,  
    loadContent,
    setLoadContent
  );
  const { loading: categoryLoading, categories } = useGetAllCategories(
    "category",
    hotelId,
    loadContent,
    setLoadContent
  );
  
  //for best seller category
  const BSC = {
    name: "Best Seller",
    _id: "bestSeller",
    logo: "https://static.vecteezy.com/system/resources/previews/003/501/282/large_2x/best-seller-golden-label-sign-illustration-free-vector.jpg",
  };
  //local states for managing dialogs
  const [selectedCategory, setSelectedCategory] = useState(BSC);
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

  useEffect(() => {
    if (table) {
      let customer = localStorage.getItem("customer");
      if (table.status === "free") {
        console.log("inside free status");
        const storedCustomerName = localStorage.getItem("customerName");
        if (!storedCustomerName) {
          setIsNameModalOpen(true);
        }
        setOpenOccupiedDialog(false);
        setLoadContent(true); // Table is free, load content
        dispatch(orderActions.initializeCartItemsCount());
      } else if (table.status === "occupied") {
        console.log("occupied section");
        if (!customer) {
          setOpenOccupiedDialog(true);
          return;
        } else {
          customer = JSON.parse(customer);
          console.log("customer : ", customer);
          console.log("table customer :::::", table?.customer);
          if (customer?._id?.toString() !== table?.customer?._id?.toString()) {
            console.log("setting the dialog open in cs compare :::::");
            setOpenOccupiedDialog(true);
            console.log(
              "setting the dialog open in cs compare :::::",
              openOccupiedDialog
            );
          } else {
            setLoadContent(true); // Authorized customer, load content
          }
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

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (displayFromCategory) setDisplayFromCategory(false);
    setFilteredDishes(
      dishes.filter((dish) =>
        dish.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setDisplayFromCategory(true);
    setSearchQuery("");
  };

  // for search implementation
  const [displayFromCategory, setDisplayFromCategory] = useState(true);
  const [filteredDishes, setFilteredDishes] = useState(dishes || []);
  const [searchQuery, setSearchQuery] = useState("");

  if (tableLoading || !table ) return <TableLoader />;
  if (dishesLoading || offerLoading || categoryLoading)
    return <UserPageSkeleton />;
  if (dishes && categories && offers) {
    return (
      <div className="min-h-screen bg-gray-50 pb-28">
        <Dialog open={isNameModalOpen} >
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
            onCategoryClick={handleCategoryClick}
            BSC={BSC}
          />
          <SearchDish
            onSearch={handleSearch}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          {displayFromCategory && selectedCategory && (
            <DishesSection
              dishes={dishes}
              selectedCategory={selectedCategory}
              onAddToOrder={addToOrder}
             // for best seller category
            />
          )}
          {!displayFromCategory && filteredDishes && (
            <DishesSection
              dishes={filteredDishes}
              selectedCategory={selectedCategory}
              onAddToOrder={addToOrder}
              type={"filter"}
             
            />
          )}
        </div>
        <OrdersButton
          onOrdersClick={() => setIsOrdersDialogOpen(true)}
          onBillClick={() => console.log("View bill")}
          itemCount={getTotalItems()}
          tableId={tableId}
          hotelId={hotelId}
        />
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
        <OccupiedDialog
          open={openOccupiedDialog}
          customerName={table?.customer?.name}
          tableNumber={table.sequence}
        />
      </div>
    );
  }
  return (
    <div>
      <TableLoader/>
      <OccupiedDialog
          open={openOccupiedDialog}
          customerName={table?.customer?.name}
          tableNumber={table.sequence}
        />
    </div>
  );
}

