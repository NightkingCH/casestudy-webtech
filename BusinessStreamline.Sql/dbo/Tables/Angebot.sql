CREATE TABLE [dbo].[Angebot] (
    [AngebotId]    INT          NOT NULL IDENTITY(1,1),
    [ErstelltAm]   DATETIME     NULL,
    [Status]       INT          NULL,
    [PreisProTeil] DECIMAL (18) NULL,
    [AnbieterId]   INT          NOT NULL,
    [NachfrageId]  INT          NOT NULL,
    CONSTRAINT [PK_Angebot] PRIMARY KEY CLUSTERED ([AngebotId] ASC),
    CONSTRAINT [FK_AnbieterAngebot] FOREIGN KEY ([AnbieterId]) REFERENCES [dbo].[Anbieter] ([AnbieterId]),
    CONSTRAINT [FK_NachfrageAngebot] FOREIGN KEY ([NachfrageId]) REFERENCES [dbo].[Nachfrage] ([NachfrageId])
);

