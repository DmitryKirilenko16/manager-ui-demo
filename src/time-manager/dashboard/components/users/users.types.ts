import { USERS_INITIAL_STATE } from './redux/users.constants'
import {ERole} from '../../../auth/auth.constants'

export type UsersState = typeof USERS_INITIAL_STATE

export enum EEmployeeStatus {
  PRIVATE_ENTREPRENEUR= 1,
  TRAINEE = 2,
}

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number | null;
  role: ERole;
  picture: string;
  position: string | null;
  techStack: string | null;
  ratePerHour: number | null;
  ratePerMonth: number | null;
  employeeStatus: EEmployeeStatus | null;
}

export interface IUserProject {
  projectName: string;
  projectRatePerHour: string;
  ratePerHour: number;
  name: string;
  projectId: number;
}
