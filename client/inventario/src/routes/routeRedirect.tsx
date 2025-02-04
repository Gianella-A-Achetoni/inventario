import { Navigate, useLocation } from "react-router-dom";

interface RouteRedirectProps {
  to: string;
  absolute?: boolean;
  replace?: boolean;
}

const RouteRedirect = ({ to, absolute, replace }: RouteRedirectProps) => {
  const location = useLocation();

  const redirectPath = absolute
    ? to
    : `${location.pathname}/${to}`.replace(/\/+/g, "/");

  return <Navigate to={redirectPath} replace={replace} />;
};

export default RouteRedirect;