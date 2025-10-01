'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

import { Input } from '../ui/Input';
import { Label } from '../ui/Label';
import { FileUpload } from '../ui/FileUpload';
import { Textarea } from '../ui/Textarea';
import { cn } from '@/lib/utils';
import Link from 'next/link';


const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.42, 0, 0.58, 1] },
  },
};

const containerVariant: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.42, 0, 0.58, 1],
      when: 'beforeChildren',
      staggerChildren: 0.15,
    },
  },
};



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

  const handleFileChange = (files: File[]) => setAttachedFiles(files);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setButtonMessage('درحال ارسال...');
    setFieldErrors({});

    const form = e.currentTarget;
    const formData = new FormData();

    const f_name = form.elements.namedItem('f_name') as HTMLInputElement;
    const l_name = form.elements.namedItem('l_name') as HTMLInputElement;
    const phone = form.elements.namedItem('phone') as HTMLInputElement;
    const title = form.elements.namedItem('title') as HTMLInputElement;
    const content = form.elements.namedItem('content') as HTMLTextAreaElement;

    const errors: { [key: string]: string } = {};
    if (!f_name?.value.trim()) errors.f_name = 'نام لازم است.';
    if (!l_name?.value.trim()) errors.l_name = 'نام خانوادگی لازم است.';
    if (!phone?.value.trim()) errors.phone = 'شماره لازم است.';
    if (!title?.value.trim()) errors.title = 'عنوان لازم است.';

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setIsSubmitting(false);
      setButtonMessage('ارسال');
      return;
    }

    formData.append('f_name', f_name.value);
    formData.append('l_name', l_name.value);
    formData.append('phone', phone.value);
    formData.append('title', title.value);
    formData.append('content', content.value);
    formData.append('user_agent', navigator.userAgent);

    const ip_address = await getPublicIP();
    formData.append('ip_address', ip_address);

    attachedFiles.forEach((file) => formData.append('attachment', file));

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
      setTimeout(() => setButtonMessage('ارسال'), 4000);
    }
  };

  return (
    <motion.section
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      dir="rtl"
      className="relative flex flex-col justify-between mt-10 gap-6 mx-4 lg:mx-10"
    >
      {/* Header */}
      <motion.div variants={containerVariant} className="flex flex-col md:flex-row justify-between items-center gap-y-6">
        <h2 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-primary-light via-selected-light to-secondary-light dark:from-primary-dark dark:via-selected-dark dark:to-selected-dark">
          فرم ارتباط با ما
        </h2>
        <Link
          href="/contact-us"
          className="text-base font-bold bg-base-light dark:bg-base-dark border-2 px-4 py-2 rounded-xl border-primary-light dark:border-primary-dark hover:text-highlight-text-light hover:bg-primary-light dark:hover:text-highlight-text-dark dark:hover:bg-primary-dark transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-105"
        >
          اطلاعات بیشتر
        </Link>
      </motion.div>

      {/* Form Container */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
        }}
        className="flex flex-col justify-center gap-8 w-full max-w-2xl mx-auto border border-primary-light dark:border-primary-dark rounded-2xl p-8 bg-white/30 dark:bg-black/30 backdrop-blur-md shadow-xl"
      >
        <motion.form
          onSubmit={handleSubmit}
          role="form"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { delay: 0.3, duration: 0.6 } },
          }}
          className="space-y-6"
        >
          {/* 👥 Name Fields */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <LabelInputContainer>
              <Label htmlFor="f_name">نام</Label>
              <Input id="f_name" name="f_name" placeholder="نام" type="text" />
              {fieldErrors.f_name && <p className="text-red-500 text-xs mt-1">{fieldErrors.f_name}</p>}
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor="l_name">نام خانوادگی</Label>
              <Input id="l_name" name="l_name" placeholder="نام خانوادگی" type="text" />
              {fieldErrors.l_name && <p className="text-red-500 text-xs mt-1">{fieldErrors.l_name}</p>}
            </LabelInputContainer>
          </motion.div>

          {/* 📞 Phone & Title */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
            }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <LabelInputContainer>
              <Label htmlFor="phone">شماره تلفن</Label>
              <Input id="phone" name="phone" placeholder="شماره تماس" type="tel" />
              {fieldErrors.phone && <p className="text-red-500 text-xs mt-1">{fieldErrors.phone}</p>}
            </LabelInputContainer>

            <LabelInputContainer>
              <Label htmlFor="title">عنوان</Label>
              <Input id="title" name="title" placeholder="عنوان پیام" type="text" />
              {fieldErrors.title && <p className="text-red-500 text-xs mt-1">{fieldErrors.title}</p>}
            </LabelInputContainer>
          </motion.div>

          {/* 📝 Message */}
          <LabelInputContainer>
            <Label htmlFor="content">پیام</Label>
            <Textarea id="content" name="content" placeholder="پیام شما..." />
          </LabelInputContainer>

          {/* 📎 File Upload */}
          <FileUpload key={fileUploadKey} onChange={handleFileChange} />

          {/* 🚀 Submit Button */}
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
                    {/* ✅ Success Message */}
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
    </motion.section>
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
