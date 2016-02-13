CREATE TABLE [dbo].[Login] (
    [LoginId]  INT          NOT NULL IDENTITY(1,1),
    [Name]     VARCHAR (40) NOT NULL,
    [Password] VARCHAR (40) NOT NULL,
    CONSTRAINT [PK_Login] PRIMARY KEY CLUSTERED ([LoginId] ASC)
);

