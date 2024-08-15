import React from "react";

export const ShimmerRow: React.FC = () => (
  <tr className="animate-pulse">
    <td className="px-4 py-4 whitespace-nowrap">
      <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
    </td>
    <td className="px-4 py-4 whitespace-nowrap">
      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
    </td>
    <td className="px-4 py-4 whitespace-nowrap">
      <div className="h-4 bg-gray-300 rounded w-full"></div>
    </td>
    <td className="px-4 py-4 whitespace-nowrap">
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
    </td>
    <td className="px-4 py-4 whitespace-nowrap">
      <div className="h-4 bg-gray-300 rounded w-1/4"></div>
    </td>
    <td className="px-4 py-4 whitespace-nowrap">
      <div className="h-6 w-16 bg-gray-300 rounded-full"></div>
    </td>
    <td className="px-4 py-4 whitespace-nowrap">
      <div className="h-6 w-6 bg-gray-300 rounded-full mx-auto"></div>
    </td>
  </tr>
);

export const ShimmerTable: React.FC = () => {
  return (
    <div className="bg-card rounded-lg shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-muted">
          <tr>
            {[
              "Image",
              "Name",
              "Email",
              "Mobile Number",
              "Apartment No",
              "Status",
              "Actions",
            ].map((header) => (
              <th
                key={header}
                className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-muted">
          {[...Array(5)].map((_, index) => (
            <ShimmerRow key={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
};
