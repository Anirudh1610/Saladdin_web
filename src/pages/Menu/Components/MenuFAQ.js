import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import '../Styles/MenuFAQ.css';

const MenuFAQ = () => {
  const [openIndex, setOpenIndex] = useState(1); // Second item open by default

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
    <div className="menu-faq-section">
      <div className="menu-faq-container">
        <h2 className="menu-faq-title">Frequently Asked Questions</h2>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${openIndex === index ? 'open' : ''}`}
            >
              <button
                className="faq-question"
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`faq-icon ${openIndex === index ? 'rotated' : ''}`}
                  size={20}
                />
              </button>
              <div className={`faq-answer ${openIndex === index ? 'visible' : ''}`}>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuFAQ;
