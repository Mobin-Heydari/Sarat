'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { FileUpload } from '../ui/FileUpload';
import { cn } from '@/lib/utils';
import { Textarea } from '../ui/Textarea';
import { FaPhoneAlt } from 'react-icons/fa';

// Helper function to fetch the public IP address
async function getPublicIP() {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch {
    return '';
  }
}

export function ContactForm() {
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [buttonMessage, setButtonMessage] = useState('ارسال');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const [fileUploadKey, setFileUploadKey] = useState<number>(0);

  const handleFileChange = (files: File[]) => {
    setAttachedFiles(files);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setButtonMessage('درحال ارسال...');
    setFieldErrors({});

    const form = e.currentTarget;
    const formData = new FormData();

    let errors: { [key: string]: string } = {};
    if (!form.f_name.value.trim()) errors.f_name = 'نام لازم است.';
    if (!form.l_name.value.trim()) errors.l_name = 'نام خانوادگی لازم است.';
    if (!form.phone.value.trim()) errors.phone = 'شماره لازم است.';
    if (!form.title.value.trim()) errors.title = 'عنوان لازم است.';

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setIsSubmitting(false);
      setButtonMessage('ارسال');
      return;
    }

    formData.append('f_name', form.f_name.value);
    formData.append('l_name', form.l_name.value);
    formData.append('phone', form.phone.value);
    formData.append('title', form.title.value);
    formData.append('content', form.content.value);
    formData.append('user_agent', navigator.userAgent);

    const ip_address = await getPublicIP();
    formData.append('ip_address', ip_address);

    attachedFiles.forEach((file) => {
      formData.append('attachment', file);
    });

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_API_URL}/contacts/create/`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setButtonMessage('پیام ارسال شد 🎉');
        form.reset();
        setAttachedFiles([]);
        setFileUploadKey((prev) => prev + 1);
        setFieldErrors({});
        setTimeout(() => {
          setButtonMessage('ارسال');
          setIsSubmitting(false);
        }, 3000);
      } else {
        const errorData = await response.json();
        setFieldErrors(errorData);
        setButtonMessage('ارسال');
        setIsSubmitting(false);
      }
    } catch {
      setButtonMessage('مشکلی به وجود آمد');
      setIsSubmitting(false);
      setTimeout(() => {
        setButtonMessage('ارسال');
      }, 4000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-col justify-center gap-5 shadow-input w-full max-w-lg border border-primary-light dark:border-primary-dark rounded-xl p-4 md:rounded-2xl md:p-8 bg-base-light/[0.5] dark:bg-base-dark/[0.5]"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="flex flex-col justify-center gap-6"
      >
        <div className="flex flex-col gap-3">
          <h4 className="text-3xl font-bold text-main-text-light dark:text-main-text-dark text-center">
            اطلاعات تماس
          </h4>
          <p className="text-sm text-main-text-light dark:text-main-text-dark">
            شما می‌توانید با پر کردن فرم تماس با ما، درخواست‌ها و نظرات خود را با ما به اشتراک بگذارید.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <FaPhoneAlt className="text-3xl text-primary-light dark:text-primary-dark" />
          <div className="flex flex-col gap-1">
            <span className="text-lg font-bold text-main-text-light dark:text-main-text-dark">تلفن:</span>
            <p className="text-sm text-main-text-light/[0.7] dark:text-main-text-dark/[0.7]">0912-000-0000</p>
          </div>
        </div>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        role="form"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="my-8"
      >
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <Label htmlFor="f_name">نام</Label>
            <Input id="f_name" name="f_name" placeholder="مبین" type="text" aria-label="نام" />
            {fieldErrors.f_name && <p className="text-red-500 text-xs mt-1">{fieldErrors.f_name}</p>}
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="l_name">نام خانوادگی</Label>
            <Input id="l_name" name="l_name" placeholder="حیدری" type="text" aria-label="نام خانوادگی" />
            {fieldErrors.l_name && <p className="text-red-500 text-xs mt-1">{fieldErrors.l_name}</p>}
          </LabelInputContainer>
        </div>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="phone">شماره تلفن</Label>
          <Input id="phone" name="phone" placeholder="0910-207-2859" type="tel" aria-label="شماره تلفن" />
        </LabelInputContainer>

        <LabelInputContainer className="mb-8">
          <Label htmlFor="title">عنوان</Label>
          <Input id="title" name="title" placeholder="عنوان پیام" type="text" aria-label="عنوان" />
          {fieldErrors.title && <p className="text-red-500 text-xs mt-1">{fieldErrors.title}</p>}
        </LabelInputContainer>

        <LabelInputContainer className="mb-8">
          <Label htmlFor="content">پیام</Label>
          <Textarea id="content" name="content" placeholder="پیام شما..." aria-label="پیام" />
        </LabelInputContainer>

        <FileUpload key={fileUploadKey} onChange={handleFileChange} />

        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br font-bold text-main-text-light dark:text-main-text-dark shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] bg-primary-light/[0.4] dark:bg-primary-dark/[0.4] dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] transition-all duration-300"
        >
          {buttonMessage}
          <BottomGradient />
        </motion.button>

        {buttonMessage === 'پیام ارسال شد 🎉' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-green-600 text-center font-bold mt-4"
          >
            پیام شما با موفقیت ارسال شد 🎉
          </motion.div>
        )}
      </motion.form>
    </motion.div>
  );
}

const BottomGradient = () => (
  <>
    <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
    <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
  </>
);


const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn("flex w-full flex-col space-y-2", className)}>{children}</div>;
};