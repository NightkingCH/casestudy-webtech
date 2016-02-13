CREATE TABLE [dbo].[Anbieter] (
    [AnbieterId] INT NOT NULL IDENTITY(1,1),
    [LoginId]    INT NOT NULL,
    CONSTRAINT [PK_Anbieter] PRIMARY KEY CLUSTERED ([AnbieterId] ASC),
    CONSTRAINT [FK_LoginAnbieter] FOREIGN KEY ([LoginId]) REFERENCES [dbo].[Login] ([LoginId])
);

