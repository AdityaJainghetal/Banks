import React, { useState } from "react";
import Pending from "./Pending";
// import Assigned from "./Assigned";
// import QueryRaised from "./QueryRaised";
// import ReportSubmitted from "./ReportSubmitted";
import { Select } from "antd";
import { DownOutlined } from "@ant-design/icons";
import CountUp from "react-countup";
import MyWorklist from "./MyWorklist";

const { Option } = Select;

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [activeComponent, setActiveComponent] = useState(null);
  const [selectedAgent, setSelectedAgent] = useState("Self");

  const reports = [
    { title: "To Be Assigned", total: "1587", component: "Pending" },
    { title: "Total Assigned", total: "782", component: "Assigned" },
    { title: "Awaiting Approved", total: "59" },
    { title: "Query Raised", total: "120", component: "QueryRaised" },
    { title: "Pending For Action", total: "300", component: "ReportSubmitted" },
    { title: "Cancel Cases", total: "10" },
  ];

  const handleSelect = (value) => {
    setSelectedAgent(value);
  };

  return (
    <div className="p-4">
      {/* Tab Navigation */}
      <div className="custom-container mb-6 mt-14 border-b border-gray-300">
        <ul className="nav nav-tabs custom-tabs flex gap-2">
          <li className="nav-item">
            <button
              className={`nav-link px-4 py-2 rounded-t-lg font-medium ${
                activeTab === "dashboard"
                  ? "bg-[#B5121B] text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
              onClick={() => setActiveTab("dashboard")}
            >
              Dashboard
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link px-4 py-2 rounded-t-lg font-medium ${
                activeTab === "myworklist"
                  ? "bg-[#B5121B] text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
              onClick={() => setActiveTab("myworklist")}
            >
              My Worklist
            </button>
          </li>
        </ul>
      </div>

      {activeTab === "dashboard" && (
        <>
          <div className="mb-6 mt-1 mr-3 p-6 border border-[#B5121B] rounded-2xl bg-white shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h5 className="text-xl font-semibold text-gray-800">All Cases</h5>
              <Select
                value={selectedAgent}
                onChange={handleSelect}
                suffixIcon={<DownOutlined />}
                className="w-64"
              >
                <Option value="All Agents">All Agents</Option>
                <Option value="Self">Self</Option>
                <Option value="SHUBHAM RATHORE">SHUBHAM RATHORE</Option>
                <Option value="SAKET THAKUR">SAKET THAKUR</Option>
                <Option value="LOKESH SHARMA">LOKESH SHARMA</Option>
              </Select>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
              {reports.map((report, key) => (
                <div
                  key={key}
                  onClick={() => setActiveComponent(report.component)}
                  className={`p-5 py-15 text-center rounded-xl cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md border-2 ${
                    activeComponent === report.component
                      ? "border-[#B5121B] bg-[#FFF4F4]"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  <h6 className="uppercase mb-2 text-sm font-medium text-gray-600 truncate">
                    {report.title}
                  </h6>
                  <h2 className="text-2xl font-bold text-gray-900">
                    <CountUp end={parseInt(report.total)} duration={1.5} separator="," />
                  </h2>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <h5 className="text-base font-medium text-gray-700">
                Total cases:{" "}
                <span className="font-semibold text-gray-900">
                  <CountUp end={2000} duration={1.5} separator="," />
                </span>
              </h5>
              <div className="flex flex-col sm:flex-row sm:space-x-8 mt-2 sm:mt-0">
                <h5 className="text-base font-medium text-gray-700">
                  Denied cases:{" "}
                  <span className="font-semibold text-red-600">
                    <CountUp end={50} duration={1.5} separator="," />
                  </span>
                </h5>
                <h5 className="text-base font-medium text-gray-700">
                  Token Back Requests:{" "}
                  <span className="font-semibold text-green-600">
                    <CountUp end={0} duration={1.5} separator="," />
                  </span>
                </h5>
              </div>
            </div>
          </div>

          <div>
            {activeComponent === "Pending" && <Pending />}
            {/* {activeComponent === "Assigned" && <Assigned />} */}
            {/* {activeComponent === "QueryRaised" && <QueryRaised />} */}
            {/* {activeComponent === "ReportSubmitted" && <ReportSubmitted />} */}
          </div>
        </>
      )}

      {activeTab === "myworklist" && (
        <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-md">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">My Worklist</h2>
         <MyWorklist/>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
