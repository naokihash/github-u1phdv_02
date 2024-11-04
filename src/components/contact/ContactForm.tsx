import React from 'react';
import useContactForm from './hooks/useContactForm';
import FormFields from './FormFields';
import SuccessMessage from './SuccessMessage';
import { AlertCircle } from 'lucide-react';

export default function ContactForm() {
  const {
    formData,
    isSubmitting,
    isSuccess,
    cooldown,
    cooldownTime,
    formError,
    handleSubmit,
    handleInputChange,
    resetForm
  } = useContactForm();

  if (isSuccess) {
    return (
      <SuccessMessage
        canSubmit={!cooldown}
        cooldownSeconds={cooldownTime}
        onReset={resetForm}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h3 className="text-2xl font-semibold text-gray-900 mb-6">お問い合わせフォーム</h3>
      
      <FormFields
        formData={formData}
        onChange={handleInputChange}
      />

      <button
        type="submit"
        disabled={isSubmitting || cooldown}
        className={`w-full bg-green-800 text-white px-6 py-3 rounded-full transition ${
          isSubmitting || cooldown
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:bg-green-700'
        }`}
      >
        {isSubmitting ? '送信中...' : cooldown ? `再送信まで${cooldownTime}秒` : '送信する'}
      </button>

      {formError && (
        <div className="flex items-center space-x-2 text-red-600 justify-center">
          <AlertCircle className="h-5 w-5" />
          <p className="text-sm">{formError.message}</p>
        </div>
      )}
    </form>
  );
}