// Reexport the native module. On web, it will be resolved to TimerModule.web.ts
// and on native platforms to TimerModule.ts
export { default } from './src/TimerModule';
export { default as TimerModuleView } from './src/TimerModuleView';
export * from  './src/TimerModule.types';
