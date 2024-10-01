import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench, DoorOpen, AlertCircle } from "lucide-react";
import { getCaretakerDashboardData } from "@/services/api/caretaker";

const CaretakerDashboard: React.FC = () => {
  const [complaints, setComplaints] = useState<number>();
  const [services, setServices] = useState<number>();
  const [visitors, setVisitors] = useState<number>();

  useEffect(() => {
    fetchCaretakerDashboardData();
  }, []);

  const fetchCaretakerDashboardData = async () => {
    const { data } = await getCaretakerDashboardData();
    setComplaints(data.pendingComplaintsCount);
    setServices(data.pendingServiceRequestsCount);
    setVisitors(data.pendingVisitorRequestsCount);
  };

  const stats = [
    {
      title: "Visitor Requests",
      value: visitors,
      icon: DoorOpen,
      color: "text-yellow-600",
    },
    {
      title: "Service Requests",
      value: services,
      icon: Wrench,
      color: "text-blue-600",
    },
    {
      title: "Pending Complaints",
      value: complaints,
      icon: AlertCircle,
      color: "text-red-600",
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CaretakerDashboard;
