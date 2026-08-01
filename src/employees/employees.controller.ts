import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { EmployeesService } from './employees.service';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Get()
  async getAll() {
    return await this.employeesService.getAll();
  }

  @Post()
  async create(@Body() body: { name: string; code: string }) {
    return await this.employeesService.create(body.name, body.code);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.employeesService.delete(id);
  }
}
