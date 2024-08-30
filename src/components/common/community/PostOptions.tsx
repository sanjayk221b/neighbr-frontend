import { useState, useCallback } from "react";
import { reportPost } from "@/services/api/community";
import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { toast } from "react-toastify";
import { Input } from "@/components/ui/input";
import { InputChangeEvent } from "@/types";

interface PostOptionsProps {
  postId: string;
  onDelete: (postId: string) => void;
}

const PostOptions: React.FC<PostOptionsProps> = ({ postId, onDelete }) => {
  const [reportReason, setReportReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const reportReasons = [
    "Inappropriate content",
    "Spam",
    "Harassment",
    "Misinformation",
    "Custom",
  ];

  const handleReport = async () => {
    const finalReason = reportReason === "Custom" ? customReason : reportReason;
    if (!finalReason) {
      toast.error("Please select or enter a reason for reporting");
      return;
    }

    const res = await reportPost(postId, finalReason);
    if (res.success) {
      toast.success("Post reported successfully");
      setIsOpen(false);
    }
  };

  const handleReasonChange = useCallback((value: string) => {
    setReportReason(value);
  }, []);

  const handleCustomReasonChange = useCallback((e: InputChangeEvent) => {
    e.stopPropagation();
    setCustomReason(e.target.value);
  }, []);

  const handleDeleteClick = useCallback(
    (e: Event) => {
      e.preventDefault();
      onDelete(postId);
      setIsOpen(false);
    },
    [onDelete, postId]
  );

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Report</DropdownMenuSubTrigger>
          <DropdownMenuSubContent className="ml-2">
            <DropdownMenuRadioGroup
              value={reportReason}
              onValueChange={handleReasonChange}
            >
              {reportReasons.map((reason) => (
                <DropdownMenuRadioItem
                  key={reason}
                  value={reason}
                  onSelect={(e) => e.preventDefault()}
                >
                  {reason}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
            {reportReason === "Custom" && (
              <div onClick={(e) => e.stopPropagation()}>
                <Input
                  placeholder="Enter custom reason"
                  value={customReason}
                  onChange={handleCustomReasonChange}
                  className="mt-2"
                />
              </div>
            )}
            <Button onClick={handleReport} className="mt-2 w-full">
              Submit Report
            </Button>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuItem onSelect={handleDeleteClick}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PostOptions;
