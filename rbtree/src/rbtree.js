var RbTree = (function() {

    var Constructor = function(rootNode) {
        this._rootNode = rootNode;
    };

    Constructor.prototype.get = function(key) {
        if (this._rootNode !== undefined) {
            return recursiveFind(this._rootNode, key);
        }
    };

    var recursiveFind = function(fromNode, key) {
        if (fromNode.key === key) {
            return fromNode.value;
        } else if (key < fromNode.key && fromNode.leftChild) {
            return recursiveFind(fromNode.leftChild, key);
        } else if (key > fromNode.key && fromNode.rightChild) {
            return recursiveFind(fromNode.rightChild, key);
        }
    };

    Constructor.prototype.add = function(key, value) {
        if (this._rootNode === undefined) {
            this._rootNode = new Node(undefined, key, value, Color.BLACK);
        } else {
            recursiveAdd(this._rootNode, new Node(this._rootNode, key, value, Color.RED));
        }
    };

    var recursiveAdd = function(toNode, node) {
        if (node.key !== toNode.key) {
            if (node.key > toNode.key) {
                if (toNode.rightChild === undefined) {
                    toNode.rightChild = node;
                    restoreInvariants(node);
                } else {
                    recursiveAdd(toNode.rightChild, node);
                }
            } else {
                if (toNode.leftChild === undefined) {
                    toNode.leftChild = node;
                    restoreInvariants(node);
                } else {
                    recursiveAdd(toNode.leftChild, node);
                }
            }
        }
    };

    var restoreInvariants = function(node) {
        while (isNotRootNodeAndHasRedParent(node)) {
            var uncle = getUncle(node);
            if(uncle !== undefined && uncle.color === Color.RED) {
                node.color = Color.BLACK;
                node.parent.color = Color.BLACK;
            } else {

            }
            node = node.parent.parent;
        }
    };

    var isNotRootNodeAndHasRedParent = function(node) {
        return node.parent !== undefined && node.parent.color === Color.RED;
    };

    var getUncle = function(node) {
        var parent = node.parent;
        var grandfather = parent.parent;
        if (parent === grandfather.rightChild) {
            return grandfather.leftChild;
        } else {
            return grandfather.rightChild;
        }
    };

    var leftRotation = function(node) {
        var rightChild = node.rightChild;
        if (rightChild === undefined) {
            throw new Error("Left rotation is denied");
        }
        var parent = node.parent;
        if (parent.rightChild === node) {
            parent.rightChild = rightChild;
        } else {
            parent.leftChild = rightChild;
        }
        var tmp = rightChild.leftChild;
        rightChild.leftChild = node;
        node.rightChild = tmp;
    };

    var rightRotation = function(node) {
        var leftChild = node.leftChild;
        if (leftChild === undefined) {
            throw new Error("Right rotation is denied");
        }
        var parent = node.parent;
        if (parent.rightChild === node) {
            parent.rightChild = leftChild;
        } else {
            parent.leftChild = leftChild;
        }
        var tmp = leftChild.rightChild;
        leftChild.rightChild = node;
        node.rightChild = tmp;
    };

    return Constructor;
})();

var Node = (function() {

    var Constructor = function(parent, key, value, color) {
        this.parent = parent;
        this.key = key;
        this.value = value;
        this.color = color;
    };

    return Constructor;
})();

var Color = {
    BLACK: 1,
    RED: 2
};