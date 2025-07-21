
export function commandLogin(argv: string[]) {
  argv.forEach((val, index) => {
    console.log(`${index}: ${val}`);
  });
}
