"use client";

import { useState } from "react";
import { LogFilters } from "../types/log";

interface Props {
  onSearch: (filters: LogFilters) => void;
}

export default function FilterForm({ onSearch }: Props) {
  const [filters, setFilters] = useState<LogFilters>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white dark:bg-gray-900 shadow-xl rounded-xl mb-6 border border-gray-200 dark:border-gray-700"
      aria-label="Log Filters"
    >
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <input
          name="level"
          placeholder="Level (info, error…)"
          className="border border-gray-300 dark:border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300 transition text-gray-800 dark:text-gray-100 bg-gray-50 dark:bg-gray-800"
          autoComplete="off"
          onChange={handleChange}
        />
        <input
          name="appName"
          placeholder="App Name"
          className="border border-gray-300 dark:border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300 transition text-gray-800 dark:text-gray-100 bg-gray-50 dark:bg-gray-800"
          autoComplete="off"
          onChange={handleChange}
        />
        <input
          name="search"
          placeholder="Search keyword"
          className="border border-gray-300 dark:border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300 transition text-gray-800 dark:text-gray-100 bg-gray-50 dark:bg-gray-800"
          autoComplete="off"
          onChange={handleChange}
        />
        <input
          type="datetime-local"
          name="from"
          className="border border-gray-300 dark:border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300 transition text-gray-800 dark:text-gray-100 bg-gray-50 dark:bg-gray-800"
          onChange={handleChange}
        />
        <input
          type="datetime-local"
          name="to"
          className="border border-gray-300 dark:border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300 transition text-gray-800 dark:text-gray-100 bg-gray-50 dark:bg-gray-800"
          onChange={handleChange}
        />
      </div>
      <button
        type="submit"
        className="mt-6 px-6 py-3 font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300 text-white transition"
      >
        Search
      </button>
    </form>
  );
}
