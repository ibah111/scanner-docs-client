export class BankRequisitesClass {
  /**
   * ID реквизитов
   */
  id: number;
  /**
   * Наименование
   */
  name: string;
  /**
   * Получатель
   */
  recipient: string;
  /**
   * Банк получателя
   */
  br_name: string;
  /**
   * ИНН
   */
  inn: string;
  /**
   * КПП
   */
  kpp: string;
  /**
   * Рассчётный счёт
   */
  r_account: string;
  /**
   * БИК
   */
  bik: string;
  /**
   * Корр счёт
   */
  k_account: string;
  /**
   * Назначение платежа
   */
  pay_purpose: string;
  /**
   * Юр адресс
   */
  br_address: string;
  /**
   * Тип реквизита
   */
  typ: number;
  /**
   * Неизвестно (КБЕ)
   */
  kbe: string;
  /**
   * Неизвестно (КНП)
   */
  knp: string;
  /**
   * Неизвестно (КОД)
   */
  kod: string;
}
