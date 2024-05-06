"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation"; 
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import toast from "react-hot-toast";

const FormSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required",
    }),
});

const CreatePage = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: ""
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof FormSchema>) => {
        try {
            const response = await axios.post("/api/courses", values);
            router.push(`/teacher/courses/${response.data.id}`);
            toast.success("Курс створено")
        } catch {
            toast.error("Щось пішло не так");
        }
    }

    return (
        <div className="ma-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
            <div>
                <h1 className="text-2xl">
                    Введіть назву нового курсу
                </h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8 mt-8">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>
                                        Назва курсу
                                    </FormLabel>
                                    <FormControl>
                                        <Input 
                                            disabled={isSubmitting}
                                            placeholder="Назва Вашого курсу"
                                            {...field}/>
                                    </FormControl>
                                   
                                    <FormMessage/>
                                </FormItem>
                            )}/>
                            <div className="flex items-center gap-x-2">
                                <Link href="/">
                                    <Button type="button">Скасувати</Button>
                                </Link>
                                <Button
                                    type="submit"
                                    disabled={!isValid || isSubmitting}
                                >
                                    Продовжити
                                </Button>
                            </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default CreatePage;