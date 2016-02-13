CREATE TABLE [dbo].[Nachfrage] (
    [NachfrageId] INT      NOT NULL IDENTITY(1,1),
    [Anzahl]      INT      NULL,
    [ErstelltAm]  DATETIME NULL,
    [TeilId]      INT      NOT NULL,
    CONSTRAINT [PK_Nachfrage] PRIMARY KEY CLUSTERED ([NachfrageId] ASC),
    CONSTRAINT [FK_TeilNachfrage] FOREIGN KEY ([TeilId]) REFERENCES [dbo].[Teil] ([TeilId])
);

