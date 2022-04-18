import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsFullName(property: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isFullName',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: string, args: ValidationArguments) {
          return value.split(' ').length === 2;
        },
      },
    });
  };
}
