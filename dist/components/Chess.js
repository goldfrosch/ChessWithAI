"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ChessItem_1 = require("../constants/ChessItem");
var react_1 = __importStar(require("react"));
require("../style.css");
var AIChessUtils_1 = __importDefault(require("../utils/AIChessUtils"));
var ChessItemUtils_1 = __importDefault(require("../utils/ChessItemUtils"));
var Chess = function () {
    var _a = (0, react_1.useState)(__spreadArray([], ChessItem_1.ChessBoardItems, true)), chessBoard = _a[0], setChessBoard = _a[1];
    var _b = (0, react_1.useState)({
        whiteScore: 0,
        blackScore: 0,
        isBomb: false,
    }), gameData = _b[0], setGameData = _b[1];
    var _c = (0, react_1.useState)(true), isTurn = _c[0], setIsTurn = _c[1];
    var _d = (0, react_1.useState)(0), moveNum = _d[0], setMoveNum = _d[1];
    var _e = (0, react_1.useState)([-1, -1]), selected = _e[0], setSelected = _e[1];
    var _f = (0, react_1.useState)([]), line = _f[0], setLine = _f[1];
    var _g = (0, react_1.useState)([]), canCaught = _g[0], setCanCaught = _g[1];
    var ClickBoard = function (y, x) {
        if (isTurn) {
            var checkData = false;
            for (var i = 0; i < line.length; i++) {
                if (line[i][0] === y) {
                    if (line[i][1] === x) {
                        checkData = true;
                        break;
                    }
                }
            }
            for (var i = 0; i < canCaught.length; i++) {
                if (canCaught[i][0] === y) {
                    if (canCaught[i][1] === x) {
                        checkData = true;
                        break;
                    }
                }
            }
            if (checkData) {
                SwapBoard(y, x, selected[0], selected[1]);
                setMoveNum(moveNum + 1);
                setIsTurn(false);
                setTimeout(function () {
                    var AIData = AIChessUtils_1.default.CheckAI(chessBoard);
                    SwapBoard(AIData.target[0], AIData.target[1], AIData.select[0], AIData.select[1]);
                    setIsTurn(true);
                }, 1000);
            }
            else {
                SelectBoard(y, x);
            }
        }
    };
    var ClearBoard = function () {
        var data = chessBoard;
        if (selected[0] !== -1) {
            data[selected[0]][selected[1]].selected = false;
            for (var i = 0; i < line.length; i++) {
                data[line[i][0]][line[i][1]].isLine = false;
            }
            for (var i = 0; i < canCaught.length; i++) {
                data[canCaught[i][0]][canCaught[i][1]].canCaught = false;
            }
            setLine([]);
            setCanCaught([]);
        }
        setChessBoard(data);
    };
    var SwapBoard = function (selectY, selectX, nowY, nowX) {
        var data = chessBoard;
        var gameOption = gameData;
        if ((selectY === 0 || selectY === 7) &&
            chessBoard[nowY][nowX].object === 1) {
            if (data[selectY][selectX].object === 100) {
                console.log("킹을 잡아 게임이 종료됩니다");
                setIsTurn(false);
            }
            console.log("폰이 막바지에 다다라 퀸으로 진화합니다");
            data[selectY][selectX] = __assign(__assign({}, chessBoard[nowY][nowX]), { object: 30, selected: false });
        }
        else {
            if (data[selectY][selectX].object === 100) {
                console.log("킹을 잡아 게임이 종료됩니다");
                setIsTurn(false);
            }
            else if (data[selectY][selectX].object === 50) {
                if (data[nowY][nowX].object === 100) {
                    console.log("무승부로 게임이 종료됩니다");
                    setIsTurn(false);
                }
                for (var i = 0; i < chessBoard.length; i++) {
                    for (var j = 0; j < chessBoard[i].length; j++) {
                        if (data[nowY][nowX].object === data[i][j].object &&
                            data[nowY][nowX].team !== data[i][j].team) {
                            data[i][j] = {
                                object: 0,
                                selected: false,
                                isLine: false,
                                canCaught: false,
                                team: "",
                            };
                        }
                    }
                }
                data[nowY][nowX] = {
                    object: 0,
                    selected: false,
                    isLine: false,
                    canCaught: false,
                    team: "",
                };
                gameOption.isBomb = true;
                console.log("BOMB!");
            }
            if (chessBoard[nowY][nowX].team === "white") {
                var score = gameOption.whiteScore + chessBoard[selectY][selectX].object;
                gameOption = __assign(__assign({}, gameOption), { whiteScore: score });
            }
            else {
                var score = gameOption.blackScore + chessBoard[selectY][selectX].object;
                gameOption = __assign(__assign({}, gameOption), { blackScore: score });
            }
            data[selectY][selectX] = __assign(__assign({}, chessBoard[nowY][nowX]), { selected: false });
            if ((gameOption.blackScore > 20 || gameOption.whiteScore > 20) &&
                gameOption.isBomb === false) {
                while (true) {
                    var checkY = Math.random() * 3 + 3;
                    var checkX = Math.random() * 7;
                    if (data[Math.floor(checkY)][Math.floor(checkX)].object === 0) {
                        console.log("랜덤으로 폭탄이 생성되었습니다");
                        data[Math.floor(checkY)][Math.floor(checkX)].object = 50;
                        gameOption.isBomb = true;
                        break;
                    }
                }
            }
            setGameData(gameOption);
        }
        data[nowY][nowX] = {
            object: 0,
            selected: false,
            isLine: false,
            canCaught: false,
            team: "",
        };
        setChessBoard(__spreadArray([], data, true));
        ClearBoard();
    };
    var SelectBoard = function (y, x) {
        if (chessBoard[y][x].object !== 0 && chessBoard[y][x].team === "white") {
            var data = __spreadArray([], chessBoard, true);
            ClearBoard();
            if (selected[0] === y && selected[1] === x) {
                data[y][x].selected = false;
                setSelected([-1, -1]);
            }
            else {
                data[y][x].selected = true;
                setSelected([y, x]);
                var lineData = [];
                var caughtData = [];
                if (data[y][x].object === 1) {
                    lineData.push.apply(lineData, ChessItemUtils_1.default.CheckPawn(y, x, data)[0]);
                    caughtData.push.apply(caughtData, ChessItemUtils_1.default.CheckPawn(y, x, data)[1]);
                }
                if (data[y][x].object === 11 || data[y][x].object === 30) {
                    lineData.push.apply(lineData, ChessItemUtils_1.default.CheckLine(7, y, x, data, "white")[0]);
                    caughtData.push.apply(caughtData, ChessItemUtils_1.default.CheckLine(7, y, x, data, "white")[1]);
                }
                if (data[y][x].object === 13 || data[y][x].object === 30) {
                    lineData.push.apply(lineData, ChessItemUtils_1.default.CheckDiag(7, y, x, data, "white")[0]);
                    caughtData.push.apply(caughtData, ChessItemUtils_1.default.CheckDiag(7, y, x, data, "white")[1]);
                }
                if (data[y][x].object === 9) {
                    lineData.push.apply(lineData, ChessItemUtils_1.default.CheckKnight(y, x, data, data[y][x].team)[0]);
                    caughtData.push.apply(caughtData, ChessItemUtils_1.default.CheckKnight(y, x, data, data[y][x].team)[1]);
                }
                if (data[y][x].object === 100) {
                    lineData.push.apply(lineData, __spreadArray(__spreadArray([], ChessItemUtils_1.default.CheckLine(1, y, x, data, "white")[0], false), ChessItemUtils_1.default.CheckDiag(1, y, x, data, "white")[0], false));
                    caughtData.push.apply(caughtData, __spreadArray(__spreadArray([], ChessItemUtils_1.default.CheckLine(1, y, x, data, "white")[1], false), ChessItemUtils_1.default.CheckDiag(1, y, x, data, "white")[1], false));
                }
                for (var i = 0; i < lineData.length; i++) {
                    data[lineData[i][0]][lineData[i][1]].isLine = true;
                }
                for (var i = 0; i < caughtData.length; i++) {
                    data[caughtData[i][0]][caughtData[i][1]].canCaught = true;
                }
                setLine(__spreadArray([], lineData, true));
                setCanCaught(__spreadArray([], caughtData, true));
            }
        }
    };
    return (react_1.default.createElement("div", { className: "board" }, chessBoard.map(function (data, key) {
        return Math.floor(key % 8) % 2 === 0
            ? data.map(function (item, index) { return (react_1.default.createElement("div", { className: item.canCaught
                    ? "item caught"
                    : item.selected
                        ? "item selected"
                        : item.isLine
                            ? "item isLine"
                            : index % 2 === 0
                                ? "item black"
                                : "item white", key: index, onClick: function () { return ClickBoard(key, index); } },
                react_1.default.createElement("img", { src: ChessItemUtils_1.default.GetItem(item.team, item.object), className: item.team === "white" ? "team" : "", alt: "" }))); })
            : data.map(function (item, index) { return (react_1.default.createElement("div", { className: item.canCaught
                    ? "item caught"
                    : item.selected
                        ? "item selected"
                        : item.isLine
                            ? "item isLine"
                            : index % 2 === 0
                                ? "item white"
                                : "item black", key: index, onClick: function () { return ClickBoard(key, index); } },
                react_1.default.createElement("img", { src: ChessItemUtils_1.default.GetItem(item.team, item.object), alt: "" }))); });
    })));
};
exports.default = Chess;
//# sourceMappingURL=Chess.js.map