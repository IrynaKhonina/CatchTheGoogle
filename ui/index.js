import { AppComponent } from "./components/App.component.js";

const rootElement = document.getElementById("root");

function renderApp() {
    rootElement.innerHTML = "";

    const appComponent = AppComponent();

    rootElement.append(appComponent.element);
}
renderApp();