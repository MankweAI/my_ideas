// app/create-idea.js
"use client";

import { createIdeaAction } from "./actions"; // Import the server action

// UI components (assuming you have these from shadcn/ui)
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export function CreateIdea() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add New Idea</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a New Idea</DialogTitle>
          <DialogDescription>
            What brilliant new idea do you have? Fill in the details below.
          </DialogDescription>
        </DialogHeader>
        {/* The form's action now points to the imported server action */}
        <form action={createIdeaAction}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                name="title"
                placeholder="AI-Powered Coffee Maker"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe your idea in a few sentences."
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save Idea</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
