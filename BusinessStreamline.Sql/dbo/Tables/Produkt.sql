﻿CREATE TABLE [dbo].[Produkt] (
    [ProduktId] INT          NOT NULL IDENTITY(1,1),
    [Name]      NVARCHAR (40) NOT NULL,
    [FirmaId]   INT          NOT NULL,
    CONSTRAINT [PK_Produkt] PRIMARY KEY CLUSTERED ([ProduktId] ASC),
    CONSTRAINT [FK_FirmaProdukt] FOREIGN KEY ([FirmaId]) REFERENCES [dbo].[Firma] ([FirmaId])
);

