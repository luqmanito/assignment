import { addProduct } from "@/utils";
import React, { Fragment, useEffect, useState } from "react";
import styles from "../styles/modal.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

const Modal = (props) => {
    const router = useRouter();
  const [body, setBody] = useState({});
  const changeHandler = (e) =>
    setBody({ ...body, [e.target.name]: e.target.value });
  // console.log(body);

  const handleOk = async () => {
    try {
      const result = await addProduct(body);
      toast.success("Add Product Success !", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1500,
        });
        setTimeout(() => {
            props.setOpen(!props)
            router.push(`/`);
        }, 2600);       
    } catch (error) {
      console.log(error);
      toast.error("Something Wrong!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
    }
  };

  return (
    <>
      {props.open ? (
        <div className={styles.modal}>
          <div className={styles["modal-content"]}>
            <p className={styles["p-text"]}>Product Name:</p>
            <input
              onChange={changeHandler}
              className={` ${styles["inp"]}`}
              type="text"
              placeholder="Enter product name.."
              name="name"
            />
            <p className={styles["p-text"]}>Product Category:</p>
            <input
              onChange={changeHandler}
              className={` ${styles["inp"]}`}
              type="text"
              placeholder="Enter product category.."
              name="category"
            />
            <p className={styles["p-text"]}>Product Quantity:</p>
            <input
              onChange={changeHandler}
              className={` ${styles["inp"]}`}
              type="text"
              placeholder="Enter product quantity.."
              name="quantity"
            />
            <p className={styles["p-text"]}>Sales of Product:</p>
            <input
              onChange={changeHandler}
              className={` ${styles["inp"]}`}
              type="text"
              placeholder="Enter sales of product.."
              name="sold"
            />
            <p className={styles["p-text"]}>Transaction Date:</p>
            <input
              onChange={changeHandler}
              className={` ${styles["inp"]}`}
              type="date"
              placeholder="Enter product Transaction date.."
              name="transaction_time"
            />

            <div className={styles["modal-footer"]}>
              <button className={styles.button} onClick={handleOk}>
                save
              </button>
              <ToastContainer />
              <button
                className={styles.button}
                onClick={() => props.setOpen(!props)}
              >
                cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
