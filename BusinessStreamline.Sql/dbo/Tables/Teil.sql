CREATE TABLE [dbo].[Teil] (
    [TeilId] INT          NOT NULL IDENTITY(1,1),
	[ProduktId] INT			NOT NULL,
	[TypId] INT			NOT NULL,
	[QualitaetId]   INT      NOT NULL,
    [Anzahl] INT          NOT NULL,
    [Name]   NVARCHAR (40) NOT NULL,
    CONSTRAINT [PK_Teil] PRIMARY KEY CLUSTERED ([TeilId] ASC),
	CONSTRAINT [FK_ProduktTeil] FOREIGN KEY ([ProduktId]) REFERENCES [dbo].[Produkt] ([ProduktId]),
	CONSTRAINT [FK_TypTeil] FOREIGN KEY ([TypId]) REFERENCES [dbo].[Typ] ([TypId]),
	CONSTRAINT [FK_QualitaetTeil] FOREIGN KEY ([QualitaetId]) REFERENCES [dbo].[Qualitaet] ([QualitaetId]),
	CONSTRAINT [CHK_Teil_Anzahl] CHECK (Anzahl > 0)
);

