CREATE TABLE [dbo].[Teil] (
    [TeilId] INT          NOT NULL IDENTITY(1,1),
    [Anzahl] INT          NULL,
    [Name]   VARCHAR (40) NULL,
    CONSTRAINT [PK_Teil] PRIMARY KEY CLUSTERED ([TeilId] ASC)
);

