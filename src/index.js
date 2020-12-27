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

delete initState.dotsOptions.gradient;

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
    const { image, imageUrl, dotsOptionsHelper, cornersSquareOptionsHelper, cornersDotOptionsHelper, backgroundOptionsHelper, ...state } = nodesBinder.getState();

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

    if (field === "dotsOptionsHelper.colorType.gradient" && data) {
        const showElements = document.getElementsByClassName("dotsOptionsHelper.colorType.gradient")
        const hideElements =document.getElementsByClassName("dotsOptionsHelper.colorType.single")

        Array.from(showElements).forEach((element) => {
            element.style.visibility = "visible";
            element.style.height = "auto";
        });

        Array.from(hideElements).forEach((element) => {
            element.style.visibility = "hidden";
            element.style.height = "0";
        });

        qrCode.update({
            dotsOptions: {
                color: undefined,
                gradient: {
                    type: dotsOptionsHelper.gradient.linear ? "linear" : "radial",
                    rotation: dotsOptionsHelper.gradient.rotation / 180 * Math.PI,
                    colorStops: [{
                        offset: 0,
                        color: dotsOptionsHelper.gradient.color1
                    }, {
                        offset: 1,
                        color: dotsOptionsHelper.gradient.color2
                    }]
                }
            }
        });
        return;
    }

    if (field === "dotsOptionsHelper.colorType.single" && data) {
        const showElements = document.getElementsByClassName("dotsOptionsHelper.colorType.single")
        const hideElements =document.getElementsByClassName("dotsOptionsHelper.colorType.gradient")

        Array.from(showElements).forEach((element) => {
            element.style.visibility = "visible";
            element.style.height = "auto";
        });

        Array.from(hideElements).forEach((element) => {
            element.style.visibility = "hidden";
            element.style.height = "0";
        });

        qrCode.update({
            dotsOptions: {
                color: state.dotsOptions.color,
                gradient: null
            }
        });
        return;
    }

    if (field === "dotsOptionsHelper.gradient.linear" && data) {
        qrCode.update({
            dotsOptions: {
                gradient: {
                    type: "linear"
                }
            }
        });
        return;
    }

    if (field === "dotsOptionsHelper.gradient.radial" && data) {
        qrCode.update({
            dotsOptions: {
                gradient: {
                    type: "radial"
                }
            }
        });
        return;
    }

    if (field === "dotsOptionsHelper.gradient.color1") {
        qrCode.update({
            dotsOptions: {
                gradient: {
                    colorStops: [{
                        offset: 0,
                        color: data
                    }, {
                        offset: 1,
                        color: dotsOptionsHelper.gradient.color2
                    }]
                }
            }
        });
        return;
    }

    if (field === "dotsOptionsHelper.gradient.color2") {
        qrCode.update({
            dotsOptions: {
                gradient: {
                    colorStops: [{
                        offset: 0,
                        color: dotsOptionsHelper.gradient.color1
                    }, {
                        offset: 1,
                        color: data
                    }]
                }
            }
        });
        return;
    }

    if (field === "dotsOptionsHelper.gradient.rotation") {
        qrCode.update({
            dotsOptions: {
                gradient: {
                    rotation: dotsOptionsHelper.gradient.rotation / 180 * Math.PI,
                }
            }
        });
        return;
    }


    if (field === "cornersSquareOptionsHelper.colorType.gradient" && data) {
        const showElements = document.getElementsByClassName("cornersSquareOptionsHelper.colorType.gradient")
        const hideElements =document.getElementsByClassName("cornersSquareOptionsHelper.colorType.single")

        Array.from(showElements).forEach((element) => {
            element.style.visibility = "visible";
            element.style.height = "auto";
        });

        Array.from(hideElements).forEach((element) => {
            element.style.visibility = "hidden";
            element.style.height = "0";
        });

        qrCode.update({
            cornersSquareOptions: {
                color: undefined,
                gradient: {
                    type: cornersSquareOptionsHelper.gradient.linear ? "linear" : "radial",
                    rotation: cornersSquareOptionsHelper.gradient.rotation / 180 * Math.PI,
                    colorStops: [{
                        offset: 0,
                        color: cornersSquareOptionsHelper.gradient.color1
                    }, {
                        offset: 1,
                        color: cornersSquareOptionsHelper.gradient.color2
                    }]
                }
            }
        });
        return;
    }

    if (field === "cornersSquareOptionsHelper.colorType.single" && data) {
        const showElements = document.getElementsByClassName("cornersSquareOptionsHelper.colorType.single")
        const hideElements =document.getElementsByClassName("cornersSquareOptionsHelper.colorType.gradient")

        Array.from(showElements).forEach((element) => {
            element.style.visibility = "visible";
            element.style.height = "auto";
        });

        Array.from(hideElements).forEach((element) => {
            element.style.visibility = "hidden";
            element.style.height = "0";
        });

        qrCode.update({
            cornersSquareOptions: {
                color: state.cornersSquareOptions.color,
                gradient: null
            }
        });
        return;
    }

    if (field === "cornersSquareOptionsHelper.gradient.linear" && data) {
        qrCode.update({
            cornersSquareOptions: {
                gradient: {
                    type: "linear"
                }
            }
        });
        return;
    }

    if (field === "cornersSquareOptionsHelper.gradient.radial" && data) {
        qrCode.update({
            cornersSquareOptions: {
                gradient: {
                    type: "radial"
                }
            }
        });
        return;
    }

    if (field === "cornersSquareOptionsHelper.gradient.color1") {
        qrCode.update({
            cornersSquareOptions: {
                gradient: {
                    colorStops: [{
                        offset: 0,
                        color: data
                    }, {
                        offset: 1,
                        color: cornersSquareOptionsHelper.gradient.color2
                    }]
                }
            }
        });
        return;
    }

    if (field === "cornersSquareOptionsHelper.gradient.color2") {
        qrCode.update({
            cornersSquareOptions: {
                gradient: {
                    colorStops: [{
                        offset: 0,
                        color: cornersSquareOptionsHelper.gradient.color1
                    }, {
                        offset: 1,
                        color: data
                    }]
                }
            }
        });
        return;
    }

    if (field === "cornersSquareOptionsHelper.gradient.rotation") {
        qrCode.update({
            cornersSquareOptions: {
                gradient: {
                    rotation: cornersSquareOptionsHelper.gradient.rotation / 180 * Math.PI,
                }
            }
        });
        return;
    }

    if (field === "cornersDotOptionsHelper.colorType.gradient" && data) {
        const showElements = document.getElementsByClassName("cornersDotOptionsHelper.colorType.gradient")
        const hideElements =document.getElementsByClassName("cornersDotOptionsHelper.colorType.single")

        Array.from(showElements).forEach((element) => {
            element.style.visibility = "visible";
            element.style.height = "auto";
        });

        Array.from(hideElements).forEach((element) => {
            element.style.visibility = "hidden";
            element.style.height = "0";
        });

        qrCode.update({
            cornersDotOptions: {
                color: undefined,
                gradient: {
                    type: cornersDotOptionsHelper.gradient.linear ? "linear" : "radial",
                    rotation: cornersDotOptionsHelper.gradient.rotation / 180 * Math.PI,
                    colorStops: [{
                        offset: 0,
                        color: cornersDotOptionsHelper.gradient.color1
                    }, {
                        offset: 1,
                        color: cornersDotOptionsHelper.gradient.color2
                    }]
                }
            }
        });
        return;
    }

    if (field === "cornersDotOptionsHelper.colorType.single" && data) {
        const showElements = document.getElementsByClassName("cornersDotOptionsHelper.colorType.single")
        const hideElements =document.getElementsByClassName("cornersDotOptionsHelper.colorType.gradient")

        Array.from(showElements).forEach((element) => {
            element.style.visibility = "visible";
            element.style.height = "auto";
        });

        Array.from(hideElements).forEach((element) => {
            element.style.visibility = "hidden";
            element.style.height = "0";
        });

        qrCode.update({
            cornersDotOptions: {
                color: state.cornersDotOptions.color,
                gradient: null
            }
        });
        return;
    }

    if (field === "cornersDotOptionsHelper.gradient.linear" && data) {
        qrCode.update({
            cornersDotOptions: {
                gradient: {
                    type: "linear"
                }
            }
        });
        return;
    }

    if (field === "cornersDotOptionsHelper.gradient.radial" && data) {
        qrCode.update({
            cornersDotOptions: {
                gradient: {
                    type: "radial"
                }
            }
        });
        return;
    }

    if (field === "cornersDotOptionsHelper.gradient.color1") {
        qrCode.update({
            cornersDotOptions: {
                gradient: {
                    colorStops: [{
                        offset: 0,
                        color: data
                    }, {
                        offset: 1,
                        color: cornersDotOptionsHelper.gradient.color2
                    }]
                }
            }
        });
        return;
    }

    if (field === "cornersDotOptionsHelper.gradient.color2") {
        qrCode.update({
            cornersDotOptions: {
                gradient: {
                    colorStops: [{
                        offset: 0,
                        color: cornersDotOptionsHelper.gradient.color1
                    }, {
                        offset: 1,
                        color: data
                    }]
                }
            }
        });
        return;
    }

    if (field === "cornersDotOptionsHelper.gradient.rotation") {
        qrCode.update({
            cornersDotOptions: {
                gradient: {
                    rotation: cornersDotOptionsHelper.gradient.rotation / 180 * Math.PI,
                }
            }
        });
        return;
    }



    if (field === "backgroundOptionsHelper.colorType.gradient" && data) {
        const showElements = document.getElementsByClassName("backgroundOptionsHelper.colorType.gradient")
        const hideElements =document.getElementsByClassName("backgroundOptionsHelper.colorType.single")

        Array.from(showElements).forEach((element) => {
            element.style.visibility = "visible";
            element.style.height = "auto";
        });

        Array.from(hideElements).forEach((element) => {
            element.style.visibility = "hidden";
            element.style.height = "0";
        });

        qrCode.update({
            backgroundOptions: {
                color: undefined,
                gradient: {
                    type: backgroundOptionsHelper.gradient.linear ? "linear" : "radial",
                    rotation: backgroundOptionsHelper.gradient.rotation / 180 * Math.PI,
                    colorStops: [{
                        offset: 0,
                        color: backgroundOptionsHelper.gradient.color1
                    }, {
                        offset: 1,
                        color: backgroundOptionsHelper.gradient.color2
                    }]
                }
            }
        });
        return;
    }

    if (field === "backgroundOptionsHelper.colorType.single" && data) {
        const showElements = document.getElementsByClassName("backgroundOptionsHelper.colorType.single")
        const hideElements =document.getElementsByClassName("backgroundOptionsHelper.colorType.gradient")

        Array.from(showElements).forEach((element) => {
            element.style.visibility = "visible";
            element.style.height = "auto";
        });

        Array.from(hideElements).forEach((element) => {
            element.style.visibility = "hidden";
            element.style.height = "0";
        });

        qrCode.update({
            backgroundOptions: {
                color: state.backgroundOptions.color,
                gradient: null
            }
        });
        return;
    }

    if (field === "backgroundOptionsHelper.gradient.linear" && data) {
        qrCode.update({
            backgroundOptions: {
                gradient: {
                    type: "linear"
                }
            }
        });
        return;
    }

    if (field === "backgroundOptionsHelper.gradient.radial" && data) {
        qrCode.update({
            backgroundOptions: {
                gradient: {
                    type: "radial"
                }
            }
        });
        return;
    }

    if (field === "backgroundOptionsHelper.gradient.color1") {
        qrCode.update({
            backgroundOptions: {
                gradient: {
                    colorStops: [{
                        offset: 0,
                        color: data
                    }, {
                        offset: 1,
                        color: backgroundOptionsHelper.gradient.color2
                    }]
                }
            }
        });
        return;
    }

    if (field === "backgroundOptionsHelper.gradient.color2") {
        qrCode.update({
            backgroundOptions: {
                gradient: {
                    colorStops: [{
                        offset: 0,
                        color: backgroundOptionsHelper.gradient.color1
                    }, {
                        offset: 1,
                        color: data
                    }]
                }
            }
        });
        return;
    }

    if (field === "backgroundOptionsHelper.gradient.rotation") {
        qrCode.update({
            backgroundOptions: {
                gradient: {
                    rotation: backgroundOptionsHelper.gradient.rotation / 180 * Math.PI,
                }
            }
        });
        return;
    }


    qrCode.update(state);
});

const qrContainer = document.getElementById("qr-code-generated");

qrCode.append(qrContainer);

document.getElementById("button-cancel").onclick = () => {
    nodesBinder.setState({ image: new DataTransfer().files });
};

document.getElementById("button-clear-corners-square-color").onclick = () => {
    const state = nodesBinder.getState();
    nodesBinder.setState({ cornersSquareOptions: {
        color: state.dotsOptions.color
    }});
};

document.getElementById("button-clear-corners-dot-color").onclick = () => {
    const state = nodesBinder.getState();
    nodesBinder.setState({ cornersDotOptions: {
        color: state.dotsOptions.color
    }});
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