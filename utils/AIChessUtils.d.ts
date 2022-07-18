import { ChessType, IChessAIOption } from "../types/ChessType";
declare class AIChessUtils {
    CheckAI(data: ChessType[][]): IChessAIOption;
    CheckIfIDied(data: ChessType[][], location: number[]): void;
    GetGridData(selectY: number, selectX: number, target: number[][], data: ChessType[][]): IChessAIOption;
}
declare const _default: AIChessUtils;
export default _default;
