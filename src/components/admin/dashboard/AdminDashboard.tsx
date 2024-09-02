import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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

const AdminDashboard: React.FC = () => {
  // Dummy data for the dashboard
  const stats = [
    { title: "Total Users", value: 1234, icon: Users, color: "text-blue-600" },
    {
      title: "Active Services",
      value: 56,
      icon: Briefcase,
      color: "text-green-600",
    },
    {
      title: "Pending Complaints",
      value: 23,
      icon: MessageSquare,
      color: "text-yellow-600",
    },
    {
      title: "Active Workers",
      value: 89,
      icon: UserCheck,
      color: "text-purple-600",
    },
  ];

  const recentComplaints = [
    { id: 1, user: "John Doe", service: "Plumbing", status: "Pending" },
    { id: 2, user: "Jane Smith", service: "Electricity", status: "Resolved" },
    { id: 3, user: "Bob Johnson", service: "Cleaning", status: "In Progress" },
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
            <CardTitle>Recent Complaints</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentComplaints.map((complaint) => (
                <div
                  key={complaint.id}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium">{complaint.user}</p>
                    <p className="text-sm text-muted-foreground">
                      {complaint.service}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className={
                      complaint.status === "Resolved"
                        ? "bg-green-100 text-green-800"
                        : complaint.status === "In Progress"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }
                  >
                    {complaint.status}
                  </Button>
                </div>
              ))}
            </div>
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
