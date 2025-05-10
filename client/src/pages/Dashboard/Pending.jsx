import React, { useEffect, useState, useMemo } from "react";
import { Table, Input, Tag } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllHFBanks } from "../../redux/features/HFBank/HFBankThunk";
import { getAllIciciBanks } from "../../redux/features/IciciBank/iciciBankThunk";
import { fetchDetails } from "../../redux/features/AdityaBank/adityaThunks";
import { getAllDetails } from "../../redux/features/Primal/piramalThunks";

const { Search: AntSearch } = Input;

const Pending = () => {
  const [search, setSearch] = useState("");
  const [reportData, setReportData] = useState([]);

  const { loading } = useSelector((state) => state.icici);

  const icici = useSelector((state) => state.icici.data) || [];
  const hfBanks = useSelector((state) => state.hfBanks.allBanks) || [];
  const aditya = useSelector((state) => state.aditya.details) || [];
  const primal = useSelector((state) => state.primal.details) || [];

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchAllHFBanks());
      dispatch(getAllIciciBanks());
      dispatch(fetchDetails());
      dispatch(getAllDetails());
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Add bank identifier and normalize customer name field
    const hfWithBank = hfBanks.map((item) => ({
      ...item,
      bankName: "HF Bank",
      route: "home-first",
      displayCustomerName: item.customerName,
      // Add createdAt if not present (fallback to current date)
      createdAt: item.createdAt || new Date().toISOString(),
    }));

    const iciciWithBank = icici.map((item) => ({
      ...item,
      bankName: "ICICI Bank",
      route: "icici",
      displayCustomerName: item.verifiedBy,
      createdAt: item.createdAt || new Date().toISOString(),
    }));

    const adityaWithBank = aditya.map((item) => ({
      ...item,
      bankName: "Aditya Bank",
      route: "aditya",
      displayCustomerName: item.clientName,
      createdAt: item.createdAt || new Date().toISOString(),
    }));

    // Fixed: Changed from aditya to primal for primal bank data
    const primalWithBank = primal.map((item) => ({
      ...item,
      bankName: "Primal Bank",
      route: "piramal",
      displayCustomerName: item.contactPersonName,
      createdAt: item.createdAt || new Date().toISOString(),
    }));

    // Combine all data and sort by createdAt in descending order (newest first)
    const combinedData = [
      ...hfWithBank,
      ...iciciWithBank,
      ...adityaWithBank,
      ...primalWithBank,
    ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort by newest first

    setReportData(combinedData);
  }, [hfBanks, icici, aditya, primal]);

  const filteredData = useMemo(() => {
    return reportData.filter((item) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, reportData]);

  const columns = [
    {
      title: "Bank",
      dataIndex: "bankName",
      render: (bankName) => (
        <Tag
          color={
            bankName === "HF Bank"
              ? "blue"
              : bankName === "ICICI Bank"
              ? "green"
              : bankName === "Aditya Bank"
              ? "orange"
              : "purple" // Added color for Primal Bank
          }
        >
          {bankName}
        </Tag>
      ),
      filters: [
        { text: "HF Bank", value: "HF Bank" },
        { text: "ICICI Bank", value: "ICICI Bank" },
        { text: "Aditya Bank", value: "Aditya Bank" },
        { text: "Primal Bank", value: "Primal Bank" }, // Added filter for Primal Bank
      ],
      onFilter: (value, record) => record.bankName === value,
    },
    {
      title: "Customer Name",
      dataIndex: "displayCustomerName",
      sorter: (a, b) =>
        a.displayCustomerName?.localeCompare(b.displayCustomerName),
      render: (text, record) => (
        <Link
          to={`/bank/${record.route}/${record._id}`} // Simplified route
          className='text-blue-600 hover:underline'
        >
          {text || "N/A"}
        </Link>
      ),
    },
    {
      title: "Contact No",
      render: (record) => record.customerNo || record.personContactNo || "N/A",
    },
    {
      title: "Type of Loan",
      dataIndex: "typeOfLoan",
      sorter: (a, b) => a.typeOfLoan?.localeCompare(b.typeOfLoan),
      render: (text) => text || "N/A",
    },
    {
      title: "Date Added", // Changed from "Date" to be more specific
      dataIndex: "createdAt", // Now showing creation date instead of report date
      render: (date) => new Date(date).toLocaleDateString(), // Better date formatting
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      defaultSortOrder: "descend", // Default sort by newest first
    },
    {
      title: "Address",
      render: (record) =>
        record.addressSite ||
        record.addressLegal ||
        record.propertyAddressVisit ||
        "N/A",
      ellipsis: true,
    },
    {
      title: "Market Value",
      render: (record) =>
        record.fairMarketValue
          ? `₹${record.fairMarketValue.toLocaleString()}`
          : "N/A",
      sorter: (a, b) => (a.fairMarketValue || 0) - (b.fairMarketValue || 0),
    },
  ];

  if (loading) {
    return <p>Loading...........</p>;
  }

  return (
    <div className='bg-gray-100 p-6 rounded-xl shadow-md min-h-screen'>
      <div className='flex items-center gap-2 mb-4'>
        <AntSearch
          placeholder='Search customer names, addresses...'
          allowClear
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          className='w-full max-w-md'
        />
      </div>

      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-xl font-semibold'>All Bank Valuation Reports</h2>
        <span className='text-sm text-gray-500'>
          Showing {filteredData.length} records (newest first)
        </span>
      </div>

      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey='_id'
        pagination={{ pageSize: 10 }}
        bordered
        className='rounded-xl'
        scroll={{ x: true }}
      />
    </div>
  );
};

export default Pending;
