import {DropDownItemAdapter} from '../components/DropDownSelector';
export const employeeDropdownAdapter = employee => 
  new DropDownItemAdapter(
    employee.u_guid,
    `${employee.name_last} ${employee.name_first} ${employee.name_second}`,
    employee.employee_position
  );