import { enum2array } from 'enum2array';

export const enumToArray = (enumObject: any) => {
  return enum2array(enumObject).map((obj) => obj.value);
};
