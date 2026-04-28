import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));

  // ❌ अगर user नहीं है → login भेजो
  if (!user) {
    return <Navigate to="/login" />;
  }

  // ✅ अगर user है → requested page दिखाओ
  return children;
}

export default ProtectedRoute;