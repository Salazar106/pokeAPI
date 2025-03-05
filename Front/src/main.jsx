import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { PriceProvider} from "./hooks/TemplateContext.jsx";
import 'primereact/resources/themes/saga-blue/theme.css';  // Tema de PrimeReact
import 'primereact/resources/primereact.min.css';          // Estilos de PrimeReact
import 'primeicons/primeicons.css';   
import { RefreshTableProvider } from "./hooks/refreshTable.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <PriceProvider>
      <RefreshTableProvider>
        <App />
      </RefreshTableProvider>
    </PriceProvider>
  </BrowserRouter>
);
