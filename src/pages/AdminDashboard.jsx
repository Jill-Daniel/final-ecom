import React, { useState, useEffect } from "react";
import { supabase } from "../services/supabaseClient";
import { authService } from "../services/authService";
import { useNavigate } from "react-router-dom";
import {
  FaBox,
  FaShoppingCart,
  FaChartLine,
  FaEnvelope,
  FaSignOutAlt,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [messages, setMessages] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    subcategory: "",
    price: "",
    description: "",
    image_url: "",
  });
  const [editingProduct, setEditingProduct] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const [filterCategory, setFilterCategory] = useState("");
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    const checkAdmin = async () => {
      const user = await authService.getUser();
      if (!user) navigate("/AdminLogin");
      else fetchAll();
    };
    checkAdmin();
  }, [navigate]);

  const fetchAll = async () => {
    await fetchProducts();
    await fetchOrders();
    await fetchMessages();
  };

  const fetchProducts = async () => {
    const { data, error } = await supabase.from("products").select("*");
    if (!error) setProducts(data);
  };

  // ✅ Fetch orders with products inside
  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from("orders")
      .select(`
        id,
        customer_name,
        customer_email,
        total,
        status,
        created_at,
        order_items (
          id,
          quantity,
          price,
          products (
            id,
            name,
            image_url
          )
        )
      `)
      .order("created_at", { ascending: false });

    if (!error) setOrders(data);
    else console.error("Error fetching orders:", error.message);
  };

  const fetchMessages = async () => {
    const { data, error } = await supabase.from("messages").select("*");
    if (!error) setMessages(data);
  };

  const handleLogout = async () => {
    await authService.logout();
    navigate("/AdminLogin");
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleFileChange = (e) => setFile(e.target.files[0]);

  const uploadImage = async () => {
    if (!file) return formData.image_url || "";
    const fileName = `${Date.now()}-${file.name}`;
    const { error } = await supabase.storage
      .from("products")
      .upload(fileName, file);
    if (error) {
      console.error("Image upload failed:", error.message);
      return null;
    }
    const { data: urlData } = supabase.storage
      .from("products")
      .getPublicUrl(fileName);
    return urlData.publicUrl;
  };

  const handleSaveProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    let imageUrl = formData.image_url;

    if (file) {
      const uploadedUrl = await uploadImage();
      if (uploadedUrl) imageUrl = uploadedUrl;
    }

    const productData = {
      name: formData.name,
      category: formData.category,
      subcategory: formData.subcategory,
      price: parseFloat(formData.price),
      description: formData.description,
      image_url: imageUrl,
    };

    if (editingProduct) {
      const { error } = await supabase
        .from("products")
        .update(productData)
        .eq("id", editingProduct.id);
      if (error) console.error("Error updating product:", error.message);
    } else {
      const { error } = await supabase.from("products").insert([productData]);
      if (error) console.error("Error adding product:", error.message);
    }

    setFormData({
      name: "",
      category: "",
      subcategory: "",
      price: "",
      description: "",
      image_url: "",
    });
    setEditingProduct(null);
    setFile(null);
    fetchProducts();
    setLoading(false);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      subcategory: product.subcategory,
      price: product.price,
      description: product.description,
      image_url: product.image_url,
    });
  };

  const handleDeleteProduct = async (id) => {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (!error) fetchProducts();
    else console.error(error.message);
  };

  const filteredProducts = products
    .filter((p) => !filterCategory || p.category === filterCategory)
    .sort((a, b) => {
      if (sortOption === "price-asc") return a.price - b.price;
      if (sortOption === "price-desc") return b.price - a.price;
      if (sortOption === "name-asc") return a.name.localeCompare(b.name);
      if (sortOption === "name-desc") return b.name.localeCompare(a.name);
      return 0;
    });

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <h2>Admin Panel</h2>
        <nav>
          <ul>
            <li>
              <a href="#products">
                <FaBox /> Products
              </a>
            </li>
            <li>
              <a href="#orders">
                <FaShoppingCart /> Orders
              </a>
            </li>
            <li>
              <a href="#messages">
                <FaEnvelope /> Messages
              </a>
            </li>
            <li>
              <a href="#trends">
                <FaChartLine /> Trends
              </a>
            </li>
            <li>
              <button className="logout-btn" onClick={handleLogout}>
                <FaSignOutAlt /> Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <h1>Admin Dashboard</h1>

        {/* Products Section */}
        <section id="products">
          <h2>Manage Products</h2>

          <form className="admin-form" onSubmit={handleSaveProduct}>
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="subcategory"
              placeholder="Subcategory"
              value={formData.subcategory}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              required
            />

            {/* Image URL or Upload */}
            <label>Product Image (URL or Upload)</label>
            <input
              type="text"
              name="image_url"
              placeholder="Paste image URL (optional)"
              value={formData.image_url}
              onChange={handleChange}
            />

            <div
              className="drag-drop-area"
              onDrop={(e) => {
                e.preventDefault();
                setFile(e.dataTransfer.files[0]);
              }}
              onDragOver={(e) => e.preventDefault()}
            >
              {file ? <p>{file.name}</p> : <p>Drag & Drop image or click</p>}
              <input type="file" onChange={handleFileChange} />
            </div>

            <button type="submit">
              {loading
                ? "Saving..."
                : editingProduct
                ? "Update Product"
                : "Add Product"}
            </button>
          </form>

          <div className="product-list">
            {filteredProducts.map((p) => (
              <div className="product-item" key={p.id}>
                <img src={p.image_url} alt={p.name} />
                <h3>{p.name}</h3>
                <p>
                  {p.category} / {p.subcategory}
                </p>
                <p>${p.price}</p>
                <div className="product-actions">
                  <button onClick={() => handleEditProduct(p)}>
                    <FaEdit /> Edit
                  </button>
                  <button onClick={() => handleDeleteProduct(p.id)}>
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Orders Section */}
        <section id="orders">
          <h2>Orders</h2>
          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <div className="orders-list">
              {orders.map((order) => (
                <div className="order-item" key={order.id}>
                  <h4>Order #{order.id}</h4>
                  <p>
                    <strong>Customer:</strong> {order.customer_name}
                  </p>
                  <p>
                    <strong>Email:</strong> {order.customer_email}
                  </p>
                  <p>
                    <strong>Total:</strong> ${order.total}
                  </p>
                  <p>
                    <strong>Status:</strong> {order.status}
                  </p>

                  {/* ✅ Show ordered products */}
                  <div className="order-products">
                    <h5>Products:</h5>
                    {order.order_items?.map((item) => (
                      <div key={item.id} className="order-product">
                        <img
                          src={item.products?.image_url}
                          alt={item.products?.name}
                          className="order-product-img"
                        />
                        <span>{item.products?.name}</span>
                        <span>Qty: {item.quantity}</span>
                        <span>Price: ${item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Messages Section */}
        <section id="messages">
          <h2>Messages</h2>
          {messages.length === 0 ? (
            <p>No messages found.</p>
          ) : (
            <div className="messages-list">
              {messages.map((msg) => (
                <div className="message-item" key={msg.id}>
                  <p>
                    <strong>{msg.name}</strong> ({msg.email})
                  </p>
                  <p>{msg.message}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Trends Section */}
        <section id="trends">
          <h2>Market Trends</h2>
          <div className="trends-cards">
            <div>Total Products: {products.length}</div>
            <div>Total Orders: {orders.length}</div>
            <div>Total Messages: {messages.length}</div>
          </div>
        </section>
      </main>
    </div>
  );
}
