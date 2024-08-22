import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InputChangeEvent, FormSubmitEvent } from "@/types";
import { changePassword } from "@/services/api/caretaker";

interface PasswordChangeFormProps {
  email: string;
  onCancel: () => void;
}

const PasswordChangeForm: React.FC<PasswordChangeFormProps> = ({
  email,
  onCancel,
}) => {
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const handlePasswordChange = async (e: FormSubmitEvent) => {
    e.preventDefault();
    const response = await changePassword(email, currentPassword, newPassword);
    if (response.success) {
      toast.success("Password Changed Successfully");
    }

    setNewPassword("");
    setConfirmPassword("");
    setCurrentPassword("");
    onCancel();
  };

  return (
    <Card className="mt-8 max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <PasswordInput
            id="currentPassword"
            label="Current Password"
            value={currentPassword}
            onChange={(e: InputChangeEvent) =>
              setCurrentPassword(e.target.value)
            }
            showPassword={showCurrentPassword}
            toggleShowPassword={() =>
              setShowCurrentPassword(!showCurrentPassword)
            }
          />
          <PasswordInput
            id="newPassword"
            label="New Password"
            value={newPassword}
            onChange={(e: InputChangeEvent) => setNewPassword(e.target.value)}
            showPassword={showNewPassword}
            toggleShowPassword={() => setShowNewPassword(!showNewPassword)}
          />
          <PasswordInput
            id="confirmPassword"
            label="Confirm Password"
            value={confirmPassword}
            onChange={(e: InputChangeEvent) =>
              setConfirmPassword(e.target.value)
            }
            showPassword={showConfirmPassword}
            toggleShowPassword={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
          />
          <div className="flex space-x-4">
            <Button type="submit">Change Password</Button>
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

interface PasswordInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: InputChangeEvent) => void;
  showPassword: boolean;
  toggleShowPassword: () => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  id,
  label,
  value,
  onChange,
  showPassword,
  toggleShowPassword,
}) => (
  <div className="space-y-2">
    <Label htmlFor={id}>{label}</Label>
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        id={id}
        value={value}
        onChange={onChange}
        required
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute inset-y-0 right-0"
        onClick={toggleShowPassword}
      >
        {showPassword ? (
          <EyeOff className="h-4 w-4" />
        ) : (
          <Eye className="h-4 w-4" />
        )}
      </Button>
    </div>
  </div>
);

export default PasswordChangeForm;
