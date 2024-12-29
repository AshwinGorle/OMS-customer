

import { createSlice } from "@reduxjs/toolkit";
import { updateOrderStatus } from "../actions/order";

const initialOrder = {
  createOrder: {
    status: null,
    error: null,
    data: null,
  },

  getAllOrders: {
    status: null,
    error: null,
    data: null,
  },
  //{
  //   draft:[],  
  //   pending: [],
  //   preparing: [],
  //   completed: [],
  // }

  updateOrder: {
    status: null,
    error: null,
    data: null,
  },

  updateOrderStatus : {
    status: null,
    error: null,
    data: null,
  
  },

  deleteOrder: {
    status: null,
    error: null,
    data: null,
  },

  getTableOrders: {
    status: null,
    error: null,
    data: null,
  },

  publishOrder : {
    status : null,
    error : null,
    data : null,
  },
  
  deleteOrderDialogDetails : {
    order : null,
    open : false,
  }, 

  cartDetails  : {
    cart : null,
    update : false 
  },

  openEditOrderDialog : false,
  selectedEditOrder : null,

  orderConfirmationDialog : {
     open : false,
     order : null
  },

  cartItemsCount : 0

};

const orderSlice = createSlice({
  name: "order",
  initialState: initialOrder,
  reducers: {
    //To keep track of Cart items
    setCartItemsCount : (state, action)=>{
      state.cartItemsCount = action.payload;
    },
    clearCartItemsCount : (state)=>{
      state.cartItemsCount = 0;
    },
    initializeCartItemsCount : (state) => {
      if (typeof window !== "undefined" && localStorage.getItem('cart')) {
        const cart = JSON.parse(localStorage.getItem('cart'));
        state.cartItemsCount = cart.items?.length || 0;
      }
    },
     
    // when we click on edit in cart we have to display this changes in the cart ui
    setCartDetails : (state, action) => {
      state.cartDetails.cart = action.payload
      state.cartDetails.update = true;
    },
    clearCartDetails : (state) => {
      state.cartDetails.cart = null
      state.cartDetails.update = false
    },

    // for delete order dialog
    closeDeleteOrderDialog : (state)=>{
      state.deleteOrderDialogDetails.open = false;
      state.deleteOrderDialogDetails.order = null;;
    },
    openDeleteOrderDialog : (state, action)=>{
      state.deleteOrderDialogDetails.open = true;
      state.deleteOrderDialogDetails.order = action.payload;;
    },
     
    // createOrder
    createOrderRequest: (state) => {
      state.createOrder.status = "pending";
    },
    createOrderSuccess: (state, action) => {
      state.createOrder.status = "success";
      state.createOrder.data = action.payload;
      const order = action.payload.order;
      const customer = action.payload.customer;
      if(customer){
        localStorage.setItem('customer', JSON.stringify(customer));
      }
      state.getTableOrders.data.unshift(order);
      // opening confirmation dialog
      state.orderConfirmationDialog.order = order;
      state.orderConfirmationDialog.open = true;

      //clearing local storage
      localStorage.removeItem('cart');
    },
    createOrderFailure: (state, action) => {
      state.createOrder.status = "failed";
      state.createOrder.error = action.payload;
    },

    openOrderConfirmationDialog : (state, action)=>{
      state.orderConfirmationDialog.order = action.payload;
      state.orderConfirmationDialog.open = true; 
    },

    closeOrderConfirmationDialog : (state) => {
      state.orderConfirmationDialog.order = null
      state.orderConfirmationDialog.open = false; 
    },

    publishOrderRequest : (state) => {
      state.publishOrder.status = "pending"  
    },
    publishOrderSuccess : (state, action) => {
      state.publishOrder.status = "success" 
      state.publishOrder.data = action.payload;
      //update the order in table orders
      if(!state?.getTableOrders?.data) state.getTableOrders.data = [];
      const existingOrders = state.getTableOrders.data.orders
      state.getTableOrders.data = state.getTableOrders.data.filter((order)=> order?._id?.toString() != action?.payload?.order?._id?.toString());
      state.getTableOrders.data.unshift(action.payload.order); 
      //close confirmation dialog 
      state.orderConfirmationDialog.order = null
      state.orderConfirmationDialog.open = false; 
    },
    publishOrderFailure : (state, action) => {
      state.publishOrder.status = "failed"  
      state.publishOrder.data = action.payload; 
    },

    clearPublishOrderStatus : (state) => {
      state.publishOrder.status = null 
    },
    clearPublishOrderData : (state) => {
      state.publishOrder.data = null 
    },
    clearPublishOrderError : (state) => {
      state.publishOrder.Error = null 
    },

    //////////////////////////
    getTableOrdersRequest : (state) => {
      state.getTableOrders.status = "pending";
    },

    getTableOrderSuccess : (state, action)=>{
      state.getTableOrders.status = "success";
      state.getTableOrders.data = action.payload;
    },
    getTableOrderFailure : (state) => {
      state.getTableOrders.status = "message";
      state.getTableOrders.message = action.payload;
    },

    clearGetTableOrderStatus : (state) => {
      state.getTableOrders.status = null;
    },
    clearGetTableOrderData : (state) => {
      state.getTableOrders.data = null;
    },
    clearGetTableOrderError : (state) => {
      state.getTableOrders.error = null;
    },

    /////////////////////////////////////////////////////////////////

    // getAllOrders
    setOpenEditOrder: (state, action) => {
      state.openEditOrderDialog = action.payload;
    },

    setSelectedEditOrder: (state, action) => {
      state.selectedEditOrder = action.payload;
    },

    getAllOrdersRequest: (state) => {
      state.getAllOrders.status = "pending";
    },
    getAllOrdersSuccess: (state, action) => {
      // orderActions.checkAndPrepareOrder();
      if(!state.getAllOrders.data){
        state.getAllOrders.data= {
          draft:[],  
          pending: [],
          preparing: [],
          completed: [],
        }
      }
      const allOrders = action.payload
      state.getAllOrders.data.draft = allOrders.filter((order)=>order.status == 'draft').reverse();
      state.getAllOrders.data.pending = allOrders.filter((order)=>order.status == 'pending').reverse();
      state.getAllOrders.data.preparing = allOrders.filter((order)=>order.status == 'preparing').reverse();
      state.getAllOrders.data.completed = allOrders.filter((order)=>order.status == 'completed').reverse();
    },
    getAllOrdersFailure: (state, action) => {
      state.getAllOrders.status = "failed";
      state.getAllOrders.error = action.payload;
    },

    checkAndPrepareOrder : (state)=>{
      if(!state.getAllOrders.data){
        state.getAllOrders.data= {
          draft:[],  
          pending: [],
          preparing: [],
          completed: [],
        }
      }
    },

    setNewOrder: (state, action) => {
      if(!state.getAllOrders.data){
        state.getAllOrders.data= {
          draft:[],  
          pending: [],
          preparing: [],
          completed: [],
        }
      }
      const exists1 = state.getAllOrders.data.pending.some(order => order._id === action.payload._id);
      const exists2 = state.getAllOrders.data.completed.some(order => order._id === action.payload._id);
      const exists3 = state.getAllOrders.data.preparing.some(order => order._id === action.payload._id);
      if (!(exists1 || exists2 || exists3)) {
        state.getAllOrders.data.pending.unshift(action.payload);
        state.getAllOrders.status = 'success';
      }
    },

    syncOrders: (state, action) => {
      state.orders.data = action.payload;
      state.orders.status = 'success';
    },

    updateOrderStatusRequest : (state) => {
      state.updateOrderStatus.status = "pending"
    },
    
    updateOrderStatusSuccess : (state, action) => {
      state.updateOrderStatus.status = "success"
      const order = action.payload.order;
      state.getAllOrders.data.draft = state.getAllOrders.data.draft.filter((prevOrder)=> prevOrder._id != order._id);
      state.getAllOrders.data.pending = state.getAllOrders.data.pending.filter((prevOrder)=> prevOrder._id != order._id);
      state.getAllOrders.data.preparing = state.getAllOrders.data.preparing.filter((prevOrder)=> prevOrder._id != order._id);
      state.getAllOrders.data.completed = state.getAllOrders.data.completed.filter((prevOrder)=> prevOrder._id != order._id);
      state.getAllOrders.data[`${order.status}`].unshift(order);
    },

    updateOrderStatusFailure : (state, action)=>{
      state.updateOrder.status = "failed";
      state.updateOrder.error = action.payload;
    },

    clearUpdateOrderStatusStats : (state)=>{
      state.updateOrderStatus.status = null;
      state.updateOrderStatus.error = null;
      state.updateOrderStatus.data = null;
    },

    /////////////////////////////////////////////

    // updateOrder
    updateOrderRequest: (state) => {
      state.updateOrder.status = "pending";
    },
    updateOrderSuccess: (state, action) => {
      state.updateOrder.status = "success"
      const updatedOrder = action.payload.order;
      if(updatedOrder.status == 'draft'){
        state.getAllOrders.data.draft = state.getAllOrders.data.draft.map((prevOrder)=> {
          if(prevOrder._id == updatedOrder._id) return updatedOrder;
          else return prevOrder;
        });
      }
      if(updatedOrder.status == 'pending'){
        state.getAllOrders.data.pending = state.getAllOrders.data.pending.map((prevOrder)=> {
          if(prevOrder._id == updatedOrder._id) return updatedOrder;
          else return prevOrder;
        });
      }
      if(updatedOrder.status == 'preparing'){
        state.getAllOrders.data.preparing = state.getAllOrders.data.preparing.map((prevOrder)=> {
          if(prevOrder._id == updatedOrder._id) return updatedOrder;
          else return prevOrder;
        });
      }
      if(updatedOrder.status == 'completed'){
        state.getAllOrders.data.completed = state.getAllOrders.data.completed.map((prevOrder)=> {
          if(prevOrder._id == updatedOrder._id) return updatedOrder;
          else return prevOrder;
        });
      }
    },

    updateOrderFailure: (state, action) => {
      state.updateOrder.status = "failed";
      state.updateOrder.error = action.payload;
    },

    // deleteOrder
    deleteOrderRequest: (state) => {
      state.deleteOrder.status = "pending";
    },
    deleteOrderSuccess: (state, action) => {
      state.deleteOrder.status = "success";
      if (state.getAllOrders.data && state.getAllOrders.data.orders) {
        state.getAllOrders.data.orders = state.getAllOrders.data.orders.filter(
          (order) => order._id !== action.payload.order
        );
      }
    },
    deleteOrderFailure: (state, action) => {
      state.deleteOrder.status = "failed";
      state.deleteOrder.error = action.payload;
    },

    // Manual state cleaners
    clearGetAllOrdersStatus: (state) => {
      state.getAllOrders.status = null;
    },
    clearGetAllOrdersError: (state) => {
      state.getAllOrders.error = null;
    },
    clearGetAllOrdersData: (state) => {
      state.getAllOrders.data = {
        draft:[],  
        pending: [],
        preparing: [],
        completed: [],
      };
    },

    clearCreateOrderStats: (state) => {
      state.createOrder.status = null;
      state.createOrder.error = null;
      state.createOrder.data = null;
    },

    clearUpdateOrderStats: (state) => {
      state.updateOrder.status = null;
      state.updateOrder.error = null;
      state.updateOrder.data = null;
    },

    clearDeleteOrderStats: (state) => {
      state.deleteOrder.status = null;
      state.deleteOrder.error = null;
      state.deleteOrder.data = null;
    },
  },
});

export const orderActions = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
