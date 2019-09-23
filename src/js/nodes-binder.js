import { flatToNested, nestedToFlat } from "./tools";

export default class NodesBinder {
    constructor({ root } = {}) {
        if (root) {
            this.init({ root });
        }
    }

    init({ root }) {
        const nodesArr = root.querySelectorAll(`[${this._getNodeKey()}]`);

        nodesArr.forEach(node => {
            this._setNodeListener(node);
        });

        this.nodes = this._buildNodes(nodesArr);
    }

    getState() {
        return this._buildState(this.nodes);
    }

    setState(updatedState) {
        const flatUpdatedState = nestedToFlat(updatedState);
        const paths = Object.keys(flatUpdatedState);

        paths.forEach(path => {
            this._setNodeState(this.nodes[path], flatUpdatedState[path]);
            this._getUpdateListener()({
                field: path,
                data: flatUpdatedState[path],
            });
        });

    }

    onStateUpdate(listener) {
        this.listener = listener;
    }

    _getUpdateListener() {
        return this.listener;
    }

    _getNodeState(node) {
        return node[this._getNodeStateKey(node)];
    }

    _setNodeState(node, data) {
        node[this._getNodeStateKey(node)] = data;
    }

    _getNodeKey() {
        return "node";
    }

    _getNodeStateKey(node) {
        return node.getAttribute("node-data-field") || "value";
    }

    _getChangeEventKey(node) {
        return node.getAttribute("node-change-event") || "onchange";
    }

    _buildState(nodes) {
        const paths = Object.keys(nodes);
        const flatState = {};

        paths.forEach(path => {
            flatState[path] = this._getNodeState(nodes[path]);
        });

        return flatToNested(flatState);
    }

    _buildNodes(nodesArray) {
        const flatNodes = {};

        nodesArray.forEach(node => {
            const statePath = node.getAttribute(this._getNodeKey());
            flatNodes[statePath] = node;
        });

        return flatNodes;
    }

    _setNodeListener(node) {
        const changeEvent = this._getChangeEventKey(node);

        node[changeEvent] = () => {
            this._getUpdateListener()({
                field: node.getAttribute(this._getNodeKey()),
                data: this._getNodeState(node),
            });
        }
    }
}