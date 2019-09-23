import QrCodeStyling from "qr-code-styling";
import "./index.css";
import NodesBinder from "./js/nodes-binder";
import { getSrcFromFile } from "./js/tools";
import defaultImage from "./assets/qr_transparent.png";

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

    descriptionContainer.style["background-image"] = `linear-gradient(90deg, #000 0%, ${leftColor} 30%, ${rightColor} 100%)`;
}

function getPerceptualBrightness(color) {

    const r = parseInt(color.substring(1,3),16);
    const g = parseInt(color.substring(3,5),16);
    const b = parseInt(color.substring(5,6),16);

    return r + g + b;
}

updateDescriptionContainerBackground(initState.dotsOptions.color, initState.backgroundOptions.color);

nodesBinder.onStateUpdate(({ field, data }) => {
    const { image, ...state } = nodesBinder.getState();

    updateDescriptionContainerBackground(state.dotsOptions.color, state.backgroundOptions.color);

    if (field === "image") {
        if (data && data[0]) {
            getSrcFromFile(data[0], result => {
                qrCode.update({
                    image: result
                });
            });
        } else {
            qrCode.update({
                image: null
            });
        }
    }

    qrCode.update(state);
});

qrCode.append(document.getElementById("qr-code-generated"));

document.getElementById("button-cancel").onclick = () => {
    nodesBinder.setState({ image: new DataTransfer().files });
};

document.getElementById("button-default").onclick = () => {
    nodesBinder.setState({ image: new DataTransfer().files });
    qrCode.update({
        image: defaultImage
    });
};
