"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import ChapterIdPage from "../page";
import { db } from "@/lib/db";
import { useRouter } from "next/navigation";

interface CourseEnrollButtonProps {
  id: string;
  courseId: string;
  userId: string;
}

export const CourseEnrollButton = ({
  id,
  courseId,
  userId,
}: CourseEnrollButtonProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      
      const response = await axios.post(`/api/courses/${courseId}/purchase`)
      /*, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId: courseId,
          userId: userId,
        }),
      });*/
      
      window.location.assign(response.data.url);
      router.push(`/search`);
    } catch(error) {
      toast.error("Сталася помилка");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      size="sm"
      className="w-full md:w-auto"
    >
      Розпочати курс
    </Button>
  )
}