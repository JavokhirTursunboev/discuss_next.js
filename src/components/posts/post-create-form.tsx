"use client";

import { Button, Input, Popover, PopoverContent, PopoverTrigger, Textarea } from "@nextui-org/react";
import FormButton from "@/components/common/form-button";
import { useFormState } from "react-dom";
import { createPost } from "@/actions";

interface PostCreateFormProps{
  slug:string
}

export default function PostCreateForm({slug}:PostCreateFormProps ) {
  const [formState, action] = useFormState(createPost.bind(null, slug), {
    errors: {},
  });
  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary">Create a Post</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg ">Create a Post</h3>
            <Input
              name="title"
              label="Title"
              isInvalid={!!formState.errors.title}
              errorMessage={formState.errors.title?.join(", ")}
              labelPlacement="outside"
              placeholder="Title"
            />
            <Textarea
              name="content"
              label="Content"
              isInvalid={!!formState.errors.content}
              errorMessage={formState.errors.content?.join(", ")}
              labelPlacement="outside"
              placeholder="Content"
            />
            {formState.errors._form ? (
              <div className="rounded p-2 bg-red-200 border border-red-400">
                {formState.errors._form.join(", ")}
              </div>
            ) : null}
            <FormButton>Create a Post</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
 