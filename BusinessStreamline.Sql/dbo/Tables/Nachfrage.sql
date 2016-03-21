CREATE TABLE [dbo].[Nachfrage] (
    [NachfrageId] INT      NOT NULL IDENTITY(1,1),
    [TeilId]      INT      NOT NULL,
    [Anzahl]      INT      NOT NULL,
    [ErstelltAm]  DATETIME NOT NULL DEFAULT GETDATE(),
	[Liefertermin]  DATETIME NOT NULL,
    CONSTRAINT [PK_Nachfrage] PRIMARY KEY CLUSTERED ([NachfrageId] ASC),
    CONSTRAINT [FK_TeilNachfrage] FOREIGN KEY ([TeilId]) REFERENCES [dbo].[Teil] ([TeilId]),
	CONSTRAINT [CHK_Nachfrage_Anzahl] CHECK (Anzahl > 0)
);