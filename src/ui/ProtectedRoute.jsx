import styled from "styled-components";
import { useUser } from "../features/authentication/useUser.js";
import Spinner from "./Spinner.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  // 1.Load the authenticated user
  const { isAuthenticated, isPending } = useUser();

  // 2.If there is no authenticated user, redirecto to login page
  useEffect(() => {
    if (!isAuthenticated && !isPending) navigate("/login");
  }, [isAuthenticated, isPending, navigate]);

  // 3.show spinner while loading
  if (isPending)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4.If there is a user, render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
