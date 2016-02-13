CREATE TABLE [dbo].[Login] (
    [LoginId]  INT          NOT NULL,
    [Name]     VARCHAR (40) NOT NULL,
    [Password] VARCHAR (40) NOT NULL,
    CONSTRAINT [PK_Login] PRIMARY KEY CLUSTERED ([LoginId] ASC)
);

