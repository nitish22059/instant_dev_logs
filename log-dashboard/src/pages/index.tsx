"use client";
import { useState } from "react";
import { fetchLogs } from "../lib/api";
import { Log, LogFilters } from "../types/log";
import FilterForm from "../components/FilterForm";
import LogTable from "../components/LogTable";

export default function Home() {
  const [logs, setLogs] = useState<Log[]>([]);

  const handleSearch = async (filters: LogFilters) => {
    const data = await fetchLogs(filters);
    setLogs(data.logs || []);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">📊 Instant Dev Logs Dashboard</h1>
      <FilterForm onSearch={handleSearch} />
      <LogTable logs={logs} />
    </div>
  );
}
