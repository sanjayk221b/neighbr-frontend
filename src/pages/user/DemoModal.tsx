import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface DemoModalProps {
  isDemoModalOpen: boolean;
  setIsDemoModalOpen: (isOpen: boolean) => void;
}

const DemoModal = ({ isDemoModalOpen, setIsDemoModalOpen }: DemoModalProps) => {
  return (
    <Dialog open={isDemoModalOpen} onOpenChange={setIsDemoModalOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-blue-600">
            Experience Neighbr
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Step into different roles and explore our comprehensive community
            management system.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {[{ title: "Resident Demo", color: "blue", href: "/resident" }].map(
            (demo) => (
              <motion.div
                key={demo.title}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  onClick={() => (window.location.href = demo.href)}
                  className={`w-full bg-${demo.color}-600 hover:bg-${demo.color}-700 text-white font-semibold py-3 flex items-center justify-between`}
                >
                  <span>{demo.title}</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </motion.div>
            )
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DemoModal;
