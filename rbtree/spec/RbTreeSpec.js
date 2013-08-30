describe("Red-black tree", function() {
    it("should instantiate", function() {
        var tree = new RbTree();
        expect(tree).toBeDefined();
    });

    it("should get element from tree", function() {
        var tree = new RbTree();
        expect(tree.get(1)).toBeUndefined();
    });

    it("should find element in left subtree", function() {
        var rootNode = new Node(undefined, 10, 'testVal1', Color.BLACK);
        var childNode = new Node(rootNode, 5, 'testVal2', Color.RED);
        rootNode.leftChild = childNode;

        var tree = new RbTree(rootNode);
        expect(tree.get(5)).toBe('testVal2');
    });

    it("should find element in right subtree", function() {
        var rootNode = new Node(undefined, 10, 'testVal1', Color.BLACK);
        var childNode = new Node(rootNode, 15, 'testVal2', Color.RED);
        rootNode.rightChild = childNode;

        var tree = new RbTree(rootNode);
        expect(tree.get(15)).toBe('testVal2');
    });

    it("should return undefined when element in right subtree not found", function() {
        var rootNode = new Node(undefined, 10, 'testVal1', Color.BLACK);
        var tree = new RbTree(rootNode);
        expect(tree.get(15)).toBeUndefined();
    });

    it("should return undefined when element in left subtree not found", function() {
        var rootNode = new Node(undefined, 10, 'testVal1', Color.BLACK);
        var tree = new RbTree(rootNode);
        expect(tree.get(5)).toBeUndefined();
    });

    it("should add root node into tree", function() {
        var tree = new RbTree();
        tree.add(1, "val");

        expect(tree.get(1)).toBe("val");
    });

    it("should add node into right subtree", function() {
        var tree = new RbTree();
        tree.add(1, "val1");
        tree.add(2, "val2");

        expect(tree.get(2)).toBe("val2");
    });

    it("should restore invariants after right violation", function() {
        var tree = new RbTree();
        tree.add(1, "root");
        tree.add(2, "first child");
        tree.add(3, "second child");
        tree.add(4, "third child");

        var rootNode = tree._rootNode;
        expect(rootNode.color).toBe(Color.BLACK);

        var secondChild = rootNode.rightChild;
        expect(secondChild.value).toBe("second child");
        expect(secondChild.color).toBe(Color.BLACK)

        var firstChild = secondChild.leftChild;
        expect(firstChild.value).toBe("first child");
        expect(firstChild.color).toBe(Color.RED);

        var thirdChild = secondChild.rightChild;
        expect(thirdChild.value).toBe("third child");
        expect(thirdChild.color).toBe(Color.RED);
    });

    it("should add node into left subtree", function() {
        var tree = new RbTree();
        tree.add(2, "val1");
        tree.add(1, "val2");

        expect(tree.get(1)).toBe("val2");
    });
});
