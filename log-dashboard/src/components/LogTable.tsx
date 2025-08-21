import React from 'react';

// Assuming a basic Log type structure.
// You should import this from your actual types file, e.g., `../types/log`.
interface Log {
  id: string | number;
  timestamp: string;
  level: 'error' | 'warn' | 'info' | 'http' | 'debug' | string;
  app_name: string;
  message: string;
  meta: object;
}

interface Props {
  logs: Log[];
}

// Helper object to map log levels to specific Tailwind CSS classes.
// This makes the component cleaner and separates styling logic from the JSX.
const levelStyles: { [key: string]: string } = {
  error: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  warn: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  info: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  http: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  debug: 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
  default: 'bg-gray-100 text-gray-600 dark:bg-gray-600 dark:text-gray-100',
};

// FIX: Added a default value `logs = []` to the props.
// This prevents the component from crashing if the `logs` prop is undefined.
export default function LogTable({ logs = [] }: Props) {

  // UX Improvement: Display a message if there are no logs to show.
  if (!logs || logs.length === 0) {
    return (
      <div className="flex items-center justify-center w-full p-10 text-center bg-white border-2 border-dashed rounded-lg shadow-sm dark:bg-gray-900 dark:border-gray-700">
        <p className="text-gray-500 dark:text-gray-400">There are no log entries to display.</p>
      </div>
    );
  }

  return (
    // Main container with a subtle background, padding, and rounded corners.
    // `relative` is needed for the sticky header to work correctly within this container.
    <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg bg-gray-50 dark:bg-gray-900 p-4">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        {/* Sticky Header: `sticky top-0` keeps the header visible when scrolling vertically. */}
        <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
          <tr>
            <th scope="col" className="px-6 py-3">
              Timestamp
            </th>
            <th scope="col" className="px-6 py-3">
              Level
            </th>
            <th scope="col" className="px-6 py-3">
              App
            </th>
            <th scope="col" className="px-6 py-3">
              Message
            </th>
            <th scope="col" className="px-6 py-3">
              Meta
            </th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            // Zebra striping (`odd:`/`even:`) for better readability.
            // A subtle hover effect with a smooth transition provides visual feedback.
            <tr
              key={log.id}
              className="border-b dark:border-gray-700 odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 ease-in-out"
            >
              {/* Timestamp Cell: Using a monospaced font for clean alignment. */}
              <td className="px-6 py-4 font-mono text-gray-600 dark:text-gray-300 whitespace-nowrap">
                {new Date(log.timestamp).toLocaleString()}
              </td>
              {/* Level Cell: Displays a styled, color-coded badge. */}
              <td className="px-6 py-4">
                <span
                  className={`inline-block px-3 py-1 text-xs font-semibold leading-5 rounded-full ${
                    levelStyles[log.level] || levelStyles.default
                  }`}
                >
                  {log.level.toUpperCase()}
                </span>
              </td>
              {/* App Name Cell: Medium font weight to make it stand out. */}
              <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                {log.app_name}
              </td>
              {/* Message Cell: Allowing word wrapping for longer messages. */}
              <td className="px-6 py-4 break-words">{log.message}</td>
              {/* Meta Cell: Displays JSON in a styled, readable code block. */}
              <td className="px-6 py-4">
                <pre className="text-xs bg-gray-100 dark:bg-gray-700 p-3 rounded-md overflow-x-auto whitespace-pre-wrap max-w-xs md:max-w-md lg:max-w-lg">
                  {/* Using JSON.stringify with spacing for "pretty printing" the metadata. */}
                  {JSON.stringify(log.meta, null, 2)}
                </pre>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
