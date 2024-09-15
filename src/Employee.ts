export default class Employee {
  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public roleId: number,
    public managerId: number | null = null
  ) {}
}
