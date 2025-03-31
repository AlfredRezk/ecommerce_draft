"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

import { Button } from "./ui/button";

interface formInputProps {
  form: any;
  label: string;
  placeholder?: string;
  type?: "text"|"password"|"email"|"number"
  name: string;
  disabled?: boolean;
  className?: string;
}

export default function InputField({
  form,
  label,
  type = "text",
  placeholder,
  name,
  disabled,

}: formInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="relative">
          <FormLabel>{label}</FormLabel>
          <FormControl>
          

            <Input
            placeholder={placeholder}
            {...field}
       
            type={
              type === "password"
                ? showPassword
                  ? "text"
                  : "password"
                : type
            }
            disabled={disabled}
          />

     
          </FormControl>
          {type === "password" && showPassword && (
            <Button
              size="sm"
              className="rounded-full bg-transparent text-foreground-muted hover:bg-transparent flex justify-center items-center absolute top-7 right-2"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <EyeOff size={20} />
            </Button>
          )}
          {type === "password" && !showPassword && (
            <Button
              size="sm"
              className="rounded-full bg-transparent text-foreground-muted hover:bg-transparent flex justify-center items-center absolute top-7 right-2"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <Eye size={20} />
            </Button>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
