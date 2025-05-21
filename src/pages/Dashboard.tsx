import React, { useState } from 'react';
import Categories from '../components/dashboard/Categories';
import DashboardCharts from '../components/dashboard/DashboardCharts';
import { MdArrowOutward, MdOutlineRemoveRedEye } from 'react-icons/md';
import { GoArrowDownLeft } from 'react-icons/go';
import { FaRegEyeSlash } from 'react-icons/fa6';
import Header from '../components/Header';
import { Card } from '../components/ui/Card';
import FirstChart from '../components/dashboard/FirstChart';

export default function Dashboard() {
  const [view_balance, setview_balance] = useState(false);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Top Bar & Balance Section */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-600 pb-20">
        <Header />

        <div className="max-w-5xl mx-auto px-4 mt-10">
          <div className="bg-blue-700 rounded-2xl shadow-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-white/80 text-sm mb-2">Total Balance</p>
              <div className="flex items-center gap-2">
                <h2 className="text-white text-4xl font-bold">
                  GHS {view_balance ? "48,238,120.00" : "*** *** ***"}
                </h2>
                <button
                  onClick={() => setview_balance((v) => !v)}
                  className="ml-2 p-2 rounded-full hover:bg-blue-600 transition"
                  aria-label={view_balance ? "Hide balance" : "Show balance"}
                >
                  {view_balance ? (
                    <FaRegEyeSlash color="#fff" size={22} />
                  ) : (
                    <MdOutlineRemoveRedEye color="#fff" size={22} />
                  )}
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
              <button className="bg-white hover:bg-blue-100 transition px-6 py-2 rounded-full flex items-center gap-2 shadow-sm font-medium">
                <GoArrowDownLeft className="text-blue-600" />
                <span className="text-blue-700">Request Money</span>
              </button>
              <button className="bg-white hover:bg-blue-100 transition px-6 py-2 rounded-full flex items-center gap-2 shadow-sm font-medium">
                <MdArrowOutward className="text-blue-600" />
                <span className="text-blue-700">Send Money</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Categories & Charts */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-white p-6 rounded-xl shadow-md -mt-12 relative z-10">
          <Categories />
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md mt-10">
          <FirstChart />
        </div>

        <div className="mt-10">
          <DashboardCharts />
        </div>
      </div>
    </div>
  );
}
