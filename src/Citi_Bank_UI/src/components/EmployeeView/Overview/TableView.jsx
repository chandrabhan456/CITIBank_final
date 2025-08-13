import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import {
  HiLogout,
  HiLogin,
  HiOutlineChevronRight,
  HiOutlineChevronLeft,
} from "react-icons/hi";
import { BiSortAlt2 } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import "./searchbar.css";
import { useStateContext } from "../../../contexts/ContextProvider";


import { useNavigate } from 'react-router-dom';

const columnWidths = ["15%", "15%","10%", "15%", "15%", "15%", "15%"];
const customerHeaders = [
  { key: "id", label: "Customer ID" },
   { key: "name", label: "Name" },
  { key: "age", label: "Age" },
  { key: "annual_income", label: "Annual Income" },
  { key: "annual_spend", label: "Annual Spend" },
  { key: "credit_score", label: "Credit Score" },
  { key: "life_event", label: "Life Event" },
];


function TableView({data}) {
  const [currentPage, setCurrentPage] = useState(1);
  const { selectedCategory, setSelectedCustomerId,mode } =
    useStateContext();
  const [inputText, setInputText] = useState("");
  const [selects, setSelects] = useState(5);


  const [sort, setSort] = useState({
    keyToSort: "name",
    direction: "asc",
  });
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
   const navigate = useNavigate();
 
 
  // Event handler to capture the customerID when a row is clicked
 const handleRowClick = (customerID) => {
  console.log("Customer ID:", customerID);
  setSelectedCustomerId(customerID);
  window.scrollTo(0, 0); // This ensures the page starts from the top
  navigate('/citiBankUI/customerView');
};

 let filteredUsers = Array.isArray(data) ? data : [];

// Filtering
if (selectedCategory) {
  filteredUsers = filteredUsers.filter(
    (el) => el.persona && el.persona.toLowerCase() === selectedCategory.toLowerCase()
  );
}

// Sorting
if (sort.keyToSort) {
  filteredUsers = [...filteredUsers].sort((a, b) => {
    if (sort.direction === "asc") {
      return a[sort.keyToSort] > b[sort.keyToSort] ? 1 : -1;
    }
    return a[sort.keyToSort] < b[sort.keyToSort] ? 1 : -1;
  });
}

// Pagination
const recordsPerPage = selects;
const lastIndex = currentPage * recordsPerPage;
const firstIndex = lastIndex - recordsPerPage;
const records = filteredUsers.slice(firstIndex, lastIndex);
const npage = Math.ceil(filteredUsers.length / recordsPerPage);

  // Now, `records` contains the paginated, filtered, and sorted users.

  function handleHeaderClick(column) {
    setSort({
      keyToSort: column.key,
      direction: sort.direction === "asc" ? "desc" : "asc",
    });
  }

  // Paging functions
  function prePage() {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : 1));
  }
  function nextPage() {
    setCurrentPage((prev) => (prev < npage ? prev + 1 : npage));
  }
  function firstPage() {
    setCurrentPage(1);
  }
  function lastPage() {
    setCurrentPage(npage);
  }

  return (
    <div id="tableSection" className="w-[98%] mt-2 " >
      {/* Search and Title */}
      <div className={`text-sm mb-4 ${mode === "dark" ? "text-white" : "text-black"}`}>
  <span className={`font-bold ml-4 ${mode === "dark" ? "text-blue-400" : "text-blue-400"}`}>Note:</span> Click to see customer Details
</div>

      <div className="flex justify-between p-2 h-70 md:mx-0 relative w-full " style={{marginTop:'-50px'}}>
        <div className="absolute inset-y-0 left-12 w-13  justify-center">
          <div className="">
            <div className="flex justify-between items-center">
              <div>
                <div className="flex " style={{marginLeft:'-30px'}}>
                
                </div>
              </div>
            </div>
          </div>
        </div>
       {/* <div className="justify-end absolute w-50 right-0">
          <select
            className="text-black outline-none  dropdown"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.category}>
                {c.category}
              </option>
            ))}
          </select>
        </div>*/}
      </div>
      {/* Table */}

      <div className=" rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200 border border-gray-600 rounded-lg overflow-hidden">
          <thead className="dark:bg-[#52529a] dark:text-white text-black bg-blue-300">
            <tr style={{ height: "55px" }}>
              {customerHeaders.map((column, index) => (
                <th
                  key={column.key}
                  style={{ width: columnWidths[index] }}
                  className="text-left px-4 py-3 font-semibold"
                >
                  <span
                    className="cursor-pointer flex items-center"
                    onClick={() => handleHeaderClick(column)}
                  >
                    {column.label}
                    <BiSortAlt2 className="ml-1 text-gray-400" />
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {records.map((item) => (
              <tr
                key={item.id}
                className="dark:bg-[#352f6e] dark:text-[#CAD5DF] bg-gray-50 text-black dark:hover:bg-slate-600 hover:bg-gray-200 cursor-pointer"
                onClick={() => handleRowClick(item.id)} // Add the click event handler here
              >
                <td className="px-4 py-2 border-b border-gray-600">
                  {item.id}
                </td>
                 <td className="px-4 py-2 border-b border-gray-600">
                  {item.name}
                </td>
                <td className="px-4 py-2 border-b border-gray-600">
                  {item.age}
                </td>
                <td className="px-4 py-2 border-b border-gray-600">
                  ${item.annual_income}
                </td>
                <td className="px-4 py-2 border-b border-gray-600">
                  ${item.annual_spend}
                </td>
                <td className="px-4 py-2 border-b border-gray-600">
                  {item.credit_score}
                </td>
                <td className="px-4 py-2 border-b border-gray-600">
                  {item.life_event}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between p-2 md:mx-0 relative w-full">
        <div className="flex ml-2 ">
          <div className="dark:text-white text-black">Items per Page</div>
          <div className="ml-2 bg-transparent">
            <select   className="bg-transparent border border-black dark:border-white rounded px-2 py-1 text-black dark:text-white cursor-pointer"
              value={selects}
              onChange={(e) => setSelects(Number(e.target.value))}
            >
              <option  value={5}>5</option>
              <option value={10}>10</option>
              <option value={12}>12</option>
              <option value={15}>15</option>
            </select>
          </div>
        </div>
        <div className="justify-end absolute right-24 ">
          <div className="flex items-center">
            <span className="dark:text-white text-black mr-6 whitespace-nowrap">
              Showing page {currentPage} of {npage}
            </span>
            <button onClick={firstPage} className="mx-2 text-black dark:text-white">
              <HiLogin />
            </button>
            <button onClick={prePage} className="mx-2 text-black dark:text-white">
              <HiOutlineChevronLeft />
            </button>
            <button onClick={nextPage} className="mx-2 text-black dark:text-white">
              <HiOutlineChevronRight />
            </button>
            <button onClick={lastPage} className="mx-2 text-black dark:text-white">
              <HiLogout />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableView;
