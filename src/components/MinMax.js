import {Tree, TreeNode} from "./Tree.js";

class minMaxTree extends Tree {
    constructor(grid, player, move = null) {
        super(grid)
        this.player = player
        this.root.cost = 0
        this.root.move = move
    }
}

function possibleMoves(grid) {
    const possibleMoves = grid.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
            if (cell === " ") return [rowIndex, colIndex];
            return null;
        })
    );
    return possibleMoves.flat().filter((cell) => cell !== null);
}

function createEmptyGrid() {
    let grid = [];
    for (let i = 0; i < 3; i++) {
        grid.push([" ", " ", " "]);
    }
    return grid;
}

function createChildren(grid, player) {
    const movesList = possibleMoves(grid)
    return movesList.map((move) => {
        let newGrid = createEmptyGrid()
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                newGrid[i][j] = grid[i][j]
            }
        }
        newGrid[move[0]][move[1]] = player
        return new TreeNode(newGrid, move)
    })
}

function checkRow(row, player) {
    const costs = [1, 3, 100]
    let cost = 0
    if (row.includes(player) && !row.includes(changePlayer(player))) {
        cost += costs[row.filter((cell) => cell === player).length]
    } else if (row.includes(changePlayer(player)) && !row.includes(player)) {
        cost -= costs[row.filter((cell) => cell === changePlayer(player)).length]
    }
    return cost
}

function checkColumns(grid, index, player) {
    let col = []
    for (let i = 0; i < 3; i++) {
        col.push(grid[i][index])
    }
    return checkRow(col, player)
}

function checkDiagonals(grid, player) {
    let diag1 = [grid[0][0], grid[1][1], grid[2][2]]
    let diag2 = [grid[0][2], grid[1][1], grid[2][0]]
    return checkRow(diag1, player) + checkRow(diag2, player)
}

function calculateCost(grid, player) {
    let cost = 0
    grid.forEach((row) => {
        cost += checkRow(row, player)
    })
    for (let i = 0; i < grid.length; i++) {
        cost += checkColumns(grid, i, player)
    }
    cost += checkDiagonals(grid, player)
    return cost
}

function buildMinMaxTree(grid, player, move = null) {
    const tree = new minMaxTree(grid, player, move)
    const root = tree.root
    let children = createChildren(root.value, tree.player)
    children.forEach((child) => {
        child.setCost(calculateCost(child.value, tree.player))
    })
    root.addChildren(children)
    extendMinMaxTree(tree, changePlayer(player))
    return tree
}

function extendMinMaxTree(tree, player) {
    const stack = [tree.root]
    let currentPlayer = player
    while (stack.length > 0) {
        const node = stack.pop()
        let children = createChildren(node.value, currentPlayer)
        children.forEach((child) => {
            child.setCost(calculateCost(child.value, tree.player))
        })
        node.addChildren(children)
        stack.push(...node.children)
        currentPlayer = changePlayer(currentPlayer)
    }
}

function changePlayer(player) {
    if (player === "X") return "O"
    else return "X"
}


function main() {
    let player = "X"
    const grid = createEmptyGrid()
    const tree = buildMinMaxTree(grid, player)
    console.log(tree)
}

main()