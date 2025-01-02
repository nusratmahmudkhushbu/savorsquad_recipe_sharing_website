import React from "react";

const Contact = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-3xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="text-black-700 mb-4">
      We’re all ears and eager to connect! Drop us a line using the details below—we can’t wait to hear from you!
      </p>
      <ul className="text-black-700 list-disc list-inside mb-4">
        <li>Email: support@savoyswap.com</li>
        <li>Phone: +113-532-667</li>
        <li>Address: 221B Baker Street, London, England</li>
      </ul>
      <p className="text-black-700">
      Got a question or need assistance? Reach out anytime or swing by during our working hours, we’re here to make your day easier!
      </p>
    </div>
  );
};

export default Contact;
