import { http, apiConfig } from '../base';
import { serializer } from './serializer';

const literatureURL = '/literature/';

const list = async query => {
  const response = await http.get(`${literatureURL}?q=${query}`);
  response.data.total = response.data.hits.total;
  response.data.hits = response.data.hits.hits.map(hit =>
    serializer.fromJSON(hit)
  );
  return response;
};

class QueryBuilder {
  constructor() {
    this.extraParamsQuery = '';
  }

  includeAll() {
    this.extraParamsQuery.push('include_all=true');
    return this;
  }

  sortBy(order = 'bestmatch') {
    this.extraParamsQuery.push(`sort=${order}`);
    return this;
  }

  qs() {
    return this.extraParamsQuery.join('&');
  }
}

const queryBuilder = () => {
  return new QueryBuilder();
};

export const literature = {
  searchBaseURL: `${apiConfig.baseURL}${literatureURL}`,
  list: list,
  query: queryBuilder,
  serializer: serializer,
};
