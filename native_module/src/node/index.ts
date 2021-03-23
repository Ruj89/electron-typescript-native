const addon = require("../build/Release/hello");

export function hello() {
  return addon.hello();
}
