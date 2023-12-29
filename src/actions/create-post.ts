"use server";
import type { Post } from "@prisma/client";
// what is prisma client it is kind of an
// auto generate database client that is tailored to you database scheme
import { revalidatePath } from "next/cache";
// a function that allows you to purge (clean ) cached data
// for secific path or demand (talab qilingan)
import { redirect } from "next/navigation";
// a function that it redirect user to anther URL,
//redirect can be 'server component'

import { z } from "zod";
// it allow to type check tha data that is being passed between frontend and backand\
//
import { auth } from "@/auth";
// a set of a open-source  package that provide authentication for modern appication
import { db } from "@/db";
import path from "path";

const createPostScheme = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
});
interface CreatePostProps {
  errors: {
    title?: string[];
    content?: string[];
    _form?: string[];
  };
}

export async function createPost(slug:string,
    formState: CreatePostProps,
     formData: FormData): Promise<CreatePostProps> {
  const result = createPostScheme.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }
  const session = await auth();
  if (!session || !session.user) {
    return {
      errors: {
        _form: ["You must be sign in to do this"],
      },
    };
  }
  const topic = await db.topic.findFirst({
    where: {slug}
  })
  
  if(!topic){
    return{
        errors: {
            _form:['Can not find topic']
        }
    }
  }
  return {
    errors: {},
  };
}
