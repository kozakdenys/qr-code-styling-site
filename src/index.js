import QrCodeStyling from "qr-code-styling";
import "./index.css";
import NodesBinder from "./js/nodes-binder";
import { getSrcFromFile } from "./js/tools";
import defaultImage from "./assets/logo.png";

const form = document.getElementById("form");
const descriptionContainer = document.getElementById("qr-description");

const nodesBinder = new NodesBinder({
    root: form
});
const initState = nodesBinder.getState();
const qrCode = new QrCodeStyling({
    ...initState,
    image: defaultImage,
});

function updateDescriptionContainerBackground(backgroundColor, qrColor) {
    let leftColor, rightColor;

    if (getPerceptualBrightness(backgroundColor) > getPerceptualBrightness(qrColor)) {
        leftColor = qrColor;
        rightColor = backgroundColor;
    } else {
        leftColor = backgroundColor;
        rightColor = qrColor;
    }

    descriptionContainer.style["background-image"] = `linear-gradient(90deg, #000 0%, ${leftColor} 50%, ${rightColor} 100%)`;
}

function getPerceptualBrightness(color) {

    const r = parseInt(color.substring(1,3),16);
    const g = parseInt(color.substring(3,5),16);
    const b = parseInt(color.substring(5,6),16);

    return r + g + b;
}

updateDescriptionContainerBackground(initState.dotsOptions.color, initState.backgroundOptions.color);

nodesBinder.onStateUpdate(({ field, data }) => {
    const { imageFile, imageUrl, ...state } = nodesBinder.getState();

    updateDescriptionContainerBackground(state.dotsOptions.color, state.backgroundOptions.color);

    if (field === "imageFile") {
        if (imageFile && imageFile[0]) {
            nodesBinder.setState({ imageUrl: "" });
            getSrcFromFile(imageFile[0], result => {
                qrCode.update({
                    image: result
                });
            });
        } else {
            qrCode.update({
                image: imageUrl
            });
        }
    }

    if (field === "imageUrl") {
        if (imageUrl) {
            nodesBinder.setState({ imageFile: new DataTransfer().files });
            qrCode.update({
                image: imageUrl
            });
        } else {
            qrCode.update({
                image: null
            });
        }
    }

    qrCode.update(state);
});

const qrContainer = document.getElementById("qr-code-generated");

qrCode.append(qrContainer);

document.getElementById("button-cancel").onclick = () => {
    nodesBinder.setState({ imageFile: new DataTransfer().files });
};

document.getElementById("qr-download").onclick = () => {
    const extension = document.getElementById("qr-extension").value;
    qrCode.download({ extension, name: "qr-code-styling" });
};

//Accordion
let acc = document.getElementsByClassName("accordion");

for (let i = 0; i < acc.length; i++) {
    if (acc[i].classList.contains("accordion--open")) {
        continue;
    }

    acc[i].addEventListener("click", function() {
        this.classList.toggle("active");

        const panel = this.nextElementSibling;
        if (panel.style.display === "grid") {
            panel.style.display = "none";
        } else {
            panel.style.display = "grid";
        }
    });
}