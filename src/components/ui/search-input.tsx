import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch: (value: string) => void;
  debounceTime?: number;
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, onSearch, debounceTime = 300, ...props }, ref) => {
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
      const handler = setTimeout(() => {
        onSearch(inputValue);
      }, debounceTime);

      return () => {
        clearTimeout(handler);
      };
    }, [inputValue, debounceTime, onSearch]);

    return (
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);

SearchInput.displayName = "SearchInput";

export { SearchInput };
