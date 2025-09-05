'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { FileUpload } from '../ui/FileUpload';
import { cn } from '@/lib/utils';
import { Textarea } from '../ui/Textarea';
import { FaPhoneAlt } from 'react-icons/fa';

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
      className="flex flex-col justify-center gap-8 w-full max-w-2xl mx-auto border border-primary-light dark:border-primary-dark rounded-2xl p-8 bg-white/30 dark:bg-black/30 backdrop-blur-md shadow-xl"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="flex flex-col gap-6"
      >
        <div className="text-center">
          <h4 className="text-3xl font-bold text-main-text-light dark:text-main-text-dark">اطلاعات تماس</h4>
          <p className="text-sm text-main-text-light dark:text-main-text-dark mt-2">
            شما می‌توانید با پر کردن فرم تماس با ما، درخواست‌ها و نظرات خود را با ما به اشتراک بگذارید.
          </p>
        </div>

        <div className="flex items-center gap-4 justify-center">
          <FaPhoneAlt className="text-2xl text-primary-light dark:text-primary-dark" />
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
        className="space-y-6"
      >
        {[
          { id: 'f_name', label: 'نام', placeholder: 'مبین', error: fieldErrors.f_name },
          { id: 'l_name', label: 'نام خانوادگی', placeholder: 'حیدری', error: fieldErrors.l_name },
        ].map((field, i) => (
          <motion.div
            key={field.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2, duration: 0.5 }}
          >
            <LabelInputContainer>
              <Label htmlFor={field.id}>{field.label}</Label>
              <Input
                id={field.id}
                name={field.id}
                placeholder={field.placeholder}
                type="text"
                aria-label={field.label}
                className="rounded-md border border-gray-300 dark:border-gray-700 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark transition-all"
              />
              {field.error && <p className="text-red-500 text-xs mt-1">{field.error}</p>}
            </LabelInputContainer>
          </motion.div>
        ))}

        <LabelInputContainer>
          <Label htmlFor="phone">شماره تلفن</Label>
          <Input
            id="phone"
            name="phone"
            placeholder="0910-207-2859"
            type="tel"
            aria-label="شماره تلفن"
            className="rounded-md border border-gray-300 dark:border-gray-700 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark transition-all"
          />
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="title">عنوان</Label>
          <Input
            id="title"
            name="title"
            placeholder="عنوان پیام"
            type="text"
            aria-label="عنوان"
            className="rounded-md border border-gray-300 dark:border-gray-700 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark transition-all"
          />
          {fieldErrors.title && <p className="text-red-500 text-xs mt-1">{fieldErrors.title}</p>}
        </LabelInputContainer>

        <LabelInputContainer>
          <Label htmlFor="content">پیام</Label>
          <Textarea
            id="content"
            name="content"
            placeholder="پیام شما..."
            aria-label="پیام"
            className="rounded-md border border-gray-300 dark:border-gray-700 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark transition-all"
          />
        </LabelInputContainer>

        <FileUpload key={fileUploadKey} onChange={handleFileChange} />

        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          className="relative block h-12 w-full rounded-full bg-gradient-to-r from-primary-light via-success-light to-selected-light dark:from-primary-dark dark:via-success-dark dark:to-selected-dark text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {buttonMessage}
          <BottomGradient />
        </motion.button>

        <AnimatePresence>
          {buttonMessage === 'پیام ارسال شد 🎉' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              className="text-green-600 text-center font-bold mt-4"
            >
              پیام شما با موفقیت ارسال شد 🎉
            </motion.div>
          )}
        </AnimatePresence>
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
  return <div className={cn('flex w-full flex-col space-y-2', className)}>{children}</div>;
};
