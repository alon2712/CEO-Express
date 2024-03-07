export {};

declare global {
	interface HistoryType {
        HistoryId: string;
        Name: string;
        UserName: string; 
	}


	interface IdeaEntryType {
        IdeaEntryId: string;
        Name: string;
        Description: string;
        DomainName: string;
        HistoryId: string;
        IsGenerated: number;
	}

        interface TopMarketGapEntryType {
                MarketGapIdeaID: string;
                Name: string;
                Description: string;
                HasBeenSearched: boolean;
                NicheScore: string;
                CreateDate: string;
                Sentiment: number;
                }

	interface StepByStepEntry {
                StepNum: number;
                Description: string;
                }
}
