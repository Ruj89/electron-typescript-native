const addon = require("../build/Release/hello");

export function hello(): string {
  return addon.hello();
}
