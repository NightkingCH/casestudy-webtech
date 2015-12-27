System.config({
  transpiler: 'typescript',
  typescriptOptions: {
    emitDecoratorMetadata: true,
    experimentalDecorators: true
  },
  packages: {
    app: {
        defaultExtension: 'ts'
    }
}
});