"use client";

import React, { useState, useMemo } from "react";
import { Card, Avatar, Badge, Tooltip, Input, Select, Skeleton } from "antd";
import Link from "next/link";
import {
  PhoneOutlined,
  EnvironmentOutlined,
  UserOutlined,
  SearchOutlined,
  ContactsOutlined,
} from "@ant-design/icons";

// ✅ আসল কর্মীদের ডেটা
const realWorkers = [
  {
    id: "worker-1",
    name: "রহিম উদ্দিন",
    mobile: "01710000001",
    address: "ইটভাটা",
    reference: "সালাম মাস্টারের ছোট ভাই",
  },
  {
    id: "worker-2",
    name: "শাহিনা বেগম",
    mobile: "01810000002",
    address: "বাজারপাড়া",
    reference: "কবির আলীর স্ত্রী",
  },
  {
    id: "worker-3",
    name: "করিম শেখ",
    mobile: "01910000003",
    address: "ইটভাটা",
    reference: "মসজিদের পাশের বাড়ি",
  },
  {
    id: "worker-4",
    name: "সুলতানা আক্তার",
    mobile: "01610000004",
    address: "বাজারপাড়া",
    reference: "রহিমের মেয়ে",
  },
  {
    id: "worker-5",
    name: "আব্দুল মতিন",
    mobile: "01510000005",
    address: "ইটভাটা",
    reference: "স্কুলের সামনের দোকানদার",
  },
  {
    id: "worker-6",
    name: "রোজিনা খাতুন",
    mobile: "01710000006",
    address: "বাজারপাড়া",
    reference: "জামাল ভাইয়ের বোন",
  },
  {
    id: "worker-7",
    name: "নুরুল ইসলাম",
    mobile: "01810000007",
    address: "ইটভাটা",
    reference: "মাদ্রাসার পাশের বাড়ি",
  },
  {
    id: "worker-8",
    name: "মেহজাবিন আক্তার",
    mobile: "01910000008",
    address: "বাজারপাড়া",
    reference: "হাসানের মেয়ে",
  },
  {
    id: "worker-9",
    name: "হাসান আলী",
    mobile: "01610000009",
    address: "ইটভাটা",
    reference: "পুরানো মার্কেটের দোকানদার",
  },
  {
    id: "worker-10",
    name: "তাসনিম জাহান",
    mobile: "01510000010",
    address: "বাজারপাড়া",
    reference: "ডাক্তার সাহেবের মেয়ে",
  },
  {
    id: "worker-11",
    name: "জাকির হোসেন",
    mobile: "01710000011",
    address: "ইটভাটা",
    reference: "কলেজের টিচার",
  },
  {
    id: "worker-12",
    name: "মারজিয়া খাতুন",
    mobile: "01810000012",
    address: "বাজারপাড়া",
    reference: "আনোয়ারের বোন",
  },
  {
    id: "worker-13",
    name: "ফরিদা ইয়াসমিন",
    mobile: "01910000013",
    address: "ইটভাটা",
    reference: "বড় মসজিদের ইমামের স্ত্রী",
  },
  {
    id: "worker-14",
    name: "মোবারক হোসেন",
    mobile: "01610000014",
    address: "বাজারপাড়া",
    reference: "পুরানো বাজারের চায়ের দোকানদার",
  },
  {
    id: "worker-15",
    name: "রাবেয়া সুলতানা",
    mobile: "01510000015",
    address: "ইটভাটা",
    reference: "কামালের মা",
  },
  {
    id: "worker-16",
    name: "কামাল উদ্দিন",
    mobile: "01710000016",
    address: "বাজারপাড়া",
    reference: "নতুন মার্কেটের কাপড়ের দোকানদার",
  },
  {
    id: "worker-17",
    name: "লাইলী বেগম",
    mobile: "01810000017",
    address: "ইটভাটা",
    reference: "সাইফুলের স্ত্রী",
  },
  {
    id: "worker-18",
    name: "ইমরান হোসেন",
    mobile: "01910000018",
    address: "বাজারপাড়া",
    reference: "রহমান চাচার ছেলে",
  },
  {
    id: "worker-19",
    name: "আসমা খাতুন",
    mobile: "01610000019",
    address: "ইটভাটা",
    reference: "হাসপাতালের নার্স",
  },
  {
    id: "worker-20",
    name: "মাসুদ রানা",
    mobile: "01510000020",
    address: "বাজারপাড়া",
    reference: "জামিল ভাইয়ের পাশের বাড়ি",
  },
];

export default function WorkerList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Get unique locations
  const locations = [...new Set(realWorkers.map((worker) => worker.address))];

  // Calculate workers by location
  const workersByLocation = realWorkers.reduce((acc, worker) => {
    acc[worker.address] = (acc[worker.address] || 0) + 1;
    return acc;
  }, {} as { [key: string]: number });

  // Filter workers based on search and location
  const filteredWorkers = useMemo(() => {
    return realWorkers.filter((worker) => {
      const matchesSearch =
        worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        worker.mobile.includes(searchQuery);
      const matchesLocation =
        !selectedLocation || worker.address === selectedLocation;
      return matchesSearch && matchesLocation;
    });
  }, [searchQuery, selectedLocation]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100">
      {/* Main Header */}
      <div className="bg-white border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto py-8 px-6">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">কর্মীদের তালিকা</h2>
          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            <p>মোট কর্মী: {realWorkers.length} জন</p>
            {Object.entries(workersByLocation).map(([location, count]) => (
              <p key={location}>
                {location}: {count} জন
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Search and Filter */}
      <div className="sticky top-0 z-10 backdrop-blur-md bg-white/60 shadow-sm border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto py-4 px-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              placeholder="নাম বা মোবাইল নম্বর দিয়ে খুঁজুন"
              prefix={<SearchOutlined className="text-gray-400" />}
              className="flex-grow max-w-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Select
              placeholder="এলাকা বাছাই করুন"
              allowClear
              value={selectedLocation}
              onChange={setSelectedLocation}
              className="min-w-[200px]"
              options={locations.map((loc) => ({ label: loc, value: loc }))}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {filteredWorkers.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 text-lg">কোন কর্মী পাওয়া যায়নি</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
            {filteredWorkers.map((worker) => (
              <Link
                key={worker.id}
                href={`/${worker.id}`}
                className="block group"
              >
                <Card
                  hoverable
                  className="w-full transition-all duration-300 hover:shadow-lg border-l-4 border-l-blue-500 group-hover:-translate-y-1"
                >
                  {isLoading ? (
                    <Skeleton avatar active paragraph={{ rows: 2 }} />
                  ) : (
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-4">
                        <Avatar
                          size={56}
                          icon={<UserOutlined />}
                          className="bg-gradient-to-r from-blue-500 to-blue-600 flex-shrink-0 transition-transform group-hover:scale-110"
                        />
                        <div className="flex-grow">
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <div className="flex items-center gap-2">
                              <h3 className="text-lg font-semibold text-gray-800 break-words">
                                {worker.name}
                              </h3>
                            </div>                              <Badge
                                count="Active"
                                className="scale-90"
                                style={{
                                  backgroundColor: "#10B981",
                                  fontWeight: 500,
                                }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1.5 border-t pt-3">
                        <Tooltip title="মোবাইল নম্বর">
                          <div className="flex items-center text-gray-600 gap-2 group-hover:text-blue-600">
                            <PhoneOutlined className="text-blue-500 flex-shrink-0" />
                            <span>{worker.mobile}</span>
                          </div>
                        </Tooltip>

                        <Tooltip title="ঠিকানা">
                          <div className="flex items-center text-gray-600 gap-2 group-hover:text-blue-600">
                            <EnvironmentOutlined className="text-blue-500 flex-shrink-0" />
                            <span>{worker.address}</span>
                          </div>
                        </Tooltip>
                        <Tooltip title="রেফারেন্স">
                          <div className="flex items-center text-gray-600 gap-2 group-hover:text-blue-600">
                            <ContactsOutlined className="text-blue-500 flex-shrink-0" />
                            <span>{worker.reference}</span>
                          </div>
                        </Tooltip>
                      </div>
                    </div>
                  )}
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
