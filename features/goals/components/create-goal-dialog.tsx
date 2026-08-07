"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { createGoalSchema, CreateGoalInput } from "../schema";

interface CreateGoalDialogProps {
  onSubmit: (values: CreateGoalInput) => Promise<void>;
}

export function CreateGoalDialog({ onSubmit }: CreateGoalDialogProps) {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CreateGoalInput>({
    resolver: zodResolver(createGoalSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "PROGRAMMING",
    },
  });

  async function submit(values: CreateGoalInput) {
    await onSubmit(values);
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
  render={
    <Button>
      Create Goal
    </Button>
  }
/>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Goal</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(submit)} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>

            <Input
              id="title"
              placeholder="Learn Machine Learning"
              {...register("title")}
            />

            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>

            <Textarea
              id="description"
              placeholder="Describe your goal..."
              {...register("description")}
            />
          </div>

          <div className="space-y-2">
            <Label>Category</Label>

            <Select
              defaultValue="PROGRAMMING"
              onValueChange={(value) =>
                setValue("category", value as CreateGoalInput["category"])
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="PROGRAMMING">Programming</SelectItem>

                <SelectItem value="AI_ML">AI / ML</SelectItem>

                <SelectItem value="JEE">JEE</SelectItem>

                <SelectItem value="NEET">NEET</SelectItem>

                <SelectItem value="UPSC">UPSC</SelectItem>

                <SelectItem value="SCHOOL">School</SelectItem>

                <SelectItem value="CUSTOM">Custom</SelectItem>
              </SelectContent>
            </Select>

            {errors.category && (
              <p className="text-sm text-red-500">{errors.category.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Goal"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
