import React, { useState, useEffect } from "react";
import { createAnnouncement, getAnnouncements } from "@/services/api/admin";
import { IAnnouncement } from "@/types/announcement";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AdminAnnouncements: React.FC = () => {
  const [announcements, setAnnouncements] = useState<IAnnouncement[]>([]);
  const [newAnnouncement, setNewAnnouncement] = useState<
    Omit<IAnnouncement, "_id" | "createdAt" | "updatedAt" | "readBy">
  >({
    title: "",
    content: "",
    date: new Date().toISOString().split("T")[0],
    type: "News",
    status: "Active",
  });

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    const res = await getAnnouncements();
    setAnnouncements(res.data);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setNewAnnouncement((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setNewAnnouncement((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createAnnouncement(newAnnouncement);
    setNewAnnouncement({
      title: "",
      content: "",
      date: new Date().toISOString().split("T")[0],
      type: "News",
      status: "Active",
    });
    fetchAnnouncements();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Announcements</h1>

      <Card>
        <CardHeader>
          <CardTitle>Add New Announcement</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              name="title"
              value={newAnnouncement.title}
              onChange={handleInputChange}
              placeholder="Title"
              required
            />
            <Textarea
              name="content"
              value={newAnnouncement.content}
              onChange={handleInputChange}
              placeholder="Content"
              required
            />
            <Input
              type="date"
              name="date"
              value={newAnnouncement.date}
              onChange={handleInputChange}
              required
            />
            <Select
              name="type"
              value={newAnnouncement.type}
              onValueChange={handleSelectChange("type")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Event">Event</SelectItem>
                <SelectItem value="News">News</SelectItem>
                <SelectItem value="Update">Update</SelectItem>
              </SelectContent>
            </Select>
            <Select
              name="status"
              value={newAnnouncement.status}
              onValueChange={handleSelectChange("status")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Archived">Archived</SelectItem>
              </SelectContent>
            </Select>
            <Button type="submit">Add Announcement</Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Existing Announcements</h2>
        {announcements.map((announcement) => (
          <Card key={announcement._id}>
            <CardHeader>
              <CardTitle>{announcement.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{announcement.content}</p>
              <p className="text-sm text-muted-foreground">
                Date: {new Date(announcement.date).toLocaleDateString()}
              </p>
              <p className="text-sm text-muted-foreground">
                Type: {announcement.type}
              </p>
              <p className="text-sm text-muted-foreground">
                Status: {announcement.status}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminAnnouncements;
