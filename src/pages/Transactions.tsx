import { useState } from "react";
import {
  FaPlus,
  FaMoneyBillWave,
  FaArrowDown,
  FaArrowUp,
  FaUtensils,
  FaCar,
  FaHome,
  FaTshirt,
  FaBook,
  FaDollarSign,
  FaSearch,
} from "react-icons/fa";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "../components/ui/Table";
import { Avatar, Modal, DatePicker, Select } from "antd";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import Header from "../components/ui/Header";

dayjs.extend(isBetween);

interface Transaction {
  category: string;
  date: string;
  paymentMode: string;
  description: string;
  amount: number;
  status: string;
}

interface FormData {
  category: string;
  amount: number;
  paymentMode: string;
  description: string;
  status: string;
  date: string | null;
}

const transactions: Transaction[] = [
  {
    category: "Food",
    date: "11/30/2017",
    paymentMode: "Debit Card",
    description: "Palmetto Cheese, Mint julep",
    amount: -6,
    status: "Completed",
  },
  {
    category: "Transportation",
    date: "11/30/2017",
    paymentMode: "Debit Card",
    description: "Other vehicle expenses",
    amount: -7,
    status: "Pending",
  },
  {
    category: "Housing",
    date: "11/30/2017",
    paymentMode: "Mobile Money",
    description: "Laundry and cleaning supplies",
    amount: -20,
    status: "Completed",
  },
  {
    category: "Extra Income",
    date: "11/30/2017",
    paymentMode: "Cash",
    description: "Income from Sale",
    amount: 110,
    status: "Completed",
  },
  {
    category: "Food",
    date: "11/30/2017",
    paymentMode: "Debit Card",
    description: "Muffuletta sandwich, Mint julep",
    amount: -10,
    status: "Failed",
  },
  {
    category: "Clothing",
    date: "11/30/2017",
    paymentMode: "Debit Card",
    description: "Pair of Running Shoes",
    amount: -7,
    status: "Completed",
  },
  {
    category: "Education",
    date: "11/30/2017",
    paymentMode: "Cash",
    description: "Expense for Education",
    amount: -50,
    status: "Pending",
  },
  {
    category: "Transportation",
    date: "11/30/2017",
    paymentMode: "Debit Card",
    description: "Cars and trucks, used",
    amount: -80,
    status: "Completed",
  },
];

const categoryIcon = (category) => {
  switch (category) {
    case "Food":
      return <FaUtensils />;
    case "Transportation":
      return <FaCar />;
    case "Housing":
      return <FaHome />;
    case "Clothing":
      return <FaTshirt />;
    case "Education":
      return <FaBook />;
    case "Extra Income":
      return <FaDollarSign />;
    default:
      return <FaDollarSign />;
  }
};

const categoryBgColor = (category) => {
  switch (category) {
    case "Food":
      return "#f97316";
    case "Transportation":
      return "#3b82f6";
    case "Housing":
      return "#cc5959";
    case "Clothing":
      return "#af9efa";
    case "Education":
      return "#f3e308";
    case "Extra Income":
      return "#fdba74";
    default:
      return "#e5e7eb";
  }
};

export default function Transactions() {
  const [search, setSearch] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    category: "Food",
    amount: 0,
    paymentMode: "Cash",
    description: "",
    status: "Completed",
    date: null,
  });
  const [dateRange, setDateRange] = useState<[string, string] | null>(null);
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [sortAsc, setSortAsc] = useState<boolean>(true);

  let filteredTransactions = transactions;

  // Filter by date range
  if (dateRange && dateRange[0] && dateRange[1]) {
    filteredTransactions = filteredTransactions.filter((tx) =>
      dayjs(tx.date, "MM/DD/YYYY").isBetween(
        dayjs(dateRange[0], "YYYY-MM-DD").startOf("day"),
        dayjs(dateRange[1], "YYYY-MM-DD").endOf("day"),
        null,
        "[]"
      )
    );
  }

  // Filter by type
  if (typeFilter === "Income") {
    filteredTransactions = filteredTransactions.filter((tx) => tx.amount > 0);
  } else if (typeFilter === "Expense") {
    filteredTransactions = filteredTransactions.filter((tx) => tx.amount < 0);
  }

  // Sort by amount
  filteredTransactions = [...filteredTransactions].sort((a, b) =>
    sortAsc ? a.amount - b.amount : b.amount - a.amount
  );

  // Apply search filter as before
  filteredTransactions = filteredTransactions.filter(
    (tx) =>
      tx.category.toLowerCase().includes(search.toLowerCase()) ||
      tx.description.toLowerCase().includes(search.toLowerCase()) ||
      tx.paymentMode.toLowerCase().includes(search.toLowerCase()) ||
      tx.date.includes(search)
  );

  const totalIncome = transactions
    .filter((tx) => tx.amount > 0)
    .reduce((sum, tx) => sum + tx.amount, 0);
  const totalExpense = transactions
    .filter((tx) => tx.amount < 0)
    .reduce((sum, tx) => sum + tx.amount, 0);
  const balance = totalIncome + totalExpense;

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <div className="p-6 space-y-8">
        <div className="w-full lg:w-[90%] mx-auto mt-8 mb-6">
          <h1 className="text-3xl font-extrabold text-gray-800">
            Transactions
          </h1>
          <p className="text-gray-500 mt-1">
            View, search, and manage all your transactions in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 w-full lg:w-[90%] mx-auto">
          <div className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
            <FaMoneyBillWave className="text-green-500 text-2xl" />
            <div>
              <div className="text-gray-500 text-sm">Total Income</div>
              <div className="text-green-600 font-bold text-lg">
                + ${totalIncome}
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
            <FaArrowDown className="text-red-500 text-2xl" />
            <div>
              <div className="text-gray-500 text-sm">Total Expense</div>
              <div className="text-red-600 font-bold text-lg">
                - ${Math.abs(totalExpense)}
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
            <FaArrowUp className="text-blue-500 text-2xl" />
            <div>
              <div className="text-gray-500 text-sm">Balance</div>
              <div
                className={`font-bold text-lg ${
                  balance >= 0 ? "text-green-700" : "text-red-700"
                }`}
              >
                {balance >= 0 ? "+ " : "- "}${Math.abs(balance)}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4 w-full lg:w-[90%] mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button
              variant="default"
              className="flex items-center gap-2"
              onClick={() => setIsModalVisible(true)}
            >
              <FaPlus /> Add Transaction
            </Button>
            <div className="relative w-full sm:w-80">
              <Input
                type="text"
                placeholder="Search transactions..."
                className="w-full pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-end">
            <DatePicker.RangePicker
              className="w-full sm:w-auto"
              onChange={(_, dateStrings) => {
                setDateRange(dateStrings as [string, string]);
              }}
            />
            <Select
              className="w-full sm:w-48"
              value={typeFilter}
              onChange={setTypeFilter}
              options={[
                { value: "All", label: "All Types" },
                { value: "Income", label: "Income" },
                { value: "Expense", label: "Expense" },
              ]}
            />
            <Button
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => setSortAsc((prev) => !prev)}
            >
              Sort by Amount {sortAsc ? "↑" : "↓"}
            </Button>
          </div>
        </div>

        <div className="rounded-xl bg-white shadow-lg overflow-auto w-full lg:w-[90%] mx-auto">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="font-semibold">Category</TableCell>
                <TableCell className="font-semibold">Date</TableCell>
                <TableCell className="font-semibold">Payment Mode</TableCell>
                <TableCell className="font-semibold">Description</TableCell>
                <TableCell className="font-semibold">Status</TableCell>
                <TableCell className="font-semibold text-right">
                  Amount
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTransactions.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center text-gray-400 py-8"
                  >
                    No transactions found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredTransactions.map((tx, idx) => (
                  <TableRow key={idx} className="hover:bg-blue-50 transition">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar
                          size="small"
                          style={{
                            backgroundColor: categoryBgColor(tx.category),
                            color: "#fff",
                          }}
                        >
                          {categoryIcon(tx.category)}
                        </Avatar>
                        {tx.category}
                      </div>
                    </TableCell>
                    <TableCell>{tx.date}</TableCell>
                    <TableCell>{tx.paymentMode}</TableCell>
                    <TableCell>{tx.description}</TableCell>
                    <TableCell>
                      <span
                        className={
                          tx.status === "Completed"
                            ? "px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold"
                            : tx.status === "Pending"
                            ? "px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-semibold"
                            : "px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold"
                        }
                      >
                        {tx.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      <span
                        className={
                          tx.amount < 0 ? "text-red-600" : "text-green-600"
                        }
                      >
                        {tx.amount < 0
                          ? `- $${Math.abs(tx.amount)}`
                          : `+ $${tx.amount}`}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Add Transaction Modal */}
      <Modal
        title="Add Transaction"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => {
          console.log(formData);
          setIsModalVisible(false);
        }}
      >
        <div className="space-y-4">
          <Select
            className="w-full"
            defaultValue="Food"
            onChange={(value: string) =>
              setFormData({ ...formData, category: value })
            }
            options={[
              "Food",
              "Transportation",
              "Housing",
              "Extra Income",
              "Clothing",
              "Education",
            ].map((cat) => ({ value: cat, label: cat }))}
          />
          <Input
          className="w-full my-2"
            type="number"
            placeholder="Amount"
            value={formData.amount}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormData({ ...formData, amount: parseFloat(e.target.value) })
            }
          />
          <Select
            className="w-full"
            defaultValue="Cash"
            onChange={(value: string) =>
              setFormData({ ...formData, paymentMode: value })
            }
            options={["Cash", "Debit Card", "Mobile Money"].map((mode) => ({
              value: mode,
              label: mode,
            }))}
          />
          <Input
          className="w-full my-2"
            placeholder="Description"
            value={formData.description}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          <Select
            className="w-full"
            defaultValue="Completed"
            onChange={(value: string) =>
              setFormData({ ...formData, status: value })
            }
            options={["Completed", "Pending", "Failed"].map((status) => ({
              value: status,
              label: status,
            }))}
          />
          <div className="my-2" />
          <DatePicker
            className="w-full"
            onChange={(_date: any, dateString: string | string[]) =>
              setFormData({
                ...formData,
                date:
                  typeof dateString === "string"
                    ? dateString
                    : dateString[0] || "",
              })
            }
          />
        </div>
      </Modal>
    </div>
  );
}
