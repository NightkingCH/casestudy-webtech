CREATE TABLE [dbo].[Angebot] (
    [AngebotId]    INT          NOT NULL IDENTITY(1,1),
    [ErstelltAm]   DATETIME     NOT NULL DEFAULT GETDATE(),
    [Status]       INT          NOT NULL DEFAULT 0, --0 = Offen; 1 = Akzeptiert; 2 = Abgelehnt
    [PreisProTeil] DECIMAL (18,2) NOT NULL,
    [AnbieterId]   INT          NOT NULL,
    [NachfrageId]  INT          NOT NULL,
    CONSTRAINT [PK_Angebot] PRIMARY KEY CLUSTERED ([AngebotId] ASC),
    CONSTRAINT [FK_AnbieterAngebot] FOREIGN KEY ([AnbieterId]) REFERENCES [dbo].[Anbieter] ([AnbieterId]),
    CONSTRAINT [FK_NachfrageAngebot] FOREIGN KEY ([NachfrageId]) REFERENCES [dbo].[Nachfrage] ([NachfrageId])
);

