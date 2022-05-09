export class TreeNode {
    constructor(value, move = null) {
        this.value = value;
        this.children = [];
        this.cost = 0;
        this.move = move;//The move that led to this node
    }

    setValue(value) {
        this.value = value;
    }

    addChild(child, move) {
        if (child instanceof TreeNode) {
            this.children.push(child);
        } else {
            this.children.push(new TreeNode(child, move));
        }
    }

    addChildren(children) {
        children.forEach(child => {
                this.addChild(child);
            }
        );
    }

    setCost(cost) {
        this.cost = cost;
    }
}

export class Tree {
    constructor(value) {
        if (value instanceof TreeNode) {
            this.root = value;
        } else {
            this.root = new TreeNode(value);
        }
    }
}


