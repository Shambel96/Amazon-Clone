import LayOut from "../../Layout/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import React, { useEffect, useContext, useState } from "react";
import { db } from "../../Utility/firebase";
import classes from "./Orders.module.css";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import ProductCard from "../../Components/Product/ProductCard";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";

function Orders() {
  const { state } = useContext(DataContext);
  const [orders, setOrders] = useState([]);
  const { user } = state;

  const formatOrderDate = (created) => {
    if (!created) return "Unknown date";
    return new Date(created * 1000).toLocaleString();
  };

  useEffect(() => {
    if (!user) {
      setOrders([]);
      return;
    }

    const ordersQuery = query(
      collection(db, "users", user.uid, "orders"),
      orderBy("created", "desc"),
    );

    const unsubscribe = onSnapshot(ordersQuery, (snapshot) => {
      setOrders(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        })),
      );
    });

    return () => unsubscribe();
  }, [user]);


  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.orders_container}>
          <h2>Your Orders</h2>
          {/* your orders */}
          <div>
            {orders.length === 0 ? (
              <p>No orders yet.</p>
            ) : (
              orders.map((eachOrder, i) => (
                <div key={eachOrder.id || i} className={classes.order_block}>
                  <hr />
                  <div className={classes.order_header}>
                    <div>
                      <strong>Order Id:</strong> {eachOrder?.id}
                    </div>
                    <div>
                      <strong>Date:</strong> {formatOrderDate(eachOrder?.data?.created)}
                    </div>
                    <div>
                      <strong>Total:</strong>{" "}
                      <CurrencyFormat
                        amount={(eachOrder?.data?.amount || 0) / 100}
                      />
                    </div>
                  </div>
                  <div className={classes.order_items}>
                    {eachOrder?.data?.basket?.map((order) => (
                      <ProductCard
                        product={order}
                        key={order.id}
                        hideAddButton={true}
                        horizontal={true}
                        showDetails={true}
                      />
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Orders;
