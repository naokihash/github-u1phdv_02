import { useState, useEffect } from 'react';
import { FormData, FormError } from '../types';
import { submitToGoogleSheets } from '../utils/googleSheets';

const COOLDOWN_PERIOD = 60;
const INITIAL_FORM_STATE: FormData = {
  name: '',
  email: '',
  phone: '',
  message: ''
};

export default function useContactForm() {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const [cooldownTime, setCooldownTime] = useState(0);
  const [formError, setFormError] = useState<FormError | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (cooldown && cooldownTime > 0) {
      timer = setInterval(() => {
        setCooldownTime((prev) => {
          if (prev <= 1) {
            setCooldown(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [cooldown, cooldownTime]);

  const validateForm = (data: FormData): boolean => {
    if (!data.name.trim()) {
      setFormError({ field: 'name', message: 'お名前を入力してください' });
      return false;
    }
    if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      setFormError({ field: 'email', message: '有効なメールアドレスを入力してください' });
      return false;
    }
    if (!data.phone.trim() || !/^[0-9-]{10,}$/.test(data.phone.replace(/[-\s]/g, ''))) {
      setFormError({ field: 'phone', message: '有効な電話番号を入力してください' });
      return false;
    }
    if (!data.message.trim()) {
      setFormError({ field: 'message', message: 'メッセージを入力してください' });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cooldown) {
      setFormError({ message: `送信は${cooldownTime}秒後に可能になります` });
      return;
    }

    if (!validateForm(formData)) {
      return;
    }

    setIsSubmitting(true);
    setFormError(null);

    try {
      const result = await submitToGoogleSheets(formData);
      
      if (result.success) {
        setIsSuccess(true);
        setCooldown(true);
        setCooldownTime(COOLDOWN_PERIOD);
        setFormData(INITIAL_FORM_STATE);
      } else {
        throw new Error('送信に失敗しました');
      }
    } catch (error) {
      setFormError({
        message: '送信に失敗しました。時間をおいて再度お試しください。'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formError?.field === name) {
      setFormError(null);
    }
  };

  const resetForm = () => {
    if (!cooldown) {
      setFormData(INITIAL_FORM_STATE);
      setFormError(null);
      setIsSuccess(false);
    }
  };

  return {
    formData,
    isSubmitting,
    isSuccess,
    cooldown,
    cooldownTime,
    formError,
    handleSubmit,
    handleInputChange,
    resetForm
  };
}