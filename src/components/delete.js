import React from "react";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteProduct } from "@/utils";
import styles from "../styles/delete.module.css";

const Delete = (props) => {
  const router = useRouter();
  const handleOk = async () => {
    try {
      const result = await deleteProduct(props.id);
      toast.success("Delete Item Succesfully!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      setTimeout(() => {
        props.setOpen(!props);
        router.push(`/`);
      }, 2600);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {props.open ? (
        <div className={styles.modal}>
          <div className={styles["modal-content"]}>
            <div className={styles["modal-header"]}>
              <p className={styles["modal-title"]}>{props.title}</p>
            </div>
            <div className={styles["modal-body"]}>{props.body}</div>
            <div className={styles["modal-footer"]}>
              <button className={styles.button} onClick={handleOk}>
                yes
              </button>
              <button
                className={styles.button}
                onClick={() => props.setOpen(!props)}
              >
                no
              </button>
              <ToastContainer />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Delete;
