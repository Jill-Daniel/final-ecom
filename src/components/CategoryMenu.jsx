import React, { useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";

export default function CategoryMenu({ onSelect }) {
  const [cats, setCats] = useState([]);
  const [subs, setSubs] = useState([]);

  useEffect(() => {
    (async () => {
      // If you used categories/subcategories tables earlier, select them; if not, derive from products
      const { data: categories } = await supabase.from("categories").select("*");
      const { data: subcategories } = await supabase.from("subcategories").select("*");
      if (categories) setCats(categories);
      if (subcategories) setSubs(subcategories);
      // fallback: build from products if tables not present
      if (!categories) {
        const { data: products } = await supabase.from("products").select("category, subcategory");
        if (products) {
          const uniqueCats = [...new Set(products.map(p => p.category))].map(name => ({ name }));
          setCats(uniqueCats);
          const uniqueSubs = products.map(p => ({ category: p.category, name: p.subcategory }));
          setSubs(uniqueSubs);
        }
      }
    })();
  }, []);

  return (
    <div className="category-menu">
      {cats.map((c) => (
        <div key={c.id || c.name} className="category-block">
          <h4>{c.name}</h4>
          <ul>
            {subs.filter(s => (s.category === c.name || s.category_id === c.id)).map(s => (
              <li key={s.id || s.name}>
                <button className="btn small" onClick={() => onSelect?.(c, s)}>{s.name}</button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
