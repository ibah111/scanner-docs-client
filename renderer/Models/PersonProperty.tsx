import { PersonPropertyParam } from '@contact/models';
import { ClassConstructor } from 'class-transformer';
import { DateTime } from 'luxon';
const metadataKey = 'design:type_property';
// eslint-disable-next-line @typescript-eslint/ban-types
function Property(type: number, typ_params?: Function) {
  if (!typ_params)
    return Reflect.metadata(metadataKey, { type, typ_params: String });
  return Reflect.metadata(metadataKey, { typ_params, type });
}
interface IMetaData<T> {
  typ_params: ClassConstructor<T>;
  type: number;
}
interface IPropertyData<T, K extends keyof T> {
  name: K;
  // eslint-disable-next-line @typescript-eslint/ban-types
  typ_params: Function;
}

// eslint-disable-next-line @typescript-eslint/ban-types
function getProperty<K extends keyof T, T extends Object>(
  target: T,
  key: K,
): IMetaData<T[K]> {
  return Reflect.getMetadata(metadataKey, target, key as string);
}
function getProperties<K extends keyof T, T extends Vehicle>(instance: T) {
  const data: Record<number, IPropertyData<T, K>> = {};
  const keys = Object.keys(instance) as K[];
  for (const key of keys) {
    const metadata = getProperty(instance, key);
    if (metadata)
      data[metadata.type] = { name: key, typ_params: metadata.typ_params };
  }
  return data;
}
function setProperty<D extends IPropertyData<T, K>, K extends keyof T, T>(
  instance: T,
  data: D,
  value: string,
) {
  if (value !== null) {
    instance[data.name] = data.typ_params(value);
  } else {
    instance[data.name] = null as T[K];
  }
}
export class Vehicle {
  private readonly instances: PersonPropertyParam[];
  constructor(
    instances: PersonPropertyParam[],
    readonly status: string,
  ) {
    Object.defineProperty(this, 'instances', {
      value: instances,
      enumerable: false,
      writable: false,
    });
    const properties = getProperties(this);
    for (const item of this.instances) {
      if (properties[item.r_property_typ_params_id]) {
        if (!this.id) this.id = item.parent_id;
        const property = properties[item.r_property_typ_params_id];
        setProperty(this, property, item.value);
      }
    }
  }
  id: number;
  /**
   * Объём двигателя
   */
  @Property(44, Number)
  engineVolume: number | null;

  /**
   * Цвет
   */
  @Property(3)
  color: string | null;
  /**
   * Номер
   */
  @Property(5)
  bodyNumber: string | null;
  /**
   * Год выпуска
   */
  @Property(42, (value: string) => DateTime.fromFormat(value, 'DD.MM.YYYY'))
  year: DateTime | null;
  /**
   * Номер двигателя
   */
  @Property(43)
  engineNumber: string | null;
  /**
   * Vin номер
   */
  @Property(6)
  vin: string | null;
  /**
   * Модель
   */
  @Property(7)
  model: string | null;
  /**
   * Тип
   */

  @Property(47)
  type: string | null;
  /**
   * Мощность лошадиные силы
   */

  @Property(46, Number)
  powerHp: number | null;
  /**
   * Мощность Kwt
   */
  @Property(45, Number)
  powerKwt: number | null;
}
