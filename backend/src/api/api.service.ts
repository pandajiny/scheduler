import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class ApiService {
  getEmptyFields(target: { [key: string]: any }): null | string[] {
    const emptyKeys: string[] = [];

    Object.entries(target).forEach(e => {
      const key = e[0];
      const value = e[1];
      if (value == undefined) {
        emptyKeys.push(key);
      }
    });

    if (emptyKeys.length == 0) {
      return null;
    } else {
      return emptyKeys;
    }
  }

  httpResponse<T>(data: T): HttpResponse<T> {
    return {
      ok: true,
      data,
    };
  }
}
