import React, { useEffect, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/config";
import { getCurrentUser } from "./redux/auth/auth-actions";
import LoadingSpinner from "./components/UI/LoadingSpinner";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import Search from "./pages/Search";

const Payment = React.lazy(() => import("./pages/Payment"));
const Recovery = React.lazy(() => import("./pages/Recovery"));
const Dashboard = React.lazy(() => import("./pages/dashboard/Dashboard"));
const ProductDetail = React.lazy(() => import("./pages/ProductDetail"));
const Cart = React.lazy(() => import("./pages/Cart"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(getCurrentUser(user.uid));
      }
    });
    return unsubscribe;
  }, [dispatch]);

  return (
    <Suspense fallback={<LoadingSpinner />}>
    <Switch>
      <Route path="/" exact>
        <Layout>
          <HomePage />
        </Layout>
      </Route>
      <Route path="/auth">
        {!currentUser ? <AuthPage /> : <Redirect to="/" />}
      </Route>
      <Route path="/dashboard">
        {currentUser ? <Dashboard /> : <Redirect to="/auth" />}
      </Route>
      <Route path="/cart" exact>
          <Cart />
      </Route>
      <Route path="/cart/checkout"> 
          {currentUser ? <Payment /> : <Redirect to="/auth" />}
      </Route>
      <Route path="/recovery">
          <Recovery />
      </Route>
      <Route path="/products/:filterType" exact>
        <Layout>
          <Search />
        </Layout>
      </Route>
      <Route path={`/products/:filterType/:productId`}>
        <Layout>
          <ProductDetail />
        </Layout>
      </Route>
      <Route path="/not-found">
        <NotFound />
      </Route>
      <Route path="*">
        <Redirect to='/not-found'/>
      </Route>
    </Switch>
    </Suspense>
  );
}

export default App;
