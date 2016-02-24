CREATE TABLE [dbo].[Teil] (
    [TeilId] INT          NOT NULL IDENTITY(1,1),
	[ProduktId] INT			NOT NULL,
	[TypId] INT			NOT NULL,
    [Anzahl] INT          NULL,
    [Name]   VARCHAR (40) NULL,
    CONSTRAINT [PK_Teil] PRIMARY KEY CLUSTERED ([TeilId] ASC),
	CONSTRAINT [FK_ProduktTeil] FOREIGN KEY ([ProduktId]) REFERENCES [dbo].[Produkt] ([ProduktId]),
	CONSTRAINT [FK_TypTeil] FOREIGN KEY ([TypId]) REFERENCES [dbo].[Typ] ([TypId])
);

