interface SubmitResult {
  success: boolean;
  error?: string;
}

export async function submitToGoogleSheets(formData: {
  name: string;
  email: string;
  phone: string;
  message: string;
}): Promise<SubmitResult> {
  const GOOGLE_SHEETS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyADo47I_57SIP3nYGZVz-fvYVGcCH7I6WZO5yQEodRbR8u_SYApSpWmCOxz7v6eIAi/exec';

  try {
    const formBody = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      formBody.append(key, value);
    });
    formBody.append('timestamp', new Date().toISOString());

    const response = await fetch(GOOGLE_SHEETS_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: formBody
    });

    // Since we're using no-cors, we'll assume success if we get here
    return { success: true };
  } catch (error) {
    console.error('Form submission error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : '送信に失敗しました'
    };
  }
}