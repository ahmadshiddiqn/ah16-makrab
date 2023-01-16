import pb from "./pocketbase";

export enum ETopic {
    WhoAmI = 0,
    WeWereYoung,
    AdultingTogether,
    WhatIsLove,
    WhosWho,
    IWishI,
    WhatIf
}

export type Topic = |
    ETopic.WhoAmI |
    ETopic.WeWereYoung |
    ETopic.AdultingTogether |
    ETopic.WhatIsLove |
    ETopic.WhosWho |
    ETopic.IWishI |
    ETopic.WhatIf


export interface IQuestions {
    created: Date,
    id: string,
    question: string,
    topic: Topic,
    updated: Date,
}

export const questions = pb.collection('questions')