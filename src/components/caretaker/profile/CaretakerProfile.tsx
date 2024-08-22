import React, { useState } from "react";
import { Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ICaretaker } from "@/types";
import PasswordChangeForm from "./ChangePasswordForm";

interface CaretakerProfileProps {
  caretaker: ICaretaker;
}

const CaretakerProfile: React.FC<CaretakerProfileProps> = ({ caretaker }) => {
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  return (
    <div className="container mx-auto p-8">
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <Avatar className="h-32 w-32">
              <AvatarImage src={caretaker.imageUrl} alt={caretaker.name} />
              <AvatarFallback>{caretaker.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-4">{caretaker.name}</h1>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5" />
                  <span>{caretaker.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5" />
                  <span>{caretaker.mobileNumber}</span>
                </div>
              </div>
              <Button
                className="mt-6"
                onClick={() => setShowPasswordForm(!showPasswordForm)}
              >
                Change Password
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {showPasswordForm && (
        <PasswordChangeForm
          email={caretaker.email}
          onCancel={() => setShowPasswordForm(false)}
        />
      )}
    </div>
  );
};

export default CaretakerProfile;
