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
}
