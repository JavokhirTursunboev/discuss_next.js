"use client";
import { createTopic } from "@/actions";
import { Button, Popover, PopoverContent, PopoverTrigger, Input, Textarea } from "@nextui-org/react";
import { useFormState } from "react-dom";

export default function TopicCreateFrom() {
  const [formState, action] = useFormState(createTopic, {
    errors: {},
  });
  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary">Create a Topic</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action}>
          <div className="flex-col flex gap-4 p-4 w-80">
            <h3>Create a Topic</h3>
            <Input
              name="name"
              label="Name"
              labelPlacement="outside"
              placeholder="Name"
              isInvalid={!!formState.errors.name}
              errorMessage={formState.errors.name?.join(", ")}
            />
            <Textarea
              name="description"
              label="Description"
              placeholder="Describe you topic"
              labelPlacement="outside"
              isInvalid={!!formState.errors.description}
              errorMessage={formState.errors.description?.join(", ")}
            />
            {formState.errors._form ? (
              <div className="p-2 bg-red-200 text-black  border rounded-[10px] border-red-400 text-center">
                {formState.errors._form?.join(", ")}
              </div>
            ) : (
              <Button type="submit">Submit</Button>
            )}
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
