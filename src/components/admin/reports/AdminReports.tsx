import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ChevronDown, ChevronUp, MoreHorizontal } from "lucide-react";
import { getReports } from "@/services/api/community";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

interface IReport {
  _id: string;
  postId: string;
  reporterId: string;
  reason: string;
  createdAt: string;
  updatedAt: string;
}

const AdminReports: React.FC = () => {
  const navigate = useNavigate();

  const [reports, setReports] = useState<IReport[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [selectedPostReports, setSelectedPostReports] = useState<
    IReport[] | null
  >(null);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchReports();
  }, [page]);

  const fetchReports = async () => {
    const res = await getReports(page, limit);
    setReports(res.data);
  };

  const filteredReports = reports.filter(
    (report) =>
      report.postId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reason.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedReports = filteredReports.reduce((acc, report) => {
    if (!acc[report.postId]) {
      acc[report.postId] = [];
    }
    acc[report.postId].push(report);
    return acc;
  }, {} as Record<string, IReport[]>);

  const toggleRowExpansion = (postId: string) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const handleViewDetails = (reports: IReport[]) => {
    setSelectedPostReports(reports);
  };

  const closeDetailsModal = () => {
    setSelectedPostReports(null);
  };

  const handleDropdownAction = (action: string, reports: IReport[]) => {
    switch (action) {
      case "viewDetails":
        handleViewDetails(reports);
        break;
      case "viewPost":
        navigate(`/admin/community/posts/${reports[0].postId}/details`);
        break;
      default:
        break;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Reports</h1>
        <div className="flex items-center space-x-2">
          <Search className="w-5 h-5 text-muted-foreground" />
          <Input
            placeholder="Search reports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
        </div>
      </div>

      <div className="bg-card rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Expand
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Post ID
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Report Count
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Latest Reason
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Latest Report Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-muted">
            {Object.entries(groupedReports).map(([postId, reports]) => (
              <React.Fragment key={postId}>
                <tr className="hover:bg-muted/50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleRowExpansion(postId)}
                    >
                      {expandedRows.has(postId) ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">{postId}</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {reports.length}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {reports[reports.length - 1].reason}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {new Date(
                      reports[reports.length - 1].createdAt
                    ).toLocaleString()}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem
                          onClick={() =>
                            handleDropdownAction("viewDetails", reports)
                          }
                        >
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            handleDropdownAction("viewPost", reports)
                          }
                        >
                          View Post
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
                {expandedRows.has(postId) && (
                  <tr>
                    <td colSpan={6}>
                      <div className="px-4 py-2 bg-muted/30">
                        <h4 className="font-semibold mb-2">All Reports:</h4>
                        <ul className="list-disc pl-5">
                          {reports.map((report) => (
                            <li key={report._id} className="mb-1">
                              {report.reason} -{" "}
                              {new Date(report.createdAt).toLocaleString()}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between">
        <Button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </Button>
        <Button onClick={() => setPage((prev) => prev + 1)}>Next</Button>
      </div>

      <Dialog open={!!selectedPostReports} onOpenChange={closeDetailsModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Detailed Report View</DialogTitle>
          </DialogHeader>
          {selectedPostReports && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">
                Post ID: {selectedPostReports[0].postId}
              </h3>
              <ul className="space-y-2">
                {selectedPostReports.map((report) => (
                  <li key={report._id} className="border-b pb-2">
                    <p>
                      <strong>Reason:</strong> {report.reason}
                    </p>
                    <p>
                      <strong>Reporter ID:</strong> {report.reporterId}
                    </p>
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(report.createdAt).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <DialogFooter>
            <Button onClick={closeDetailsModal}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminReports;
