import { addProduct, editProduct, getAllData } from "@/utils";
import React, { Fragment, useEffect, useState } from "react";
import styles from "../styles/edit.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import moment from "moment";

const Filter = (props) => {
  const Router = useRouter();
  const [body, setBody] = useState({});
  const [name, setName] = useState(props.name);
  const [stock, setStock] = useState(props.quantity);
  const [sold, setSold] = useState(props.sold);
  const [date, setDate] = useState(props.date);
  const [type, setType] = useState(props.category);


  const changeDate = (e) => {
    setDate(e.target.value);
  };
  const changeHandler = (e) => {
    setBody({ ...body, [e.target.name]: e.target.value });
  };
  
  const convertedDate = moment(date).utc().format('YYYY-MM-DD')

  // console.log(convertedDate);
  const handleOk = async () => {
    try {
      const result = await editProduct(body, props.id);
      toast.success("Add Product Success !", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      setTimeout(() => {
        props.setOpen(!props);
        Router.push(`/`);
      }, 2600);
    } catch (error) {
      console.log(error);
      toast.error("Something Wrong!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
    }
  };
  

  const sortByName = async () => {

    Router.push(`/?sortName=ascending`);
    try {
      const result = await getAllData(body);
      setDataProducts(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {props.open ? (
        <div className={styles.modal}>
          <div className={styles["modal-content"]}>
            <h2>Select Date Range </h2>
            <p className={styles["p-text"]}>Transaction Date From:</p>
            <input
              onChange={((e)=>{
                changeHandler(e)
                changeDate(e)
              })}
              className={` ${styles["inp"]}`}
              type="date"
              value={convertedDate}
              placeholder="Enter product Transaction date.."
              name="date1"
            />
            <p className={styles["p-text"]}>Until:</p>
            <input
              onChange={((e)=>{
                changeHandler(e)
                changeDate(e)
              })}
              className={` ${styles["inp"]}`}
              type="date"
              value={convertedDate}
              placeholder="Enter product Transaction date.."
              name="date2"
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

export default Filter;
