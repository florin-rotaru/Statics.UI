import IQueryParameter from './types/IQueryParameter';
import { isNullOrUndefined } from '..';

export default function queryParameters() {
  const params: Array<IQueryParameter<string>> = [];

  return {
    addBoolean(
      name: string,
      value: boolean | null | undefined,
      ignoreDefaults = true
    ) {
      if (!name) {
        return;
      } else if ((!value || isNullOrUndefined(value)) && ignoreDefaults) {
        return;
      }

      params.push({
        name,
        value: isNullOrUndefined(value) ? '' : String(value),
      });
    },

    addBooleanValues(
      name: string,
      values: Array<boolean> | null | undefined,
      ignoreDefaults = true
    ) {
      if (values) {
        values.forEach((value) => this.addBoolean(name, value, ignoreDefaults));
      }
    },

    addNumber(
      name: string,
      value: number | bigint | null | undefined,
      ignoreDefaults = true
    ) {
      if (!name) {
        return;
      } else if ((!value || isNullOrUndefined(value)) && ignoreDefaults) {
        return;
      }
      params.push({
        name,
        value: isNullOrUndefined(value) ? '' : String(value),
      });
    },

    addNumberValues(
      name: string,
      values: Array<number | bigint> | null | undefined,
      ignoreDefaults = true
    ) {
      if (values) {
        values.forEach((value) => this.addNumber(name, value, ignoreDefaults));
      }
    },

    addString(name: string, value: string, ignoreDefaults = true) {
      if (!name) {
        return;
      } else if (!value && ignoreDefaults) {
        return;
      }
      params.push({ name, value: value || '' });
    },

    addStringValues(
      name: string,
      values: Array<string> | null | undefined,
      ignoreDefaults = true
    ) {
      if (values) {
        values.forEach((value) => this.addString(name, value, ignoreDefaults));
      }
    },

    toQueryString() {
      if (!params.length) {
        return '';
      }

      let query = '';
      for (let i = 0; i < params.length; i++) {
        query += `${i ? '&' : ''}${params[i].name}=${encodeURIComponent(
          params[i].value
        )}`;
      }

      return query;
    },
  };
}
