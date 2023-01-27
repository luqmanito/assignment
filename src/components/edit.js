import { addProduct, editProduct } from "@/utils";
import React, { Fragment, useEffect, useState } from "react";
import styles from "../styles/edit.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import moment from "moment";

const Edit = (props) => {
  const router = useRouter();
  const [body, setBody] = useState({});
  const [name, setName] = useState(props.name);
  const [stock, setStock] = useState(props.quantity);
  const [sold, setSold] = useState(props.sold);
  const [date, setDate] = useState(props.date);
  const [type, setType] = useState(props.category);

  const changeName = (e) => {
    setName(e.target.value);
  };
  const changeStock= (e) => {
    setStock(e.target.value);
  };
  const changeSold = (e) => {
    setSold(e.target.value);
  };
  const changeType = (e) => {
    setType(e.target.value);
  };
  const changeDate = (e) => {
    setDate(e.target.value);
  };
  const changeHandler = (e) => {
    setBody({ ...body, [e.target.name]: e.target.value });
  };
  const changeHandler2 = (e) => {
    setBody({ ...body, [e.target.name]: parseInt(e.target.value) });
  };
  
  const convertedDate = moment(date).utc().format('YYYY-MM-DD')

  console.log(convertedDate);
  const handleOk = async () => {
    try {
      const result = await editProduct(body, props.id);
      toast.success("Add Product Success !", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      setTimeout(() => {
        props.setOpen(!props);
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
              onChange={((e)=>{
                changeHandler(e)
                changeName(e)
              })}
              className={` ${styles["inp"]}`}
              type="text"
              placeholder="Enter product name.."
              value={name}
              name="name"
            />
            <p className={styles["p-text"]}>Product Category:</p>
            <input
              onChange={((e)=>{
                changeHandler(e)
                changeType(e)
              })}
              className={` ${styles["inp"]}`}
              type="text"
              placeholder="Enter product category.."
              value={type}
              name="category"
            />
            <p className={styles["p-text"]}>Product Quantity:</p>
            <input
              onChange={((e)=>{
                changeHandler2(e)
                changeStock(e)
              })}
              className={` ${styles["inp"]}`}
              type="text"
              value={stock}
              placeholder="Enter product quantity.."
              name="quantity"
            />
            <p className={styles["p-text"]}>Sales of Product:</p>
            <input
              onChange={((e)=>{
                changeHandler(e)
                changeSold(e)
              })}
              className={` ${styles["inp"]}`}
              type="text"
              placeholder="Enter sales of product.."
              value={sold}
              name="sold"
            />
            <p className={styles["p-text"]}>Transaction Date:</p>
            <input
              onChange={((e)=>{
                changeHandler(e)
                changeDate(e)
              })}
              className={` ${styles["inp"]}`}
              type="date"
              value={convertedDate}
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

export default Edit;
