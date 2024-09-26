var Queen = function(config) {
    config.type = 'queen';
    Piece.call(this, config);
 };
 
 
 Queen.prototype = Object.create(Piece.prototype);
 Queen.prototype.constructor = Queen;
 
 
 Queen.prototype.isValidPosition = function(targetPosition) {
    let currentCol = this.position.charAt(0);
    let currentRow = parseInt(this.position.charAt(1));
    let targetCol = targetPosition.col;
    let targetRow = Number(targetPosition.row);
 
 
    // Calculate the column and row differences
    const colDiff = targetCol.charCodeAt(0) - currentCol.charCodeAt(0);
    const rowDiff = targetRow - currentRow;
 
 
    // Check for straight line movement (like a Rook)
    if (targetCol === currentCol || targetRow === currentRow) {
        // Horizontal or vertical movement
        const stepCol = targetCol === currentCol ? 0 : (colDiff > 0 ? 1 : -1);
        const stepRow = targetRow === currentRow ? 0 : (rowDiff > 0 ? 1 : -1);
 
 
        let col = currentCol.charCodeAt(0) + stepCol;
        let row = currentRow + stepRow;
 
 
        // Check for blocking pieces
        while (col !== targetCol.charCodeAt(0) || row !== targetRow) {
            if (this.board.getPieceAt({ col: String.fromCharCode(col), row: row })) {
                return false; // Path is blocked
            }
            col += stepCol;
            row += stepRow;
        }
        return true; // Valid rook move
    }
 
 
    // Check for diagonal movement (like a Bishop)
    if (Math.abs(rowDiff) === Math.abs(colDiff)) {
        const stepRow = rowDiff > 0 ? 1 : -1;
        const stepCol = colDiff > 0 ? 1 : -1;
 
 
        let row = currentRow + stepRow;
        let col = currentCol.charCodeAt(0) + stepCol;
 
 
        // Check for blocking pieces
        while (row !== targetRow && col !== targetCol.charCodeAt(0)) {
            if (this.board.getPieceAt({ col: String.fromCharCode(col), row: row })) {
                return false; // Path is blocked
            }
            row += stepRow;
            col += stepCol;
        }
        return true; // Valid bishop move
    }
 
 
    return false; // Invalid move
 }; 