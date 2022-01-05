import * as dayjs from 'dayjs';

export class DateUtils {

  public static now(): Date {
    return dayjs().toDate();
  }

  public static getToday(): Date {
    return dayjs().toDate();
  }

  public static getYesterday(): Date {
    return dayjs().subtract(1, 'day').toDate();
  }

  public static getTomorrow(): Date {
    return dayjs().add(1, 'day').toDate();
  }
}


