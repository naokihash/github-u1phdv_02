export interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface FormError {
  field?: keyof FormData;
  message: string;
}

export interface ContactInfoItem {
  icon: React.ReactNode;
  title: string;
  content: React.ReactNode;
}