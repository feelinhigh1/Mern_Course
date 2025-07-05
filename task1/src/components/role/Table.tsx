import React, { useEffect, useState } from "react";
import Table from "../Table";
import { getRoles } from "@/pages/api/rest_api";

const RoleTable = () => {
  const [roleList, setRoleList] = useState([]);

  const fetchRole = async () => {
    try {
      // alert("Fetching roles...");
      const data = await getRoles();
      setRoleList(data);
    } catch (error) {
      // handle error
    }
  };

  useEffect(() => {
    fetchRole();
  }, []);

  return <Table data={roleList} />;
};

export default RoleTable;
