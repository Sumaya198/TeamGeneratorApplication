
const Manager = require("../lib/Manager");
const Employee = require("../lib/Employee");
const { TestScheduler } = require("jest");

const testManager = new Manager("harry", 4, "harry@gmail.com", "manager", 200)

test('has a name', () => {
  expect(testManager.name).toEqual(expect.any(String))
  expect(testManager.name.length).toBeGreaterThan(2)
})

test('has a valid email address', () => {
  expect(testManager.email).toEqual(expect.stringContaining('@'))
})

test('has a role of manager', () => {
  expect(testManager.role).toBe('Manager')
})

test('Id has value', () => {
  expect(testManager.id).toEqual(expect.any(Number))
})

test('Entered an office number', () => {
  objectKey = Object.keys(testManager)
  keyGH = objectKey[4]

  expect(keyGH).toBe('office')

  expect(testManager.officeNumber).toEqual(expect.any(Number))
})