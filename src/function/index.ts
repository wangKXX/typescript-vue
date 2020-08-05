function changeParams(name: string, age?: number): void {
  console.log(`my name is ${name}, i am ${age} years old`);
}

function defaultValue(name = "thon"): void {
  console.log(name);
}

function anyParams(...params: string[]): void {
  console.log(params.join(","));
}