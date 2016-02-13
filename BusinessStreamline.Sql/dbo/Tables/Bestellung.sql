CREATE TABLE [dbo].[Bestellung] (
    [BestellungId] INT      NOT NULL IDENTITY(1,1),
    [ErstelltAm]   DATETIME NOT NULL DEFAULT GETDATE(),
    [NachfrageId]  INT      NOT NULL,
    [AngebotId]    INT      NOT NULL,
    CONSTRAINT [PK_Bestellung] PRIMARY KEY CLUSTERED ([BestellungId] ASC),
    CONSTRAINT [FK_AngebotBestellung] FOREIGN KEY ([AngebotId]) REFERENCES [dbo].[Angebot] ([AngebotId]),
    CONSTRAINT [FK_NachfrageBestellung] FOREIGN KEY ([NachfrageId]) REFERENCES [dbo].[Nachfrage] ([NachfrageId])
);

