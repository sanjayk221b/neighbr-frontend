import { useState, useCallback, useEffect } from "react";
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
import { InputChangeEvent, IResident } from "@/types";

interface PostOptionsProps {
  postId: string;
  onDelete: (postId: string) => void;
  currentUser: IResident;
  author: IResident;
}

const PostOptions: React.FC<PostOptionsProps> = ({
  postId,
  onDelete,
  currentUser,
  author,
}) => {
  const [reportReason, setReportReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [canDelete, setCanDelete] = useState(false);

  useEffect(() => {
    setCanDelete(currentUser._id === author._id || currentUser.isAdmin);
  }, [currentUser, author]);

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

    try {
      const res = await reportPost(postId, finalReason);
      if (res.success) {
        toast.success("Post reported successfully");
        setIsOpen(false);
      }
    } catch (error) {
      toast.error("Failed to report the post");
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
      if (canDelete) {
        onDelete(postId);
        setIsOpen(false);
      } else {
        toast.error("You do not have permission to delete this post");
      }
    },
    [onDelete, postId, canDelete]
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
        {canDelete && (
          <DropdownMenuItem onSelect={handleDeleteClick}>
            Delete
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PostOptions;
