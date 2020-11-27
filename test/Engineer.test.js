const Engineer = require("../lib/Engineer");

const testEngineer = new Engineer("harry", 8, "harry@gmail.com")

test('has a name', () => {
  expect(testEngineer.name).toEqual(expect.any(String))
  expect(testEngineer.name.length).toBeGreaterThan(2)
})

test('Id has value', () => {
  expect(testEngineer.id).toEqual(expect.any(Number))
})

test('has a valid email address', () => {
  expect(testEngineer.email).toEqual(expect.stringContaining('@'))
})

test('has a valid github', () => {
  expect(testEngineer.gitHub).toEqual(expect.any(String))
})
