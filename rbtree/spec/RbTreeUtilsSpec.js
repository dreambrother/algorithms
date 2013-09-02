describe("RbTreeUtils", function() {
    it("should make 'left rotate'", function() {
        var p = new Node();
        var plc = new Node(p);
        var prc = new Node(p);
        p.leftChild = plc;
        p.rightChild = prc;

        var lc = new Node(prc);
        var rc = new Node(prc);
        prc.leftChild = lc;
        prc.rightChild = rc;

        RbTreeUtils.leftRotation(p);

        expect(prc.parent).toBeUndefined();
        expect(prc.leftChild).toBe(p);
        expect(prc.rightChild).toBe(rc);
        expect(p.parent).toBe(prc);
        expect(p.leftChild).toBe(plc);
        expect(p.rightChild).toBe(lc);
    });

    it("should make 'right rotation'", function() {
        var p = new Node();
        var plc = new Node(p);
        var prc = new Node(p);
        p.leftChild = plc;
        p.rightChild = prc;

        var lc = new Node(plc);
        var rc = new Node(plc);
        plc.leftChild = lc;
        plc.rightChild = rc;

        RbTreeUtils.rightRotation(p);

        expect(plc.parent).toBeUndefined();
        expect(plc.leftChild).toBe(lc);
        expect(plc.rightChild).toBe(p);
        expect(p.parent).toBe(plc);
        expect(p.leftChild).toBe(rc);
        expect(p.rightChild).toBe(prc);
    });

    it("should get uncle", function() {
        var g = new Node();
        var p = new Node(g);
        var u = new Node(g);
        g.leftChild = p;
        g.rightChild = u;
        var c = new Node(p);
        p.leftChild = c;

        var result = RbTreeUtils.getUncle(c);

        expect(result).toBe(u);
    });

    it("should restore invariants when p - red, u - black and n and p are left childs", function() {
        var g = new Node(undefined, Color.BLACK);
        var p = new Node(g, Color.RED);
        var u = new Node(g, Color.BLACK);
        g.leftChild = p;
        g.rightChild = u;
        var n = new Node(p, Color.RED);
        p.leftChild = n;

        RbTreeUtils.restoreInvariants(n);

        expect(p.color).toBe(Color.BLACK);
        expect(p.parent).toBeUndefined();
        expect(p.leftChild).toBe(n);
        expect(p.rightChild).toBe(g);
    });

    it("should restore invariants when p - red, u - black and n and p are right childs", function() {
        var g = new Node(undefined, Color.BLACK);
        var p = new Node(g, Color.RED);
        var u = new Node(g, Color.BLACK);
        g.leftChild = u;
        g.rightChild = p;
        var n = new Node(p, Color.RED);
        p.rightChild = n;

        RbTreeUtils.restoreInvariants(n);

        expect(p.color).toBe(Color.BLACK);
        expect(p.parent).toBeUndefined();
        expect(p.leftChild).toBe(g);
        expect(p.rightChild).toBe(n);
    });

    it("should restore invariants when p - red, u - black and n is right child and p is left child", function() {
        var g = new Node(undefined, Color.BLACK);
        var p = new Node(g, Color.RED);
        var u = new Node(g, Color.BLACK);
        g.leftChild = p;
        g.rightChild = u;
        var n = new Node(p, Color.RED);
        p.rightChild = n;

        RbTreeUtils.restoreInvariants(n);

        expect(n.color).toBe(Color.BLACK);
        expect(n.parent).toBeUndefined();
        expect(n.leftChild).toBe(p);
        expect(p.color).toBe(Color.RED);
        expect(p.parent).toBe(n);
        expect(n.rightChild).toBe(g);
        expect(g.color).toBe(Color.RED);
        expect(g.parent).toBe(n);
        expect(g.rightChild).toBe(u);
        expect(u.color).toBe(Color.BLACK);
        expect(u.parent).toBe(g);
    });

    it("should restore invariants when p - red, u - black and n is left child and p is right child", function() {
        var g = new Node(undefined, Color.BLACK);
        var p = new Node(g, Color.RED);
        var u = new Node(g, Color.BLACK);
        g.leftChild = u;
        g.rightChild = p;
        var n = new Node(p, Color.RED);
        p.leftChild = n;

        RbTreeUtils.restoreInvariants(n);

        expect(n.color).toBe(Color.BLACK);
        expect(n.parent).toBeUndefined();
        expect(n.rightChild).toBe(p);
        expect(p.color).toBe(Color.RED);
        expect(p.parent).toBe(n);
        expect(n.leftChild).toBe(g);
        expect(g.color).toBe(Color.RED);
        expect(g.parent).toBe(n);
        expect(g.leftChild).toBe(u);
        expect(u.color).toBe(Color.BLACK);
        expect(u.parent).toBe(g);
    });

    it("should restore invariants when p and u are red", function() {
        var g = new Node(new Node(), Color.BLACK);
        var p = new Node(g, Color.RED);
        var u = new Node(g, Color.RED);
        g.leftChild = p;
        g.rightChild = u;
        var n = new Node(p, Color.RED);
        p.leftChild = n;

        RbTreeUtils.restoreInvariants(n);

        expect(g.color).toBe(Color.RED);
        expect(g.parent).toBeDefined();
        expect(g.leftChild).toBe(p);
        expect(g.rightChild).toBe(u);
        expect(p.parent).toBe(g);
        expect(u.parent).toBe(g);
        expect(p.color).toBe(Color.BLACK);
        expect(u.color).toBe(Color.BLACK);
        expect(p.leftChild).toBe(n);
        expect(n.color).toBe(Color.RED);
        expect(n.parent).toBe(p);
    });

    it("should color g black when p and u are red and g is root of the tree", function() {
        var g = new Node(undefined, Color.BLACK);
        var p = new Node(g, Color.RED);
        var u = new Node(g, Color.RED);
        g.leftChild = p;
        g.rightChild = u;
        var n = new Node(p, Color.RED);
        p.leftChild = n;

        RbTreeUtils.restoreInvariants(n);

        expect(g.color).toBe(Color.BLACK);
        expect(g.parent).toBeUndefined();
    });
});
