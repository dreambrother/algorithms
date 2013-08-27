var RbTree = (function() {

    var RbTree = function(rootNode) {
        this._rootNode = rootNode;
    }

    var recursiveFind = function(fromNode, key) {
        if (fromNode.key === key) {
            return fromNode.value;
        } else if (key < fromNode.key && fromNode.leftChild) {
            return recursiveFind(fromNode.leftChild, key);
        } else if (key > fromNode.key && fromNode.rightChild) {
            return recursiveFind(fromNode.rightChild, key);
        }
    }

    RbTree.prototype.get = function(key) {
        if (this._rootNode) {
            return recursiveFind(this._rootNode, key);
        }
    }

    return RbTree;
})();

var Node = (function() {

    var Node = function(parent, key, value, color) {
        this.parent = parent;
        this.key = key;
        this.value = value;
        this.color = color;
    };

    return Node;
})();

var Color = {
    BLACK: 1,
    RED: 2
};