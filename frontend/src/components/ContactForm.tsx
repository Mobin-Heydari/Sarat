"use client";

import React, { useState } from "react";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
import { FileUpload } from "./ui/FileUpload";
import { cn } from "@/lib/utils";
import { Textarea } from "./ui/Textarea";



// Helper function to fetch the public IP address
async function getPublicIP() {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error("Error fetching IP address:", error);
    return "";
  }
}

export function ContactForm() {
  // State to track file attachments (for submission data)
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  // State for submission status
  const [buttonMessage, setButtonMessage] = useState("ارسال");
  const [isSubmitting, setIsSubmitting] = useState(false);
  // State for field-specific errors
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  // A state variable to force re-mount of FileUpload (thus clearing its internal state)
  const [fileUploadKey, setFileUploadKey] = useState<number>(0);

  // When files are dropped or selected in FileUpload, update state
  const handleFileChange = (files: File[]) => {
    setAttachedFiles(files);
  };

  // Handle form submission with local validation
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setButtonMessage("درحال ارسال......");
    setFieldErrors({}); // clear previous errors if any

    const form = e.currentTarget;
    const formData = new FormData();

    // Client-side validation for required fields
    let errors: { [key: string]: string } = {};
    if (!form.f_name.value.trim()) {
      errors.f_name = "First name is required.";
    }
    if (!form.l_name.value.trim()) {
      errors.l_name = "Last name is required.";
    }
    if (!form.email.value.trim()) {
      errors.email = "Email is required.";
    }
    if (!form.title.value.trim()) {
      errors.title = "Title is required.";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setIsSubmitting(false);
      setButtonMessage("ارسال");
      return;
    }

    // Append fields to FormData
    formData.append("f_name", form.f_name.value);
    formData.append("l_name", form.l_name.value);
    formData.append("email", form.email.value);
    formData.append("phone", form.phone.value);
    formData.append("title", form.title.value);
    formData.append("content", form.content.value);

    // Append additional contextual information
    formData.append("user_agent", navigator.userAgent);
    const ip_address = await getPublicIP();
    formData.append("ip_address", ip_address);

    // Append the file(s) if any
    attachedFiles.forEach((file) => {
      formData.append("attachment", file);
    });

    try {
      const response = await fetch("http://127.0.0.1:8000/contacts/create/", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setButtonMessage("پیام ارسال شد !");
        form.reset();

        // Clear file selections and force FileUpload re-mount
        setAttachedFiles([]);
        setFileUploadKey((prev) => prev + 1);

        setFieldErrors({});
        setTimeout(() => {
          setButtonMessage("ارسال");
          setIsSubmitting(false);
        }, 3000);
      } else {
        // Parse field-specific error messages from API response (if provided)
        const errorData = await response.json();
        setFieldErrors(errorData);
        setButtonMessage("ارسال");
        setIsSubmitting(false);
      }
    } catch (error) {
      setButtonMessage("مشکلی به وجود آمد");
      setIsSubmitting(false);
      setTimeout(() => {
        setButtonMessage("ارسال");
      }, 4000);
    }
  };

  return (
    <section className="shadow-input mx-auto mb-20 w-full max-w-lg border border-primary-light dark:border-primary-dark rounded-xl p-4 md:rounded-2xl md:p-8 bg-base-light/[0.5] dark:bg-base-dark/[0.5]">
      <h2 className="text-xl font-bold text-main-text-light dark:text-main-text-dark text-center mb-4">فرم تماس با ما</h2>
      <p className="mt-2 max-w-sm text-sm text-main-text-light dark:text-main-text-dark mb-4">
        شما می توانید با پر کردن فرم تماس با ما درخواست ها و نظرات خود را با ما به اشتراک بگذارید.
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        {/* First Name & Last Name */}
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <Label htmlFor="f_name">نام</Label>
            <Input id="f_name" name="f_name" placeholder="مبین" type="text" />
            {fieldErrors.f_name && (
              <p className="text-red-500 text-xs mt-1">{fieldErrors.f_name}</p>
            )}
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="l_name">نام خانوادگی</Label>
            <Input id="l_name" name="l_name" placeholder="حیدری" type="text" />
            {fieldErrors.l_name && (
              <p className="text-red-500 text-xs mt-1">{fieldErrors.l_name}</p>
            )}
          </LabelInputContainer>
        </div>
        {/* Email */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">آدرس ایمیل</Label>
          <Input id="email" name="email" placeholder="mobinheydari.developer@gmail.com" type="email" />
          {fieldErrors.email && (
            <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>
          )}
        </LabelInputContainer>
        {/* Phone */}
        <LabelInputContainer className="mb-4">
          <Label htmlFor="phone">شماره تلفن</Label>
          <Input id="phone" name="phone" placeholder="0910-207-2859" type="tel" />
        </LabelInputContainer>
        {/* Title */}
        <LabelInputContainer className="mb-8">
          <Label htmlFor="title">عنوان</Label>
          <Input id="title" name="title" placeholder="عنوان" type="textarea" />
          {fieldErrors.title && (
            <p className="text-red-500 text-xs mt-1">{fieldErrors.title}</p>
          )}
        </LabelInputContainer>
        {/* Content */}
        <LabelInputContainer className="mb-8">
          <Label htmlFor="content">پیام</Label>
          <Textarea id="content" name="content" placeholder="پیام شما ...." />
        </LabelInputContainer>
        {/* File Upload */}
        <FileUpload key={fileUploadKey} onChange={handleFileChange} />
        {/* Submit Button */}
        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br font-bold text-main-text-light dark:text-main-text-dark shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] bg-primary-light/[0.4] dark:bg-primary-dark/[0.4] dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          type="submit"
          disabled={isSubmitting}
        >
          {buttonMessage}
          <BottomGradient />
        </button>
      </form>
    </section>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn("flex w-full flex-col space-y-2", className)}>{children}</div>;
};