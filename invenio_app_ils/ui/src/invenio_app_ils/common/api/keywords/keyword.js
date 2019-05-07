import { http } from '../base';
import { serializer } from './serializer';

const keywordURL = '/keywords/';

const get = keywordPid => {
  return http.get(`${keywordURL}${keywordPid}`).then(response => {
    response.data = serializer.fromJSON(response.data);
    return response;
  });
};

class QueryBuilder {
  constructor() {
    this.withProvenanceQuery = [];
  }

  withProvenance(provenance) {
    if (!provenance) {
      throw TypeError('Provenance argument missing');
    }
    this.withProvenanceQuery.push(`provenance:"${provenance}"`);
    return this;
  }

  qs() {
    return this.withProvenanceQuery;
  }
}

const queryBuilder = () => {
  return new QueryBuilder();
};

const list = query => {
  return http.get(`${keywordURL}?q=${query}`).then(response => {
    response.data.total = response.data.hits.total;
    response.data.hits = response.data.hits.hits.map(hit =>
      serializer.fromJSON(hit)
    );
    return response;
  });
};

const count = query => {
  return http.get(`${keywordURL}?q=${query}`).then(response => {
    response.data = response.data.hits.total;
    return response;
  });
};

export const keyword = {
  get: get,
  list: list,
  count: count,
  query: queryBuilder,
  serializer: serializer,
  url: keywordURL,
};
