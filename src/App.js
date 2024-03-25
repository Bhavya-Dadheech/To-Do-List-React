import "./App.css";
import RoutePath from "./routes/Routes";
import AuthProvider from "./auth-provider/AuthProvider";
function App() {
  return (
    <AuthProvider>
      <RoutePath />
    </AuthProvider>
  );
}

export default App;
