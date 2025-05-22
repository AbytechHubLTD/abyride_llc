/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { Children, lazy, Suspense } from "react";
// Lazy-load all components
const PortfolioManage = lazy(
  () => import("../components/service/PortfolioManage.jsx"),
);
const TeamLeadership = lazy(
  () => import("../components/service/TeamLeadership.jsx"),
);
const MarketResearch = lazy(
  () => import("../components/service/MarketResearch.jsx"),
);
const ExecutiveSearch = lazy(
  () => import("../components/service/ExecutiveSearch.jsx"),
);

const AboutUs = lazy(() => import("../views/AboutUs.jsx"));
const Blog = lazy(() => import("../views/Blog.jsx"));
const BlogDetails = lazy(
  () => import("../components/BogDetails/BlogDetails.jsx"),
);
const Fleet = lazy(()=>import("../views/Fleet.jsx"))
const History = lazy(() => import("../views/History.jsx"));
const RequestRide = lazy(() => import("../views/RequestRide.jsx"));
const ContactUs = lazy(() => import("../views/ContactUs"));
const Team = lazy(() => import("../views/Team"));
const Service = lazy(() => import("../views/Service"));
const Home = lazy(() => import("../views/Home.jsx"));
const Faq = lazy(() => import("../views/Faq.jsx"));
const Pricing = lazy(() => import("../views/Pricing.jsx"));
const LandingLayout = lazy(() => import("../layouts/LandingLayout"));
const ErrorLayout = lazy(() => import("../Error/ErrorLayout"));
const SignInOptions = lazy(() => import("../views/userSign.jsx"));

const RideBooking = lazy(() => import("../views/RideBooking.jsx"));
const Activity = lazy(() => import("../views/Activity.jsx"));
const ProfileLayout = lazy(() => import("../layouts/ProfileLayout.jsx"));
const AccountInfo = lazy(() => import("../components/Profile/AccountInfo.jsx"));
const Security = lazy(() => import("../components/Profile/Security.jsx"));
const Privacy = lazy(() => import("../components/Profile/Privacy.jsx"));
const UserHeader = lazy(() => import("../components/userHeader.jsx"));

// Reusable Loader Component
import Loader from "../components/Loading.jsx";
import ProtectedRiderRoute from "../components/ProtectedRoutes/ProtectedRiderRoute.jsx";
import DriverLayout from "../layouts/DriverLayout.jsx";
import ClientsAuthLayout from "../layouts/Clients/ClientsAuthLayout.jsx";
import ClientLogin from "../views/Clients/Auth/ClientLogin.jsx";
import VerifyClient from "../views/Clients/Auth/ClientVerify.jsx";
import FillUserInfo from "../views/Clients/Auth/FillUserInfo.jsx";
import ProtectedLoginRoute from "../components/ProtectedRoutes/ProtectedLoginRoute.jsx";
import {
  ClientAuthContextProvider,
  useAuth,
} from "../context/ClientAuthContext.jsx";
import DriverDashboard from "../views/DriverProcess/Auth/DriverDashboard.jsx";
import DriverProtectedRoute from "../components/ProtectedRoutes/DriverProtectedRoute.jsx";
import DriverApply from "../views/DriverProcess/Auth/driverApply/driverApply.jsx";



// import suspsense driver component section

const DriverLogin = lazy(
  () => import("../views/DriverProcess/Auth/DriverLogin.jsx"),
);
const DriverVerify = lazy(
  () => import("../views/DriverProcess/Auth/verifydriver.jsx"),
);




const ReservationForm = lazy(()=>import('../views/requestRide/ReservationForm.jsx'));


const DashboardLayout = lazy(()=>import('../layouts/Dispatch/DashboardLayout.jsx'));
const DashboardAuthLayout = lazy(()=>import('../layouts/Dispatch/DashboardAuthLayout.jsx'));
const DashboardProtectedLayout = lazy(()=>import('../layouts/Dispatch/DashboardProtectedLayout.jsx'));


const DashboardLogin = lazy(()=>import('../views/Dispatch/Login.jsx'));
const DashboardLockScreen = lazy(()=>import('../views/Dispatch/LockScreen.jsx'));

const SuspenseWrapper = ({ children }) => (
  <Suspense fallback={<Loader />}>{children}</Suspense>
);

// Define routes
const routes = [
  {
    path: "/",
    element: (
      <SuspenseWrapper>
        <LandingLayout />
      </SuspenseWrapper>
    ),

    children: [
      {
        path: "",
        element: (
          <SuspenseWrapper>
            <Home />
          </SuspenseWrapper>
        ),
      },

      {
        path: "blog",
        element: (
          <SuspenseWrapper>
            <Blog />
          </SuspenseWrapper>
        ),
      },
      {
        path: ":blog/:id",
        element: (
          <Suspense>
            <BlogDetails />
          </Suspense>
        ),
      },
      {
        path: "about",
        element: (
          <SuspenseWrapper>
            <AboutUs />
          </SuspenseWrapper>
        ),
      },

      {
        path: "contact-us",
        element: (
          <SuspenseWrapper>
            <ContactUs />
          </SuspenseWrapper>
        ),
      },
      {
        path: "fleet",
        element: (
          <SuspenseWrapper>
            <Fleet />
          </SuspenseWrapper>
        ),
      },
      {
        path: "joinUs",
        element: (
          <SuspenseWrapper>
            <SignInOptions />
          </SuspenseWrapper>
        ),
      },

      {
        path: "team",
        element: (
          <SuspenseWrapper>
            <Team />
          </SuspenseWrapper>
        ),
      },
      {
        path: "faq",
        element: (
          <SuspenseWrapper>
            <Faq />
          </SuspenseWrapper>
        ),
      },
      {
        path: "history",
        element: (
          <SuspenseWrapper>
            <History />
          </SuspenseWrapper>
        ),
      },
      {
        path: "pricing",
        element: (
          <SuspenseWrapper>
            <Pricing />
          </SuspenseWrapper>
        ),
      },
      {
        path: "request-ride",
        element: (
          <SuspenseWrapper>
            <RequestRide />
          </SuspenseWrapper>
        ),
      },
   
      {
        path: "services",
        element: (
          <SuspenseWrapper>
            <Service />
          </SuspenseWrapper>
        ),
        children: [
          {
            path: "",
            element: (
              <SuspenseWrapper>
                <PortfolioManage />
              </SuspenseWrapper>
            ),
          },
          {
            path: "home-care",
            element: (
              <SuspenseWrapper>
                <TeamLeadership />
              </SuspenseWrapper>
            ),
          },
          {
            path: "language-translation",
            element: (
              <SuspenseWrapper>
                <MarketResearch />
              </SuspenseWrapper>
            ),
          },
          {
            path: "depanage",
            element: (
              <SuspenseWrapper>
                <ExecutiveSearch />
              </SuspenseWrapper>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "/profile",
    element: (
      <ProtectedRiderRoute>
        <SuspenseWrapper>
          <UserHeader></UserHeader>
          <ProfileLayout />
        </SuspenseWrapper>
      </ProtectedRiderRoute>
    ),
    children: [
      { index: true, element: <Navigate to="AccountInfo" replace /> },
      {
        path: "AccountInfo",
        element: (
          <SuspenseWrapper>
            <AccountInfo />
          </SuspenseWrapper>
        ),
      },
      {
        path: "privacy",
        element: (
          <SuspenseWrapper>
            <Privacy />
          </SuspenseWrapper>
        ),
      },
      {
        path: "security",
        element: (
          <SuspenseWrapper>
            <Security />
          </SuspenseWrapper>
        ),
      },
    ],
  },
   {
        path: "reservation",
        element: (
          <SuspenseWrapper>
            <ReservationForm/>
          </SuspenseWrapper>
        )
      },
  
  {
    path: "driver/dashboard",
    element: (
      <SuspenseWrapper>
        <DriverProtectedRoute>
          <DriverDashboard />
        </DriverProtectedRoute>
      </SuspenseWrapper>
    ),
  },
  {
    path: "AbyrideClient",
    element: (
      <ProtectedLoginRoute>
        <SuspenseWrapper>
          <ClientsAuthLayout />
        </SuspenseWrapper>
      </ProtectedLoginRoute>
    ),
    children: [
      {
        index: true,
        element: <ClientLogin />,
      },
      {
        path: "ClientVerify",
        element: <VerifyClient />,
      },
      {
        path: "fillUserInfo",
        element: <FillUserInfo />,
      },
    ],
  },

  {
    path: "/booking",
    element: (
      <SuspenseWrapper>
        <ProtectedRiderRoute>
          <UserHeader />
          <RideBooking />
        </ProtectedRiderRoute>
      </SuspenseWrapper>
    ),
  },
  {
    path: "trips",
    element: (
      <SuspenseWrapper>
        <Activity />
      </SuspenseWrapper>
    ),
  },
  {
    path: "driver/dashboard",
    element: (
      <DriverProtectedRoute>
        <SuspenseWrapper>
          <DriverDashboard></DriverDashboard>
        </SuspenseWrapper>
      </DriverProtectedRoute>
    ),
  },
  {
    path: "driver-apply",
    element: (
      <SuspenseWrapper>
        <DriverApply />
      </SuspenseWrapper>
    ),
  },

  {
    path: "AbyrideDriver",
    element: (
      <SuspenseWrapper>
        <DriverLayout />
      </SuspenseWrapper>
    ),
    children: [
      {
        index: true,
        element: <DriverLogin />,
      },
      {
        path: "DriverVerify",
        element: <DriverVerify />,
      },
    ],
  },
  {
      path: "Dispatch",
    element: (
      <SuspenseWrapper>
        <DashboardLayout />
      </SuspenseWrapper>
    ),
        children: [
      {
        path:"",
        element: <DashboardAuthLayout />,
        children:[
          {
           index:true,
        element: <DashboardLogin />,

          },
          {
               path: "lockscreen",
        element: <DashboardLockScreen />,
      
          }
        ]
      },
      {
      path: "dashboard",
        element: <DashboardProtectedLayout />,
      },
    
    ],
  },
  {
    path: "*",
    element: (
      <SuspenseWrapper>
        <ErrorLayout />
      </SuspenseWrapper>
    ),
  },
];

// Create router instance
const router = createBrowserRouter(routes);

export default router;
