import React, { useState } from "react";

const Checkout = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    payment: "mpesa",
  });

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOrderPlaced(true);
  };

  const handleWhatsAppContact = () => {
    const whatsappNumber = "254793811786"; // Kenya number without leading 0
    const message = `
Hello! I need help with my order.
Name: ${form.name}
Email: ${form.email}
Phone: ${form.phone}
Shipping Address: ${form.address}
Order Total: $139.98
`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  // AI Chat Handling (simple simulation)
  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMessage = { type: "user", text: chatInput };
    setChatMessages((prev) => [...prev, userMessage]);

    // Simulate AI response
    const aiResponse = {
      type: "ai",
      text: `🤖 AI: I see you asked about "${chatInput}". Our team recommends checking our product description and sizing guide for more details.`,
    };

    setChatMessages((prev) => [...prev, userMessage, aiResponse]);
    setChatInput("");
  };

  return (
    <div className="checkout-page">
      <h1 className="checkout-title">Checkout</h1>

      {orderPlaced ? (
        <div className="checkout-success">
          <h2>✅ Order Placed Successfully!</h2>
          <p>Thank you, {form.name}. Your order is being processed.</p>
          <button
            className="whatsapp-contact-btn"
            onClick={handleWhatsAppContact}
          >
            Contact Us via WhatsApp for Order Assistance
          </button>
        </div>
      ) : (
        <div className="checkout-container">
          {/* Form Section */}
          <form className="checkout-form" onSubmit={handleSubmit}>
            <h2>Billing Details</h2>
            <label>
              Full Name
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Email Address
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Phone Number
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Shipping Address
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                required
              />
            </label>

            <h2>Payment Method</h2>
            <div className="payment-options">
              <label>
                <input
                  type="radio"
                  name="payment"
                  value="mpesa"
                  checked={form.payment === "mpesa"}
                  onChange={handleChange}
                />
                M-Pesa
              </label>
              <label>
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={form.payment === "card"}
                  onChange={handleChange}
                />
                Credit/Debit Card
              </label>
            </div>

            <button type="submit" className="checkout-btn">
              Place Order
            </button>
          </form>

          {/* Order Summary Section */}
          <div className="order-summary">
            <h2>Order Summary</h2>
            <ul>
              <li>
                <span>Red Dress</span>
                <span>$49.99</span>
              </li>
              <li>
                <span>Leather Shoes</span>
                <span>$89.99</span>
              </li>
            </ul>
            <div className="order-total">
              <span>Total</span>
              <span>$139.98</span>
            </div>

            {/* WhatsApp Contact */}
            <button
              className="whatsapp-contact-btn"
              onClick={handleWhatsAppContact}
            >
              Contact Us via WhatsApp for Order Assistance
            </button>

            {/* ================= AI Chat Section ================= */}
            <div className="ai-chat-section">
              <h3>Ask AI About Products</h3>
              <div className="chat-box">
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`chat-message ${msg.type === "ai" ? "ai-msg" : "user-msg"}`}
                  >
                    {msg.text}
                  </div>
                ))}
              </div>
              <form className="chat-form" onSubmit={handleChatSubmit}>
                <input
                  type="text"
                  placeholder="Ask about a product..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                />
                <button type="submit">Send</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
