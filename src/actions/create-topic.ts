"use server";

import { auth } from "@/auth";
import { db } from "@/db";
import { Topic } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import paths from "@/path";
import { redirect } from "next/navigation";
const createTopicScheme = z.object({
  name: z
    .string()
    .min(3)
    .regex(/[a-z-]/, {
      message: "Must be lowercase letters or dashes without spaces",
    }),
  description: z.string().min(10),
});

interface CreateTopicFromState {
  errors: {
    name?: string[];
    description?: string[];
    _form?: string[];
  };
}
export async function createTopic(
  formState: CreateTopicFromState,
  formData: FormData
): Promise<CreateTopicFromState> {
  const result = createTopicScheme.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
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
        _form: ["You must be SIGN IN to do this"],
      },
    };
  }
  let topic: Topic; //learn
  try {
    topic = await db.topic.create({
      data: {
        slug: result.data.name,
        description: result.data.description,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["something went wrong"],
        },
      };
    }
  }
  revalidatePath("/"); //learn
  redirect(paths.topicShow(topic.slug)); //learn
}
