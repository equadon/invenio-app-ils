const serializeDocument = metadata => ({
  title: metadata.title,
  description: 'Document',
  extra: `PID: ${metadata.document_pid}`,
});

const serializeKeyword = metadata => ({
  title: metadata.name,
  description: metadata.provenance,
  extra: `PID: ${metadata.keyword_pid}`,
});

const serializeItem = metadata => ({
  title: metadata.medium,
  description: metadata.shelf,
  extra: `PID: ${metadata.item_pid}`,
});

const serializePatron = metadata => ({
  title: metadata.email,
  description: metadata.name,
  extra: `ID: ${metadata.id}`,
});

export const serializeHit = hit => {
  const { id, metadata } = hit;

  let result = {};
  if (metadata.item_pid) {
    result = serializeItem(metadata);
  } else if (metadata.keyword_pid) {
    result = serializeKeyword(metadata);
  } else if (metadata.document_pid) {
    result = serializeDocument(metadata);
  } else if (metadata.email) {
    result = serializePatron(metadata);
  }

  return {
    ...result,
    id: id + '',
    hit: hit,
  };
};
