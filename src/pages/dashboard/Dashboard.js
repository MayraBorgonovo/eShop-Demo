import { Route, Switch, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import SideNav from "../../components/Layout/SideNav";
import ReducedLaylout from "../../components/Layout/ReducedLayout";
import AdminPage from "./AdminPage";
import ProfilePage from "./ProfilePage";
import OrdersPage from "./OrdersPage";
import OrderDetail from "./OrderDetail";
import classes from "./Dashboard.module.css";

const Dashboard = () => {
  const currentUser = useSelector((state) => state.auth.currentUser);

  let isAdmin = false;
  if (currentUser) {
    isAdmin = currentUser.isAdmin;
  }

  return (
    <>
    <ReducedLaylout>
    <SideNav />
    <section className={classes.detail}>
      <Switch>
        <Route path="/dashboard/user-profile">
          <ProfilePage />
        </Route>
        <Route path="/dashboard/admin">
          {isAdmin ? <AdminPage /> : <Redirect to='/auth'/>}
        </Route>
        <Route path="/dashboard/orders" exact>
          <OrdersPage />
        </Route>
        <Route path="/dashboard/orders/:orderId">
          <OrderDetail />
        </Route>
      </Switch>
    </section>
    </ReducedLaylout>
    </>
  );
};

export default Dashboard;


