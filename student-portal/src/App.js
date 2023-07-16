import UserContext from "./components/AccountContext";
import ToggleColorMode from "./components/ToggleColorMode";
import Views from "./components/Views";

function App() {
  return (
    <UserContext>
      <ToggleColorMode />
      <Views />
    </UserContext>
  );
}

export default App;
