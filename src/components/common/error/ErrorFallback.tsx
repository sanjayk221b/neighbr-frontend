import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ErrorFallbackProps {
  error?: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  resetErrorBoundary,
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-center mb-4">
            <AlertCircle className="h-12 w-12 text-destructive" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            Oops! Something went wrong
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center mb-4">
            We're sorry, but it seems there was an error. Please try again or
            contact support if the problem persists.
          </p>
          {error && (
            <div className="bg-muted p-3 rounded-md">
              <p className="text-sm text-muted-foreground">
                Error: {error.message}
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            onClick={resetErrorBoundary}
            className="w-full sm:w-auto"
            variant="default"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ErrorFallback;
