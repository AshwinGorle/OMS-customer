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

export default function UserPage() {
  const { hotelId, tableId } = useParams();
  const [openOccupiedDialog, setOpenOccupiedDialog] = useState(false);

  //State to decide when to call the offer, dishes and categories
  const [loadContent, setLoadContent] = useState(false); // we will note load dishes, offers, category until it becomes true

  //calling data hooks
  const { loading: tableLoading, table } = useGetTable(tableId);
  const { loading: dishesLoading, dishes } = useGetAllDishes(
    "dish",
    hotelId,
    loadContent
  );
  const { loading: offerLoading, offers } = useGetAllOffers(
    "offer",
    hotelId,
    loadContent
  );
  const { loading: categoryLoading, categories } = useGetAllCategories(
    "category",
    hotelId,
    loadContent
  );

  //local states for managing dialogs
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

  if (tableLoading || !table) return <TableLoader />;
  if (dishesLoading || offerLoading || categoryLoading)
    return <UserPageSkeleton />;
  if (loadContent) {
    return (
      <div className="min-h-screen bg-gray-50 pb-28">
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
            onCategoryClick={handleCategoryClick}
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

// --------------------- bhai ye search functionality wala code hai ---------------------
//-------sahi lage toh ye un comment karke use karlena-------------------------------------------------------------------------
// "use client";

// import { useState, useEffect } from "react";
// import { useParams, useRouter } from "next/navigation";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";

// import OffersCarousel from "@/components/user/OffersCarousel";
// import ActionButtons from "@/components/menu/ActionButtons";
// import CategoriesSection from "@/components/user/CategoriesSection";
// import DishesSection from "@/components/user/DishesSection";
// import EmptyCategory from "@/components/user/EmptyCategory";
// import OrdersButton from "@/components/user/OrdersButton";
// import OrdersDialog from "@/components/user/orders/OrdersDialog";
// import OrderSuccessDialog from "@/components/user/orders/OrderSuccessDialog";
// import SearchDish from "@/components/user/SearchDish";
// import SearchResults from "@/components/user/SearchResults";
// import UserPageSkeleton from "@/app/user/loading";
// import OccupiedDialog from "../../component/OccupiedDialog";

// import { useOrders } from "@/hooks/useOrders";
// import { useGetAllDishes } from "@/hooks/dish/useGetAllDishes";
// import { useGetAllCategories } from "@/hooks/category/useGetAllCategories";
// import { useGetTable } from "@/hooks/table/useGetTable";
// import { useGetAllOffers } from "@/hooks/offer/useGetAllOffers";

// export default function UserPage() {
//   const { hotelId, tableId } = useParams();
//   const router = useRouter();

//   // Data fetching hooks
//   const { loading: dishesLoading, dishes } = useGetAllDishes("dish", hotelId);
//   const { loading: categoryLoading, categories } = useGetAllCategories("category", hotelId);
//   const { loading: tableLoading, table } = useGetTable(tableId);
//   const { loading: offerLoading, offers } = useGetAllOffers("offer", hotelId);

//   // Local state
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isNameModalOpen, setIsNameModalOpen] = useState(false);
//   const [isOrdersDialogOpen, setIsOrdersDialogOpen] = useState(false);
//   const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
//   const [customerName, setCustomerName] = useState("");
//   const [openOccupiedDialog, setOpenOccupiedDialog] = useState(false);

//   // Orders management
//   const {
//     orders,
//     addToOrder,
//     updateQuantity,
//     removeItem,
//     clearOrders,
//     getTotalItems,
//   } = useOrders();

//   // Handle customer verification
//   useEffect(() => {
//     if (table) {
//       let customer = localStorage.getItem("customer");
//       if (table.status === "occupied") {
//         if (!customer) {
//           setOpenOccupiedDialog(true);
//           return;
//         }
//         customer = JSON.parse(customer);
//         if (customer._id.toString() !== table.customer._id.toString()) {
//           setOpenOccupiedDialog(true);
//         }
//       } else {
//         const storedCustomerName = localStorage.getItem("customerName");
//         if (!storedCustomerName) {
//           setIsNameModalOpen(true);
//         }
//       }
//     }
//   }, [table]);

//   // Handlers
//   const handleSearch = (query) => {
//     setSearchQuery(query);
//     if (query.trim()) {
//       setSelectedCategory(null);
//     }
//   };

//   const handleCategoryClick = (category) => {
//     setSelectedCategory(category);
//     setSearchQuery("");
//   };

//   const handleSaveName = () => {
//     if (customerName.trim()) {
//       localStorage.setItem("customerName", customerName);
//       setIsNameModalOpen(false);
//     }
//   };

//   const handleProceedOrder = () => {
//     setIsOrdersDialogOpen(false);
//     setIsSuccessDialogOpen(true);
//     clearOrders();
//   };

//   // Get filtered dishes based on search or category
//   const getFilteredDishes = () => {
//     if (searchQuery.trim()) {
//       return dishes.filter(dish =>
//         dish.name.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     if (selectedCategory) {
//       return dishes.filter(dish => dish.categoryId === selectedCategory.id);
//     }

//     return [];
//   };

//   // Loading state
//   if (dishesLoading || categoryLoading || tableLoading || offerLoading) {
//     return <UserPageSkeleton />;
//   }

//   // Render content based on search/category state
//   const renderContent = () => {
//     if (searchQuery.trim()) {
//       const searchResults = getFilteredDishes();
//       return (
//         <SearchResults
//           results={searchResults}
//           onAddToOrder={addToOrder}
//         />
//       );
//     }

//     if (selectedCategory) {
//       return (
//         <DishesSection
//           dishes={getFilteredDishes()}
//           selectedCategory={selectedCategory}
//           onAddToOrder={addToOrder}
//         />
//       );
//     }

//     return <EmptyCategory />;
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 pb-28">
//       {/* Customer Name Modal */}
//       <Dialog open={isNameModalOpen} onOpenChange={setIsNameModalOpen}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Enter Your Name</DialogTitle>
//           </DialogHeader>
//           <div className="space-y-4">
//             <Input
//               type="text"
//               placeholder="Your Name"
//               value={customerName}
//               onChange={(e) => setCustomerName(e.target.value)}
//             />
//             <Button onClick={handleSaveName} className="w-full">
//               Save Name
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>

//       <div className="p-4 space-y-6">
//         <OffersCarousel offers={offers} />
//         <ActionButtons />
//         <CategoriesSection
//           categories={categories}
//           selectedCategory={selectedCategory}
//           onCategoryClick={handleCategoryClick}
//         />
//         <SearchDish
//           onSearch={handleSearch}
//           value={searchQuery}
//           onChange={setSearchQuery}
//         />
//         {renderContent()}
//       </div>

//       {tableId && hotelId && (
//         <OrdersButton
//           onOrdersClick={() => setIsOrdersDialogOpen(true)}
//           onBillClick={() => console.log("View bill")}
//           itemCount={getTotalItems()}
//           tableId={tableId}
//           hotelId={hotelId}
//         />
//       )}

//       <OrdersDialog
//         open={isOrdersDialogOpen}
//         onOpenChange={setIsOrdersDialogOpen}
//         orders={orders}
//         onUpdateQuantity={updateQuantity}
//         onRemoveItem={removeItem}
//         onProceedOrder={handleProceedOrder}
//       />

//       <OrderSuccessDialog
//         open={isSuccessDialogOpen}
//         onOpenChange={setIsSuccessDialogOpen}
//       />

//       <OccupiedDialog
//         open={openOccupiedDialog}
//         customerName={table?.customer?.name}
//         tableNumber={table?.sequence}
//       />
//     </div>
//   );
// }
