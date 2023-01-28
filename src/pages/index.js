import Edit from "@/components/edit";
import Modal from "@/components/modal";
import PageTitle from "@/components/page-title";
import Products from "@/components/products";
import { debounce } from "@/helpers/debounce";
import { getAllData, getRangeData } from "@/utils";
import { Router } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import styles from "../styles/edit.module.css";
import { useRouter } from "next/router";
import Filter from "@/components/filter";

const Home = () => {
  const Router = useRouter();
  const [dataProducts, setDataProducts] = useState();
  const [searchProduct, setSearchProduct] = useState("");
  const [pageIndex, setPageIndex] = useState(1);
  const [textDrop, setTextDrop] = useState("Sort by :");
  const [openModal, setOpenModal] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [date, setDate] = useState();
  const [show, setShow] = useState(false);
  const [body, setBody] = useState({});
  const handleAdd = async () => {
    setOpenModal(!openModal);
  };

  const handleFilter = async () => {
    setShow(!show);
  };

  const changeDate = (e) => {
    setDate(e.target.value);
  };
  const changeHandler = (e) => {
    setBody({ ...body, [e.target.name]: e.target.value });
  };
  const updateChange = (e) => setSearchProduct(e.target.value);
  
  // console.log(body);

  const getDataProducts = async () => {
    try {
      const result = await getAllData(body);
      console.log(body);
      // console.log(result.data.data);
      setDataProducts(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getFilteredData = async () =>{
    try {
      const data = {
        filter1: body.date1 ? body.date1 : "",
        filter2: body.date2 ? body.date2 : "",
      };
      Router.push(`/?search=&sort=&datefrom=${data.filter1}&untildate=${data.filter2}`);
      const result = await getAllData(data)
      console.log(result.data.data)
      setDataProducts(result.data.data);
    } catch (error) {
      console.log(error);
    }
  }
  const sortByName = async () => {
    setTextDrop("Name");
    Router.push(`/?sortName=ascending`);
    try {
      const body = {
        search: "",
        sort: "ascending",
      };
      const result = await getAllData(body);
      setDataProducts(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const sortByNewest = async () => {
    setTextDrop("Newest");
    Router.push(`/?sortProducts=newest`);
    try {
      const body = {
        search: "",
        sort: "newest",
      };
      const result = await getAllData(body);
      setDataProducts(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const sortByOldest = async () => {
    setTextDrop("Oldest");
    Router.push(`/?sortProducts=oldest`);
    try {
      const body = {
        search: "",
        sort: "oldest",
      };
      const result = await getAllData(body);
      setDataProducts(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const sortByMostPopular = async () => {
    setTextDrop("Most Popular");
    Router.push(`/?sortProducts=popular`);
    try {
      const body = {
        search: "",
        sort: "most-popular",
      };
      const result = await getAllData(body);
      setDataProducts(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const sortByLessPopular = async () => {
    setTextDrop("Less Popular");
    Router.push(`/?sortProducts=recent`);
    try {
      const body = {
        search: "",
        sort: "less-popular",
      };
      const result = await getAllData(body);
      setDataProducts(result.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const allDatas = dataProducts ? dataProducts.length : 0;
  const pageSize = 5;
  let page = pageIndex;
  let totalPages = Math.ceil(allDatas / pageSize);

  const pageData = Array.isArray(dataProducts)
    ? dataProducts.slice(page * pageSize - pageSize, page * pageSize)
    : [];

  useEffect(() => {
    getDataProducts();
    if (searchProduct !== "") {
      Router.push(`/?search=${searchProduct}`);
    }
    if (searchProduct.length === 0) {
      Router.push(`/`);
    }
  }, [searchProduct]);

  return (
    <>
      <PageTitle title="Home" />
      <main className={`container ${styles["main"]}`}>
        <label className={` ${styles["dropdown"]}`}>
          <div className={` ${styles["dd-button"]}`}>{textDrop}</div>
          <input
            type="checkbox"
            className={`${styles["dd-input"]}`}
            id="test"
          />
          <ul className={` ${styles["dd-menu"]}`}>
            <li onClick={sortByName}>Name</li>
            <li onClick={sortByNewest}>Newest</li>
            <li onClick={sortByOldest}>Oldest</li>
            <li onClick={sortByMostPopular}>Most Popular</li>
            <li onClick={sortByLessPopular}>Less Popular</li>
          </ul>
        </label>
        <button className={`${styles["add"]}`} onClick={handleAdd}>
          Add Product
        </button>
        <button className={`${styles["add"]}`} onClick={handleFilter}>
          Filter Date :
        </button>
        <div className={show ? `${styles["range"]}` : `${styles["norange"]}`}>
          <p className={styles["p-trans"]}>Transaction Date From:</p>
          <input
            onChange={(e) => {
              changeHandler(e);
              changeDate(e);
            }}
            className={` ${styles["inp"]}`}
            type="date"
            // value={convertedDate}
            placeholder="Enter product Transaction date.."
            name="date1"
          />
          <p className={styles["p-trans"]}>Until:</p>
          <input
            onChange={(e) => {
              changeHandler(e);
              changeDate(e);
            }}
            className={` ${styles["inp"]}`}
            type="date"
            // value={convertedDate}
            placeholder="Enter product Transaction date.."
            name="date2"
          />
          <div>
            <button 
            onClick={getFilteredData}
            className={`${styles["set"]}`}>Set</button>
            <button 
            onClick={handleFilter}
            className={`${styles["cancel"]}`}>Cancel</button>
          </div>
        </div>
        <input
          onChange={debounce(updateChange, 2000)}
          className={`${styles["search"]}`}
          placeholder="Search product here.."
          type="text"
        />
        <table className={`table table-hover ${styles["section"]}`}>
          <thead className={`${styles["section-head"]}`}>
            <tr className={`${styles["section-tr"]}`}>
              <th scope="col">No</th>
              <th scope="col">Nama Barang</th>
              <th scope="col">Stok</th>
              <th scope="col">Jumlah Terjual</th>
              <th scope="col">Tanggal Transaksi</th>
              <th scope="col">Jenis Barang</th>
            </tr>
          </thead>
          <tbody>
            {searchProduct === ""
              ? dataProducts &&
                dataProducts
                  .filter((data) => {
                    if (searchProduct === "") {
                      return data;
                    } else if (
                      data.name
                        .toLowerCase()
                        .includes(searchProduct.toLowerCase())
                    ) {
                      return data;
                    }
                  })
                  .map((data, idx) => {
                    return (
                      <Products
                        no={idx + 1}
                        name={data.name}
                        stock={data.quantity}
                        sold={data.sold}
                        date={data.transaction_time}
                        category={data.category}
                        id={data.id}
                        key={data.id}
                      />
                    );
                  })
              : dataProducts &&
                dataProducts
                  .filter((data) => {
                    if (searchProduct === "") {
                      return data;
                    } else if (
                      data.name
                        .toLowerCase()
                        .includes(searchProduct.toLowerCase())
                    ) {
                      return data;
                    }
                  })
                  .map((data, idx) => {
                    return (
                      <Products
                        no={idx + 1}
                        name={data.name}
                        stock={data.quantity}
                        sold={data.sold}
                        date={data.transaction_time}
                        category={data.category}
                        id={data.id}
                        key={data.id}
                      />
                    );
                  })}
          </tbody>
        </table>
      </main>
      <Modal open={openModal} setOpen={setOpenModal} title="New Product" />
      <Filter open={openFilter} setOpen={setOpenFilter} title="New Product" />
    </>
  );
};

export default Home;
