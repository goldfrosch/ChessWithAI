"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var white_king_png_1 = __importDefault(require("../assets/white/white_king.png"));
var white_queen_png_1 = __importDefault(require("../assets/white/white_queen.png"));
var white_bishop_png_1 = __importDefault(require("../assets/white/white_bishop.png"));
var white_rook_png_1 = __importDefault(require("../assets/white/white_rook.png"));
var white_knight_png_1 = __importDefault(require("../assets/white/white_knight.png"));
var white_pawn_png_1 = __importDefault(require("../assets/white/white_pawn.png"));
var black_king_png_1 = __importDefault(require("../assets/black/black_king.png"));
var black_queen_png_1 = __importDefault(require("../assets/black/black_queen.png"));
var black_bishop_png_1 = __importDefault(require("../assets/black/black_bishop.png"));
var black_rook_png_1 = __importDefault(require("../assets/black/black_rook.png"));
var black_knight_png_1 = __importDefault(require("../assets/black/black_knight.png"));
var black_pawn_png_1 = __importDefault(require("../assets/black/black_pawn.png"));
var bomb_png_1 = __importDefault(require("../assets/bomber/bomb.png"));
var ChessItemUtils = (function () {
    function ChessItemUtils() {
    }
    ChessItemUtils.prototype.GetItem = function (team, object) {
        if (team === "white") {
            switch (object) {
                case 1:
                    return white_pawn_png_1.default;
                case 9:
                    return white_knight_png_1.default;
                case 11:
                    return white_rook_png_1.default;
                case 13:
                    return white_bishop_png_1.default;
                case 30:
                    return white_queen_png_1.default;
                case 50:
                    return bomb_png_1.default;
                case 100:
                    return white_king_png_1.default;
            }
        }
        else {
            switch (object) {
                case 1:
                    return black_pawn_png_1.default;
                case 9:
                    return black_knight_png_1.default;
                case 11:
                    return black_rook_png_1.default;
                case 13:
                    return black_bishop_png_1.default;
                case 30:
                    return black_queen_png_1.default;
                case 50:
                    return bomb_png_1.default;
                case 100:
                    return black_king_png_1.default;
            }
        }
    };
    ChessItemUtils.prototype.CheckPawn = function (y, x, data) {
        var caughtData = [];
        var lineData = [];
        if (data[y][x].team === "white") {
            if (y !== 0) {
                if (x < 7) {
                    if (data[y - 1][x + 1].object > 0 &&
                        data[y - 1][x + 1].team !== "white") {
                        caughtData.push([y - 1, x + 1]);
                    }
                }
                if (x > 0) {
                    if (data[y - 1][x - 1].object > 0 &&
                        data[y - 1][x - 1].team !== "white") {
                        caughtData.push([y - 1, x - 1]);
                    }
                }
                if (y === 6) {
                    for (var i = 1; i <= 2; i++) {
                        if (data[y - i][x].object >= 1) {
                            break;
                        }
                        else {
                            lineData.push([y - i, x]);
                        }
                    }
                }
                else {
                    if (data[y - 1][x].object >= 1) {
                    }
                    else {
                        lineData.push([y - 1, x]);
                    }
                }
            }
        }
        else if (data[y][x].team === "black") {
            if (y !== 7) {
                if (x < 7) {
                    if (data[y + 1][x + 1].object > 0 &&
                        data[y + 1][x + 1].team !== "black") {
                        caughtData.push([y + 1, x + 1]);
                    }
                }
                if (x > 0) {
                    if (data[y + 1][x - 1].object > 0 &&
                        data[y + 1][x - 1].team !== "black") {
                        caughtData.push([y + 1, x - 1]);
                    }
                }
                if (y === 1) {
                    for (var i = 1; i <= 2; i++) {
                        if (data[y + i][x].object >= 1) {
                            break;
                        }
                        else {
                            lineData.push([y + i, x]);
                        }
                    }
                }
                else {
                    if (data[y + 1][x].object >= 1) {
                    }
                    else {
                        lineData.push([y + 1, x]);
                    }
                }
            }
        }
        var result = [];
        result[0] = lineData;
        result[1] = caughtData;
        return result;
    };
    ChessItemUtils.prototype.CheckKnight = function (y, x, data, team) {
        var moveList = [
            [1, 2],
            [1, -2],
            [-1, 2],
            [-1, -2],
            [2, 1],
            [2, -1],
            [-2, 1],
            [-2, -1],
        ];
        var caughtData = [];
        var lineData = [];
        for (var i = 0; i < moveList.length; i++) {
            if (y + moveList[i][0] < 0 ||
                x + moveList[i][1] < 0 ||
                y + moveList[i][0] > 7 ||
                x + moveList[i][1] > 7) {
                continue;
            }
            else {
                if (data[y + moveList[i][0]][x + moveList[i][1]].object > 0) {
                    if (data[y + moveList[i][0]][x + moveList[i][1]].team !== team) {
                        caughtData.push([y + moveList[i][0], x + moveList[i][1]]);
                    }
                }
                else {
                    lineData.push([y + moveList[i][0], x + moveList[i][1]]);
                }
            }
        }
        var result = [];
        result[0] = lineData;
        result[1] = caughtData;
        return result;
    };
    ChessItemUtils.prototype.CheckLine = function (move, y, x, data, team) {
        var caughtData = [];
        var lineData = [];
        for (var i = 1; i <= move; i++) {
            if (y - i >= 0) {
                if (data[y - i][x].object > 0) {
                    if (data[y - i][x].team !== team) {
                        caughtData.push([y - i, x]);
                    }
                    break;
                }
                else {
                    lineData.push([y - i, x]);
                }
            }
            else
                break;
        }
        for (var i = 1; i <= move; i++) {
            if (y + i <= 7) {
                if (data[y + i][x].object > 0) {
                    if (data[y + i][x].team !== team) {
                        caughtData.push([y + i, x]);
                    }
                    break;
                }
                else {
                    lineData.push([y + i, x]);
                }
            }
            else
                break;
        }
        for (var i = 1; i <= move; i++) {
            if (x - i >= 0) {
                if (data[y][x - i].object > 0) {
                    if (data[y][x - i].team !== team) {
                        caughtData.push([y, x - i]);
                    }
                    break;
                }
                else {
                    lineData.push([y, x - i]);
                }
            }
            else
                break;
        }
        for (var i = 1; i <= move; i++) {
            if (x + i <= 7) {
                if (data[y][x + i].object > 0) {
                    if (data[y][x + i].team !== team) {
                        caughtData.push([y, x + i]);
                    }
                    break;
                }
                else {
                    lineData.push([y, x + i]);
                }
            }
            else
                break;
        }
        var result = [];
        result[0] = lineData;
        result[1] = caughtData;
        return result;
    };
    ChessItemUtils.prototype.CheckDiag = function (move, y, x, data, team) {
        var caughtData = [];
        var lineData = [];
        for (var i = 1; i <= move; i++) {
            if (y - i >= 0 && x + i <= 7) {
                if (data[y - i][x + i].object > 0) {
                    if (data[y - i][x + i].team !== team) {
                        caughtData.push([y - i, x + i]);
                    }
                    break;
                }
                else {
                    lineData.push([y - i, x + i]);
                }
            }
        }
        for (var i = 1; i <= move; i++) {
            if (y - i >= 0 && x - i >= 0) {
                if (data[y - i][x - i].object > 0) {
                    if (data[y - i][x - i].team !== team) {
                        caughtData.push([y - i, x - i]);
                    }
                    break;
                }
                else {
                    lineData.push([y - i, x - i]);
                }
            }
        }
        for (var i = 1; i <= move; i++) {
            if (y + i <= 7 && x + i <= 7) {
                if (data[y + i][x + i].object > 0) {
                    if (data[y + i][x + i].team !== team) {
                        caughtData.push([y + i, x + i]);
                    }
                    break;
                }
                else {
                    lineData.push([y + i, x + i]);
                }
            }
        }
        for (var i = 1; i <= move; i++) {
            if (y + i <= 7 && x - i >= 0) {
                if (data[y + i][x - i].object > 0) {
                    if (data[y + i][x - i].team !== team) {
                        caughtData.push([y + i, x - i]);
                    }
                    break;
                }
                else {
                    lineData.push([y + i, x - i]);
                }
            }
        }
        var result = [];
        result[0] = lineData;
        result[1] = caughtData;
        return result;
    };
    return ChessItemUtils;
}());
exports.default = new ChessItemUtils();
//# sourceMappingURL=ChessItemUtils.js.map