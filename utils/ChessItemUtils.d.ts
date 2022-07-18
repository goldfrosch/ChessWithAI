import { ChessType } from "../types/ChessType";
declare class ChessItemUtils {
    GetItem(team: "black" | "white" | "", object: number): string | undefined;
    CheckPawn(y: number, x: number, data: ChessType[][]): number[][][];
    CheckKnight(y: number, x: number, data: ChessType[][], team: "black" | "white" | ""): number[][][];
    CheckLine(move: number, y: number, x: number, data: ChessType[][], team: "black" | "white" | ""): number[][][];
    CheckDiag(move: number, y: number, x: number, data: ChessType[][], team: "black" | "white" | ""): number[][][];
}
declare const _default: ChessItemUtils;
export default _default;
