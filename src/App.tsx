import React, { useEffect, useState } from "react";
import { supabase } from "./services/supabaseClient";
import "./App.scss";
import LoginForm from "./features/auth/Auth";
import AppLayout from "./components/layout/AppLayout";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import ProductList from "./features/product-list/ProductList";

function App() {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    console.log('abc');
    supabase.auth.getSession().then((value) => {
      setSession(value.data.session);
    });
  }, []);
  
  return (
    <div className="App">
      {!session ? (
        <LoginForm />
      ) : (
        <AppLayout>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<ProductList />} />
            </Routes>
          </BrowserRouter>
        </AppLayout>
      )}
    </div>
  );
}

export default App;
