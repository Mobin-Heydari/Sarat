
export const sectionMotion = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.42, 0, 0.58, 1] },
};

export const cardMotion = {
  initial: { opacity: 0, scale: 0.95 },
  whileInView: { opacity: 1, scale: 1 },
  transition: { duration: 0.6 },
  viewport: { once: true, amount: 0.3 },
};
