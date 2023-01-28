import React, { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Edit from "./edit";
import Delete from "./delete";
import moment from "moment";
import styles from "../styles/products.module.css";

function Products({no, name, stock, sold, date, category,id }) {
  const router = useRouter();
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const { id_data } = router.query;
//   const nav1 = () => {
//     router.push(`/input-bank/${id}`);
//   };
const convertedDate = moment(date).utc().format('YYYY-MM-DD')

const [year, month, day] = convertedDate.split('-');
const dateResult = [day, month, year].join('-');

  const handleEdit = async () => {
    setOpenEdit(!openEdit);
  };
  const handleDelete = async () => {
    setOpenDelete(!openDelete);
  };

  return (
    <>
      <tr>
        <th scope="row">{no}</th>
        <td className={`${styles["td-sub"]}`}>{name}</td>
        <td className={`${styles["td-sub"]}`}>{stock}</td>
        <td className={`${styles["td-sub"]}`} >{sold}</td>
        <td className={`${styles["td-sub"]}`}>{dateResult}</td>
        <td className={`${styles["td-sub"]}`}>{category}</td>
        <button onClick={handleEdit}>edit</button>
        <button onClick={handleDelete}>delete</button>
      </tr>
      <Edit
        name={name}
        stock={stock}
        sold={sold}
        quantity={stock}
        date={date}
        category={category}
        id={id}
        open={openEdit}
        setOpen={setOpenEdit}
        title="Log out"
        body="Do you really want to log out?"
      />
      <Delete
        open={openDelete}
        setOpen={setOpenDelete}
        id={id}
        title="Delete Item"
        body="Are you sure want to delete this product?"
      />
    </>
  );
}

export default Products;
