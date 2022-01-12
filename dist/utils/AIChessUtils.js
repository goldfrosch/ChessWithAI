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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ChessItemUtils_1 = __importDefault(require("./ChessItemUtils"));
var AIChessUtils = (function () {
    function AIChessUtils() {
    }
    AIChessUtils.prototype.CheckAI = function (data) {
        var AIData = {
            select: [0, 0],
            target: [0, 0],
            selectScore: 0,
            targetScore: 0,
        };
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < data[i].length; j++) {
                var newAIData = {
                    select: [0, 0],
                    target: [0, 0],
                    selectScore: 0,
                    targetScore: 0,
                };
                if (data[i][j].team === "black") {
                    if (data[i][j].object === 100) {
                        newAIData = this.GetGridData(i, j, ChessItemUtils_1.default.CheckDiag(1, i, j, data, "black")[1], data);
                        if (newAIData.targetScore >= AIData.targetScore) {
                            AIData = newAIData;
                        }
                        newAIData = this.GetGridData(i, j, ChessItemUtils_1.default.CheckLine(1, i, j, data, "black")[1], data);
                        if (newAIData.targetScore >= AIData.targetScore) {
                            AIData = newAIData;
                        }
                    }
                    if (data[i][j].object === 30) {
                        newAIData = this.GetGridData(i, j, ChessItemUtils_1.default.CheckDiag(7, i, j, data, "black")[1], data);
                        if (newAIData.targetScore >= AIData.targetScore) {
                            AIData = newAIData;
                        }
                        newAIData = this.GetGridData(i, j, ChessItemUtils_1.default.CheckLine(7, i, j, data, "black")[1], data);
                        if (newAIData.targetScore >= AIData.targetScore) {
                            AIData = newAIData;
                        }
                    }
                    if (data[i][j].object === 13) {
                        newAIData = this.GetGridData(i, j, ChessItemUtils_1.default.CheckDiag(7, i, j, data, "black")[1], data);
                        if (newAIData.targetScore >= AIData.targetScore) {
                            AIData = newAIData;
                        }
                    }
                    if (data[i][j].object === 11) {
                        newAIData = this.GetGridData(i, j, ChessItemUtils_1.default.CheckLine(7, i, j, data, "black")[1], data);
                        if (newAIData.targetScore >= AIData.targetScore) {
                            AIData = newAIData;
                        }
                    }
                    if (data[i][j].object === 9) {
                        newAIData = this.GetGridData(i, j, ChessItemUtils_1.default.CheckKnight(i, j, data, "black")[1], data);
                        if (newAIData.targetScore >= AIData.targetScore) {
                            AIData = newAIData;
                        }
                    }
                    if (data[i][j].object === 1) {
                        newAIData = this.GetGridData(i, j, ChessItemUtils_1.default.CheckPawn(i, j, data)[1], data);
                        if (newAIData.targetScore >= AIData.targetScore) {
                            AIData = newAIData;
                        }
                    }
                }
            }
        }
        if (AIData.targetScore <= 0) {
            for (var i = 0; i < data.length; i++) {
                for (var j = 0; j < data[i].length; j++) {
                    var newAIData = {
                        select: [0, 0],
                        target: [0, 0],
                        selectScore: 0,
                        targetScore: 0,
                    };
                    if (data[i][j].team === "black") {
                        if (data[i][j].object === 100) {
                            newAIData = this.GetGridData(i, j, ChessItemUtils_1.default.CheckDiag(1, i, j, data, "black")[0], data);
                            var CheckData = ChessItemUtils_1.default.CheckDiag(1, i, j, data, "black")[0];
                            for (var k = 0; k < CheckData.length; k++) {
                                if (CheckData[k][0] - newAIData.select[0] < 4) {
                                    newAIData = __assign(__assign({}, newAIData), { targetScore: 0.1, target: [CheckData[k][0], CheckData[k][1]] });
                                }
                                else {
                                    newAIData = __assign(__assign({}, newAIData), { targetScore: 0.1, target: [CheckData[k][0], CheckData[k][1]] });
                                }
                                if (AIData.targetScore <= newAIData.targetScore) {
                                    AIData = newAIData;
                                }
                            }
                        }
                        if (data[i][j].object === 30) {
                            newAIData = this.GetGridData(i, j, ChessItemUtils_1.default.CheckDiag(7, i, j, data, "black")[0], data);
                            var CheckData = ChessItemUtils_1.default.CheckDiag(7, i, j, data, "black")[0];
                            for (var k = 0; k < CheckData.length; k++) {
                                if (CheckData[k][0] - newAIData.select[0] < 4) {
                                    newAIData = __assign(__assign({}, newAIData), { targetScore: 3 + 1 * (CheckData[k][0] - newAIData.select[0]), target: [CheckData[k][0], CheckData[k][1]] });
                                }
                                else {
                                    newAIData = __assign(__assign({}, newAIData), { targetScore: 5 - 1 * (CheckData[k][0] - newAIData.select[0]), target: [CheckData[k][0], CheckData[k][1]] });
                                }
                                if (AIData.targetScore <= newAIData.targetScore) {
                                    AIData = newAIData;
                                }
                            }
                            CheckData = ChessItemUtils_1.default.CheckLine(7, i, j, data, "black")[0];
                            for (var k = 0; k < CheckData.length; k++) {
                                if (CheckData[k][0] - newAIData.select[0] < 4) {
                                    newAIData = __assign(__assign({}, newAIData), { targetScore: 4 + 4 * (CheckData[k][0] - newAIData.select[0]), target: [CheckData[k][0], CheckData[k][1]] });
                                }
                                else {
                                    newAIData = __assign(__assign({}, newAIData), { targetScore: 8 - 1 * (CheckData[k][0] - newAIData.select[0]), target: [CheckData[k][0], CheckData[k][1]] });
                                }
                                if (AIData.targetScore <= newAIData.targetScore) {
                                    AIData = newAIData;
                                }
                            }
                        }
                        if (data[i][j].object === 13) {
                            newAIData = this.GetGridData(i, j, ChessItemUtils_1.default.CheckDiag(7, i, j, data, "black")[0], data);
                            var CheckData = ChessItemUtils_1.default.CheckDiag(7, i, j, data, "black")[0];
                            for (var k = 0; k < CheckData.length; k++) {
                                if (CheckData[k][0] - newAIData.select[0] < 4) {
                                    newAIData = __assign(__assign({}, newAIData), { targetScore: 5 + 3 * (CheckData[k][0] - newAIData.select[0]), target: [CheckData[k][0], CheckData[k][1]] });
                                }
                                else {
                                    newAIData = __assign(__assign({}, newAIData), { targetScore: 10 - 2 * (CheckData[k][0] - newAIData.select[0]), target: [CheckData[k][0], CheckData[k][1]] });
                                }
                                if (AIData.targetScore <= newAIData.targetScore) {
                                    AIData = newAIData;
                                }
                            }
                        }
                        if (data[i][j].object === 11) {
                            newAIData = this.GetGridData(i, j, ChessItemUtils_1.default.CheckLine(7, i, j, data, "black")[0], data);
                            var CheckData = ChessItemUtils_1.default.CheckLine(7, i, j, data, "black")[0];
                            for (var k = 0; k < CheckData.length; k++) {
                                if (CheckData[k][0] - newAIData.select[0] < 4) {
                                    newAIData = __assign(__assign({}, newAIData), { targetScore: 5 + 3 * (CheckData[k][0] - newAIData.select[0]), target: [CheckData[k][0], CheckData[k][1]] });
                                }
                                else {
                                    newAIData = __assign(__assign({}, newAIData), { targetScore: 10 - 2 * (CheckData[k][0] - newAIData.select[0]), target: [CheckData[k][0], CheckData[k][1]] });
                                }
                                if (AIData.targetScore <= newAIData.targetScore) {
                                    AIData = newAIData;
                                }
                            }
                        }
                        if (data[i][j].object === 9) {
                            newAIData = this.GetGridData(i, j, ChessItemUtils_1.default.CheckKnight(i, j, data, "black")[0], data);
                            var CheckData = ChessItemUtils_1.default.CheckKnight(i, j, data, "black")[0];
                            var randomCheck = Math.floor(Math.random() * CheckData.length);
                            newAIData = __assign(__assign({}, newAIData), { target: [CheckData[randomCheck][0], CheckData[randomCheck][1]], targetScore: 40 });
                            if (AIData.targetScore <= newAIData.targetScore) {
                                AIData = newAIData;
                            }
                        }
                        if (data[i][j].object === 1) {
                            newAIData = this.GetGridData(i, j, ChessItemUtils_1.default.CheckPawn(i, j, data)[0], data);
                            var CheckData = ChessItemUtils_1.default.CheckPawn(i, j, data)[0];
                            for (var k = 0; k < CheckData.length; k++) {
                                if (CheckData[k][0] - newAIData.select[0] === 1) {
                                    newAIData = __assign(__assign({}, newAIData), { targetScore: 30, target: [CheckData[k][0], CheckData[k][1]] });
                                }
                                else if (CheckData[k][0] - newAIData.select[0] === 2) {
                                    newAIData = __assign(__assign({}, newAIData), { targetScore: 100, target: [CheckData[k][0], CheckData[k][1]] });
                                }
                                if (AIData.targetScore <= newAIData.targetScore) {
                                    AIData = newAIData;
                                }
                            }
                        }
                    }
                }
            }
        }
        console.log(AIData);
        return AIData;
    };
    AIChessUtils.prototype.CheckIfIDied = function (data, location) {
        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < data[i].length; j++) {
                if (data[i][j].team === "white") {
                    console.log(data[i][j]);
                }
            }
        }
    };
    AIChessUtils.prototype.GetGridData = function (selectY, selectX, target, data) {
        var AIData = {
            select: [0, 0],
            target: [0, 0],
            selectScore: 0,
            targetScore: 0,
        };
        var setData = function (i) {
            AIData = {
                select: [selectY, selectX],
                target: [target[i][0], target[i][1]],
                selectScore: data[selectY][selectX].object,
                targetScore: data[target[i][0]][target[i][1]].object,
            };
        };
        for (var i = 0; i < target.length; i++) {
            if (AIData.targetScore < data[target[i][0]][target[i][1]].object) {
                setData(i);
            }
            else if (AIData.targetScore === data[target[i][0]][target[i][1]].object) {
                if (AIData.selectScore < data[selectY][selectX].object) {
                    setData(i);
                }
            }
        }
        return AIData;
    };
    return AIChessUtils;
}());
exports.default = new AIChessUtils();
//# sourceMappingURL=AIChessUtils.js.map