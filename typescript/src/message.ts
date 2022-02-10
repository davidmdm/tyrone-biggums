export enum MessageType {
    ReadyUp,
    Play,
    Fire,
    GameOver,
}

export type Message = {
    type: MessageType,
    msg?: string,
};

export function createMessage(type: MessageType): Message {
    return {
        type
    };
}

export function createReadyUpMessage(): Message {
    return {
        type: MessageType.ReadyUp
    };
}

export function createWinnerMessage(): Message {
    return {
        type: MessageType.GameOver,
        msg: "winner",
    };
}

export function createLoserMessage(): Message {
    return {
        type: MessageType.GameOver,
        msg: "loser",
    };
}

