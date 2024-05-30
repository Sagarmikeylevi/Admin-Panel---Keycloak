import { Request, Response } from "express";
import { readFile, writeFile } from "fs";
import { promisify } from "util";

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

export const createEmployee = async (req: Request, res: Response) => {
  try {
    const employees = JSON.parse(await readFileAsync("db.json", "utf8"));
    const { name, position, salary } = req.body;
    const newEmployee = {
      id: generateId(),
      name,
      position,
      salary,
    };
    employees.push(newEmployee);
    await writeFileAsync("db.json", JSON.stringify(employees, null, 2), "utf8");
    res.status(201).json({ message: "Employee created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await readFileAsync("db.json", "utf8");
    res.status(200).json(JSON.parse(employees));
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateEmployee = async (req: Request, res: Response) => {
  try {
    const employees = JSON.parse(await readFileAsync("db.json", "utf8"));
    const { id } = req.params;
    const { name, position, salary } = req.body;
    const index = employees.findIndex((employee: any) => employee.id === id);
    if (index !== -1) {
      employees[index] = {
        ...employees[index],
        name,
        position,
        salary,
      };
      await writeFileAsync(
        "db.json",
        JSON.stringify(employees, null, 2),
        "utf8"
      );
      res.status(200).json({ message: "Employee updated" });
    } else {
      res.status(404).json({ error: "Employee not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const employees = JSON.parse(await readFileAsync("db.json", "utf8"));
    const { id } = req.params;
    const index = employees.findIndex((employee: any) => employee.id === id);
    if (index !== -1) {
      employees.splice(index, 1);
      await writeFileAsync(
        "db.json",
        JSON.stringify(employees, null, 2),
        "utf8"
      );
      res.status(200).json({ message: "Employee deleted" });
    } else {
      res.status(404).json({ error: "Employee not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
