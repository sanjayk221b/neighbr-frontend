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
import { Wrench, Home, ClipboardList, UserCheck } from "lucide-react";

const CaretakerDashboard: React.FC = () => {
  // Dummy data for the dashboard
  const stats = [
    { title: "Pending Tasks", value: 5, icon: ClipboardList, color: "text-yellow-600" },
    { title: "Properties Managed", value: 3, icon: Home, color: "text-blue-600" },
    { title: "Maintenance Requests", value: 8, icon: Wrench, color: "text-red-600" },
    { title: "Satisfied Tenants", value: 42, icon: UserCheck, color: "text-green-600" },
  ];

  const recentTasks = [
    { id: 1, description: "Fix leaky faucet in Apt 301", status: "Pending" },
    { id: 2, description: "Clean common area", status: "Completed" },
    { id: 3, description: "Inspect fire alarms", status: "In Progress" },
  ];

  const chartData = [
    { name: "Jan", tasks: 20 },
    { name: "Feb", tasks: 25 },
    { name: "Mar", tasks: 30 },
    { name: "Apr", tasks: 22 },
    { name: "May", tasks: 28 },
    { name: "Jun", tasks: 35 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Caretaker Dashboard</h1>

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
            <CardTitle>Recent Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium">{task.description}</p>
                  </div>
                  <Button
                    variant="outline"
                    className={
                      task.status === "Completed"
                        ? "bg-green-100 text-green-800"
                        : task.status === "In Progress"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }
                  >
                    {task.status}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Tasks Overview</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="tasks" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CaretakerDashboard;