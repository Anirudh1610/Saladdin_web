import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import './Styles/FAQ.css';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(1);

  const faqs = [
    {
      question: 'Are your salads made fresh every day?',
      answer: 'Yes, all our salads are prepared fresh daily using locally sourced ingredients to ensure maximum freshness and quality.'
    },
    {
      question: 'Can I customize ingredients in a salad?',
      answer: 'Yes! Head to the Build Your Bowl section to customize your ingredients. You can also save your bowl for future orders and quickly reorder anytime.'
    },
    {
      question: 'Do you have vegetarian and vegan options?',
      answer: 'Absolutely! We offer a wide variety of vegetarian and vegan salads. Look for the "Vegan" filter to see all plant-based options.'
    },
    {
      question: 'Do you offer high-protein salads?',
      answer: 'Yes, we have many high-protein options featuring grilled chicken, fish, tofu, quinoa, and legumes. Filter by "High Protein" to see all options.'
    },
    {
      question: 'Can I filter salads by calories or goals?',
      answer: 'Yes! You can filter salads by dietary goals like Weight Loss, Muscle Gain, Keto, Low Carb, and more. Each salad also shows detailed nutritional information.'
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-page-section">
      <div className="faq-page-container">
        <div className="faq-page-list">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-page-item ${openIndex === index ? 'open' : ''}`}
            >
              <button
                className="faq-page-question"
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`faq-page-icon ${openIndex === index ? 'rotated' : ''}`}
                  size={20}
                />
              </button>
              <div className={`faq-page-answer ${openIndex === index ? 'visible' : ''}`}>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
