"use client";

import { useState } from "react";
import PerPage from "./PerPage";
import Searchbar from "./Searchbar";

const TableUtitlity = () => {
  const [perPage, setPerPage] = useState<number>(5);

  return (
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-semibold">Total applicants:</h2>
      <div className="flex items-center gap-8">
        <PerPage perPage={perPage} setPerPage={setPerPage} />
        <Searchbar placeholder="Search applications" />
      </div>
    </div>
  );
};

export default TableUtitlity;
