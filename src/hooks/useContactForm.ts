"use client";

import { contactSchema, type ContactFormValues } from "@/lib/contactSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

type SubmitStatus = "idle" | "loading" | "success" | "error";

export function useContactForm() {
    const [status, setStatus] = useState<SubmitStatus>("idle");
    const [serverMessage, setServerMessage] = useState("");

    const form = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactFormValues) => {
        setStatus("loading");
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            const json = await res.json();
            if (res.ok) {
                setStatus("success");
                setServerMessage(json.message);
                form.reset();
            } else {
                setStatus("error");
                setServerMessage("Something went wrong. Please try again.");
            }
        } catch {
            setStatus("error");
            setServerMessage("Network error. Please try again.");
        }
    };

    return { form, status, serverMessage, onSubmit };
}
