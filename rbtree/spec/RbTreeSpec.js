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
});
