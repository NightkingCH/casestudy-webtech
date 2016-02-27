CREATE TABLE [dbo].[Nachfrage] (
    [NachfrageId] INT      NOT NULL IDENTITY(1,1),
    [Anzahl]      INT      NOT NULL,
    [ErstelltAm]  DATETIME NOT NULL DEFAULT GETDATE(),
    [TeilId]      INT      NOT NULL,
    CONSTRAINT [PK_Nachfrage] PRIMARY KEY CLUSTERED ([NachfrageId] ASC),
    CONSTRAINT [FK_TeilNachfrage] FOREIGN KEY ([TeilId]) REFERENCES [dbo].[Teil] ([TeilId]),
	CONSTRAINT [CHK_Nachfrage_Anzahl] CHECK (Anzahl > 0)
);

