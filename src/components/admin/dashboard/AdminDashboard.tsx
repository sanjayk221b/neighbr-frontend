import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Users, Briefcase, MessageSquare, UserCheck } from "lucide-react";
import { getAdminDashboardData, getCaretakers } from "@/services/api/admin";

const AdminDashboard: React.FC = () => {
  const [residents, setResidents] = useState<number>();
  const [workers, setWorkers] = useState<number>();
  const [caretakers, setCaretakers] = useState<number>();
  const [complaints, setComplaints] = useState<number>();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    const { data } = await getAdminDashboardData();
    const response = await getCaretakers();
    setResidents(data.residentsCount);
    setWorkers(data.workersCount);
    setComplaints(data.pendingComplaintsCount);
    setCaretakers(response.data.length);
  };

  const stats = [
    {
      title: "Total Residents",
      value: residents,
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Total Caretakers",
      value: caretakers,
      icon: Briefcase,
      color: "text-green-600",
    },
    {
      title: "Active Workers",
      value: workers,
      icon: UserCheck,
      color: "text-purple-600",
    },
    {
      title: "Pending Complaints",
      value: complaints,
      icon: MessageSquare,
      color: "text-yellow-600",
    },
  ];

  const chartData = [
    { name: "Jan", services: 65 },
    { name: "Feb", services: 59 },
    { name: "Mar", services: 80 },
    { name: "Apr", services: 81 },
    { name: "May", services: 56 },
    { name: "Jun", services: 55 },
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Services Overview</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="services" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Services Overview</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="services" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
