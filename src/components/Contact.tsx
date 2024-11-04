import React, { useState } from 'react';
import ContactInfo from './contact/ContactInfo';
import { CheckCircle } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setIsButtonDisabled(true);
  };

  return (
    <section id="contact" className="py-24 bg-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">お問い合わせ</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            ご予約・お問い合わせはお気軽にご連絡ください。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <ContactInfo />
          <div className="bg-white p-8 rounded-xl shadow-lg">
            {isSubmitted ? (
              <div className="text-center p-8">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  送信完了
                </h3>
                <p className="text-gray-600">
                  お問い合わせありがとうございます。<br />
                  内容を確認次第、担当者よりご連絡させていただきます。
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    お名前<span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    メールアドレス<span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    電話番号<span className="text-red-500 ml-1">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="例: 090-1234-5678"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    メッセージ<span className="text-red-500 ml-1">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isButtonDisabled}
                  className={`w-full bg-green-800 text-white px-6 py-3 rounded-full transition ${
                    isButtonDisabled
                      ? 'opacity-50 cursor-not-allowed'
                      : 'hover:bg-green-700'
                  }`}
                >
                  送信する
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}