import { SetMetadata } from '@nestjs/common';


export const jwtConstants = {
  secret: '123456sssssssas@323234234234234@Sasa',
};

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
