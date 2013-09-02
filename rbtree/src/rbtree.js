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
            this._rootNode = new Node(undefined, Color.BLACK, key, value);
        } else {
            recursiveAdd(this._rootNode, new Node(this._rootNode, Color.RED, key, value));
        }
    };

    var recursiveAdd = function(toNode, node) {
        if (node.key !== toNode.key) {
            if (node.key > toNode.key) {
                if (toNode.rightChild === undefined) {
                    toNode.rightChild = node;
                    RbTreeUtils.restoreInvariants(node);
                } else {
                    recursiveAdd(toNode.rightChild, node);
                }
            } else {
                if (toNode.leftChild === undefined) {
                    toNode.leftChild = node;
                    RbTreeUtils.restoreInvariants(node);
                } else {
                    recursiveAdd(toNode.leftChild, node);
                }
            }
        }
    };

    return Constructor;
})();

var Node = (function() {

    var Constructor = function(parent, color, key, value) {
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

var RbTreeUtils = (function() {
    var Constructor = function() { throw new Error("It's impossible to instantiate utils class") };

    Constructor.leftRotation = function(node) {
        var rightChild = node.rightChild;
        if (rightChild === undefined) {
            throw new Error("Left rotation is denied");
        }
        var parent = node.parent;
        if (parent !== undefined) {
            if (parent.rightChild === node) {
                parent.rightChild = rightChild;
            } else {
                parent.leftChild = rightChild;
            }
        }
        rightChild.parent = parent;
        var tmp = rightChild.leftChild;
        rightChild.leftChild = node;
        node.rightChild = tmp;
        node.parent = rightChild;
    };

    Constructor.rightRotation = function(node) {
        var leftChild = node.leftChild;
        if (leftChild === undefined) {
            throw new Error("Right rotation is denied");
        }
        var parent = node.parent;
        if (parent !== undefined) {
            if (parent.rightChild === node) {
                parent.rightChild = leftChild;
            } else {
                parent.leftChild = leftChild;
            }
        }
        leftChild.parent = parent;
        var tmp = leftChild.rightChild;
        leftChild.rightChild = node;
        node.leftChild = tmp;
        node.parent = leftChild;
    };

    Constructor.getUncle = function(node) {
        var parent = node.parent;
        var grandfather = parent.parent;
        if (parent === grandfather.rightChild) {
            return grandfather.leftChild;
        } else {
            return grandfather.rightChild;
        }
    };
    Constructor.restoreInvariants = function(newNode) {
        if (newNode.parent.color === Color.RED) {
            if (isUncleAndParentAreRed(newNode)) {
                case3(newNode);
            } else if (isUncleBlackAndNewNodeAndParentIsNotSameTypeOfChild(newNode)) {
                case4(newNode);
            } else if (isUncleBlackAndNewNodeAndParentIsSameTypeOfChild(newNode)) {
                case5(newNode);
            }
        }
    }

    var isUncleAndParentAreRed = function(newNode) {
        var uncle = Constructor.getUncle(newNode);
        return newNode.parent.color === Color.RED && uncle.color === Color.RED;
    }

    var isUncleBlackAndNewNodeAndParentIsSameTypeOfChild = function(newNode) {
        var uncle = Constructor.getUncle(newNode);
        var parent = newNode.parent;
        var grandfather = parent.parent;
        return (uncle.color === Color.BLACK &&
            ((grandfather.leftChild === parent && parent.leftChild === newNode) || (grandfather.rightChild === parent && parent.rightChild === newNode)))
    }

    var isUncleBlackAndNewNodeAndParentIsNotSameTypeOfChild = function(newNode) {
        var uncle = Constructor.getUncle(newNode);
        var parent = newNode.parent;
        var grandfather = parent.parent;
        return (uncle.color === Color.BLACK &&
            ((grandfather.leftChild === parent && parent.rightChild === newNode) || (grandfather.rightChild === parent && parent.leftChild === newNode)));
    }

    var case3 = function(newNode) {
        newNode.parent.color = Color.BLACK;
        Constructor.getUncle(newNode).color = Color.BLACK;
        var grandfather = newNode.parent.parent;
        if (grandfather.parent === undefined) {
            grandfather.color = Color.BLACK;
        } else {
            grandfather.color = Color.RED;
        }
    }

    var case4 = function (newNode) {
        var parent = newNode.parent;
        var grandfather = parent.parent;
        if (newNode === parent.rightChild && parent === grandfather.leftChild) {
            Constructor.leftRotation(parent);
        } else {
            Constructor.rightRotation(parent);
        }
        case5(parent);
    };

    var case5 = function(newNode) {
        var parent = newNode.parent;
        var grandfather = parent.parent;
        if (newNode === parent.leftChild && parent === grandfather.leftChild) {
            Constructor.rightRotation(grandfather);
        } else {
            Constructor.leftRotation(grandfather);
        }
        grandfather.color = Color.RED;
        parent.color = Color.BLACK;
    }

    return Constructor;
})();