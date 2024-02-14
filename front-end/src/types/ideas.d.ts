export {};

declare global {
	interface IdeasEntry {
        IdeaEntryId: string;
        Name: string;
        Description: string;
        DomainName: string;
        HistoryId: string;
        IsGenerated:number;
	}
}
