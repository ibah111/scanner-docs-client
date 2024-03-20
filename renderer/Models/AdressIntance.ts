import { Address } from '@contact/models';
import { CreationAttributes } from '@sql-tools/sequelize';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
export class AddressInstance implements CreationAttributes<Address> {
  @Expose()
  @IsNumber()
  @IsNotEmpty()
  parent_id: number;
  @Expose()
  @IsNumber()
  @IsOptional()
  id?: number;
  @Expose()
  @IsString()
  @IsOptional()
  dsc?: string | null;
  @Expose()
  @IsNumber()
  @IsNotEmpty()
  typ: number;
  @Expose()
  @IsNumber()
  @IsOptional()
  status?: number | null;
  @Expose()
  @IsNumber()
  @IsNotEmpty()
  r_debt_guarantor_id: number;
  @Expose()
  @IsString()
  @IsOptional()
  full_adr?: string;
}
